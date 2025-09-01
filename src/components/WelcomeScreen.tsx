import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (playerName: string) => void;
  onEnterAdminMode: () => void;
}

// 아이콘 SVG 자체는 부모 컨테이너를 채우도록 하고, 색상만 지정합니다.
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-cyan-400">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5ZM8.25 9.75V6.75a3.75 3.75 0 1 1 7.5 0v3H8.25Z" clipRule="evenodd" />
    </svg>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onEnterAdminMode }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStart(playerName.trim());
    }
  };

  return (
    <div className="relative text-center bg-slate-900/60 border border-slate-700 p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in max-w-2xl mx-auto">
      {/* 아이콘의 크기와 레이아웃을 제어하는 컨테이너 DIV */}
      <div className="w-16 h-16 mx-auto mb-8">
        <LockIcon />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 font-serif">청렴의 미궁</h1>
      <h2 className="text-lg md:text-xl text-gray-400 mb-10 tracking-wider">The Labyrinth of Integrity</h2>
      
      <div className="text-gray-300 max-w-xl mx-auto mb-12 space-y-4 text-base leading-relaxed">
         <p>
          늦은 밤, 당신은 낯선 정적에 잠에서 깹니다.
        </p>
        <p>
          평소와 다름없는 안전보건공단 사무실... 하지만 무언가 다릅니다. 복도 끝 비상등만 깜빡일 뿐, 모든 문은 굳게 잠겨있습니다.
        </p>
        <p>
          이곳은 당신의 '청렴성'을 시험하는 미궁. 잠긴 문들은 복잡한 윤리적 딜레마를 상징합니다.
          법과 원칙에 따라 올바른 답을 선택하여 당신의 자격을 증명하고, 이 미궁을 탈출하십시오.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          id="playerName" // Add id for accessibility and autofill
          name="playerName" // Add name for autofill
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="당신의 이름을 입력하세요"
          className="w-full max-w-md bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg p-3 mb-6 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-colors duration-200"
          aria-label="Player Name"
        />
        <button
          type="submit"
          disabled={!playerName.trim()}
          className="w-full max-w-md bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          미궁 입장 →
        </button>
      </form>
      
      <div className="absolute bottom-4 right-4">
        <button onClick={onEnterAdminMode} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
          관리자 모드
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
