import type { PoliceRecord } from "./policeRecord";
import type { Reputation } from "./reputation";
import type { PoliticalSystem } from "./politicalSystem";
import type { ShipSpec } from "./shipSpec";
import type { Shipyard } from "./shipyard";
import type { SpecialEvent } from "./specialEvent";
import type { TradeItem } from "./tradeItem";
import type {
  Equipment,
  GadgetEquipment,
  ShieldEquipment,
  WeaponEquipment,
} from "./equipment";
import {
  Activity,
  CrewMemberId,
  GadgetType,
  PoliticalSystemType,
  PoliceRecordType,
  ReputationType,
  ShieldType,
  ShipType,
  ShipyardId,
  ShipyardSkill,
  Size,
  SkillType,
  SpecialEventType,
  SpecialResource,
  SystemPressure,
  TechLevel,
  TradeItemType,
  WeaponType,
} from "./enums";

// ---------------------------------------------------------------------------
// Scalar constants
// ---------------------------------------------------------------------------

// Price paid by government for each negative PoliceScore point
export const BOUNTY_MODIFIER = 1000;

// Galaxy dimensions
export const GALAXY_WIDTH = 154;
export const GALAXY_HEIGHT = 110;
export const MIN_DISTANCE = 7;
export const CLOSE_DISTANCE = 13;
export const MAX_RANGE = 20;
export const WORM_DIST = 25;

// Debt
export const DEBT_WARNING = 75000;
export const DEBT_TOO_LARGE = 100000;
export const INS_RATE = 0.0025;
export const INT_RATE = 0.1;
export const MAX_NO_CLAIM = 90;

// Skills
export const SKILL_BONUS = 3;
export const CLOAK_BONUS = 2;
export const MAX_SKILL = 10;

// Ship limits
export const START_CLICKS = 20;
export const MAX_FUEL_TANKS = 20;
export const FUEL_COMPACTOR_TANKS = 3;
export const HULL_UPGRADE = 50;
export const MAX_SHIP = 9;
export const MAX_SLOTS = 5;
export const FLEA_CONVERSION_COST = 500;
export const POD_TRANSFER_COST = 200;

// Encounter
export const STORY_PROBABILITY = 6; // 50/8 in C# (integer division)
export const FABRIC_RIP_INITIAL_PROBABILITY = 25;
export const DISRUPTOR_SYSTEMS_MULTIPLIER = 3;

// Tribbles
export const MAX_TRIBBLES = 100000;

// ---------------------------------------------------------------------------
// Police record scores
// ---------------------------------------------------------------------------

export const POLICE_RECORD_SCORE_PSYCHOPATH = -100;
export const POLICE_RECORD_SCORE_VILLAIN = -70;
export const POLICE_RECORD_SCORE_CRIMINAL = -30;
export const POLICE_RECORD_SCORE_CROOK = -10;
export const POLICE_RECORD_SCORE_DUBIOUS = -5;
export const POLICE_RECORD_SCORE_CLEAN = 0;
export const POLICE_RECORD_SCORE_LAWFUL = 5;
export const POLICE_RECORD_SCORE_TRUSTED = 10;
export const POLICE_RECORD_SCORE_LIKED = 25;
export const POLICE_RECORD_SCORE_HERO = 75;

// ---------------------------------------------------------------------------
// Reputation scores
// ---------------------------------------------------------------------------

export const REPUTATION_SCORE_HARMLESS = 0;
export const REPUTATION_SCORE_MOSTLY_HARMLESS = 10;
export const REPUTATION_SCORE_POOR = 20;
export const REPUTATION_SCORE_AVERAGE = 40;
export const REPUTATION_SCORE_ABOVE_AVERAGE = 80;
export const REPUTATION_SCORE_COMPETENT = 150;
export const REPUTATION_SCORE_DANGEROUS = 300;
export const REPUTATION_SCORE_DEADLY = 600;
export const REPUTATION_SCORE_ELITE = 1500;

// ---------------------------------------------------------------------------
// Combat score modifiers
// ---------------------------------------------------------------------------

export const SCORE_ATTACK_PIRATE = 0;
export const SCORE_ATTACK_POLICE = -3;
export const SCORE_ATTACK_TRADER = -2;
export const SCORE_CAUGHT_WITH_WILD = -4;
export const SCORE_FLEE_POLICE = -2;
export const SCORE_KILL_CAPTAIN = 100;
export const SCORE_KILL_PIRATE = 1;
export const SCORE_KILL_POLICE = -6;
export const SCORE_KILL_TRADER = -4;
export const SCORE_PLUNDER_PIRATE = -1;
export const SCORE_PLUNDER_TRADER = -2;
export const SCORE_TRAFFICKING = -1;

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

// Weapons

export const weapons: Record<WeaponType, WeaponEquipment> = {
  [WeaponType.PulseLaser]: {
    equipmentType: "weapon",
    type: WeaponType.PulseLaser,
    power: 15,
    disabling: false,
    price: 2000,
    minTech: TechLevel.Industrial,
    chance: 50,
  },
  [WeaponType.BeamLaser]: {
    equipmentType: "weapon",
    type: WeaponType.BeamLaser,
    power: 25,
    disabling: false,
    price: 12500,
    minTech: TechLevel.PostIndustrial,
    chance: 35,
  },
  [WeaponType.MilitaryLaser]: {
    equipmentType: "weapon",
    type: WeaponType.MilitaryLaser,
    power: 35,
    disabling: false,
    price: 35000,
    minTech: TechLevel.HiTech,
    chance: 15,
  },
  [WeaponType.MorgansLaser]: {
    equipmentType: "weapon",
    type: WeaponType.MorgansLaser,
    power: 85,
    disabling: false,
    price: 50000,
    minTech: TechLevel.Unavailable,
    chance: 0,
  },
  [WeaponType.PhotonDisruptor]: {
    equipmentType: "weapon",
    type: WeaponType.PhotonDisruptor,
    power: 20,
    disabling: true,
    price: 15000,
    minTech: TechLevel.PostIndustrial,
    chance: 0,
  },
  [WeaponType.QuantumDistruptor]: {
    equipmentType: "weapon",
    type: WeaponType.QuantumDistruptor,
    power: 60,
    disabling: true,
    price: 50000,
    minTech: TechLevel.Unavailable,
    chance: 0,
  },
};

// Shields

export const shields: Record<ShieldType, ShieldEquipment> = {
  [ShieldType.Energy]: {
    equipmentType: "shield",
    type: ShieldType.Energy,
    power: 100,
    charge: 100,
    price: 5000,
    minTech: TechLevel.Industrial,
    chance: 70,
  },
  [ShieldType.Reflective]: {
    equipmentType: "shield",
    type: ShieldType.Reflective,
    power: 200,
    charge: 200,
    price: 20000,
    minTech: TechLevel.PostIndustrial,
    chance: 30,
  },
  [ShieldType.Lightning]: {
    equipmentType: "shield",
    type: ShieldType.Lightning,
    power: 350,
    charge: 350,
    price: 45000,
    minTech: TechLevel.Unavailable,
    chance: 0,
  },
};

// Gadgets

export const gadgets: Record<GadgetType, GadgetEquipment> = {
  [GadgetType.ExtraCargoBays]: {
    equipmentType: "gadget",
    type: GadgetType.ExtraCargoBays,
    skillBonus: SkillType.NA,
    price: 2500,
    minTech: TechLevel.EarlyIndustrial,
    chance: 35,
  },
  [GadgetType.AutoRepairSystem]: {
    equipmentType: "gadget",
    type: GadgetType.AutoRepairSystem,
    skillBonus: SkillType.Engineer,
    price: 7500,
    minTech: TechLevel.Industrial,
    chance: 20,
  },
  [GadgetType.NavigatingSystem]: {
    equipmentType: "gadget",
    type: GadgetType.NavigatingSystem,
    skillBonus: SkillType.Pilot,
    price: 15000,
    minTech: TechLevel.PostIndustrial,
    chance: 20,
  },
  [GadgetType.TargetingSystem]: {
    equipmentType: "gadget",
    type: GadgetType.TargetingSystem,
    skillBonus: SkillType.Fighter,
    price: 25000,
    minTech: TechLevel.PostIndustrial,
    chance: 20,
  },
  [GadgetType.CloakingDevice]: {
    equipmentType: "gadget",
    type: GadgetType.CloakingDevice,
    skillBonus: SkillType.Pilot,
    price: 100000,
    minTech: TechLevel.HiTech,
    chance: 5,
  },
  // The gadgets below can't be bought
  [GadgetType.FuelCompactor]: {
    equipmentType: "gadget",
    type: GadgetType.FuelCompactor,
    skillBonus: SkillType.NA,
    price: 30000,
    minTech: TechLevel.Unavailable,
    chance: 0,
  },
  [GadgetType.HiddenCargoBays]: {
    equipmentType: "gadget",
    type: GadgetType.HiddenCargoBays,
    skillBonus: SkillType.NA,
    price: 60000,
    minTech: TechLevel.Unavailable,
    chance: 0,
  },
};

// Police records (ordered array — used by getPoliceRecordFromScore)

export const policeRecords: PoliceRecord[] = [
  {
    type: PoliceRecordType.Psychopath,
    minScore: POLICE_RECORD_SCORE_PSYCHOPATH,
  },
  { type: PoliceRecordType.Villain, minScore: POLICE_RECORD_SCORE_VILLAIN },
  { type: PoliceRecordType.Criminal, minScore: POLICE_RECORD_SCORE_CRIMINAL },
  { type: PoliceRecordType.Crook, minScore: POLICE_RECORD_SCORE_CROOK },
  { type: PoliceRecordType.Dubious, minScore: POLICE_RECORD_SCORE_DUBIOUS },
  { type: PoliceRecordType.Clean, minScore: POLICE_RECORD_SCORE_CLEAN },
  { type: PoliceRecordType.Lawful, minScore: POLICE_RECORD_SCORE_LAWFUL },
  { type: PoliceRecordType.Trusted, minScore: POLICE_RECORD_SCORE_TRUSTED },
  { type: PoliceRecordType.Liked, minScore: POLICE_RECORD_SCORE_LIKED },
  { type: PoliceRecordType.Hero, minScore: POLICE_RECORD_SCORE_HERO },
];

// Reputations (ordered array — used by getReputationFromScore)

export const reputations: Reputation[] = [
  { type: ReputationType.Harmless, minScore: REPUTATION_SCORE_HARMLESS },
  {
    type: ReputationType.MostlyHarmless,
    minScore: REPUTATION_SCORE_MOSTLY_HARMLESS,
  },
  { type: ReputationType.Poor, minScore: REPUTATION_SCORE_POOR },
  { type: ReputationType.Average, minScore: REPUTATION_SCORE_AVERAGE },
  {
    type: ReputationType.AboveAverage,
    minScore: REPUTATION_SCORE_ABOVE_AVERAGE,
  },
  { type: ReputationType.Competent, minScore: REPUTATION_SCORE_COMPETENT },
  { type: ReputationType.Dangerous, minScore: REPUTATION_SCORE_DANGEROUS },
  { type: ReputationType.Deadly, minScore: REPUTATION_SCORE_DEADLY },
  { type: ReputationType.Elite, minScore: REPUTATION_SCORE_ELITE },
];

// Political systems

export const politicalSystems: Record<PoliticalSystemType, PoliticalSystem> = {
  [PoliticalSystemType.Anarchy]: {
    type: PoliticalSystemType.Anarchy,
    reactionIllegal: 0,
    activityPolice: Activity.Absent,
    activityPirates: Activity.Swarms,
    activityTraders: Activity.Minimal,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Industrial,
    bribeLevel: 7,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Food,
  },
  [PoliticalSystemType.Capitalist]: {
    type: PoliticalSystemType.Capitalist,
    reactionIllegal: 2,
    activityPolice: Activity.Some,
    activityPirates: Activity.Few,
    activityTraders: Activity.Swarms,
    minTech: TechLevel.EarlyIndustrial,
    maxTech: TechLevel.HiTech,
    bribeLevel: 1,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Ore,
  },
  [PoliticalSystemType.Communist]: {
    type: PoliticalSystemType.Communist,
    reactionIllegal: 6,
    activityPolice: Activity.Abundant,
    activityPirates: Activity.Moderate,
    activityTraders: Activity.Moderate,
    minTech: TechLevel.Agricultural,
    maxTech: TechLevel.Industrial,
    bribeLevel: 5,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.NA,
  },
  [PoliticalSystemType.Confederacy]: {
    type: PoliticalSystemType.Confederacy,
    reactionIllegal: 5,
    activityPolice: Activity.Moderate,
    activityPirates: Activity.Some,
    activityTraders: Activity.Many,
    minTech: TechLevel.Agricultural,
    maxTech: TechLevel.PostIndustrial,
    bribeLevel: 3,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Games,
  },
  [PoliticalSystemType.Corporate]: {
    type: PoliticalSystemType.Corporate,
    reactionIllegal: 2,
    activityPolice: Activity.Abundant,
    activityPirates: Activity.Few,
    activityTraders: Activity.Swarms,
    minTech: TechLevel.EarlyIndustrial,
    maxTech: TechLevel.HiTech,
    bribeLevel: 2,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Robots,
  },
  [PoliticalSystemType.Cybernetic]: {
    type: PoliticalSystemType.Cybernetic,
    reactionIllegal: 0,
    activityPolice: Activity.Swarms,
    activityPirates: Activity.Swarms,
    activityTraders: Activity.Many,
    minTech: TechLevel.PostIndustrial,
    maxTech: TechLevel.HiTech,
    bribeLevel: 0,
    drugsOk: false,
    firearmsOk: false,
    wanted: TradeItemType.Ore,
  },
  [PoliticalSystemType.Democracy]: {
    type: PoliticalSystemType.Democracy,
    reactionIllegal: 4,
    activityPolice: Activity.Some,
    activityPirates: Activity.Few,
    activityTraders: Activity.Many,
    minTech: TechLevel.Renaissance,
    maxTech: TechLevel.HiTech,
    bribeLevel: 2,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Games,
  },
  [PoliticalSystemType.Dictatorship]: {
    type: PoliticalSystemType.Dictatorship,
    reactionIllegal: 3,
    activityPolice: Activity.Moderate,
    activityPirates: Activity.Many,
    activityTraders: Activity.Some,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.HiTech,
    bribeLevel: 2,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.NA,
  },
  [PoliticalSystemType.Fascist]: {
    type: PoliticalSystemType.Fascist,
    reactionIllegal: 7,
    activityPolice: Activity.Swarms,
    activityPirates: Activity.Swarms,
    activityTraders: Activity.Minimal,
    minTech: TechLevel.EarlyIndustrial,
    maxTech: TechLevel.HiTech,
    bribeLevel: 0,
    drugsOk: false,
    firearmsOk: true,
    wanted: TradeItemType.Machines,
  },
  [PoliticalSystemType.Feudal]: {
    type: PoliticalSystemType.Feudal,
    reactionIllegal: 1,
    activityPolice: Activity.Minimal,
    activityPirates: Activity.Abundant,
    activityTraders: Activity.Few,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Renaissance,
    bribeLevel: 6,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Firearms,
  },
  [PoliticalSystemType.Military]: {
    type: PoliticalSystemType.Military,
    reactionIllegal: 7,
    activityPolice: Activity.Swarms,
    activityPirates: Activity.Absent,
    activityTraders: Activity.Abundant,
    minTech: TechLevel.Medieval,
    maxTech: TechLevel.HiTech,
    bribeLevel: 0,
    drugsOk: false,
    firearmsOk: true,
    wanted: TradeItemType.Robots,
  },
  [PoliticalSystemType.Monarchy]: {
    type: PoliticalSystemType.Monarchy,
    reactionIllegal: 3,
    activityPolice: Activity.Moderate,
    activityPirates: Activity.Some,
    activityTraders: Activity.Moderate,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Industrial,
    bribeLevel: 4,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Medicine,
  },
  [PoliticalSystemType.Pacifist]: {
    type: PoliticalSystemType.Pacifist,
    reactionIllegal: 7,
    activityPolice: Activity.Few,
    activityPirates: Activity.Minimal,
    activityTraders: Activity.Many,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Renaissance,
    bribeLevel: 1,
    drugsOk: true,
    firearmsOk: false,
    wanted: TradeItemType.NA,
  },
  [PoliticalSystemType.Socialist]: {
    type: PoliticalSystemType.Socialist,
    reactionIllegal: 4,
    activityPolice: Activity.Few,
    activityPirates: Activity.Many,
    activityTraders: Activity.Some,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Industrial,
    bribeLevel: 6,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.NA,
  },
  [PoliticalSystemType.Satori]: {
    type: PoliticalSystemType.Satori,
    reactionIllegal: 0,
    activityPolice: Activity.Minimal,
    activityPirates: Activity.Minimal,
    activityTraders: Activity.Minimal,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.Agricultural,
    bribeLevel: 0,
    drugsOk: false,
    firearmsOk: false,
    wanted: TradeItemType.NA,
  },
  [PoliticalSystemType.Technocracy]: {
    type: PoliticalSystemType.Technocracy,
    reactionIllegal: 1,
    activityPolice: Activity.Abundant,
    activityPirates: Activity.Some,
    activityTraders: Activity.Abundant,
    minTech: TechLevel.EarlyIndustrial,
    maxTech: TechLevel.HiTech,
    bribeLevel: 2,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Water,
  },
  [PoliticalSystemType.Theocracy]: {
    type: PoliticalSystemType.Theocracy,
    reactionIllegal: 5,
    activityPolice: Activity.Abundant,
    activityPirates: Activity.Minimal,
    activityTraders: Activity.Moderate,
    minTech: TechLevel.PreAgricultural,
    maxTech: TechLevel.EarlyIndustrial,
    bribeLevel: 0,
    drugsOk: true,
    firearmsOk: true,
    wanted: TradeItemType.Narcotics,
  },
};

// Ship specs

export const shipSpecs: Record<ShipType, ShipSpec> = {
  //                                                                                    bays  w  s  g  cr fuel fc  hull  rc   price  occ  police             pirates            traders            minTech                        hullUpgraded
  [ShipType.Flea]: {
    type: ShipType.Flea,
    size: Size.Tiny,
    cargoBays: 10,
    weaponSlots: 0,
    shieldSlots: 0,
    gadgetSlots: 0,
    crewQuarters: 1,
    fuelTanks: 20,
    fuelCost: 1,
    hullStrength: 25,
    repairCost: 1,
    price: 2000,
    occurrence: 2,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.Absent,
    minTech: TechLevel.EarlyIndustrial,
    hullUpgraded: false,
  },
  [ShipType.Gnat]: {
    type: ShipType.Gnat,
    size: Size.Small,
    cargoBays: 15,
    weaponSlots: 1,
    shieldSlots: 0,
    gadgetSlots: 1,
    crewQuarters: 1,
    fuelTanks: 14,
    fuelCost: 1,
    hullStrength: 100,
    repairCost: 2,
    price: 10000,
    occurrence: 28,
    police: Activity.Absent,
    pirates: Activity.Absent,
    traders: Activity.Absent,
    minTech: TechLevel.Industrial,
    hullUpgraded: false,
  },
  [ShipType.Firefly]: {
    type: ShipType.Firefly,
    size: Size.Small,
    cargoBays: 20,
    weaponSlots: 1,
    shieldSlots: 1,
    gadgetSlots: 1,
    crewQuarters: 1,
    fuelTanks: 17,
    fuelCost: 1,
    hullStrength: 100,
    repairCost: 3,
    price: 25000,
    occurrence: 20,
    police: Activity.Absent,
    pirates: Activity.Absent,
    traders: Activity.Absent,
    minTech: TechLevel.Industrial,
    hullUpgraded: false,
  },
  [ShipType.Mosquito]: {
    type: ShipType.Mosquito,
    size: Size.Small,
    cargoBays: 15,
    weaponSlots: 2,
    shieldSlots: 1,
    gadgetSlots: 1,
    crewQuarters: 1,
    fuelTanks: 13,
    fuelCost: 1,
    hullStrength: 100,
    repairCost: 5,
    price: 30000,
    occurrence: 20,
    police: Activity.Absent,
    pirates: Activity.Minimal,
    traders: Activity.Absent,
    minTech: TechLevel.Industrial,
    hullUpgraded: false,
  },
  [ShipType.Bumblebee]: {
    type: ShipType.Bumblebee,
    size: Size.Medium,
    cargoBays: 25,
    weaponSlots: 1,
    shieldSlots: 2,
    gadgetSlots: 2,
    crewQuarters: 2,
    fuelTanks: 15,
    fuelCost: 1,
    hullStrength: 100,
    repairCost: 7,
    price: 60000,
    occurrence: 15,
    police: Activity.Minimal,
    pirates: Activity.Minimal,
    traders: Activity.Absent,
    minTech: TechLevel.Industrial,
    hullUpgraded: false,
  },
  [ShipType.Beetle]: {
    type: ShipType.Beetle,
    size: Size.Medium,
    cargoBays: 50,
    weaponSlots: 0,
    shieldSlots: 1,
    gadgetSlots: 1,
    crewQuarters: 3,
    fuelTanks: 14,
    fuelCost: 1,
    hullStrength: 50,
    repairCost: 10,
    price: 80000,
    occurrence: 3,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.Absent,
    minTech: TechLevel.Industrial,
    hullUpgraded: false,
  },
  [ShipType.Hornet]: {
    type: ShipType.Hornet,
    size: Size.Large,
    cargoBays: 20,
    weaponSlots: 3,
    shieldSlots: 2,
    gadgetSlots: 1,
    crewQuarters: 2,
    fuelTanks: 16,
    fuelCost: 2,
    hullStrength: 150,
    repairCost: 15,
    price: 100000,
    occurrence: 6,
    police: Activity.Few,
    pirates: Activity.Some,
    traders: Activity.Minimal,
    minTech: TechLevel.PostIndustrial,
    hullUpgraded: false,
  },
  [ShipType.Grasshopper]: {
    type: ShipType.Grasshopper,
    size: Size.Large,
    cargoBays: 30,
    weaponSlots: 2,
    shieldSlots: 2,
    gadgetSlots: 3,
    crewQuarters: 3,
    fuelTanks: 15,
    fuelCost: 3,
    hullStrength: 150,
    repairCost: 15,
    price: 150000,
    occurrence: 2,
    police: Activity.Some,
    pirates: Activity.Moderate,
    traders: Activity.Few,
    minTech: TechLevel.PostIndustrial,
    hullUpgraded: false,
  },
  [ShipType.Termite]: {
    type: ShipType.Termite,
    size: Size.Huge,
    cargoBays: 60,
    weaponSlots: 1,
    shieldSlots: 3,
    gadgetSlots: 2,
    crewQuarters: 3,
    fuelTanks: 13,
    fuelCost: 4,
    hullStrength: 200,
    repairCost: 20,
    price: 225000,
    occurrence: 2,
    police: Activity.Moderate,
    pirates: Activity.Many,
    traders: Activity.Some,
    minTech: TechLevel.HiTech,
    hullUpgraded: false,
  },
  [ShipType.Wasp]: {
    type: ShipType.Wasp,
    size: Size.Huge,
    cargoBays: 35,
    weaponSlots: 3,
    shieldSlots: 2,
    gadgetSlots: 2,
    crewQuarters: 3,
    fuelTanks: 14,
    fuelCost: 5,
    hullStrength: 200,
    repairCost: 20,
    price: 300000,
    occurrence: 2,
    police: Activity.Many,
    pirates: Activity.Abundant,
    traders: Activity.Moderate,
    minTech: TechLevel.HiTech,
    hullUpgraded: false,
  },
  // The ships below can't be bought (mostly)
  [ShipType.SpaceMonster]: {
    type: ShipType.SpaceMonster,
    size: Size.Huge,
    cargoBays: 0,
    weaponSlots: 3,
    shieldSlots: 0,
    gadgetSlots: 0,
    crewQuarters: 1,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 500,
    repairCost: 1,
    price: 500000,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Dragonfly]: {
    type: ShipType.Dragonfly,
    size: Size.Small,
    cargoBays: 0,
    weaponSlots: 2,
    shieldSlots: 3,
    gadgetSlots: 2,
    crewQuarters: 1,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 10,
    repairCost: 1,
    price: 500000,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Mantis]: {
    type: ShipType.Mantis,
    size: Size.Medium,
    cargoBays: 0,
    weaponSlots: 3,
    shieldSlots: 1,
    gadgetSlots: 3,
    crewQuarters: 3,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 300,
    repairCost: 1,
    price: 500000,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Scarab]: {
    type: ShipType.Scarab,
    size: Size.Large,
    cargoBays: 20,
    weaponSlots: 2,
    shieldSlots: 0,
    gadgetSlots: 0,
    crewQuarters: 2,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 400,
    repairCost: 1,
    price: 500000,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Bottle]: {
    type: ShipType.Bottle,
    size: Size.Small,
    cargoBays: 0,
    weaponSlots: 0,
    shieldSlots: 0,
    gadgetSlots: 0,
    crewQuarters: 0,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 10,
    repairCost: 1,
    price: 100,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Custom]: {
    type: ShipType.Custom,
    size: Size.Huge,
    cargoBays: 0,
    weaponSlots: 0,
    shieldSlots: 0,
    gadgetSlots: 0,
    crewQuarters: 0,
    fuelTanks: 0,
    fuelCost: 0,
    hullStrength: 0,
    repairCost: 0,
    price: 0,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
  [ShipType.Scorpion]: {
    type: ShipType.Scorpion,
    size: Size.Huge,
    cargoBays: 30,
    weaponSlots: 2,
    shieldSlots: 2,
    gadgetSlots: 2,
    crewQuarters: 2,
    fuelTanks: 1,
    fuelCost: 1,
    hullStrength: 300,
    repairCost: 1,
    price: 500000,
    occurrence: 0,
    police: Activity.NA,
    pirates: Activity.NA,
    traders: Activity.NA,
    minTech: TechLevel.Unavailable,
    hullUpgraded: false,
  },
};

// Shipyards

export const shipyards: Record<Exclude<ShipyardId, ShipyardId.NA>, Shipyard> = {
  [ShipyardId.Corellian]: {
    id: ShipyardId.Corellian,
    specialtySize: Size.Large,
    skill: ShipyardSkill.CrewQuarters,
  },
  [ShipyardId.Incom]: {
    id: ShipyardId.Incom,
    specialtySize: Size.Medium,
    skill: ShipyardSkill.ShieldSlotUnits,
  },
  [ShipyardId.Kuat]: {
    id: ShipyardId.Kuat,
    specialtySize: Size.Huge,
    skill: ShipyardSkill.HullPerUnit,
  },
  [ShipyardId.Sienar]: {
    id: ShipyardId.Sienar,
    specialtySize: Size.Tiny,
    skill: ShipyardSkill.WeaponSlotUnits,
  },
  [ShipyardId.Sorosuub]: {
    id: ShipyardId.Sorosuub,
    specialtySize: Size.Small,
    skill: ShipyardSkill.FuelBase,
  },
};

// Trade items

export const tradeItems: Record<
  Exclude<TradeItemType, TradeItemType.NA>,
  TradeItem
> = {
  [TradeItemType.Water]: {
    type: TradeItemType.Water,
    techProduction: TechLevel.PreAgricultural,
    techUsage: TechLevel.PreAgricultural,
    techTopProduction: TechLevel.Medieval,
    priceLowTech: 30,
    priceInc: 3,
    priceVariance: 4,
    pressurePriceHike: SystemPressure.Drought,
    resourceLowPrice: SpecialResource.SweetOceans,
    resourceHighPrice: SpecialResource.Desert,
    minTradePrice: 30,
    maxTradePrice: 50,
    roundOff: 1,
  },
  [TradeItemType.Furs]: {
    type: TradeItemType.Furs,
    techProduction: TechLevel.PreAgricultural,
    techUsage: TechLevel.PreAgricultural,
    techTopProduction: TechLevel.PreAgricultural,
    priceLowTech: 250,
    priceInc: 10,
    priceVariance: 10,
    pressurePriceHike: SystemPressure.Cold,
    resourceLowPrice: SpecialResource.RichFauna,
    resourceHighPrice: SpecialResource.Lifeless,
    minTradePrice: 230,
    maxTradePrice: 280,
    roundOff: 5,
  },
  [TradeItemType.Food]: {
    type: TradeItemType.Food,
    techProduction: TechLevel.Agricultural,
    techUsage: TechLevel.PreAgricultural,
    techTopProduction: TechLevel.Agricultural,
    priceLowTech: 100,
    priceInc: 5,
    priceVariance: 5,
    pressurePriceHike: SystemPressure.CropFailure,
    resourceLowPrice: SpecialResource.RichSoil,
    resourceHighPrice: SpecialResource.PoorSoil,
    minTradePrice: 90,
    maxTradePrice: 160,
    roundOff: 5,
  },
  [TradeItemType.Ore]: {
    type: TradeItemType.Ore,
    techProduction: TechLevel.Medieval,
    techUsage: TechLevel.Medieval,
    techTopProduction: TechLevel.Renaissance,
    priceLowTech: 350,
    priceInc: 20,
    priceVariance: 10,
    pressurePriceHike: SystemPressure.War,
    resourceLowPrice: SpecialResource.MineralRich,
    resourceHighPrice: SpecialResource.MineralPoor,
    minTradePrice: 350,
    maxTradePrice: 420,
    roundOff: 10,
  },
  [TradeItemType.Games]: {
    type: TradeItemType.Games,
    techProduction: TechLevel.Renaissance,
    techUsage: TechLevel.Agricultural,
    techTopProduction: TechLevel.PostIndustrial,
    priceLowTech: 250,
    priceInc: -10,
    priceVariance: 5,
    pressurePriceHike: SystemPressure.Boredom,
    resourceLowPrice: SpecialResource.Artistic,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 160,
    maxTradePrice: 270,
    roundOff: 5,
  },
  [TradeItemType.Firearms]: {
    type: TradeItemType.Firearms,
    techProduction: TechLevel.Renaissance,
    techUsage: TechLevel.Agricultural,
    techTopProduction: TechLevel.Industrial,
    priceLowTech: 1250,
    priceInc: -75,
    priceVariance: 100,
    pressurePriceHike: SystemPressure.War,
    resourceLowPrice: SpecialResource.Warlike,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 600,
    maxTradePrice: 1100,
    roundOff: 25,
  },
  [TradeItemType.Medicine]: {
    type: TradeItemType.Medicine,
    techProduction: TechLevel.EarlyIndustrial,
    techUsage: TechLevel.Agricultural,
    techTopProduction: TechLevel.PostIndustrial,
    priceLowTech: 650,
    priceInc: -20,
    priceVariance: 10,
    pressurePriceHike: SystemPressure.Plague,
    resourceLowPrice: SpecialResource.SpecialHerbs,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 400,
    maxTradePrice: 700,
    roundOff: 25,
  },
  [TradeItemType.Machines]: {
    type: TradeItemType.Machines,
    techProduction: TechLevel.EarlyIndustrial,
    techUsage: TechLevel.Renaissance,
    techTopProduction: TechLevel.Industrial,
    priceLowTech: 900,
    priceInc: -30,
    priceVariance: 5,
    pressurePriceHike: SystemPressure.Employment,
    resourceLowPrice: SpecialResource.NA,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 600,
    maxTradePrice: 800,
    roundOff: 25,
  },
  [TradeItemType.Narcotics]: {
    type: TradeItemType.Narcotics,
    techProduction: TechLevel.Industrial,
    techUsage: TechLevel.PreAgricultural,
    techTopProduction: TechLevel.Industrial,
    priceLowTech: 3500,
    priceInc: -125,
    priceVariance: 150,
    pressurePriceHike: SystemPressure.Boredom,
    resourceLowPrice: SpecialResource.WeirdMushrooms,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 2000,
    maxTradePrice: 3000,
    roundOff: 50,
  },
  [TradeItemType.Robots]: {
    type: TradeItemType.Robots,
    techProduction: TechLevel.PostIndustrial,
    techUsage: TechLevel.EarlyIndustrial,
    techTopProduction: TechLevel.HiTech,
    priceLowTech: 5000,
    priceInc: -150,
    priceVariance: 100,
    pressurePriceHike: SystemPressure.Employment,
    resourceLowPrice: SpecialResource.NA,
    resourceHighPrice: SpecialResource.NA,
    minTradePrice: 3500,
    maxTradePrice: 5000,
    roundOff: 100,
  },
};

// Special events

export const specialEvents: Record<
  Exclude<SpecialEventType, SpecialEventType.NA>,
  SpecialEvent
> = {
  [SpecialEventType.Artifact]: {
    type: SpecialEventType.Artifact,
    price: 0,
    occurrence: 1,
    messageOnly: false,
  },
  [SpecialEventType.ArtifactDelivery]: {
    type: SpecialEventType.ArtifactDelivery,
    price: -20000,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.CargoForSale]: {
    type: SpecialEventType.CargoForSale,
    price: 1000,
    occurrence: 3,
    messageOnly: false,
  },
  [SpecialEventType.Dragonfly]: {
    type: SpecialEventType.Dragonfly,
    price: 0,
    occurrence: 1,
    messageOnly: true,
  },
  [SpecialEventType.DragonflyBaratas]: {
    type: SpecialEventType.DragonflyBaratas,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.DragonflyDestroyed]: {
    type: SpecialEventType.DragonflyDestroyed,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.DragonflyMelina]: {
    type: SpecialEventType.DragonflyMelina,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.DragonflyRegulas]: {
    type: SpecialEventType.DragonflyRegulas,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.DragonflyShield]: {
    type: SpecialEventType.DragonflyShield,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.EraseRecord]: {
    type: SpecialEventType.EraseRecord,
    price: 5000,
    occurrence: 3,
    messageOnly: false,
  },
  [SpecialEventType.Experiment]: {
    type: SpecialEventType.Experiment,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.ExperimentFailed]: {
    type: SpecialEventType.ExperimentFailed,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.ExperimentStopped]: {
    type: SpecialEventType.ExperimentStopped,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Gemulon]: {
    type: SpecialEventType.Gemulon,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.GemulonFuel]: {
    type: SpecialEventType.GemulonFuel,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.GemulonInvaded]: {
    type: SpecialEventType.GemulonInvaded,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.GemulonRescued]: {
    type: SpecialEventType.GemulonRescued,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Japori]: {
    type: SpecialEventType.Japori,
    price: 0,
    occurrence: 1,
    messageOnly: false,
  },
  [SpecialEventType.JaporiDelivery]: {
    type: SpecialEventType.JaporiDelivery,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Jarek]: {
    type: SpecialEventType.Jarek,
    price: 0,
    occurrence: 1,
    messageOnly: false,
  },
  [SpecialEventType.JarekGetsOut]: {
    type: SpecialEventType.JarekGetsOut,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Lottery]: {
    type: SpecialEventType.Lottery,
    price: -1000,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Moon]: {
    type: SpecialEventType.Moon,
    price: 500000,
    occurrence: 4,
    messageOnly: false,
  },
  [SpecialEventType.MoonRetirement]: {
    type: SpecialEventType.MoonRetirement,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.Reactor]: {
    type: SpecialEventType.Reactor,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.ReactorDelivered]: {
    type: SpecialEventType.ReactorDelivered,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.ReactorLaser]: {
    type: SpecialEventType.ReactorLaser,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.Scarab]: {
    type: SpecialEventType.Scarab,
    price: 0,
    occurrence: 1,
    messageOnly: true,
  },
  [SpecialEventType.ScarabDestroyed]: {
    type: SpecialEventType.ScarabDestroyed,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.ScarabUpgradeHull]: {
    type: SpecialEventType.ScarabUpgradeHull,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.Skill]: {
    type: SpecialEventType.Skill,
    price: 3000,
    occurrence: 3,
    messageOnly: false,
  },
  [SpecialEventType.SpaceMonster]: {
    type: SpecialEventType.SpaceMonster,
    price: 0,
    occurrence: 1,
    messageOnly: true,
  },
  [SpecialEventType.SpaceMonsterKilled]: {
    type: SpecialEventType.SpaceMonsterKilled,
    price: -15000,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Tribble]: {
    type: SpecialEventType.Tribble,
    price: 1000,
    occurrence: 1,
    messageOnly: false,
  },
  [SpecialEventType.TribbleBuyer]: {
    type: SpecialEventType.TribbleBuyer,
    price: 0,
    occurrence: 3,
    messageOnly: false,
  },
  [SpecialEventType.Wild]: {
    type: SpecialEventType.Wild,
    price: 0,
    occurrence: 1,
    messageOnly: false,
  },
  [SpecialEventType.WildGetsOut]: {
    type: SpecialEventType.WildGetsOut,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.Sculpture]: {
    type: SpecialEventType.Sculpture,
    price: -2000,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.SculptureDelivered]: {
    type: SpecialEventType.SculptureDelivered,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.SculptureHiddenBays]: {
    type: SpecialEventType.SculptureHiddenBays,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.Princess]: {
    type: SpecialEventType.Princess,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.PrincessCentauri]: {
    type: SpecialEventType.PrincessCentauri,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.PrincessInthara]: {
    type: SpecialEventType.PrincessInthara,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
  [SpecialEventType.PrincessQonos]: {
    type: SpecialEventType.PrincessQonos,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.PrincessQuantum]: {
    type: SpecialEventType.PrincessQuantum,
    price: 0,
    occurrence: 0,
    messageOnly: false,
  },
  [SpecialEventType.PrincessReturned]: {
    type: SpecialEventType.PrincessReturned,
    price: 0,
    occurrence: 0,
    messageOnly: true,
  },
};

// Special crew member IDs (non-hireable crew)

export const specialCrewMemberIds: Set<CrewMemberId> = new Set([
  CrewMemberId.Commander,
  CrewMemberId.Dragonfly,
  CrewMemberId.FamousCaptain,
  CrewMemberId.Jarek,
  CrewMemberId.Opponent,
  CrewMemberId.Princess,
  CrewMemberId.Scarab,
  CrewMemberId.Scorpion,
  CrewMemberId.SpaceMonster,
  CrewMemberId.Wild,
]);

// Equipment available for purchase

export const equipmentForSale: Equipment[] = [
  weapons[WeaponType.PulseLaser],
  weapons[WeaponType.BeamLaser],
  weapons[WeaponType.MilitaryLaser],
  weapons[WeaponType.PhotonDisruptor],
  shields[ShieldType.Energy],
  shields[ShieldType.Reflective],
  gadgets[GadgetType.ExtraCargoBays],
  gadgets[GadgetType.AutoRepairSystem],
  gadgets[GadgetType.NavigatingSystem],
  gadgets[GadgetType.TargetingSystem],
  gadgets[GadgetType.CloakingDevice],
];

// Ordered arrays derived from Records (for indexed iteration)

export const weaponsArray: WeaponEquipment[] = Object.values(weapons);
export const shieldsArray: ShieldEquipment[] = Object.values(shields);
export const gadgetsArray: GadgetEquipment[] = Object.values(gadgets);
export const politicalSystemsArray: PoliticalSystem[] =
  Object.values(politicalSystems);
export const shipSpecsArray: ShipSpec[] = Object.values(shipSpecs);
export const tradeItemsArray: TradeItem[] = Object.values(tradeItems);
export const specialEventsArray: SpecialEvent[] = Object.values(specialEvents);
