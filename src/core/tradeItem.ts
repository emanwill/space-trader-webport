import {
  SpecialResource,
  SystemPressure,
  TechLevel,
  TradeItemType,
} from "./enums";

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
  return item.type === TradeItemType.Firearms || item.type === TradeItemType.Narcotics;
}

export function compareTradeItems(a: TradeItem, b: TradeItem): number {
  if (a.priceLowTech !== b.priceLowTech) return a.priceLowTech - b.priceLowTech;
  return b.priceInc - a.priceInc;
}
