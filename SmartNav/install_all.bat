@echo off
title SmartNav - Dependency Installer
cls
echo ===================================================
echo   🛡️  SmartNav Project Dependency Installer
echo ===================================================
echo.

:: Check for Node.js
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js (v18+) from https://nodejs.org/ before continuing.
    pause
    exit /b 1
)
echo [OK] Node.js is ready.
echo.

:: Check for Python
echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    echo Please install Python (v3.10+) from https://www.python.org/ before continuing.
    pause
    exit /b 1
)
echo [OK] Python is ready.
echo.

echo ===================================================
echo   1. Installing Client Side Dependencies (React/Vite)
echo ===================================================
cd client
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install client dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..
echo [SUCCESS] Client dependencies installed successfully.
echo.

echo ===================================================
echo   2. Installing Server Side Dependencies (Node.js/Express)
echo ===================================================
cd server
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install server dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..
echo [SUCCESS] Server dependencies installed successfully.
echo.

echo ===================================================
echo   3. Installing Python Backend Dependencies (Pip)
echo ===================================================
cd py_server
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install Python dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..
echo [SUCCESS] Python dependencies installed successfully.
echo.

echo ===================================================
echo   🎉 Installation Complete!
echo ===================================================
echo All dependencies for Client, Server, and Python backend
echo have been successfully installed.
echo.
echo You can now run the services using start_all.bat.
echo.
pause
