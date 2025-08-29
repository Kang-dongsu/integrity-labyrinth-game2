import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../services/firebaseService';

interface LeaderboardProps {
  onRestart: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onRestart }) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const topScores = await getLeaderboard(5); // Fetch top 5 scores
        setScores(topScores);
      } catch (err) {
        setError('순위표를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6 font-serif">명예의 전당</h2>
      {isLoading && <p className="text-center text-gray-300">순위표를 불러오는 중...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {!isLoading && !error && scores.length === 0 && (
        <p className="text-center text-gray-400">아직 등록된 기록이 없습니다.</p>
      )}
      {!isLoading && !error && scores.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="p-3 text-lg text-gray-300">순위</th>
                <th className="p-3 text-lg text-gray-300">이름</th>
                <th className="p-3 text-lg text-gray-300 text-right">기록</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                  <td className="p-3 text-xl font-bold text-white">{index + 1}</td>
                  <td className="p-3 text-lg text-white">{score.playerName}</td>
                  <td className="p-3 text-lg font-mono text-cyan-300 text-right">{formatTime(score.escapeTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 text-center">
         <button
          onClick={onRestart}
          className="w-full max-w-sm bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
        >
          다시하기
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;