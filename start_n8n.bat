@echo off
title n8n - localhost:5678
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_n8n.ps1"
if errorlevel 1 pause
