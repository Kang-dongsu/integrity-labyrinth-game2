@echo off
echo 청렴의 미궁 프로덕션 빌드 테스트...
echo.

echo 프로덕션 빌드 시작...
npm run build

echo.
if exist dist (
    echo 빌드 성공! dist 폴더가 생성되었습니다.
    echo 빌드된 파일들:
    dir dist /b
    echo.
    echo 이제 Netlify에 배포할 준비가 되었습니다!
) else (
    echo 빌드 실패! dist 폴더가 생성되지 않았습니다.
)

echo.
pause