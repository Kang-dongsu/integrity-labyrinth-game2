import * as React from 'react';
const { useState, useCallback } = React;
import { GameState, GameStage } from './types';
import { WINGS } from './constants/gameData';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import TransitionScreen from './components/TransitionScreen';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.WELCOME);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleStartGame = useCallback((playerName: string) => {
    setGameState({
      playerName,
      startTime: Date.now(),
      endTime: null,
      currentWing: 0,
      currentRoom: 0,
      timePenalty: 0,
      quizAttempts: 0,
    });
    setGameStage(GameStage.TRANSITION);
  }, []);

  const handleRestartGame = useCallback(() => {
    setGameState(null);
    setGameStage(GameStage.WELCOME);
  }, []);
  
  const handleAdvanceToPuzzle = useCallback(() => {
    setGameStage(GameStage.PLAYING);
  }, []);

  const handleNextRoom = useCallback(() => {
    setGameState((prev: GameState | null) => {
      if (!prev) return null;

      const currentWing = WINGS[prev.currentWing];
      const isLastRoomInWing = prev.currentRoom === currentWing.rooms.length - 1;
      
      if (isLastRoomInWing) {
        setGameStage(GameStage.FINISHED);
        return { ...prev, endTime: Date.now() };
      } else {
        const nextState = { ...prev, currentRoom: prev.currentRoom + 1 };
        setGameStage(GameStage.TRANSITION);
        return nextState;
      }
    });
  }, []);

  const handleIncorrectAnswer = useCallback(() => {
    setGameState((prev: GameState | null) => {
      if (!prev) return null;
      return {
        ...prev,
        timePenalty: prev.timePenalty + 30000, // 30 second penalty
        quizAttempts: prev.quizAttempts + 1,
      };
    });
  }, []);

  const handleEnterAdminMode = () => {
    setIsAdminMode(true);
  };
  
  const handleExitAdminMode = () => {
    setIsAdminMode(false);
  };

  const renderGameStage = () => {
    if (isAdminMode) {
      return <Admin onExit={handleExitAdminMode} />;
    }

    switch (gameStage) {
      case GameStage.WELCOME:
        return <WelcomeScreen onStart={handleStartGame} onEnterAdminMode={handleEnterAdminMode} />;
      
      case GameStage.TRANSITION: {
        if (!gameState) return null;
        const room = WINGS[gameState.currentWing].rooms[gameState.currentRoom];
        return (
          <TransitionScreen 
            narrative={room.transition.narrative}
            illustration={room.transition.illustration}
            onNext={handleAdvanceToPuzzle}
          />
        );
      }

      case GameStage.PLAYING:
        if (!gameState) return null;
        return (
          <GameScreen 
            gameState={gameState} 
            onNextRoom={handleNextRoom} 
            onIncorrectAnswer={handleIncorrectAnswer}
            onRestart={handleRestartGame}
          />
        );
      case GameStage.FINISHED:
         if (!gameState || gameState.endTime === null) return null;
        return <GameOverScreen gameState={gameState} onRestart={handleRestartGame} />;
      default:
        return <WelcomeScreen onStart={handleStartGame} onEnterAdminMode={handleEnterAdminMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {renderGameStage()}
      </div>
    </div>
  );
};

export default App;