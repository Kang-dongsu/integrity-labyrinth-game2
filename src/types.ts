import React from 'react';

export interface GameState {
  playerName: string;
  startTime: number;
  endTime: number | null;
  currentWing: number;
  currentRoom: number;
  timePenalty: number;
  quizAttempts: number;
}

export enum GameStage {
  WELCOME = 'welcome',
  TRANSITION = 'transition',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export interface Quiz {
  question: string;
  scenario: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint: string;
}

export type IllustrationComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export interface Room {
  title: string;
  description: string;
  quiz: Quiz;
  transition: {
    narrative: string;
    illustration: IllustrationComponent;
  };
}

export interface Wing {
  title: string;
  rooms: Room[];
}

export interface LeaderboardEntry {
  playerName: string;
  escapeTime: number; // in seconds
}