# Push MSBT website to GitHub repo: msbt-collage
# Run AFTER creating empty repo at https://github.com/new?name=msbt-collage

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "studyextremeconsultltd-hub/msbt-collage"
$remoteUrl = "https://github.com/$repo.git"

Write-Host "MSBT College - GitHub upload" -ForegroundColor Cyan
Write-Host "Target: $remoteUrl`n"

if (-not (Test-Path $gh)) {
    Write-Host "GitHub CLI not found. Install from https://cli.github.com/" -ForegroundColor Red
    exit 1
}

& $gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nRun: & `"$gh`" auth login" -ForegroundColor Yellow
    exit 1
}

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main

Write-Host "`nPushing to GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Repo: https://github.com/$repo" -ForegroundColor Green
} else {
    Write-Host "`nPush failed. Create the empty repo first:" -ForegroundColor Yellow
    Write-Host "  https://github.com/new?name=msbt-collage" -ForegroundColor White
    Write-Host "Do NOT add README, .gitignore, or license.`n" -ForegroundColor Yellow
}
