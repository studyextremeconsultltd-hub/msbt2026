# MSBT2026 — Push to GitHub and open Vercel
# Repository: https://github.com/studyextremeconsultltd-hub/msbt2026
# Run:  cd "e:\MSBT\msbt-main"  then  .\deploy.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$gh = "C:\Program Files\GitHub CLI\gh.exe"
$owner = "studyextremeconsultltd-hub"
$repoName = "msbt2026"
$remoteUrl = "https://github.com/$owner/$repoName.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MSBT2026 — GitHub + Vercel Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target: $remoteUrl"
Write-Host ""

if (-not (Test-Path $gh)) {
    Write-Host "Install GitHub CLI: winget install GitHub.cli" -ForegroundColor Red
    exit 1
}

# Sign in
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
& $gh auth logout 2>$null | Out-Null
$ErrorActionPreference = $prevEAP

& $gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[1/3] GitHub sign-in (account: $owner)" -ForegroundColor Yellow
    Write-Host "  Choose: GitHub.com -> HTTPS -> Yes -> Login with a web browser"
    & $gh auth login
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

$login = & $gh api user -q .login
Write-Host "  Signed in as: $login" -ForegroundColor Gray

# Ensure repo exists
Write-Host ""
Write-Host "[2/3] Checking repo $owner/$repoName..." -ForegroundColor Yellow
& $gh repo view "$owner/$repoName" 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Repo not found. Rename msbt-collage to msbt2026 on GitHub, or create it:"
    Start-Process "https://github.com/new?name=$repoName&description=MSBT+College+website+2026"
    Read-Host "  Press ENTER after repo $repoName exists (empty)"
}

# Push
Write-Host ""
Write-Host "[3/3] Pushing all code..." -ForegroundColor Yellow
git add -A
$dirty = git status --porcelain
if ($dirty) {
    git -c user.name="MSBT Deploy" -c user.email="deploy@msbt.local" commit -m "MSBT2026 — website with contact page and deployment config"
}

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main
& $gh auth setup-git
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: https://github.com/$owner/$repoName" -ForegroundColor Green
    Start-Process "https://vercel.com/new/import?s=$owner/$repoName"
    Write-Host "Vercel import opened. Use Framework: Next.js, Root: ./"
} else {
    Write-Host "Push failed. Run: gh auth login" -ForegroundColor Red
    exit 1
}
