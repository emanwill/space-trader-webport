import { CrewMemberId, StarSystemId } from "./enums";
import type { CrewMember } from "./crewMember";
import type { Ship } from "./ship";
import { INT_RATE } from "./consts";

export interface Commander extends CrewMember {
  id: CrewMemberId.Commander;
  name: string;
  cash: number;
  debt: number;
  killsPirate: number;
  killsPolice: number;
  killsTrader: number;
  policeRecordScore: number;
  reputationScore: number;
  days: number;
  insurance: boolean;
  noClaim: number;
  ship: Ship;
  priceCargo: number[]; // total price paid for trade goods
}

export function createCommander(
  name: string,
  pilot: number,
  fighter: number,
  trader: number,
  engineer: number,
  currentSystemId: StarSystemId,
): Commander {
  return {
    id: CrewMemberId.Commander,
    name,
    skills: [pilot, fighter, trader, engineer],
    currentSystemId,
    cash: 1000,
    debt: 0,
    killsPirate: 0,
    killsPolice: 0,
    killsTrader: 0,
    policeRecordScore: 0,
    reputationScore: 0,
    days: 0,
    insurance: false,
    noClaim: 0,
    ship: null!, // initialized by game setup
    priceCargo: new Array(10).fill(0),
  };
}

export function payInterest(commander: Commander): Commander {
  if (commander.debt <= 0) return commander;

  const interest = Math.max(1, Math.trunc(commander.debt * INT_RATE));
  if (commander.cash > interest) {
    return { ...commander, cash: commander.cash - interest };
  }
  return {
    ...commander,
    debt: commander.debt + (interest - commander.cash),
    cash: 0,
  };
}
