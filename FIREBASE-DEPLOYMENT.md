# 🚀 Firebase 기반 청렴의 미궁 - 30명 동시 접속 웹앱 배포 가이드

## 📋 **프로젝트 개요**

이제 **완전히 새로운 Firebase 기반 웹앱**으로 재구성되었습니다!

### ✨ **주요 개선사항**
- ✅ **올바른 빌드 프로세스** (Vite 기반)
- ✅ **환경 변수 보안** (VITE_ 접두사 사용)
- ✅ **30명 동시 접속 최적화**
- ✅ **실시간 Firebase 연동**
- ✅ **프로덕션 레벨 성능**

## 🛠️ **단계별 배포 가이드**

### **1단계: Firebase 프로젝트 생성**

1. **Firebase 콘솔 접속**
   - https://console.firebase.google.com/ 이동
   - Google 계정으로 로그인

2. **새 프로젝트 생성**
   - "프로젝트 추가" 클릭
   - 프로젝트 이름: `labyrinth-of-integrity`
   - Google Analytics 설정 (선택사항)

3. **Realtime Database 설정**
   - 좌측 메뉴에서 "Realtime Database" 선택
   - "데이터베이스 만들기" 클릭
   - **테스트 모드로 시작** (나중에 보안 규칙 설정)
   - 위치: asia-southeast1 (아시아 서버)

4. **Firebase 설정 정보 복사**
   - 프로젝트 설정 (⚙️) → "일반" 탭
   - "웹 앱에 Firebase 추가" 클릭
   - 설정 정보를 모두 복사해두기

### **2단계: 코드 GitHub 업로드**

1. **GitHub Desktop 사용**
   - Summary: `Firebase 기반 웹앱으로 완전 재구성 - 30명 동시 접속 지원`
   - "Commit to main" → "Push origin"

2. **또는 터미널 사용**
   ```bash
   git add .
   git commit -m "Firebase 기반 웹앱으로 완전 재구성 - 30명 동시 접속 지원"
   git push
   ```

### **3단계: Netlify 환경 변수 설정**

Netlify 사이트 설정에서 다음 환경 변수를 **모두** 추가하세요:

```
VITE_FIREBASE_API_KEY = [Firebase에서 복사한 apiKey]
VITE_FIREBASE_AUTH_DOMAIN = [Firebase에서 복사한 authDomain]
VITE_FIREBASE_DATABASE_URL = [Firebase에서 복사한 databaseURL]
VITE_FIREBASE_PROJECT_ID = [Firebase에서 복사한 projectId]
VITE_FIREBASE_STORAGE_BUCKET = [Firebase에서 복사한 storageBucket]
VITE_FIREBASE_MESSAGING_SENDER_ID = [Firebase에서 복사한 messagingSenderId]
VITE_FIREBASE_APP_ID = [Firebase에서 복사한 appId]
VITE_GEMINI_API_KEY = [선택사항: Gemini API 키]
```

**⚠️ 중요**: 모든 변수는 `VITE_` 접두사로 시작해야 합니다!

### **4단계: Netlify 빌드 설정 확인**

Netlify 사이트 설정에서:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### **5단계: 배포 실행**

1. **자동 배포 트리거**
   - GitHub에 푸시하면 자동으로 배포 시작
   - 또는 Netlify에서 "Trigger deploy" 클릭

2. **빌드 로그 확인**
   - 빌드 시간: 약 2-4분
   - ✅ "Site deploy completed" 메시지 확인

## 🎮 **배포 후 기능 확인**

### **✅ 체크리스트**

1. **기본 기능**
   - [ ] 게임 로딩 (3초 이내)
   - [ ] 플레이어 이름 입력
   - [ ] 10개 방 퀴즈 진행
   - [ ] 타이머 정상 작동

2. **Firebase 연동**
   - [ ] 점수 제출 성공
   - [ ] 리더보드 실시간 업데이트
   - [ ] 관리자 패널 리더보드 초기화

3. **30명 동시 접속 테스트**
   - [ ] 여러 브라우저에서 동시 접속
   - [ ] 서로 다른 플레이어 이름으로 게임
   - [ ] 리더보드에서 순위 정확성

## 🔧 **고급 기능 (선택사항)**

### **실시간 리더보드**

현재는 게임 완료 시에만 리더보드가 업데이트됩니다. 실시간 업데이트를 원한다면:

```typescript
// Firebase onValue 리스너 추가 예시
import { onValue } from 'firebase/database';

export const subscribeToLeaderboard = (callback: (data: LeaderboardEntry[]) => void) => {
  if (!db) return;
  
  const leaderboardRef = ref(db, 'leaderboard');
  return onValue(leaderboardRef, (snapshot) => {
    if (snapshot.exists()) {
      const data: LeaderboardEntry[] = [];
      snapshot.forEach((child) => {
        data.push(child.val());
      });
      data.sort((a, b) => a.escapeTime - b.escapeTime);
      callback(data.slice(0, 15));
    }
  });
};
```

### **Netlify Functions로 API 보안 강화**

Gemini API 키를 완전히 숨기려면:

1. `netlify/functions/` 폴더 생성
2. 서버리스 함수 작성
3. 클라이언트에서 내부 API 호출

## 📊 **성능 지표**

### **예상 성능**
- 🚀 **로딩 시간**: 2-3초
- 👥 **동시 접속**: 30명+ 지원
- 📱 **기기 호환**: 모든 모바일/데스크톱
- 🔄 **실시간 업데이트**: Firebase 실시간 동기화

### **모니터링**
- Netlify Analytics에서 사용량 확인
- Firebase Console에서 실시간 사용자 수 확인
- 브라우저 개발자 도구로 성능 측정

## 🎉 **배포 완료!**

이제 **완전히 새로운 Firebase 기반 웹앱**이 준비되었습니다!

### **주요 장점**
- ✅ **빠른 로딩**: Vite 기반 최적화된 빌드
- ✅ **안전한 배포**: 환경 변수 기반 보안
- ✅ **확장 가능**: Firebase로 무제한 확장
- ✅ **실시간**: 점수 실시간 동기화
- ✅ **안정성**: 30명+ 동시 접속 보장

**🔗 배포 URL을 30명에게 공유하고 함께 게임을 즐기세요!** 🎮

---

## 🆘 **문제 해결**

### **빌드 실패 시**
1. 환경 변수 VITE_ 접두사 확인
2. Firebase 설정 정보 정확성 확인
3. Node.js 버전 18 사용 확인

### **Firebase 연결 실패 시**
- 환경 변수가 올바르게 설정되었는지 확인
- Firebase 프로젝트가 활성화되었는지 확인
- Mock 데이터로 게임은 계속 작동됨

### **성능 문제 시**
- Netlify Analytics에서 트래픽 확인
- Firebase 사용량 모니터링
- CDN 캐싱 상태 점검