@echo off
echo 청렴의 미궁 Git 저장소 설정 중...
echo.

echo 1. Git 저장소 초기화...
git init

echo 2. 모든 파일 추가...
git add .

echo 3. 첫 번째 커밋 생성...
git commit -m "Initial commit: 청렴의 미궁 방탈출 게임 - Netlify 배포 준비 완료"

echo.
echo Git 설정이 완료되었습니다!
echo 다음으로 GitHub에 저장소를 생성하고 다음 명령어를 실행하세요:
echo git remote add origin [GitHub 저장소 URL]
echo git push -u origin main
echo.
pause