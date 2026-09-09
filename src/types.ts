export type Level = 'basics' | 'control_flow' | 'functions' | 'oop';

export interface Lesson {
  id: string;
  level: Level;
  title: string;
  description: string;
  
  // The 4 structural elements for content
  headerPrefix?: string; // e.g., "NEURAL PROTOCOL"
  missionPrefix?: string; // e.g., "YOUR MISSION"
  intro?: string;         // Area 1: The story/title/heading text
  technical?: string;     // Area 2: How it works
  example?: string;       // Area 3: Code example
  task?: string;          // Area 4: Your Task description
  content?: string;       // Legacy content field
  
  baseCode: string;
  expectedOutput?: string;
  solutionRegex?: RegExp[];
  hints: string[];
  offlineSnippet?: string;
  solution: string;
}

export interface UserState {
  currentLevel: Level;
  completedLessons: string[];
  currentLessonId: string;
}
