# Quick push to studyextremeconsultltd-hub/msbt2026
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "studyextremeconsultltd-hub/msbt2026"
$remoteUrl = "https://github.com/$repo.git"

& $gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Run: & `"$gh`" auth login" -ForegroundColor Yellow
    exit 1
}

git remote set-url origin $remoteUrl
git branch -M main
& $gh auth setup-git
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: https://github.com/$repo" -ForegroundColor Green
    Write-Host "GitHub Pages: Settings → Pages → Source: GitHub Actions"
}
