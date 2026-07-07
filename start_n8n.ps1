#Requires -Version 5.1
<#
.SYNOPSIS
  Start n8n locally on http://localhost:5678 without npm warning loops.
#>
$ErrorActionPreference = "Stop"

$Port = 5678
$HostName = "localhost"
$GlobalNpmRoot = Join-Path $env:APPDATA "npm"
$GlobalN8nRoot = Join-Path $GlobalNpmRoot "node_modules\n8n"
$GlobalN8nBin = Join-Path $GlobalN8nRoot "bin\n8n"
$LocalN8nRoot = Join-Path $PSScriptRoot ".tools\n8n-runner\node_modules\n8n"
$LocalN8nBin = Join-Path $LocalN8nRoot "bin\n8n"
$N8nData = Join-Path $env:USERPROFILE ".n8n"

function Write-Status([string]$Message, [string]$Color = "Cyan") {
  Write-Host $Message -ForegroundColor $Color
}

function Reset-NpmEnvironment {
  # Cursor/agent shells can inject a sandbox npm cache that breaks installs.
  $env:npm_config_cache = Join-Path $env:LOCALAPPDATA "npm-cache"
  Remove-Item Env:npm_config_devdir -ErrorAction SilentlyContinue
  $env:NPM_CONFIG_LOGLEVEL = "error"
  $env:NPM_CONFIG_UPDATE_NOTIFIER = "false"
  $env:NPM_CONFIG_FUND = "false"
  $env:NODE_NO_WARNINGS = "1"
}

function Test-N8nInstall([string]$N8nRoot) {
  $bin = Join-Path $N8nRoot "bin\n8n"
  $pkg = Join-Path $N8nRoot "package.json"
  return ((Test-Path $bin) -and (Test-Path $pkg))
}

function Ensure-N8nShim {
  $cmdPath = Join-Path $GlobalNpmRoot "n8n.cmd"
  if (Test-Path $cmdPath) { return }

  Write-Status "Repairing missing global n8n.cmd shim..." "Yellow"
  @'
@ECHO off
GOTO start
:find_dp0
SET dp0=%~dp0
EXIT /b
:start
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\node_modules\n8n\bin\n8n" %*
'@ | Set-Content -Path $cmdPath -Encoding ASCII
}

function Repair-BrokenGlobalN8n {
  Write-Status "Removing corrupted partial global n8n install..." "Yellow"
  Get-ChildItem (Join-Path $GlobalNpmRoot "node_modules") -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -eq "n8n" -or $_.Name -like ".n8n-*" } |
    ForEach-Object {
      Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Install-GlobalN8n {
  Write-Status "Installing n8n globally (first run can take several minutes)..." "Yellow"
  Repair-BrokenGlobalN8n
  & npm install -g n8n@2.22.6 --no-fund --no-audit --loglevel error
  if ($LASTEXITCODE -ne 0) {
    throw "Global n8n install failed. Close stuck node/npm tasks in Task Manager, then rerun."
  }
  Ensure-N8nShim
}

function Install-LocalN8n {
  $runnerDir = Join-Path $PSScriptRoot ".tools\n8n-runner"
  $runnerPkg = Join-Path $runnerDir "package.json"
  if (-not (Test-Path $runnerPkg)) {
    New-Item -ItemType Directory -Force -Path $runnerDir | Out-Null
    @'
{
  "name": "n8n-local-runner",
  "private": true,
  "dependencies": {
    "n8n": "2.22.6"
  }
}
'@ | Set-Content -Path $runnerPkg -Encoding UTF8
  }

  Write-Status "Installing local n8n fallback (first run can take several minutes)..." "Yellow"
  Push-Location $runnerDir
  try {
    & npm install --no-fund --no-audit --loglevel error
    if ($LASTEXITCODE -ne 0) {
      throw "Local n8n install failed."
    }
  } finally {
    Pop-Location
  }
}

function Stop-PortListener([int]$TargetPort) {
  $connections = Get-NetTCPConnection -LocalPort $TargetPort -State Listen -ErrorAction SilentlyContinue
  foreach ($conn in $connections) {
    $pid = $conn.OwningProcess
    if (-not $pid) { continue }
    try {
      $proc = Get-Process -Id $pid -ErrorAction Stop
      Write-Status "Stopping process on port ${TargetPort}: $($proc.ProcessName) (PID $pid)" "Yellow"
      Stop-Process -Id $pid -Force -ErrorAction Stop
    } catch {
      Write-Status "Could not stop PID $pid on port ${TargetPort}. Close it manually, then rerun." "Red"
    }
  }
}

function Stop-StuckN8nInstallers {
  $stuckPatterns = @(
    'npm-cli\.js',
    '\\npm\\bin\\npm',
    'npm install',
    'npm i ',
    'node-gyp',
    'prebuild-install',
    'node_modules\\n8n\\bin\\n8n'
  )

  Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
    ForEach-Object {
      $cmd = $_.CommandLine
      if (-not $cmd) { return }

      $isStuck = $false
      foreach ($pattern in $stuckPatterns) {
        if ($cmd -match $pattern) {
          $isStuck = $true
          break
        }
      }
      if (-not $isStuck) { return }

      try {
        Write-Status "Stopping stuck npm/n8n process PID $($_.ProcessId)" "Yellow"
        Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop
      } catch {
        Write-Status "Could not stop PID $($_.ProcessId). End it in Task Manager if installs keep looping." "Red"
      }
    }
}

Reset-NpmEnvironment
Ensure-N8nShim

Write-Status "Cleaning stale listeners and stuck npm loops..."
Stop-StuckN8nInstallers
Stop-PortListener -TargetPort $Port

$N8nBin = $null
if (Test-N8nInstall $GlobalN8nRoot) {
  $N8nBin = $GlobalN8nBin
  Write-Status "Using global n8n install."
} else {
  try {
    Install-GlobalN8n
    if (Test-N8nInstall $GlobalN8nRoot) {
      $N8nBin = $GlobalN8nBin
      Write-Status "Using global n8n install."
    }
  } catch {
    Write-Status $_.Exception.Message "Yellow"
  }
}

if (-not $N8nBin -and (Test-N8nInstall $LocalN8nRoot)) {
  $N8nBin = $LocalN8nBin
  Write-Status "Using local n8n fallback install."
} elseif (-not $N8nBin) {
  Install-LocalN8n
  if (Test-N8nInstall $LocalN8nRoot) {
    $N8nBin = $LocalN8nBin
    Write-Status "Using local n8n fallback install."
  } else {
    throw "n8n is not installed. Close stuck node/npm tasks, then rerun start_n8n.bat."
  }
}

$env:N8N_HOST = $HostName
$env:N8N_PORT = "$Port"
$env:N8N_EDITOR_BASE_URL = "http://${HostName}:${Port}/"
$env:N8N_USER_FOLDER = $N8nData
New-Item -ItemType Directory -Force -Path $N8nData | Out-Null

Write-Status ""
Write-Status "n8n starting at http://${HostName}:${Port}/" "Green"
Write-Status "Press Ctrl+C to stop."
Write-Status ""

& node $N8nBin start
exit $LASTEXITCODE
