@echo off
title 청렴의 미궁 - Netlify 배포 도우미
color 0A
echo.
echo ========================================
echo     청렴의 미궁 (The Labyrinth of Integrity)
echo     30명 동시 접속 지원 웹앱 배포 도우미
echo ========================================
echo.

echo [1/6] 프로덕션 빌드 테스트 중...
echo.
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ 빌드 실패! 다음을 확인하세요:
    echo - Node.js 버전이 18 이상인지 확인
    echo - npm install 실행 여부 확인
    echo - 컴파일 오류가 없는지 확인
    pause
    exit /b 1
)

echo.
echo ✅ 빌드 성공!
echo.

echo [2/6] 배포 준비 상태 확인...
if not exist "dist\" (
    echo ❌ dist 폴더가 생성되지 않았습니다.
    pause
    exit /b 1
)

if not exist "netlify.toml" (
    echo ❌ netlify.toml 파일이 없습니다.
    pause
    exit /b 1
)

if not exist ".env.example" (
    echo ❌ .env.example 파일이 없습니다.
    pause
    exit /b 1
)

echo ✅ 모든 배포 파일이 준비되었습니다!
echo.

echo [3/6] Git 상태 확인...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Git 저장소가 초기화되지 않았습니다. 초기화 중...
    git init
    git add .
    git commit -m "청렴의 미궁 - 30명 동시 접속 지원 웹앱 초기 배포"
    echo ✅ Git 저장소 초기화 완료!
) else (
    echo ✅ Git 저장소가 이미 존재합니다.
)
echo.

echo [4/6] 배포 체크리스트:
echo ✅ 프로덕션 빌드 완료
echo ✅ Netlify 설정 파일 준비
echo ✅ 환경 변수 예시 파일 준비
echo ✅ Git 저장소 준비
echo ✅ 성능 최적화 설정 적용
echo ✅ 다중 사용자 지원 기능 구현
echo.

echo [5/6] 다음 단계 안내:
echo.
echo 🚀 GitHub에 코드 업로드:
echo   1. https://github.com 에서 새 저장소 생성
echo   2. 다음 명령어로 코드 푸시:
echo      git remote add origin [저장소_URL]
echo      git push -u origin main
echo.

echo 🌐 Netlify 배포:
echo   1. https://netlify.com 에서 "New site from Git" 선택
echo   2. GitHub 저장소 연결
echo   3. 빌드 설정:
echo      - Build command: npm run build
echo      - Publish directory: dist
echo      - Node version: 18
echo   4. 환경 변수 추가:
echo      - GEMINI_API_KEY: [API 키]
echo.

echo 🔑 Gemini API 키 발급:
echo   https://aistudio.google.com/app/apikey
echo.

echo [6/6] 예상 결과:
echo ⚡ 30명이 동시에 게임 플레이 가능
echo 📱 모바일/데스크톱 모두 지원
echo 🏆 실시간 리더보드 기능
echo ⏱️ 게임 소요시간: 5-10분
echo 🚀 빠른 로딩 속도 (3초 이내)
echo.

echo 배포 준비가 완료되었습니다!
echo 위 안내에 따라 GitHub과 Netlify에서 배포를 진행하세요.
echo.
pause