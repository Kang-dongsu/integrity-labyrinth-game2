import React, { useState, useEffect, useCallback } from 'react';
import { GameState, LeaderboardEntry } from '../types';
import { submitScore, getFirebaseStatus } from '../services/firebaseService';
import Leaderboard from './Leaderboard';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}분 ${seconds}초`;
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  useEffect(() => {
    const { isConnected } = getFirebaseStatus();
    setFirebaseConnected(isConnected);
  }, []);

  const finalTimeMs = (gameState.endTime ?? Date.now()) - gameState.startTime + gameState.timePenalty;
  const finalTimeSeconds = Math.floor(finalTimeMs / 1000);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    if (!firebaseConnected) {
      setError("온라인 순위표에 연결할 수 없습니다. 기록이 임시 저장됩니다.");
    }

    try {
      await submitScore(gameState.playerName, finalTimeSeconds);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit score:", err);
      setError("점수 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <Leaderboard onRestart={onRestart} />;
  }

  return (
    <div className="text-center bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in">
      <h1 className="text-4xl font-bold text-cyan-300 mb-4 font-serif">탈출 성공!</h1>
      <p className="text-xl text-gray-300 mb-6">
        {gameState.playerName}님, 당신은 청렴의 미궁을 통과하여 안전보건공단 직원으로서의 자격을 증명했습니다.
      </p>
      <div className="bg-slate-900/50 p-6 rounded-lg mb-8 inline-block">
        <p className="text-gray-400 text-lg">최종 기록</p>
        <p className="text-4xl font-bold text-white tracking-wider">{formatTime(finalTimeMs)}</p>
        <p className="text-sm text-gray-500 mt-2">(시간 페널티 포함)</p>
      </div>
      
      {error && <p className="text-yellow-400 mb-4">{error}</p>}
      {!firebaseConnected && !error && (
        <p className="text-yellow-400 mb-4">
          경고: 온라인 순위표에 연결되지 않았습니다. 기록은 임시로만 저장됩니다.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full max-w-sm bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
        >
          {isSubmitting ? '제출 중...' : '순위표에 기록 남기기'}
        </button>
        <button
          onClick={onRestart}
          className="w-full max-w-sm bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
        >
          다시하기
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;