import type { Commander } from "./commander";
import type { CrewMember } from "./crewMember";
import type { GameOptions } from "./gameOptions";
import type { Ship } from "./ship";
import type {
  ArtifactStatus,
  DragonflyStatus,
  ExperimentStatus,
  GemulonStatus,
  JaporiStatus,
  JarekStatus,
  MoonStatus,
  PrincessStatus,
  ReactorStatus,
  ScarabStatus,
  SculptureStatus,
  SpaceMonsterStatus,
  WildStatus,
} from "./specialEvent";
import type { StarSystem } from "./starSystem";
import type {
  Difficulty,
  EncounterType,
  GameEndType,
  NewsEvent,
  StarSystemId,
  VeryRareEncounter,
} from "./enums";

// ---------------------------------------------------------------------------
// Persisted game state
// ---------------------------------------------------------------------------

export interface GameState {
  // World
  universe: StarSystem[];
  wormholes: number[]; // 6 StarSystemId indices into universe
  mercenaries: CrewMember[];
  commander: Commander;

  // Special ships
  dragonfly: Ship;
  scarab: Ship;
  scorpion: Ship;
  spaceMonster: Ship;
  opponent: Ship;

  // Travel state
  opponentDisabled: boolean;
  chanceOfTradeInOrbit: number;
  clicks: number; // distance remaining to target, 0 = arrived
  raided: boolean;
  inspected: boolean;
  tribbleMessage: boolean;
  arrivedViaWormhole: boolean;
  paidForNewspaper: boolean;
  litterWarning: boolean;
  newsEvents: NewsEvent[];

  // Game settings / selections
  difficulty: Difficulty;
  cheatEnabled: boolean;
  autoSave: boolean;
  easyEncounters: boolean;
  endStatus: GameEndType;
  encounterType: EncounterType;
  selectedSystemId: StarSystemId;
  warpSystemId: StarSystemId;
  trackedSystemId: StarSystemId;
  targetWormhole: boolean;
  priceCargoBuy: number[]; // 10-element array
  priceCargoSell: number[]; // 10-element array

  // Quest statuses
  questStatusArtifact: ArtifactStatus;
  questStatusDragonfly: DragonflyStatus;
  questStatusExperiment: ExperimentStatus;
  questStatusGemulon: GemulonStatus;
  questStatusJapori: JaporiStatus;
  questStatusJarek: JarekStatus;
  questStatusMoon: MoonStatus;
  questStatusPrincess: PrincessStatus;
  questStatusReactor: ReactorStatus;
  questStatusScarab: ScarabStatus;
  questStatusSculpture: SculptureStatus;
  questStatusSpaceMonster: SpaceMonsterStatus;
  questStatusWild: WildStatus;

  // Other persisted state
  fabricRipProbability: number;
  justLootedMarie: boolean;
  canSuperWarp: boolean;
  chanceOfVeryRareEncounter: number;
  veryRareEncounters: VeryRareEncounter[];
  options: GameOptions;
}

// ---------------------------------------------------------------------------
// Transient encounter state (not saved between sessions)
// ---------------------------------------------------------------------------

export interface EncounterState {
  encounterContinueFleeing: boolean;
  encounterContinueAttacking: boolean;
  encounterCmdrFleeing: boolean;
  encounterCmdrHit: boolean;
  encounterOppFleeingPrev: boolean;
  encounterOppFleeing: boolean;
  encounterOppHit: boolean;
}

export function createEncounterState(): EncounterState {
  return {
    encounterContinueFleeing: false,
    encounterContinueAttacking: false,
    encounterCmdrFleeing: false,
    encounterCmdrHit: false,
    encounterOppFleeingPrev: false,
    encounterOppFleeing: false,
    encounterOppHit: false,
  };
}
