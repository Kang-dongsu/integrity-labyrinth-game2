
import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTime: number;
  timePenalty: number;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Timer: React.FC<TimerProps> = ({ startTime, timePenalty }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime + timePenalty;
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, timePenalty]);

  return (
    <div className="text-right">
      <div className="text-sm text-gray-400">경과 시간</div>
      <div className="text-2xl font-bold text-cyan-300 tracking-wider">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default Timer;
