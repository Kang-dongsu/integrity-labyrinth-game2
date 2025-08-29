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

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-cyan-300 mb-6 font-serif">관리자 로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg p-3 mb-4 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            aria-label="Admin Password"
          />
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <div className="flex gap-4">
             <button type="button" onClick={onExit} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
              뒤로가기
            </button>
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
              로그인
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in text-center">
      <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-serif">관리자 페이지</h2>
      
      {message && <p className="text-green-400 text-center mb-4">{message}</p>}
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button onClick={handleFetchAllScores} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:bg-slate-600">
          {isLoading ? '로딩 중...' : '전체 순위표 보기'}
        </button>
        <button onClick={handleReset} className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition-colors">
          순위표 초기화
        </button>
      </div>

      {allScores && (
        <div className="mt-8 text-left">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">전체 순위표 ({allScores.length}명)</h3>
          <div className="overflow-auto max-h-96 bg-slate-900/50 rounded-lg">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-slate-600 bg-slate-800 sticky top-0">
                  <th className="p-3 text-lg text-gray-300">순위</th>
                  <th className="p-3 text-lg text-gray-300">이름</th>
                  <th className="p-3 text-lg text-gray-300 text-right">기록</th>
                </tr>
              </thead>
              <tbody>
                {allScores.map((score, index) => (
                  <tr key={index} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                    <td className="p-3 text-xl font-bold text-white">{index + 1}</td>
                    <td className="p-3 text-lg text-white">{score.playerName}</td>
                    <td className="p-3 text-lg font-mono text-cyan-300 text-right">{formatTime(score.escapeTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button onClick={onExit} className="w-full max-w-sm mx-auto mt-8 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
        나가기
      </button>
    </div>
  );
};

export default Admin;