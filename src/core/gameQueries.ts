import type { CrewMember } from "./crewMember";
import { getCrewMemberRate } from "./crewMember";
import type { StarSystem } from "./starSystem";
import { isDestOk } from "./starSystem";
import { CrewMemberId, Difficulty, GameEndType, StarSystemId } from "./enums";
import {
  INS_RATE,
  INT_RATE,
  MAX_SKILL,
  POLICE_RECORD_SCORE_DUBIOUS,
  WORM_DIST,
} from "./consts";
import { itemTraded } from "./starSystem";
import type { PoliticalSystem } from "./politicalSystem";
import type { TradeItem } from "./tradeItem";
import { standardPrice } from "./tradeItem";
import { getRandom, wormholeExists } from "./functions";

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

// ---------------------------------------------------------------------------
// Price calculations
// ---------------------------------------------------------------------------

export function recalculateBuyPrices(
  system: StarSystem,
  tradeItems: TradeItem[],
  politicalSystem: PoliticalSystem,
  sellPrices: number[],
  policeRecordScore: number,
  traderSkill: number,
): number[] {
  const buy: number[] = new Array(tradeItems.length).fill(0);

  for (let i = 0; i < tradeItems.length; i++) {
    if (!itemTraded(system, tradeItems[i], politicalSystem)) {
      buy[i] = 0;
    } else {
      buy[i] = sellPrices[i];

      if (policeRecordScore < POLICE_RECORD_SCORE_DUBIOUS) {
        buy[i] = Math.trunc((buy[i] * 100) / 90);
      }

      // BuyPrice = SellPrice + 1 to 12% (depending on trader skill)
      buy[i] = Math.trunc((buy[i] * (103 + MAX_SKILL - traderSkill)) / 100);

      if (buy[i] <= sellPrices[i]) {
        buy[i] = sellPrices[i] + 1;
      }
    }
  }

  return buy;
}

export function recalculateSellPrices(sellPrices: number[]): number[] {
  return sellPrices.map((p) => Math.trunc((p * 100) / 90));
}

export function calculatePrices(
  system: StarSystem,
  tradeItems: TradeItem[],
  politicalSystem: PoliticalSystem,
  policeRecordScore: number,
  traderSkill: number,
): { buy: number[]; sell: number[] } {
  const sell: number[] = new Array(tradeItems.length).fill(0);

  for (let i = 0; i < tradeItems.length; i++) {
    let price = standardPrice(tradeItems[i], system, politicalSystem);

    if (price > 0) {
      // Adapt price for system pressure
      if (tradeItems[i].pressurePriceHike === system.systemPressure) {
        price = Math.trunc((price * 3) / 2);
      }

      // Randomize price within variance
      const variance = Math.min(tradeItems[i].priceVariance, price - 1);
      price = price + getRandom(-variance, variance + 1);

      // Criminals pay less (intermediary cost)
      if (policeRecordScore < POLICE_RECORD_SCORE_DUBIOUS) {
        price = Math.trunc((price * 90) / 100);
      }
    }

    sell[i] = price;
  }

  const buy = recalculateBuyPrices(
    system,
    tradeItems,
    politicalSystem,
    sell,
    policeRecordScore,
    traderSkill,
  );

  return { buy, sell };
}
