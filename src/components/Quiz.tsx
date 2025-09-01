import React, { useState } from 'react';
import { Quiz as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean; // This will now only be true when the answer is correct
}

const CorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block ml-2 flex-shrink-0">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

const IncorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block ml-2 flex-shrink-0">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
);

const Quiz: React.FC<QuizProps> = ({ quiz, onAnswer, disabled }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (disabled || incorrectGuesses.includes(index)) {
      return; // Do nothing if quiz is finished or this incorrect option was already clicked
    }

    const isCorrect = index === quiz.correctAnswerIndex;

    if (isCorrect) {
      setSelectedAnswer(index);
      onAnswer(true);
    } else {
      onAnswer(false); // Trigger penalty
      setIncorrectGuesses(prev => [...prev, index]);
      alert('오답입니다. 문제를 다시 풀어주세요. +30초');
    }
  };

  const getButtonState = (index: number) => {
    // If the quiz is disabled, it means the correct answer was selected.
    if (disabled && index === selectedAnswer) {
      return { classes: "bg-green-700 transform scale-105 ring-2 ring-green-400", icon: <CorrectIcon /> };
    }

    // If this option was an incorrect guess, mark it as red.
    if (incorrectGuesses.includes(index)) {
      return { classes: "bg-red-700 opacity-70", icon: <IncorrectIcon /> };
    }

    // Default state for options that haven't been tried yet.
    return { classes: "bg-slate-700 hover:bg-cyan-800", icon: null };
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-gray-100">{quiz.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quiz.options.map((option, index) => {
          const { classes, icon } = getButtonState(index);
          const isButtonDisabled = disabled || incorrectGuesses.includes(index);

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={isButtonDisabled}
              className={`w-full p-4 rounded-md text-left transition-all duration-300 ease-in-out text-gray-200 disabled:cursor-not-allowed flex items-center justify-between ${classes}`}
              aria-pressed={selectedAnswer === index}
            >
              <span className="flex-grow">
                <span className="font-semibold mr-2">{index + 1}.</span>{option}
              </span>
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
