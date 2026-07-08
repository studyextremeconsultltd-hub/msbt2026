# MSBT - Create GitHub repo and push all code
# Run this script in PowerShell (right-click -> Run with PowerShell, or paste in terminal)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repoName = "msbt-website"
$owner = "studyextremeconsultltd-hub"
$remoteUrl = "https://github.com/$owner/$repoName.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MSBT - Upload to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repo target: $remoteUrl"
Write-Host ""

# Step 1: Re-authenticate (fixes 403 permission errors)
Write-Host "[Step 1/3] GitHub sign-in (use WEB BROWSER, not old token)" -ForegroundColor Yellow
Write-Host "  When prompted: GitHub.com -> HTTPS -> Yes -> Login with a web browser"
Write-Host ""
& $gh auth logout 2>$null
& $gh auth login

if ($LASTEXITCODE -ne 0) {
    Write-Host "Sign-in failed. Try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[Step 2/3] Create empty repo on GitHub" -ForegroundColor Yellow
Write-Host "  Opening browser... Create repo named: $repoName"
Write-Host "  Do NOT add README, .gitignore, or license."
Write-Host ""
Start-Process "https://github.com/new?name=$repoName&description=MSBT+College+website"

$ready = Read-Host "Press ENTER after you clicked 'Create repository' in the browser"

# Step 3: Push all local commits
Write-Host ""
Write-Host "[Step 3/3] Pushing all code to GitHub..." -ForegroundColor Yellow

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main
& $gh auth setup-git

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! All code is on GitHub:" -ForegroundColor Green
    Write-Host "  https://github.com/$owner/$repoName" -ForegroundColor White
    Write-Host ""
    Write-Host "Next: Import this repo in Vercel:" -ForegroundColor Cyan
    Write-Host "  https://vercel.com/new/import?s=$owner/$repoName" -ForegroundColor White
    Write-Host "  Framework: Next.js | Root: ./"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Push failed. Common fixes:" -ForegroundColor Red
    Write-Host "  1. Make sure repo $repoName exists (empty) on GitHub"
    Write-Host "  2. Run: gh auth login  (use web browser)"
    Write-Host "  3. Run this script again"
    Write-Host ""
    exit 1
}
