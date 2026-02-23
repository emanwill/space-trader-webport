import { ReputationType } from "./enums";

export interface Reputation {
  type: ReputationType;
  minScore: number;
}

export const reputationNames: Record<ReputationType, string> = {
  [ReputationType.Harmless]: "Harmless",
  [ReputationType.MostlyHarmless]: "Mostly harmless",
  [ReputationType.Poor]: "Poor",
  [ReputationType.Average]: "Average",
  [ReputationType.AboveAverage]: "Above average",
  [ReputationType.Competent]: "Competent",
  [ReputationType.Dangerous]: "Dangerous",
  [ReputationType.Deadly]: "Deadly",
  [ReputationType.Elite]: "Elite",
};

export function getReputationName(reputation: Reputation): string {
  return reputationNames[reputation.type];
}

export function getReputationFromScore(
  score: number,
  reputations: Reputation[],
): Reputation {
  let i = 0;
  while (i < reputations.length && score >= reputations[i].minScore) {
    i++;
  }
  return reputations[Math.max(0, i - 1)];
}
