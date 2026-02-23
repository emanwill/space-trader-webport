import { CrewMemberId } from "./enums";
import type {
  WeaponEquipment,
  ShieldEquipment,
  GadgetEquipment,
} from "./equipment";
import type { ShipSpec } from "./shipSpec";

export interface Ship extends ShipSpec {
  fuel: number;
  hull: number;
  tribbles: number;
  cargo: number[]; // quantities per TradeItemType
  weapons: (WeaponEquipment | null)[];
  shields: (ShieldEquipment | null)[];
  gadgets: (GadgetEquipment | null)[];
  crewIds: CrewMemberId[]; // references into game mercenaries array
  escapePod: boolean;
}

export function createShip(spec: ShipSpec): Ship {
  return {
    ...spec,
    fuel: spec.fuelTanks,
    hull: spec.hullStrength,
    tribbles: 0,
    cargo: new Array(10).fill(0),
    weapons: new Array(spec.weaponSlots).fill(null),
    shields: new Array(spec.shieldSlots).fill(null),
    gadgets: new Array(spec.gadgetSlots).fill(null),
    crewIds: new Array(spec.crewQuarters).fill(CrewMemberId.NA),
    escapePod: false,
  };
}
