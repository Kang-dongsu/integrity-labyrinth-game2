import React from 'react';
import { IllustrationComponent } from '../types';

interface TransitionScreenProps {
  narrative: string;
  illustration: IllustrationComponent;
  onNext: () => void;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ narrative, illustration: Illustration, onNext }) => {
  return (
    <div className="text-center bg-slate-800/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm animate-fade-in w-full max-w-3xl mx-auto">
      <div className="mb-6 flex justify-center items-center h-64">
        <Illustration className="w-auto h-full text-cyan-400/80" />
      </div>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 italic">
        {narrative}
      </p>
      <button
        onClick={onNext}
        className="w-full max-w-sm bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        계속 진행하기
      </button>
    </div>
  );
};

export default TransitionScreen;