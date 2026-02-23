import {
  Activity,
  PoliticalSystemType,
  TechLevel,
  TradeItemType,
} from "./enums";

export interface PoliticalSystem {
  type: PoliticalSystemType;
  reactionIllegal: number;
  activityPolice: Activity;
  activityPirates: Activity;
  activityTraders: Activity;
  minTech: TechLevel;
  maxTech: TechLevel;
  bribeLevel: number;
  drugsOk: boolean;
  firearmsOk: boolean;
  wanted: TradeItemType;
}

export const politicalSystemNames: Record<PoliticalSystemType, string> = {
  [PoliticalSystemType.Anarchy]: "Anarchy",
  [PoliticalSystemType.Capitalist]: "Capitalist State",
  [PoliticalSystemType.Communist]: "Communist State",
  [PoliticalSystemType.Confederacy]: "Confederacy",
  [PoliticalSystemType.Corporate]: "Corporate State",
  [PoliticalSystemType.Cybernetic]: "Cybernetic State",
  [PoliticalSystemType.Democracy]: "Democracy",
  [PoliticalSystemType.Dictatorship]: "Dictatorship",
  [PoliticalSystemType.Fascist]: "Fascist State",
  [PoliticalSystemType.Feudal]: "Feudal State",
  [PoliticalSystemType.Military]: "Military State",
  [PoliticalSystemType.Monarchy]: "Monarchy",
  [PoliticalSystemType.Pacifist]: "Pacifist State",
  [PoliticalSystemType.Socialist]: "Socialist State",
  [PoliticalSystemType.Satori]: "State of Satori",
  [PoliticalSystemType.Technocracy]: "Technocracy",
  [PoliticalSystemType.Theocracy]: "Theocracy",
};

export function getPoliticalSystemName(system: PoliticalSystem): string {
  return politicalSystemNames[system.type];
}
