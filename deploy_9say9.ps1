# MSBT - Create 9say9/msbt repo, push code, deploy via Vercel
# Run in PowerShell:  cd "e:\MSBT\msbt-main"  then  .\deploy_9say9.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$gh = "C:\Program Files\GitHub CLI\gh.exe"
$owner = "9say9"
$repoName = "msbt"
$remoteUrl = "https://github.com/$owner/$repoName.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MSBT Deploy: GitHub -> Vercel -> GoDaddy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target repo: $remoteUrl"
Write-Host ""

if (-not (Test-Path $gh)) {
    Write-Host "Install GitHub CLI: winget install GitHub.cli" -ForegroundColor Red
    exit 1
}

# --- STEP 1: Sign in as 9say9 ---
Write-Host "[1/4] GitHub sign-in (must be account: 9say9)" -ForegroundColor Yellow
Write-Host "  Choose: GitHub.com -> HTTPS -> Yes -> Login with a web browser"
Write-Host ""
& $gh auth logout 2>$null
& $gh auth login
if ($LASTEXITCODE -ne 0) { exit 1 }

$loggedIn = & $gh api user -q .login
Write-Host "  Signed in as: $loggedIn" -ForegroundColor Gray
if ($loggedIn -ne $owner) {
    Write-Host "  WARNING: You are not signed in as $owner. Repo must be under $owner." -ForegroundColor Red
    Write-Host "  Run: gh auth logout  then  gh auth login  and sign in as $owner"
    $cont = Read-Host "Continue anyway? (y/N)"
    if ($cont -ne "y") { exit 1 }
}

# --- STEP 2: Create repo if missing ---
Write-Host ""
Write-Host "[2/4] Creating GitHub repo $owner/$repoName (if needed)..." -ForegroundColor Yellow
$repoExists = $false
try {
    & $gh repo view "$owner/$repoName" 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $repoExists = $true }
} catch {}

if (-not $repoExists) {
    & $gh repo create "$owner/$repoName" --public --description "MSBT College - Manchester School of Business and Technology"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Auto-create failed. Create manually:" -ForegroundColor Yellow
        Start-Process "https://github.com/new?name=$repoName&owner=$owner"
        Read-Host "  Press ENTER after creating empty repo $repoName under $owner"
    }
} else {
    Write-Host "  Repo already exists." -ForegroundColor Green
}

# --- STEP 3: Push all code ---
Write-Host ""
Write-Host "[3/4] Pushing all local code..." -ForegroundColor Yellow

git add -A
$status = git status --porcelain
if ($status) {
    git -c user.name="MSBT Deploy" -c user.email="deploy@msbt.local" commit -m "MSBT website - ready for Vercel deployment"
}

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main
& $gh auth setup-git

git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Push failed. Sign in as $owner and try again." -ForegroundColor Red
    exit 1
}

Write-Host "  Code uploaded: https://github.com/$owner/$repoName" -ForegroundColor Green

# --- STEP 4: Vercel ---
Write-Host ""
Write-Host "[4/4] Open Vercel to deploy" -ForegroundColor Yellow
Write-Host "  Settings: Framework = Next.js, Root Directory = ./"
Write-Host ""
Start-Process "https://vercel.com/new/import?s=$owner/$repoName"
Write-Host ""
Write-Host "After Vercel deploy works, connect GoDaddy msbt.co.uk:" -ForegroundColor Cyan
Write-Host "  Vercel -> Domains -> add msbt.co.uk + www.msbt.co.uk"
Write-Host "  GoDaddy DNS:"
Write-Host "    Delete: WebsiteBuilder Site"
Write-Host "    A     @   -> 76.76.21.21"
Write-Host "    CNAME www -> cname.vercel-dns.com"
Write-Host ""
Write-Host "Done!" -ForegroundColor Green
