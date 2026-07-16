# MSBT2026 — Push to GitHub (GitHub Pages — no Vercel)
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
Write-Host "  MSBT2026 — GitHub Pages Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $gh)) {
    Write-Host "Install GitHub CLI: winget install GitHub.cli" -ForegroundColor Red
    exit 1
}

& $gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[1/3] GitHub sign-in (account: $owner)" -ForegroundColor Yellow
    & $gh auth login
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

Write-Host "[2/3] Checking repo $owner/$repoName..." -ForegroundColor Yellow
& $gh repo view "$owner/$repoName" 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Start-Process "https://github.com/new?name=$repoName&description=MSBT+College+website+2026"
    Read-Host "  Press ENTER after repo $repoName exists"
}

Write-Host "[3/3] Pushing..." -ForegroundColor Yellow
git add -A
$dirty = git status --porcelain
if ($dirty) {
    git -c user.name="MSBT Deploy" -c user.email="deploy@msbt.local" commit -m "MSBT — Vite + GitHub Pages (Next.js/Vercel removed)"
}

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main
& $gh auth setup-git
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: https://github.com/$owner/$repoName" -ForegroundColor Green
    Write-Host "Enable Pages: Settings → Pages → Source: GitHub Actions"
    Write-Host "DNS: point msbt.co.uk A records to GitHub Pages (see README)"
    Start-Process "https://github.com/$owner/$repoName/settings/pages"
} else {
    Write-Host "Push failed." -ForegroundColor Red
    exit 1
}
