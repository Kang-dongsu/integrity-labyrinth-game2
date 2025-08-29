@echo off
title GitHub Repository Setup - 청렴의 미궁
color 0B
echo.
echo ========================================
echo    GitHub Repository Setup Assistant
echo    청렴의 미궁 (The Labyrinth of Integrity)
echo ========================================
echo.

echo [Step 1] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git is installed

echo.
echo [Step 2] Checking if this is a Git repository...
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo [Step 3] Adding all files to Git...
git add .
if %errorlevel% neq 0 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)
echo ✅ Files added to Git

echo.
echo [Step 4] Creating commit...
git commit -m "청렴의 미궁 - 30명 동시 접속 지원 웹앱 배포 준비"
echo ✅ Commit created

echo.
echo [Step 5] Repository URL Setup
echo.
echo 🔗 IMPORTANT: You need to create a GitHub repository first!
echo.
echo 1. Go to https://github.com
echo 2. Click "New repository"
echo 3. Repository name: labyrinth-of-integrity-game
echo 4. Set to PUBLIC (required for free Netlify)
echo 5. DO NOT initialize with README
echo 6. Copy the repository URL
echo.

set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo ❌ No URL provided
    echo.
    echo Please create GitHub repository first and run this script again
    pause
    exit /b 1
)

echo.
echo [Step 6] Adding remote repository...
git remote add origin %REPO_URL% 2>nul
if %errorlevel% neq 0 (
    echo Repository already has origin. Updating...
    git remote set-url origin %REPO_URL%
)
echo ✅ Remote repository set

echo.
echo [Step 7] Pushing to GitHub...
echo This may take a few moments...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo ❌ Push failed. Please check:
    echo - Repository URL is correct
    echo - You have permission to push
    echo - Internet connection is stable
    pause
    exit /b 1
)

echo.
echo ✅ SUCCESS! Code pushed to GitHub
echo.
echo 📋 Next Steps:
echo 1. ✅ GitHub repository created and code uploaded
echo 2. ➡️  Deploy to Netlify (run netlify-deploy.bat)
echo 3. ➡️  Set up environment variables
echo 4. ➡️  Test with multiple users
echo.
echo 🔗 Your repository: %REPO_URL%
echo.
pause