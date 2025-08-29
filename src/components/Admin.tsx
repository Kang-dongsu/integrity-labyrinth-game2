import React, { useState } from 'react';
import { resetLeaderboard } from '../services/firebaseService';

interface AdminProps {
  onExit: () => void;
}

const Admin: React.FC<AdminProps> = ({ onExit }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('잘못된 비밀번호입니다.');
    }
  };

  const handleReset = async () => {
    if (window.confirm('정말로 모든 순위표 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await resetLeaderboard();
        setMessage('순위표가 성공적으로 초기화되었습니다.');
      } catch (err) {
        console.error('Failed to reset leaderboard', err);
        setError('초기화에 실패했습니다. 콘솔을 확인해주세요.');
      }
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
             <button
              type="button"
              onClick={onExit}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              뒤로가기
            </button>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in text-center">
      <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-serif">관리자 페이지</h2>
      <p className="text-gray-300 mb-6">순위표 데이터를 관리할 수 있습니다.</p>
      
      {message && <p className="text-green-400 text-center mb-4">{message}</p>}
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      
      <button
        onClick={handleReset}
        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md mb-4 transition-colors"
      >
        순위표 초기화
      </button>
      <button
        onClick={onExit}
        className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
      >
        나가기
      </button>
    </div>
  );
};

export default Admin;
