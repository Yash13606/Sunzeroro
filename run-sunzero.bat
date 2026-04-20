@echo off
setlocal

REM Run from the repository root regardless of where the script is called.
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm is not available in PATH.
  echo Install Node.js from https://nodejs.org/ and try again.
  exit /b 1
)

if not exist node_modules (
  echo [INFO] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Dependency installation failed.
    exit /b 1
  )
)

set MODE=%~1
if "%MODE%"=="" set MODE=dev

if /I "%MODE%"=="dev" (
  echo [INFO] Starting development server...
  call npm run dev
  exit /b %errorlevel%
)

if /I "%MODE%"=="build" (
  echo [INFO] Building production bundle...
  call npm run build
  exit /b %errorlevel%
)

if /I "%MODE%"=="preview" (
  echo [INFO] Starting preview server...
  call npm run preview
  exit /b %errorlevel%
)

echo Usage: run-sunzero.bat [dev^|build^|preview]
exit /b 1
