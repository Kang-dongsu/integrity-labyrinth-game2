import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, query, orderByChild, limitToFirst, push, remove } from "firebase/database";
import { LeaderboardEntry } from '../types';

// IMPORTANT: Replace these with your actual Firebase project configuration.
// Firebase SDK 구성
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app;
let db;

// Firebase 앱 초기화 (설정이 유효한 경우에만)
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
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
  console.log("Submitting score:", { playerName, escapeTime });

  if (!db) {
    console.warn("Firebase is not configured. Using mock database.");
    // Mock 데이터베이스에 동시 접속 지원을 위한 랜덤 ID 추가
    const newEntry = { 
      playerName: playerName + '_' + Math.random().toString(36).substr(2, 9), 
      escapeTime,
      timestamp: Date.now()
    };
    mockDatabase.push(newEntry);
    mockDatabase.sort((a, b) => a.escapeTime - b.escapeTime);
    // 리더보드를 20명으로 제한하여 성능 최적화
    if (mockDatabase.length > 20) {
      mockDatabase = mockDatabase.slice(0, 20);
    }
    return Promise.resolve();
  }

  try {
    // Real implementation with error handling
    const leaderboardRef = ref(db, 'leaderboard');
    const newScoreRef = push(leaderboardRef);
    await set(newScoreRef, { 
      playerName, 
      escapeTime,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error submitting score to Firebase:', error);
    // Firebase 오류 시 Mock 데이터베이스로 폴백
    mockDatabase.push({ playerName, escapeTime });
    mockDatabase.sort((a, b) => a.escapeTime - b.escapeTime);
  }
};

export const getLeaderboard = async (limit: number = 10): Promise<LeaderboardEntry[]> => {
  console.log("Fetching leaderboard.");

  if (!db) {
    console.warn("Firebase is not configured. Returning mock data.");
    return Promise.resolve(mockDatabase.slice(0, limit));
  }

  try {
    // Real implementation with error handling
    const leaderboardRef = ref(db, 'leaderboard');
    const topScoresQuery = query(leaderboardRef, orderByChild('escapeTime'), limitToFirst(limit));
    const snapshot = await get(topScoresQuery);
    if (snapshot.exists()) {
      const data: LeaderboardEntry[] = [];
      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching leaderboard from Firebase:', error);
    // Firebase 오류 시 Mock 데이터 반환
    return mockDatabase.slice(0, limit);
  }
};

export const resetLeaderboard = async (): Promise<void> => {
    console.log("Resetting leaderboard.");
    if (!db) {
        console.warn("Firebase is not configured. Resetting mock database.");
        mockDatabase = [
          { playerName: '청렴한 선구자', escapeTime: 320 },
          { playerName: '윤리적인 항해사', escapeTime: 450 },
          { playerName: '결백한 등대지기', escapeTime: 512 }
        ];
        return Promise.resolve();
    }

    try {
        // Real implementation with error handling
        const leaderboardRef = ref(db, 'leaderboard');
        await remove(leaderboardRef);
    } catch (error) {
        console.error('Error resetting leaderboard:', error);
        throw error;
    }
};