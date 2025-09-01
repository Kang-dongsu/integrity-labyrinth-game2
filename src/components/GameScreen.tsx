import React, { useState } from 'react';
import { GameState, Quiz as QuizType } from '../types';
import { WINGS } from '../constants/gameData';
import Quiz from './Quiz';
import Timer from './Timer';

interface GameScreenProps {
  gameState: GameState;
  onNextRoom: () => void;
  onIncorrectAnswer: () => void;
  onRestart: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onNextRoom, onIncorrectAnswer, onRestart }) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const wing = WINGS[gameState.currentWing];
  const room = wing.rooms[gameState.currentRoom];
  const isLastRoom = gameState.currentWing === WINGS.length - 1 && gameState.currentRoom === wing.rooms.length - 1;

  const handleAnswerSubmit = (isCorrectAnswer: boolean) => {
    if (isCorrectAnswer) {
      setIsAnswered(true);
      setIsCorrect(true);
      setFeedback(room.quiz.explanation);
    } else {
      onIncorrectAnswer();
      // 오답 시에는 퀴즈를 비활성화하지 않고 페널티만 부과합니다.
    }
  };

  const handleNext = () => {
    if (isCorrect) {
      setIsAnswered(false);
      setFeedback(null);
      setHint(null);
      setIsCorrect(false);
      onNextRoom();
    } else {
      // Allow retry
      setIsAnswered(false);
      setFeedback(null);
      setHint(null);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 md:p-10 rounded-lg shadow-2xl backdrop-blur-sm w-full animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-600 pb-4 mb-4 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-cyan-300 font-serif">{wing.title}</h2>
          <h3 className="text-lg text-gray-400">{room.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <Timer startTime={gameState.startTime} timePenalty={gameState.timePenalty} />
            {gameState.timePenalty > 0 && (
              <div className="text-xs text-red-400 mt-1 animate-pulse">
                시간 페널티: +{gameState.timePenalty / 1000}초
              </div>
            )}
          </div>
           <button 
            onClick={onRestart}
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
          >
            처음으로
          </button>
        </div>
      </header>
      
      <div id="narrative-output" className="mb-6 prose prose-invert prose-p:text-gray-300 max-w-none">
        <p>{room.description}</p>
        <p className="mt-4 p-4 bg-slate-900/50 border-l-4 border-cyan-500 rounded-r-md">{room.quiz.scenario}</p>
      </div>

      <div id="player-input">
        <Quiz quiz={room.quiz} onAnswer={handleAnswerSubmit} disabled={isAnswered} />
      </div>

      {isAnswered && (
        <div id="feedback-display" className="mt-6 p-4 rounded-md animate-fade-in bg-slate-900/70">
          <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? '정답입니다' : '오답입니다'}
          </h4>
          <p className="text-gray-300 mb-4">{feedback}</p>
          {!isCorrect && hint && <p className="text-yellow-400 border-t border-slate-700 pt-3 mt-3"><strong>힌트:</strong> {hint}</p>}
          
          {isCorrect ? (
             <button 
                onClick={handleNext} 
                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
              >
                {isLastRoom ? '최종 결과 보기' : '다음 방으로'}
              </button>
          ) : (
             <button 
                onClick={handleNext} 
                className="mt-4 w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
              >
                다시 시도
              </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;