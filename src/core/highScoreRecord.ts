import { Difficulty, GameEndType } from "./enums";

export interface HighScoreRecord {
  name: string;
  score: number;
  type: GameEndType;
  days: number;
  worth: number;
  difficulty: Difficulty;
}

export function compareHighScores(a: HighScoreRecord, b: HighScoreRecord): number {
  if (a.score !== b.score) return b.score - a.score;
  if (a.worth !== b.worth) return b.worth - a.worth;
  if (a.days !== b.days) return a.days - b.days;
  return 0;
}
