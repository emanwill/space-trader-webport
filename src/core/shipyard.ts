import { ShipyardId, ShipyardSkill, Size } from "./enums";

export interface Shipyard {
  id: ShipyardId;
  specialtySize: Size;
  skill: ShipyardSkill;
}

export const shipyardNames: Record<ShipyardId, string> = {
  [ShipyardId.NA]: "??SHIPYARD??",
  [ShipyardId.Corellian]: "Corellian Engineering",
  [ShipyardId.Incom]: "Incom Corporation",
  [ShipyardId.Kuat]: "Kuat Drive Yards",
  [ShipyardId.Sienar]: "Sienar Fleet Systems",
  [ShipyardId.Sorosuub]: "Sorosuub Engineering",
};

export const shipyardEngineers: Record<ShipyardId, string> = {
  [ShipyardId.NA]: "??SHIPYARD_ENGINEER??",
  [ShipyardId.Corellian]: "Wedge",
  [ShipyardId.Incom]: "Luke",
  [ShipyardId.Kuat]: "Lando",
  [ShipyardId.Sienar]: "Mara",
  [ShipyardId.Sorosuub]: "Obi-Wan",
};

// Cost/unit tables indexed by Size (Tiny=0 through Gargantuan=5)

export const SHIPYARD_COST_FUEL = [1, 1, 1, 3, 5, 10];
export const SHIPYARD_COST_HULL = [1, 5, 10, 15, 20, 40];
export const SHIPYARD_BASE_FUEL = [15, 14, 13, 12, 11, 10];
export const SHIPYARD_BASE_HULL = [10, 25, 50, 100, 150, 200];
export const SHIPYARD_DESIGN_FEE = [2000, 5000, 10000, 20000, 40000, 100000];
export const SHIPYARD_MAX_UNITS = [50, 100, 150, 200, 250, 999];
export const SHIPYARD_PER_UNIT_FUEL = [3, 2, 1, 1, 1, 1];
export const SHIPYARD_PER_UNIT_HULL = [35, 30, 25, 20, 15, 10];
export const SHIPYARD_PRICE_PER_UNIT = [75, 250, 500, 750, 1000, 1200];
export const SHIPYARD_UNITS_CREW = [20, 20, 20, 20, 20, 20];
export const SHIPYARD_UNITS_FUEL = [1, 1, 1, 5, 10, 15];
export const SHIPYARD_UNITS_GADGET = [5, 5, 5, 5, 5, 5];
export const SHIPYARD_UNITS_HULL = [1, 2, 3, 4, 5, 6];
export const SHIPYARD_UNITS_SHIELD = [10, 10, 10, 8, 8, 8];
export const SHIPYARD_UNITS_WEAPON = [15, 15, 15, 10, 10, 10];

// Size adjustment constants
export const ADJUST_SIZE_DEFAULT = 100;
export const ADJUST_SIZE_SPECIALTY = 90;
export const ADJUST_SIZE_WEAKNESS = 110;

// Skill adjustment constants
export const ADJUST_SKILL_CREW = 2;
export const ADJUST_SKILL_FUEL = 2;
export const ADJUST_SKILL_HULL = 5;
export const ADJUST_SKILL_SHIELD = 2;
export const ADJUST_SKILL_WEAPON = 2;

// Crowding penalty constants
export const PENALTY_FIRST_PCT = 80;
export const PENALTY_FIRST_FEE = 25;
export const PENALTY_SECOND_PCT = 90;
export const PENALTY_SECOND_FEE = 75;

export function getShipyardName(shipyard: Shipyard): string {
  return shipyardNames[shipyard.id];
}

export function getShipyardEngineer(shipyard: Shipyard): string {
  return shipyardEngineers[shipyard.id];
}
