import {
  GadgetType,
  ShieldType,
  SkillType,
  TechLevel,
  WeaponType,
} from "./enums";

// Discriminated union for equipment

export interface WeaponEquipment {
  equipmentType: "weapon";
  type: WeaponType;
  price: number;
  minTech: TechLevel;
  chance: number;
  power: number;
  disabling: boolean;
}

export interface ShieldEquipment {
  equipmentType: "shield";
  type: ShieldType;
  price: number;
  minTech: TechLevel;
  chance: number;
  power: number;
  charge: number;
}

export interface GadgetEquipment {
  equipmentType: "gadget";
  type: GadgetType;
  price: number;
  minTech: TechLevel;
  chance: number;
  skillBonus: SkillType;
}

export type Equipment = WeaponEquipment | ShieldEquipment | GadgetEquipment;

// Name lookups

export const weaponNames: Record<WeaponType, string> = {
  [WeaponType.PulseLaser]: "Pulse Laser",
  [WeaponType.BeamLaser]: "Beam Laser",
  [WeaponType.MilitaryLaser]: "Military Laser",
  [WeaponType.MorgansLaser]: "Morgan's Laser",
  [WeaponType.PhotonDisruptor]: "Photon Disruptor",
  [WeaponType.QuantumDistruptor]: "Quantum Disruptor",
};

export const shieldNames: Record<ShieldType, string> = {
  [ShieldType.Energy]: "Energy Shield",
  [ShieldType.Reflective]: "Reflective Shield",
  [ShieldType.Lightning]: "Lightning Shield",
};

export const gadgetNames: Record<GadgetType, string> = {
  [GadgetType.ExtraCargoBays]: "5 Extra Cargo Bays",
  [GadgetType.AutoRepairSystem]: "Auto-Repair System",
  [GadgetType.NavigatingSystem]: "Navigating System",
  [GadgetType.TargetingSystem]: "Targeting System",
  [GadgetType.CloakingDevice]: "Cloaking Device",
  [GadgetType.FuelCompactor]: "Fuel Compactor",
  [GadgetType.HiddenCargoBays]: "5 Hidden Cargo Bays",
};

export function getEquipmentName(equipment: Equipment): string {
  switch (equipment.equipmentType) {
    case "weapon":
      return weaponNames[equipment.type];
    case "shield":
      return shieldNames[equipment.type];
    case "gadget":
      return gadgetNames[equipment.type];
  }
}

// Price helpers

export function sellPrice(equipment: Equipment): number {
  return Math.trunc((equipment.price * 3) / 4);
}

export function transferPrice(equipment: Equipment): number {
  return Math.trunc((sellPrice(equipment) * 110) / 90);
}

// Shield factory (charge defaults to power)

export function createShield(
  type: ShieldType,
  power: number,
  price: number,
  minTech: TechLevel,
  chance: number,
): ShieldEquipment {
  return {
    equipmentType: "shield",
    type,
    price,
    minTech,
    chance,
    power,
    charge: power,
  };
}

export function getEquipmentBuyPrice(
  equipment: Equipment,
  systemTechLevel: TechLevel,
  traderSkill: number,
): number {
  if (systemTechLevel < equipment.minTech) return 0;
  return Math.trunc((equipment.price * (100 - traderSkill)) / 100);
}
