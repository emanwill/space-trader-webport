import {
  SpecialResource,
  SystemPressure,
  TechLevel,
  TradeItemType,
} from "./enums";
import type { PoliticalSystem } from "./politicalSystem";
import type { StarSystem } from "./starSystem";

export interface TradeItem {
  type: TradeItemType;
  techProduction: TechLevel;
  techUsage: TechLevel;
  techTopProduction: TechLevel;
  priceLowTech: number;
  priceInc: number;
  priceVariance: number;
  pressurePriceHike: SystemPressure;
  resourceLowPrice: SpecialResource;
  resourceHighPrice: SpecialResource;
  minTradePrice: number;
  maxTradePrice: number;
  roundOff: number;
}

export const tradeItemNames: Record<TradeItemType, string> = {
  [TradeItemType.NA]: "",
  [TradeItemType.Water]: "Water",
  [TradeItemType.Furs]: "Furs",
  [TradeItemType.Food]: "Food",
  [TradeItemType.Ore]: "Ore",
  [TradeItemType.Games]: "Games",
  [TradeItemType.Firearms]: "Firearms",
  [TradeItemType.Medicine]: "Medicine",
  [TradeItemType.Machines]: "Machines",
  [TradeItemType.Narcotics]: "Narcotics",
  [TradeItemType.Robots]: "Robots",
};

export function getTradeItemName(item: TradeItem): string {
  return tradeItemNames[item.type];
}

export function isIllegal(item: TradeItem): boolean {
  return (
    item.type === TradeItemType.Firearms ||
    item.type === TradeItemType.Narcotics
  );
}

export function compareTradeItems(a: TradeItem, b: TradeItem): number {
  if (a.priceLowTech !== b.priceLowTech) return a.priceLowTech - b.priceLowTech;
  return b.priceInc - a.priceInc;
}

export function standardPrice(
  item: TradeItem,
  system: StarSystem,
  politicalSystem: PoliticalSystem,
): number {
  if (
    (item.type === TradeItemType.Narcotics && !politicalSystem.drugsOk) ||
    (item.type === TradeItemType.Firearms && !politicalSystem.firearmsOk) ||
    system.techLevel < item.techUsage
  ) {
    return 0;
  }

  let price = item.priceLowTech + system.techLevel * item.priceInc;

  if (politicalSystem.wanted === item.type) {
    price = Math.trunc((price * 4) / 3);
  }

  price = Math.trunc(
    (price * (100 - 2 * politicalSystem.activityTraders)) / 100,
  );
  price = Math.trunc((price * (100 - system.size)) / 100);

  if (system.specialResource === item.resourceLowPrice) {
    price = Math.trunc((price * 3) / 4);
  } else if (system.specialResource === item.resourceHighPrice) {
    price = Math.trunc((price * 4) / 3);
  }

  return price;
}
