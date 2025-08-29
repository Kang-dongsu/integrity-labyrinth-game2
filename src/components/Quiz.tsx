import React, { useState } from 'react';
import { Quiz as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
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

  const handleOptionClick = (index: number) => {
    if (disabled) return;
    setSelectedAnswer(index);
    const isCorrect = index === quiz.correctAnswerIndex;
    onAnswer(isCorrect);
  };

  const getButtonState = (index: number) => {
    if (!disabled) {
      return { classes: "bg-slate-700 hover:bg-cyan-800", icon: null };
    }

    const isCorrect = index === quiz.correctAnswerIndex;
    const isSelected = index === selectedAnswer;

    if (isSelected) {
      if (isCorrect) {
        // The user selected the correct answer.
        return { classes: "bg-green-700 transform scale-105 ring-2 ring-green-400", icon: <CorrectIcon /> };
      } else {
        // The user selected an incorrect answer.
        return { classes: "bg-red-700 transform scale-105 ring-2 ring-red-400", icon: <IncorrectIcon /> };
      }
    }
    
    // For non-selected options: still highlight the correct one, but without an icon.
    if (isCorrect) {
      return { classes: "bg-green-700", icon: null };
    }
    
    // Other incorrect options are greyed out.
    return { classes: "bg-slate-800 opacity-60", icon: null };
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-gray-100">{quiz.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quiz.options.map((option, index) => {
          const { classes, icon } = getButtonState(index);
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={disabled}
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