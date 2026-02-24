import { Activity, EquipmentType, ShipType, Size, TechLevel } from "./enums";

export const HULL_UPGRADE = 50;

export interface ShipSpec {
  type: ShipType;
  size: Size;
  cargoBays: number;
  weaponSlots: number;
  shieldSlots: number;
  gadgetSlots: number;
  crewQuarters: number;
  fuelTanks: number;
  fuelCost: number;
  hullStrength: number;
  repairCost: number;
  price: number;
  occurrence: number;
  police: Activity;
  pirates: Activity;
  traders: Activity;
  minTech: TechLevel;
  hullUpgraded: boolean;
}

export const shipNames: Record<ShipType, string> = {
  [ShipType.Flea]: "Flea",
  [ShipType.Gnat]: "Gnat",
  [ShipType.Firefly]: "Firefly",
  [ShipType.Mosquito]: "Mosquito",
  [ShipType.Bumblebee]: "Bumblebee",
  [ShipType.Beetle]: "Beetle",
  [ShipType.Hornet]: "Hornet",
  [ShipType.Grasshopper]: "Grasshopper",
  [ShipType.Termite]: "Termite",
  [ShipType.Wasp]: "Wasp",
  [ShipType.SpaceMonster]: "Space Monster",
  [ShipType.Dragonfly]: "Dragonfly",
  [ShipType.Mantis]: "Mantis",
  [ShipType.Scarab]: "Scarab",
  [ShipType.Bottle]: "Bottle",
  [ShipType.Custom]: "Custom Ship",
  [ShipType.Scorpion]: "Scorpion",
};

export function getShipName(spec: ShipSpec): string {
  return shipNames[spec.type];
}

export function getEffectiveHullStrength(spec: ShipSpec): number {
  return spec.hullStrength + (spec.hullUpgraded ? HULL_UPGRADE : 0);
}

export function getSlots(spec: ShipSpec, equipmentType: EquipmentType): number {
  switch (equipmentType) {
    case EquipmentType.Weapon:
      return spec.weaponSlots;
    case EquipmentType.Shield:
      return spec.shieldSlots;
    case EquipmentType.Gadget:
      return spec.gadgetSlots;
  }
}
