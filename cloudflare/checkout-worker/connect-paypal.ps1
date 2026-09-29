# Connect MSBT PayPal (official merchant) to the checkout Worker
# Run in an interactive PowerShell window (not Cursor background):
#   cd e:\MSBT\msbt-main\cloudflare\checkout-worker
#   .\connect-paypal.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "MSBT — Connect official PayPal account" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1) Open PayPal Live REST apps and copy Client ID + Secret:"
Write-Host "   https://developer.paypal.com/dashboard/applications/live"
Write-Host ""
Write-Host "2) This script will store them as Cloudflare Worker secrets"
Write-Host "   and deploy the checkout worker."
Write-Host ""

npx wrangler login
if ($LASTEXITCODE -ne 0) { throw "Wrangler login failed." }

Write-Host ""
Write-Host "Paste PAYPAL_CLIENT_ID when prompted..." -ForegroundColor Yellow
npx wrangler secret put PAYPAL_CLIENT_ID
if ($LASTEXITCODE -ne 0) { throw "Failed to set PAYPAL_CLIENT_ID." }

Write-Host ""
Write-Host "Paste PAYPAL_CLIENT_SECRET when prompted..." -ForegroundColor Yellow
npx wrangler secret put PAYPAL_CLIENT_SECRET
if ($LASTEXITCODE -ne 0) { throw "Failed to set PAYPAL_CLIENT_SECRET." }

Write-Host ""
Write-Host "Optional: refresh Stripe secret if card payments fail." -ForegroundColor DarkYellow
$stripe = Read-Host "Update STRIPE_SECRET_KEY now? (y/N)"
if ($stripe -match '^[Yy]') {
  npx wrangler secret put STRIPE_SECRET_KEY
}

Write-Host ""
Write-Host "Deploying checkout worker..." -ForegroundColor Cyan
npx wrangler deploy
if ($LASTEXITCODE -ne 0) { throw "Deploy failed." }

Write-Host ""
Write-Host "Checking health..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
$health = Invoke-RestMethod -Uri "https://msbt-checkout.studyextreme.workers.dev/health"
$health | ConvertTo-Json

if (-not $health.paypal_configured) {
  Write-Host "PayPal still not marked configured — re-check secrets." -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "PayPal connected. Test at https://msbt.co.uk/pay (choose PayPal)." -ForegroundColor Green
Start-Process "https://msbt.co.uk/pay"
