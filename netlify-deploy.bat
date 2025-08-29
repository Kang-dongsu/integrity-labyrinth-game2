@echo off
title Netlify Deployment Assistant - 청렴의 미궁
color 0C
echo.
echo =========================================
echo    Netlify Deployment Assistant
echo    청렴의 미궁 - 30 Users Concurrent Support
echo =========================================
echo.

echo [Pre-Deployment Check] Verifying deployment readiness...
echo.

REM Check if required files exist
if not exist "netlify.toml" (
    echo ❌ netlify.toml not found
    echo This file is required for proper deployment
    pause
    exit /b 1
)
echo ✅ netlify.toml found

if not exist "package.json" (
    echo ❌ package.json not found
    pause
    exit /b 1
)
echo ✅ package.json found

if not exist "src\" (
    echo ❌ src folder not found
    pause
    exit /b 1
)
echo ✅ src folder found

if not exist ".env.example" (
    echo ❌ .env.example not found
    pause
    exit /b 1
)
echo ✅ .env.example found

echo.
echo [Build Test] Testing production build...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Production build failed
    echo Please fix build errors before deploying
    pause
    exit /b 1
)
echo ✅ Production build successful

if not exist "dist\" (
    echo ❌ dist folder not created
    echo Build completed but no output folder
    pause
    exit /b 1
)
echo ✅ dist folder created

echo.
echo [File Count Check] Verifying build output...
dir /b dist | find /c /v "" > temp_count.txt
set /p FILE_COUNT=<temp_count.txt
del temp_count.txt

if %FILE_COUNT% LSS 3 (
    echo ❌ Too few files in dist folder (%FILE_COUNT% files)
    echo Expected at least 3 files (HTML, JS, CSS)
    pause
    exit /b 1
)
echo ✅ Build output verified (%FILE_COUNT% files)

echo.
echo [Deployment Readiness] ✅ ALL CHECKS PASSED
echo.
echo Your project is ready for Netlify deployment!
echo.
echo 📋 NEXT STEPS:
echo.
echo 1. 🌐 Go to https://netlify.com
echo 2. 🔐 Sign up/Login (preferably with GitHub)
echo 3. ➕ Click "New site from Git"
echo 4. 🔗 Connect to GitHub and select your repository
echo 5. ⚙️  Configure build settings:
echo    - Build command: npm run build
echo    - Publish directory: dist
echo    - Node version: 18
echo.
echo 6. 🔑 Add environment variables in Site Settings:
echo    - GEMINI_API_KEY = [Your API Key]
echo    - Get API key from: https://aistudio.google.com/app/apikey
echo.
echo 7. 🚀 Deploy and test with multiple users!
echo.

echo [Performance Expectations]
echo ⚡ Load time: Under 3 seconds
echo 👥 Concurrent users: Up to 30
echo 📱 Mobile support: Full responsive design
echo 🔄 Auto-updates: Push to GitHub = Auto deploy
echo 🏆 Features: Real-time leaderboard, timer, scoring
echo.

echo [Testing Checklist]
echo □ Single user test (complete game flow)
echo □ Multiple browser test (same time)
echo □ Mobile device test
echo □ Leaderboard functionality
echo □ Admin panel access
echo □ Score submission
echo.

set /p PROCEED="Press Enter to open Netlify website for deployment..."
start https://netlify.com

echo.
echo 🎯 Deployment guide available in: netlify-deployment-guide.md
echo 💡 Need help? Check the deployment guide for detailed steps
echo.
pause