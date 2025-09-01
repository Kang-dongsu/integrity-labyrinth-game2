import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, query, orderByChild, limitToFirst, push, remove } from "firebase/database";
import { LeaderboardEntry } from '../types';

// 환경 변수에서 Firebase 설정 값 가져오기 (VITE_ 접두사 필요)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
export let db;

// VITE_FIREBASE_API_KEY가 설정되었는지 확인하여 Firebase 초기화 여부 결정
const isFirebaseConfigured = firebaseConfig.apiKey && 
                           firebaseConfig.apiKey !== "YOUR_API_KEY" && 
                           firebaseConfig.apiKey !== undefined;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    console.log("✅ Firebase 초기화 성공!");
  } catch (error) {
    console.error("❌ Firebase 초기화 실패:", error);
    db = null;
  }
} else {
  console.warn("⚠️ Firebase 환경 변수가 설정되지 않았습니다. Mock 데이터를 사용합니다.");
}

// Mock 데이터 (Firebase가 구성되지 않았을 때 사용)
let mockDatabase: LeaderboardEntry[] = [
    { playerName: '청렴한 선구자', escapeTime: 320 },
    { playerName: '윤리적인 항해사', escapeTime: 450 },
    { playerName: '결백한 등대지기', escapeTime: 512 },
    { playerName: '원칙의 수호자', escapeTime: 550 },
    { playerName: '공정한 심판자', escapeTime: 600 },
];

export const submitScore = async (playerName: string, escapeTime: number): Promise<void> => {
  console.log("📊 점수 제출:", { playerName, escapeTime });

  if (!db) {
    console.warn("🔄 Firebase 미설정 - Mock 데이터베이스 사용");
    // Mock 데이터베이스에 동시 접속 지원을 위한 랜덤 ID 추가
    const newEntry = { 
      playerName: playerName + '_' + Math.random().toString(36).substr(2, 6), 
      escapeTime,
      timestamp: Date.now()
    };
    mockDatabase.push(newEntry);
    mockDatabase.sort((a, b) => a.escapeTime - b.escapeTime);
    // 리더보드를 30명으로 제한하여 성능 최적화
    if (mockDatabase.length > 30) {
      mockDatabase = mockDatabase.slice(0, 30);
    }
    return Promise.resolve();
  }

  try {
    // Firebase Realtime Database에 실시간 점수 저장
    const leaderboardRef = ref(db, 'leaderboard');
    const newScoreRef = push(leaderboardRef);
    await set(newScoreRef, { 
      playerName, 
      escapeTime,
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substr(2, 9) // 동시 접속 구분용
    });
    console.log("✅ Firebase에 점수 저장 완료");
  } catch (error) {
    console.error('❌ Firebase 점수 저장 실패:', error);
    // Firebase 오류 시 Mock 데이터베이스로 폴백
    mockDatabase.push({ playerName, escapeTime });
    mockDatabase.sort((a, b) => a.escapeTime - b.escapeTime);
  }
};

export const getLeaderboard = async (limit: number = 15): Promise<LeaderboardEntry[]> => {
  console.log("📋 리더보드 조회 중...");

  if (!db) {
    console.warn("🔄 Firebase 미설정 - Mock 데이터 반환");
    return Promise.resolve(mockDatabase.slice(0, limit));
  }

  try {
    // Firebase에서 실시간 리더보드 조회
    const leaderboardRef = ref(db, 'leaderboard');
    const topScoresQuery = query(leaderboardRef, orderByChild('escapeTime'), limitToFirst(limit));
    const snapshot = await get(topScoresQuery);
    
    if (snapshot.exists()) {
      const data: LeaderboardEntry[] = [];
      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });
      console.log(`✅ Firebase에서 ${data.length}개 점수 조회 완료`);
      return data;
    }
    return [];
  } catch (error) {
    console.error('❌ Firebase 리더보드 조회 실패:', error);
    // Firebase 오류 시 Mock 데이터 반환
    return mockDatabase.slice(0, limit);
  }
};

export const resetLeaderboard = async (): Promise<void> => {
    console.log("🗑️ 리더보드 초기화 중...");
    
    if (!db) {
        console.warn("🔄 Firebase 미설정 - Mock 데이터 초기화");
        mockDatabase = [
          { playerName: '청렴한 선구자', escapeTime: 320 },
          { playerName: '윤리적인 항해사', escapeTime: 450 },
          { playerName: '결백한 등대지기', escapeTime: 512 }
        ];
        return Promise.resolve();
    }

    try {
        // Firebase 리더보드 완전 초기화
        const leaderboardRef = ref(db, 'leaderboard');
        await remove(leaderboardRef);
        console.log("✅ Firebase 리더보드 초기화 완료");
    } catch (error) {
        console.error('❌ Firebase 리더보드 초기화 실패:', error);
        throw error;
    }
};

// Firebase 연결 상태 확인 함수
export const getFirebaseStatus = (): { isConnected: boolean; usingMock: boolean } => {
  return {
    isConnected: !!db,
    usingMock: !db
  };
};