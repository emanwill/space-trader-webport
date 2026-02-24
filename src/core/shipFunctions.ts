import {
  CrewMemberId,
  Difficulty,
  GadgetType,
  ShieldType,
  ShipType,
  SkillType,
  WeaponType,
} from "./enums";
import type { Equipment, GadgetEquipment } from "./equipment";
import { sellPrice } from "./equipment";
import type { Ship } from "./ship";
import {
  ArtifactStatus,
  JaporiStatus,
  ReactorStatus,
  SculptureStatus,
} from "./specialEvent";
import { FUEL_COMPACTOR_TANKS, SKILL_BONUS } from "./consts";
import { adjustSkillForDifficulty } from "./functions";

// ---------------------------------------------------------------------------
// Cargo bays
// ---------------------------------------------------------------------------

export function getExtraCargoBays(ship: Ship): number {
  let bays = 0;
  for (const g of ship.gadgets) {
    if (g !== null && g.type === GadgetType.ExtraCargoBays) bays += 5;
  }
  return bays;
}

export function getHiddenCargoBays(ship: Ship): number {
  let bays = 0;
  for (const g of ship.gadgets) {
    if (g !== null && g.type === GadgetType.HiddenCargoBays) bays += 5;
  }
  return bays;
}

export function getTotalCargoBays(ship: Ship): number {
  return ship.cargoBays + getExtraCargoBays(ship) + getHiddenCargoBays(ship);
}

export function getFilledNormalCargoBays(ship: Ship): number {
  let filled = 0;
  for (const qty of ship.cargo) filled += qty;
  return filled;
}

export function getFilledCargoBays(
  ship: Ship,
  isCommandersShip: boolean,
  questStatusJapori: JaporiStatus,
  questStatusReactor: ReactorStatus,
): number {
  let filled = getFilledNormalCargoBays(ship);

  if (isCommandersShip && questStatusJapori === JaporiStatus.InTransit) {
    filled += 10;
  }

  if (reactorOnBoard(isCommandersShip, questStatusReactor)) {
    filled += 5 + 10 - Math.trunc((questStatusReactor - 1) / 2);
  }

  return filled;
}

export function getFreeCargoBays(
  ship: Ship,
  isCommandersShip: boolean,
  questStatusJapori: JaporiStatus,
  questStatusReactor: ReactorStatus,
): number {
  return (
    getTotalCargoBays(ship) -
    getFilledCargoBays(
      ship,
      isCommandersShip,
      questStatusJapori,
      questStatusReactor,
    )
  );
}

// ---------------------------------------------------------------------------
// Slots
// ---------------------------------------------------------------------------

export function getCrewCount(ship: Ship): number {
  let count = 0;
  for (const id of ship.crewIds) {
    if (id !== CrewMemberId.NA) count++;
  }
  return count;
}

export function getFreeCrewQuarters(ship: Ship): number {
  let count = 0;
  for (const id of ship.crewIds) {
    if (id === CrewMemberId.NA) count++;
  }
  return count;
}

export function getFreeSlotsWeapon(ship: Ship): number {
  let count = 0;
  for (const w of ship.weapons) {
    if (w === null) count++;
  }
  return count;
}

export function getFreeSlotsShield(ship: Ship): number {
  let count = 0;
  for (const s of ship.shields) {
    if (s === null) count++;
  }
  return count;
}

export function getFreeSlotsGadget(ship: Ship): number {
  let count = 0;
  for (const g of ship.gadgets) {
    if (g === null) count++;
  }
  return count;
}

export function getFreeSlots(ship: Ship): number {
  return (
    getFreeSlotsWeapon(ship) +
    getFreeSlotsShield(ship) +
    getFreeSlotsGadget(ship)
  );
}

// ---------------------------------------------------------------------------
// Equipment queries
// ---------------------------------------------------------------------------

export function hasWeapon(
  ship: Ship,
  type: WeaponType,
  exact: boolean = true,
): boolean {
  for (const w of ship.weapons) {
    if (w !== null && (w.type === type || (!exact && w.type > type)))
      return true;
  }
  return false;
}

export function hasShield(ship: Ship, type: ShieldType): boolean {
  for (const s of ship.shields) {
    if (s !== null && s.type === type) return true;
  }
  return false;
}

export function hasGadget(ship: Ship, type: GadgetType): boolean {
  for (const g of ship.gadgets) {
    if (g !== null && g.type === type) return true;
  }
  return false;
}

export function hasEquipment(ship: Ship, equipment: Equipment): boolean {
  switch (equipment.equipmentType) {
    case "weapon":
      return hasWeapon(ship, equipment.type, true);
    case "shield":
      return hasShield(ship, equipment.type);
    case "gadget":
      return hasGadget(ship, equipment.type);
  }
}

export function hasCrew(ship: Ship, crewId: CrewMemberId): boolean {
  return ship.crewIds.includes(crewId);
}

// ---------------------------------------------------------------------------
// Combat stats
// ---------------------------------------------------------------------------

export function getWeaponStrength(
  ship: Ship,
  min: WeaponType = WeaponType.PulseLaser,
  max: WeaponType = WeaponType.QuantumDistruptor,
): number {
  let total = 0;
  for (const w of ship.weapons) {
    if (w !== null && w.type >= min && w.type <= max) total += w.power;
  }
  return total;
}

export function getShieldStrength(ship: Ship): number {
  let total = 0;
  for (const s of ship.shields) {
    if (s !== null) total += s.power;
  }
  return total;
}

export function getShieldCharge(ship: Ship): number {
  let total = 0;
  for (const s of ship.shields) {
    if (s !== null) total += s.charge;
  }
  return total;
}

/**
 * Compute effective ship skills from crew member skill arrays.
 * crewSkills: array of skill arrays for each non-NA crew member on the ship.
 * Callers resolve ship.crewIds to CrewMember objects and pass their skills.
 */
export function getShipSkills(
  crewSkills: number[][],
  gadgets: (GadgetEquipment | null)[],
  difficulty: Difficulty,
): number[] {
  const skills = [1, 1, 1, 1];

  for (const memberSkills of crewSkills) {
    for (let skill = 0; skill < 4; skill++) {
      if (memberSkills[skill] > skills[skill]) {
        skills[skill] = memberSkills[skill];
      }
    }
  }

  for (let skill = 0; skill < 4; skill++) {
    skills[skill] = Math.max(
      1,
      adjustSkillForDifficulty(skills[skill], difficulty),
    );
  }

  for (const g of gadgets) {
    if (g !== null && g.skillBonus !== SkillType.NA) {
      skills[g.skillBonus] += SKILL_BONUS;
    }
  }

  return skills;
}

export function getFuelTanks(ship: Ship): number {
  return (
    ship.fuelTanks +
    (hasGadget(ship, GadgetType.FuelCompactor) ? FUEL_COMPACTOR_TANKS : 0)
  );
}

// ---------------------------------------------------------------------------
// Derived booleans
// ---------------------------------------------------------------------------

export function isDisableable(shipType: ShipType): boolean {
  return (
    shipType !== ShipType.Bottle &&
    shipType !== ShipType.Mantis &&
    shipType !== ShipType.SpaceMonster
  );
}

export function anyIllegalCargo(ship: Ship): boolean {
  // Firearms = index 5, Narcotics = index 8 in TradeItemType
  return ship.cargo[5] > 0 || ship.cargo[8] > 0;
}

export function detectableIllegalCargo(ship: Ship): boolean {
  const illegalCargo = ship.cargo[5] + ship.cargo[8];
  return illegalCargo - getHiddenCargoBays(ship) > 0;
}

export function wildOnBoard(ship: Ship): boolean {
  return hasCrew(ship, CrewMemberId.Wild);
}

export function jarekOnBoard(ship: Ship): boolean {
  return hasCrew(ship, CrewMemberId.Jarek);
}

export function princessOnBoard(ship: Ship): boolean {
  return hasCrew(ship, CrewMemberId.Princess);
}

export function artifactOnBoard(
  isCommandersShip: boolean,
  questStatusArtifact: ArtifactStatus,
): boolean {
  return isCommandersShip && questStatusArtifact === ArtifactStatus.OnBoard;
}

export function reactorOnBoard(
  isCommandersShip: boolean,
  questStatusReactor: ReactorStatus,
): boolean {
  return (
    isCommandersShip &&
    questStatusReactor > ReactorStatus.NotStarted &&
    questStatusReactor < ReactorStatus.Delivered
  );
}

export function sculptureOnBoard(
  isCommandersShip: boolean,
  questStatusSculpture: SculptureStatus,
): boolean {
  return isCommandersShip && questStatusSculpture === SculptureStatus.InTransit;
}

// ---------------------------------------------------------------------------
// Valuation
// ---------------------------------------------------------------------------

export function getBaseWorth(ship: Ship, forInsurance: boolean): number {
  // Trade-in value is three-fourths the original price (tribbles reduce to 1/4)
  let price =
    (ship.price * (ship.tribbles > 0 && !forInsurance ? 1 : 3)) / 4 -
    (ship.hullStrength - ship.hull) * ship.repairCost -
    (getFuelTanks(ship) - ship.fuel) * ship.fuelCost;

  price = Math.trunc(price);

  for (const w of ship.weapons) {
    if (w !== null) price += sellPrice(w);
  }
  for (const s of ship.shields) {
    if (s !== null) price += sellPrice(s);
  }
  for (const g of ship.gadgets) {
    if (g !== null) price += sellPrice(g);
  }

  return price;
}

/**
 * Compute bounty for a ship. Callers supply effective skill values
 * (pilot, fighter, engineer) from getShipSkills.
 */
export function getBounty(
  ship: Ship,
  pilot: number,
  fighter: number,
  engineer: number,
): number {
  let price = ship.price;

  for (const w of ship.weapons) {
    if (w !== null) price += w.price;
  }
  for (const s of ship.shields) {
    if (s !== null) price += s.price;
  }

  price = Math.trunc((price * (2 * pilot + engineer + 3 * fighter)) / 60);
  const bounty = Math.trunc(price / 200 / 25) * 25;
  return Math.max(25, Math.min(2500, bounty));
}

// ---------------------------------------------------------------------------
// Mutations (return new Ship)
// ---------------------------------------------------------------------------

export function addEquipment(ship: Ship, equipment: Equipment): Ship {
  switch (equipment.equipmentType) {
    case "weapon": {
      const weapons = [...ship.weapons];
      const slot = weapons.indexOf(null);
      if (slot >= 0) weapons[slot] = { ...equipment };
      return { ...ship, weapons };
    }
    case "shield": {
      const shields = [...ship.shields];
      const slot = shields.indexOf(null);
      if (slot >= 0) shields[slot] = { ...equipment };
      return { ...ship, shields };
    }
    case "gadget": {
      const gadgets = [...ship.gadgets];
      const slot = gadgets.indexOf(null);
      if (slot >= 0) gadgets[slot] = { ...equipment };
      return { ...ship, gadgets };
    }
  }
}

export function removeEquipmentBySlot(
  ship: Ship,
  type: "weapon" | "shield" | "gadget",
  slot: number,
): Ship {
  switch (type) {
    case "weapon": {
      const weapons = [...ship.weapons];
      weapons.splice(slot, 1);
      weapons.push(null);
      return { ...ship, weapons };
    }
    case "shield": {
      const shields = [...ship.shields];
      shields.splice(slot, 1);
      shields.push(null);
      return { ...ship, shields };
    }
    case "gadget": {
      const gadgets = [...ship.gadgets];
      gadgets.splice(slot, 1);
      gadgets.push(null);
      return { ...ship, gadgets };
    }
  }
}

export function removeEquipmentByType(
  ship: Ship,
  type: "weapon",
  subType: WeaponType,
): Ship;
export function removeEquipmentByType(
  ship: Ship,
  type: "shield",
  subType: ShieldType,
): Ship;
export function removeEquipmentByType(
  ship: Ship,
  type: "gadget",
  subType: GadgetType,
): Ship;
export function removeEquipmentByType(
  ship: Ship,
  type: "weapon" | "shield" | "gadget",
  subType: number,
): Ship {
  switch (type) {
    case "weapon": {
      const idx = ship.weapons.findIndex(
        (w) => w !== null && w.type === subType,
      );
      return idx >= 0 ? removeEquipmentBySlot(ship, type, idx) : ship;
    }
    case "shield": {
      const idx = ship.shields.findIndex(
        (s) => s !== null && s.type === subType,
      );
      return idx >= 0 ? removeEquipmentBySlot(ship, type, idx) : ship;
    }
    case "gadget": {
      const idx = ship.gadgets.findIndex(
        (g) => g !== null && g.type === subType,
      );
      return idx >= 0 ? removeEquipmentBySlot(ship, type, idx) : ship;
    }
  }
}
