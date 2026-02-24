import type { Ship } from "./ship";
import { createShip } from "./ship";
import type { PoliticalSystem } from "./politicalSystem";
import type { CrewMember } from "./crewMember";
import {
  CrewMemberId,
  Difficulty,
  OpponentType,
  ShipType,
  StarSystemId,
} from "./enums";
import {
  MAX_SHIP,
  MAX_SKILL,
  POLICE_RECORD_SCORE_PSYCHOPATH,
  POLICE_RECORD_SCORE_VILLAIN,
  shipSpecsArray,
  specialCrewMemberIds,
  weaponsArray,
  shieldsArray,
  gadgetsArray,
} from "./consts";
import { getRandom } from "./functions";
import { shipTypeLikely } from "./politicalSystem";
import {
  addEquipment,
  getShieldStrength,
  hasGadget,
  hasShield,
  hasWeapon,
} from "./shipFunctions";

export interface GeneratedOpponent {
  ship: Ship;
  /** Skills assigned to the Opponent crew member: [pilot, fighter, trader, engineer] */
  opponentSkills: number[];
}

// ---------------------------------------------------------------------------
// Tries calculation (shared by ship type selection and equipment)
// ---------------------------------------------------------------------------

function getOpponentTries(
  oppType: OpponentType,
  commanderWorth: number,
  policeRecordScore: number,
  commanderWildOnBoard: boolean,
  difficulty: Difficulty,
): number {
  let tries = 1;

  switch (oppType) {
    case OpponentType.Pirate:
      tries = 1 + Math.trunc(commanderWorth / 100000);
      tries = Math.max(1, tries + difficulty - Difficulty.Normal);
      break;
    case OpponentType.Police:
      if (
        policeRecordScore < POLICE_RECORD_SCORE_PSYCHOPATH ||
        commanderWildOnBoard
      ) {
        tries = 5;
      } else if (policeRecordScore < POLICE_RECORD_SCORE_VILLAIN) {
        tries = 3;
      } else {
        tries = 1;
      }
      tries = Math.max(1, tries + difficulty - Difficulty.Normal);
      break;
  }

  return tries;
}

// ---------------------------------------------------------------------------
// Ship type selection
// ---------------------------------------------------------------------------

export function selectOpponentShipType(
  oppType: OpponentType,
  politicalSystem: PoliticalSystem,
  tries: number,
  difficulty: Difficulty,
): ShipType {
  if (oppType === OpponentType.Mantis) {
    return ShipType.Mantis;
  }

  let oppShipType: ShipType =
    oppType === OpponentType.Trader ? ShipType.Flea : ShipType.Gnat;

  // Calculate total occurrence weight for likely ships
  let total = 0;
  for (let i = 0; i < MAX_SHIP; i++) {
    const spec = shipSpecsArray[i];
    if (shipTypeLikely(politicalSystem, spec, oppType, difficulty)) {
      total += spec.occurrence;
    }
  }

  for (let i = 0; i < tries; i++) {
    const x = getRandom(total);
    let sum = -1;
    let j = -1;

    do {
      j++;
      if (
        shipTypeLikely(politicalSystem, shipSpecsArray[j], oppType, difficulty)
      ) {
        if (sum > 0) {
          sum += shipSpecsArray[j].occurrence;
        } else {
          sum = shipSpecsArray[j].occurrence;
        }
      }
    } while (sum < x && j < MAX_SHIP);

    if (j > oppShipType) {
      oppShipType = shipSpecsArray[j].type;
    }
  }

  return oppShipType;
}

// ---------------------------------------------------------------------------
// Crew
// ---------------------------------------------------------------------------

export function addOpponentCrew(
  ship: Ship,
  mercenaries: CrewMember[],
  warpSystemId: StarSystemId,
  commanderWildOnBoard: boolean,
  difficulty: Difficulty,
): { ship: Ship; opponentSkills: number[] } {
  // Set up opponent crew member with random skills
  const opponentSkills = [
    1 + getRandom(MAX_SKILL),
    1 + getRandom(MAX_SKILL),
    1 + getRandom(MAX_SKILL),
    warpSystemId === StarSystemId.Kravat &&
    commanderWildOnBoard &&
    getRandom(10) < difficulty + 1
      ? MAX_SKILL
      : 1 + getRandom(MAX_SKILL),
  ];

  const newCrewIds = [...ship.crewIds];
  newCrewIds[0] = CrewMemberId.Opponent;

  // Determine number of additional crew
  let numCrew: number;
  if (difficulty === Difficulty.Impossible) {
    numCrew = ship.crewQuarters;
  } else {
    numCrew = 1 + getRandom(ship.crewQuarters);
    if (difficulty === Difficulty.Hard && numCrew < ship.crewQuarters) {
      numCrew++;
    }
  }

  // Fill additional crew slots with random non-special mercenaries
  for (let i = 1; i < numCrew; i++) {
    let crewId: CrewMemberId;
    do {
      crewId = mercenaries[getRandom(mercenaries.length)].id;
    } while (crewId === CrewMemberId.NA || specialCrewMemberIds.has(crewId));
    newCrewIds[i] = crewId;
  }

  return {
    ship: { ...ship, crewIds: newCrewIds },
    opponentSkills,
  };
}

// ---------------------------------------------------------------------------
// Cargo
// ---------------------------------------------------------------------------

export function addOpponentCargo(
  ship: Ship,
  difficulty: Difficulty,
  pirate: boolean,
): Ship {
  if (ship.cargoBays <= 0) return ship;

  let baysToFill = ship.cargoBays;

  if (difficulty >= Difficulty.Normal) {
    baysToFill = Math.min(15, 3 + getRandom(Math.max(1, baysToFill - 5)));
  }

  if (pirate) {
    if (difficulty < Difficulty.Normal) {
      baysToFill = Math.trunc((baysToFill * 4) / 5);
    } else {
      baysToFill = Math.max(1, Math.trunc(baysToFill / difficulty));
    }
  }

  const cargo = [...ship.cargo];

  for (let i = 0; i < baysToFill; ) {
    const item = getRandom(cargo.length);
    const bays = Math.min(baysToFill - i, 1 + getRandom(10 - item));
    cargo[item] += bays;
    i += bays;
  }

  return { ...ship, cargo };
}

// ---------------------------------------------------------------------------
// Weapons
// ---------------------------------------------------------------------------

export function addOpponentWeapons(
  ship: Ship,
  tries: number,
  difficulty: Difficulty,
): Ship {
  if (ship.weaponSlots <= 0) return ship;

  let numWeapons: number;

  if (difficulty === Difficulty.Impossible) {
    numWeapons = ship.weaponSlots;
  } else if (ship.weaponSlots === 1) {
    numWeapons = 1;
  } else {
    numWeapons = 1 + getRandom(ship.weaponSlots);
    if (
      numWeapons < ship.weaponSlots &&
      (tries > 4 || (tries > 3 && getRandom(2) > 0))
    ) {
      numWeapons++;
    }
  }

  let result = ship;

  for (let i = 0; i < numWeapons; i++) {
    let bestWeaponType = 0;
    for (let j = 0; j < tries; j++) {
      const x = getRandom(100);
      let sum = weaponsArray[0].chance;
      let weaponType = 0;
      while (sum < x && weaponType <= weaponsArray.length - 1) {
        weaponType++;
        sum += weaponsArray[weaponType].chance;
      }
      if (
        !hasWeapon(result, weaponsArray[weaponType].type, true) &&
        weaponType > bestWeaponType
      ) {
        bestWeaponType = weaponType;
      }
    }

    result = addEquipment(result, weaponsArray[bestWeaponType]);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Shields
// ---------------------------------------------------------------------------

export function addOpponentShields(
  ship: Ship,
  tries: number,
  difficulty: Difficulty,
): Ship {
  if (ship.shieldSlots <= 0) return ship;

  let numShields: number;

  if (difficulty === Difficulty.Impossible) {
    numShields = ship.shieldSlots;
  } else {
    numShields = getRandom(ship.shieldSlots + 1);
    if (
      numShields < ship.shieldSlots &&
      (tries > 3 || (tries > 1 && getRandom(2) > 0))
    ) {
      numShields++;
    }
  }

  let result = ship;

  for (let i = 0; i < numShields; i++) {
    let bestShieldType = 0;
    for (let j = 0; j < tries; j++) {
      const x = getRandom(100);
      let sum = shieldsArray[0].chance;
      let shieldType = 0;
      while (sum < x && shieldType <= shieldsArray.length - 1) {
        shieldType++;
        sum += shieldsArray[shieldType].chance;
      }
      if (
        !hasShield(result, shieldsArray[shieldType].type) &&
        shieldType > bestShieldType
      ) {
        bestShieldType = shieldType;
      }
    }

    result = addEquipment(result, shieldsArray[bestShieldType]);

    // Set charge to max of 5 random rolls
    const shields = [...result.shields];
    const power = shieldsArray[bestShieldType].power;
    let charge = 0;
    for (let j = 0; j < 5; j++) {
      const roll = 1 + getRandom(power);
      if (roll > charge) charge = roll;
    }
    shields[i] = shields[i] !== null ? { ...shields[i]!, charge } : null;
    result = { ...result, shields };
  }

  return result;
}

// ---------------------------------------------------------------------------
// Gadgets
// ---------------------------------------------------------------------------

export function addOpponentGadgets(
  ship: Ship,
  tries: number,
  difficulty: Difficulty,
): Ship {
  if (ship.gadgetSlots <= 0) return ship;

  let numGadgets: number;

  if (difficulty === Difficulty.Impossible) {
    numGadgets = ship.gadgetSlots;
  } else {
    numGadgets = getRandom(ship.gadgetSlots + 1);
    if (
      numGadgets < ship.gadgetSlots &&
      (tries > 4 || (tries > 2 && getRandom(2) > 0))
    ) {
      numGadgets++;
    }
  }

  let result = ship;

  for (let i = 0; i < numGadgets; i++) {
    let bestGadgetType = 0;
    for (let j = 0; j < tries; j++) {
      const x = getRandom(100);
      let sum = gadgetsArray[0].chance;
      let gadgetType = 0;
      while (sum < x && gadgetType <= gadgetsArray.length - 1) {
        gadgetType++;
        sum += gadgetsArray[gadgetType].chance;
      }
      if (
        !hasGadget(result, gadgetsArray[gadgetType].type) &&
        gadgetType > bestGadgetType
      ) {
        bestGadgetType = gadgetType;
      }
    }

    result = addEquipment(result, gadgetsArray[bestGadgetType]);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Hull strength
// ---------------------------------------------------------------------------

export function setOpponentHullStrength(ship: Ship): Ship {
  if (getShieldStrength(ship) === 0 || getRandom(5) === 0) {
    let hull = 0;
    for (let i = 0; i < 5; i++) {
      const roll = 1 + getRandom(ship.hullStrength);
      if (roll > hull) hull = roll;
    }
    return { ...ship, hull };
  }
  return ship;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function generateOpponent(
  oppType: OpponentType,
  politicalSystem: PoliticalSystem,
  mercenaries: CrewMember[],
  commanderWorth: number,
  policeRecordScore: number,
  commanderWildOnBoard: boolean,
  warpSystemId: StarSystemId,
  difficulty: Difficulty,
): GeneratedOpponent {
  const tries = getOpponentTries(
    oppType,
    commanderWorth,
    policeRecordScore,
    commanderWildOnBoard,
    difficulty,
  );

  const shipType = selectOpponentShipType(
    oppType,
    politicalSystem,
    tries,
    difficulty,
  );

  let ship = createShip(
    shipSpecsArray.find((s) => s.type === shipType) ?? shipSpecsArray[0],
  );

  const crewResult = addOpponentCrew(
    ship,
    mercenaries,
    warpSystemId,
    commanderWildOnBoard,
    difficulty,
  );
  ship = crewResult.ship;

  ship = addOpponentWeapons(ship, tries, difficulty);
  ship = addOpponentShields(ship, tries, difficulty);
  ship = addOpponentGadgets(ship, tries, difficulty);
  ship = setOpponentHullStrength(ship);
  ship = addOpponentCargo(ship, difficulty, oppType === OpponentType.Pirate);

  return { ship, opponentSkills: crewResult.opponentSkills };
}
