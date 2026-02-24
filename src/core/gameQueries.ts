import type { CrewMember } from "./crewMember";
import { getCrewMemberRate } from "./crewMember";
import type { StarSystem } from "./starSystem";
import { isDestOk } from "./starSystem";
import { CrewMemberId, Difficulty, GameEndType, StarSystemId } from "./enums";
import { INS_RATE, INT_RATE, WORM_DIST } from "./consts";
import { wormholeExists } from "./functions";

// ---------------------------------------------------------------------------
// Cost calculations
// ---------------------------------------------------------------------------

export function getCountDownStart(difficulty: Difficulty): number {
  return difficulty + 3;
}

export function getInsuranceCosts(
  insurance: boolean,
  shipBaseWorth: number,
  noClaim: number,
): number {
  if (!insurance) return 0;
  return Math.max(
    1,
    Math.trunc((shipBaseWorth * INS_RATE * (100 - noClaim)) / 100),
  );
}

export function getInterestCosts(debt: number): number {
  if (debt <= 0) return 0;
  return Math.max(1, Math.trunc(debt * INT_RATE));
}

export function getMercenaryCosts(
  shipCrewIds: CrewMemberId[],
  mercenaries: CrewMember[],
  specialCrewMemberIds: Set<CrewMemberId>,
): number {
  let total = 0;
  // Skip index 0 (commander)
  for (let i = 1; i < shipCrewIds.length; i++) {
    const id = shipCrewIds[i];
    if (id === CrewMemberId.NA) continue;
    const member = mercenaries.find((m) => m.id === id);
    if (member) {
      total += getCrewMemberRate(member, specialCrewMemberIds);
    }
  }
  return total;
}

export function getWormholeCosts(
  currentSystemId: number,
  warpSystemId: number,
  fuelCost: number,
  wormholes: number[],
): number {
  return wormholeExists(wormholes, currentSystemId, warpSystemId)
    ? WORM_DIST * fuelCost
    : 0;
}

export function getCurrentCosts(
  insuranceCosts: number,
  interestCosts: number,
  mercenaryCosts: number,
  wormholeCosts: number,
): number {
  return insuranceCosts + interestCosts + mercenaryCosts + wormholeCosts;
}

// ---------------------------------------------------------------------------
// Score
// ---------------------------------------------------------------------------

export function getScore(
  commanderWorth: number,
  days: number,
  difficulty: Difficulty,
  endStatus: GameEndType,
): number {
  const worth =
    commanderWorth < 1000000
      ? commanderWorth
      : 1000000 + Math.trunc((commanderWorth - 1000000) / 10);

  let daysMoon = 0;
  let modifier = 0;

  switch (endStatus) {
    case GameEndType.Killed:
      modifier = 90;
      break;
    case GameEndType.Retired:
      modifier = 95;
      break;
    case GameEndType.BoughtMoon:
      daysMoon = Math.max(0, (difficulty + 1) * 100 - days);
      modifier = 100;
      break;
  }

  return Math.trunc(
    ((difficulty + 1) * modifier * (daysMoon * 1000 + worth)) / 250000,
  );
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export function getDestinations(
  universe: StarSystem[],
  currentSystem: StarSystem,
  fuel: number,
  wormholes: number[],
): number[] {
  const destinations: number[] = [];
  for (let i = 0; i < universe.length; i++) {
    if (isDestOk(universe[i], currentSystem, fuel, wormholes)) {
      destinations.push(i);
    }
  }
  return destinations;
}

export function findSystemByName(
  name: string,
  universe: StarSystem[],
  systemNames: Record<StarSystemId, string>,
): StarSystemId | null {
  const lower = name.toLowerCase();
  for (let i = 0; i < universe.length; i++) {
    const sysName = systemNames[universe[i].id];
    if (sysName.toLowerCase().includes(lower)) {
      return universe[i].id;
    }
  }
  return null;
}
