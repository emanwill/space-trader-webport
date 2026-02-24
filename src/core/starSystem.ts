import {
  PoliticalSystemType,
  ShipyardId,
  Size,
  SpecialEventType,
  SpecialResource,
  StarSystemId,
  SystemPressure,
  TechLevel,
  TradeItemType,
} from "./enums";
import type { PoliticalSystem } from "./politicalSystem";
import type { TradeItem } from "./tradeItem";

export interface StarSystem {
  id: StarSystemId;
  x: number;
  y: number;
  size: Size;
  techLevel: TechLevel;
  politicalSystemType: PoliticalSystemType;
  systemPressure: SystemPressure;
  specialResource: SpecialResource;
  specialEventType: SpecialEventType;
  tradeItems: number[]; // quantities per TradeItemType
  countDown: number;
  visited: boolean;
  shipyardId: ShipyardId;
}

export const systemNames: Record<StarSystemId, string> = {
  [StarSystemId.NA]: "",
  [StarSystemId.Acamar]: "Acamar",
  [StarSystemId.Adahn]: "Adahn",
  [StarSystemId.Aldea]: "Aldea",
  [StarSystemId.Andevian]: "Andevian",
  [StarSystemId.Antedi]: "Antedi",
  [StarSystemId.Balosnee]: "Balosnee",
  [StarSystemId.Baratas]: "Baratas",
  [StarSystemId.Brax]: "Brax",
  [StarSystemId.Bretel]: "Bretel",
  [StarSystemId.Calondia]: "Calondia",
  [StarSystemId.Campor]: "Campor",
  [StarSystemId.Capelle]: "Capelle",
  [StarSystemId.Carzon]: "Carzon",
  [StarSystemId.Castor]: "Castor",
  [StarSystemId.Cestus]: "Cestus",
  [StarSystemId.Cheron]: "Cheron",
  [StarSystemId.Courteney]: "Courteney",
  [StarSystemId.Daled]: "Daled",
  [StarSystemId.Damast]: "Damast",
  [StarSystemId.Davlos]: "Davlos",
  [StarSystemId.Deneb]: "Deneb",
  [StarSystemId.Deneva]: "Deneva",
  [StarSystemId.Devidia]: "Devidia",
  [StarSystemId.Draylon]: "Draylon",
  [StarSystemId.Drema]: "Drema",
  [StarSystemId.Endor]: "Endor",
  [StarSystemId.Esmee]: "Esmee",
  [StarSystemId.Exo]: "Exo",
  [StarSystemId.Ferris]: "Ferris",
  [StarSystemId.Festen]: "Festen",
  [StarSystemId.Fourmi]: "Fourmi",
  [StarSystemId.Frolix]: "Frolix",
  [StarSystemId.Gemulon]: "Gemulon",
  [StarSystemId.Guinifer]: "Guinifer",
  [StarSystemId.Hades]: "Hades",
  [StarSystemId.Hamlet]: "Hamlet",
  [StarSystemId.Helena]: "Helena",
  [StarSystemId.Hulst]: "Hulst",
  [StarSystemId.Iodine]: "Iodine",
  [StarSystemId.Iralius]: "Iralius",
  [StarSystemId.Janus]: "Janus",
  [StarSystemId.Japori]: "Japori",
  [StarSystemId.Jarada]: "Jarada",
  [StarSystemId.Jason]: "Jason",
  [StarSystemId.Kaylon]: "Kaylon",
  [StarSystemId.Khefka]: "Khefka",
  [StarSystemId.Kira]: "Kira",
  [StarSystemId.Klaatu]: "Klaatu",
  [StarSystemId.Klaestron]: "Klaestron",
  [StarSystemId.Korma]: "Korma",
  [StarSystemId.Kravat]: "Kravat",
  [StarSystemId.Krios]: "Krios",
  [StarSystemId.Laertes]: "Laertes",
  [StarSystemId.Largo]: "Largo",
  [StarSystemId.Lave]: "Lave",
  [StarSystemId.Ligon]: "Ligon",
  [StarSystemId.Lowry]: "Lowry",
  [StarSystemId.Magrat]: "Magrat",
  [StarSystemId.Malcoria]: "Malcoria",
  [StarSystemId.Melina]: "Melina",
  [StarSystemId.Mentar]: "Mentar",
  [StarSystemId.Merik]: "Merik",
  [StarSystemId.Mintaka]: "Mintaka",
  [StarSystemId.Montor]: "Montor",
  [StarSystemId.Mordan]: "Mordan",
  [StarSystemId.Myrthe]: "Myrthe",
  [StarSystemId.Nelvana]: "Nelvana",
  [StarSystemId.Nix]: "Nix",
  [StarSystemId.Nyle]: "Nyle",
  [StarSystemId.Odet]: "Odet",
  [StarSystemId.Og]: "Og",
  [StarSystemId.Omega]: "Omega",
  [StarSystemId.Omphalos]: "Omphalos",
  [StarSystemId.Orias]: "Orias",
  [StarSystemId.Othello]: "Othello",
  [StarSystemId.Parade]: "Parade",
  [StarSystemId.Penthara]: "Penthara",
  [StarSystemId.Picard]: "Picard",
  [StarSystemId.Pollux]: "Pollux",
  [StarSystemId.Quator]: "Quator",
  [StarSystemId.Rakhar]: "Rakhar",
  [StarSystemId.Ran]: "Ran",
  [StarSystemId.Regulas]: "Regulas",
  [StarSystemId.Relva]: "Relva",
  [StarSystemId.Rhymus]: "Rhymus",
  [StarSystemId.Rochani]: "Rochani",
  [StarSystemId.Rubicum]: "Rubicum",
  [StarSystemId.Rutia]: "Rutia",
  [StarSystemId.Sarpeidon]: "Sarpeidon",
  [StarSystemId.Sefalla]: "Sefalla",
  [StarSystemId.Seltrice]: "Seltrice",
  [StarSystemId.Sigma]: "Sigma",
  [StarSystemId.Sol]: "Sol",
  [StarSystemId.Somari]: "Somari",
  [StarSystemId.Stakoron]: "Stakoron",
  [StarSystemId.Styris]: "Styris",
  [StarSystemId.Talani]: "Talani",
  [StarSystemId.Tamus]: "Tamus",
  [StarSystemId.Tantalos]: "Tantalos",
  [StarSystemId.Tanuga]: "Tanuga",
  [StarSystemId.Tarchannen]: "Tarchannen",
  [StarSystemId.Terosa]: "Terosa",
  [StarSystemId.Thera]: "Thera",
  [StarSystemId.Titan]: "Titan",
  [StarSystemId.Torin]: "Torin",
  [StarSystemId.Triacus]: "Triacus",
  [StarSystemId.Turkana]: "Turkana",
  [StarSystemId.Tyrus]: "Tyrus",
  [StarSystemId.Umberlee]: "Umberlee",
  [StarSystemId.Utopia]: "Utopia",
  [StarSystemId.Vadera]: "Vadera",
  [StarSystemId.Vagra]: "Vagra",
  [StarSystemId.Vandor]: "Vandor",
  [StarSystemId.Ventax]: "Ventax",
  [StarSystemId.Xenon]: "Xenon",
  [StarSystemId.Xerxes]: "Xerxes",
  [StarSystemId.Yew]: "Yew",
  [StarSystemId.Yojimbo]: "Yojimbo",
  [StarSystemId.Zalkon]: "Zalkon",
  [StarSystemId.Zuul]: "Zuul",
  [StarSystemId.Centauri]: "Centauri",
  [StarSystemId.Galvon]: "Galvon",
  [StarSystemId.Inthara]: "Inthara",
  [StarSystemId.Meridian]: "Meridian",
  [StarSystemId.Qonos]: "Qonos",
  [StarSystemId.Rae]: "Rae",
  [StarSystemId.Weytahn]: "Weytahn",
  [StarSystemId.Zonama]: "Zonama",
};

export function getSystemName(system: StarSystem): string {
  return systemNames[system.id];
}

export function itemTraded(
  system: StarSystem,
  item: TradeItem,
  politicalSystem: PoliticalSystem,
): boolean {
  return (
    (item.type !== TradeItemType.Narcotics || politicalSystem.drugsOk) &&
    (item.type !== TradeItemType.Firearms || politicalSystem.firearmsOk) &&
    system.techLevel >= item.techProduction
  );
}

export function itemUsed(
  system: StarSystem,
  item: TradeItem,
  politicalSystem: PoliticalSystem,
): boolean {
  return (
    (item.type !== TradeItemType.Narcotics || politicalSystem.drugsOk) &&
    (item.type !== TradeItemType.Firearms || politicalSystem.firearmsOk) &&
    system.techLevel >= item.techUsage
  );
}
