import React, { useState, useEffect } from 'react';
import { resetLeaderboard, getLeaderboard } from '../services/firebaseService';
import { LeaderboardEntry } from '../types';

interface AdminProps {
  onExit: () => void;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Admin: React.FC<AdminProps> = ({ onExit }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [allScores, setAllScores] = useState<LeaderboardEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'scores' | 'participants'>('scores');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: In a real application, use a secure authentication method.
    if (password === 'admin1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('잘못된 비밀번호입니다.');
    }
  };

  const handleReset = async () => {
    if (window.confirm('정말로 모든 순위표 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setMessage('');
      setError('');
      try {
        await resetLeaderboard();
        setMessage('순위표가 성공적으로 초기화되었습니다.');
        setAllScores(null); // Clear the view
      } catch (err) {
        console.error('Failed to reset leaderboard', err);
        setError('초기화에 실패했습니다. 콘솔을 확인해주세요.');
      }
    }
  };

  const handleFetchAllScores = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');
    setAllScores(null);
    try {
      // Fetch a large number to get all entries.
      const scores = await getLeaderboard(100); 
      setAllScores(scores);
      if (scores.length === 0) {
        setMessage("현재 순위표에 기록이 없습니다.");
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard', err);
      setError('전체 순위표를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchAllParticipants = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');
    setAllScores(null);
    try {
      // Fetch all entries from Firebase
      const leaderboardRef = ref(db, 'leaderboard');
      const snapshot = await get(leaderboardRef);
      
      if (snapshot.exists()) {
        const data: LeaderboardEntry[] = [];
        snapshot.forEach((childSnapshot) => {
          const entry = childSnapshot.val();
          data.push(entry);
        });
        
        // Sort by timestamp to show all participants in chronological order
        data.sort((a, b) => b.timestamp - a.timestamp);
        
        setAllScores(data);
        if (data.length === 0) {
          setMessage("현재 참가자 기록이 없습니다.");
        }
      } else {
        setAllScores([]);
        setMessage("현재 참가자 기록이 없습니다.");
      }
    } catch (err) {
      console.error('Failed to fetch all participants', err);
      setError('참가자 목록을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="text-center bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in">
      <h1 className="text-4xl font-bold text-cyan-300 mb-6 font-serif">관리자 패널</h1>
      
      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
              required
            />
          </div>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            로그인
          </button>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-300">관리자 기능</h2>
            <button
              onClick={onExit}
              className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-1 px-3 rounded-md transition-colors"
            >
              나가기
            </button>
          </div>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleFetchAllScores}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'scores' ? 'bg-cyan-600' : 'bg-slate-600 hover:bg-slate-500'}`}
            >
              순위표 보기
            </button>
            <button
              onClick={handleFetchAllParticipants}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'participants' ? 'bg-cyan-600' : 'bg-slate-600 hover:bg-slate-500'}`}
            >
              참가자 목록 보기
            </button>
          </div>
          
          {isLoading ? (
            <p className="text-center text-gray-300">로딩 중...</p>
          ) : (
            <>
              {message && <p className="text-center text-gray-300 mb-4">{message}</p>}
              
              {allScores && (
                <div className="mt-8 text-left">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4">
                    {activeTab === 'scores' ? '전체 순위표' : '참가자 목록'} ({allScores.length}명)
                  </h3>
                  <div className="overflow-auto max-h-96 bg-slate-900/50 rounded-lg">
                    <table className="w-full min-w-full">
                      <thead>
                        <tr className="border-b border-slate-600 bg-slate-800 sticky top-0">
                          <th className="p-3 text-lg text-gray-300">순위</th>
                          <th className="p-3 text-lg text-gray-300">이름</th>
                          {activeTab === 'scores' && (
                            <th className="p-3 text-lg text-gray-300 text-right">기록</th>
                          )}
                          <th className="p-3 text-lg text-gray-300">제출 시간</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allScores.map((score, index) => (
                          <tr key={index} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                            <td className="p-3 text-xl font-bold text-white">{index + 1}</td>
                            <td className="p-3 text-lg text-white">{score.playerName}</td>
                            {activeTab === 'scores' && (
                              <td className="p-3 text-lg font-mono text-cyan-300 text-right">{formatTime(score.escapeTime)}</td>
                            )}
                            <td className="p-3 text-sm text-gray-400">{formatTimestamp(score.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          
          <button
            onClick={handleReset}
            className="w-full max-w-sm mx-auto mt-8 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            순위표 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;