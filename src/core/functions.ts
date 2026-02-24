import type { StarSystem } from "./starSystem";
import { Difficulty } from "./enums";

// ---------------------------------------------------------------------------
// List formatting templates (from Strings.cs ListStrings)
// ---------------------------------------------------------------------------

const listStrings = [
  "",
  "^1",
  "^1 and ^2",
  "^1, ^2, and ^3",
  "^1, ^2, ^3, and ^4",
];

// ---------------------------------------------------------------------------
// Spatial
// ---------------------------------------------------------------------------

export function distance(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.floor(Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2));
}

// ---------------------------------------------------------------------------
// Random
// ---------------------------------------------------------------------------

export function getRandom(max: number): number;
export function getRandom(min: number, max: number): number;
export function getRandom(minOrMax: number, max?: number): number {
  if (max === undefined) {
    return Math.floor(Math.random() * minOrMax);
  }
  return minOrMax + Math.floor(Math.random() * (max - minOrMax));
}

export function randomSkill(): number {
  return 1 + getRandom(5) + getRandom(6);
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatMoney(num: number): string {
  return formatNumber(num) + " cr.";
}

export function formatPercent(num: number): string {
  return formatNumber(num) + "%";
}

export function multiples(num: number, unit: string): string {
  return formatNumber(num) + " " + unit + (num === 1 ? "" : "s");
}

export function stringVars(template: string, ...vars: string[]): string {
  let result = template;
  for (let i = 0; i < vars.length; i++) {
    result = result.replace("^" + (i + 1), vars[i]);
  }
  return result;
}

export function formatList(items: string[]): string {
  if (items.length >= listStrings.length) {
    return items.join(", ");
  }
  return stringVars(listStrings[items.length], ...items);
}

// ---------------------------------------------------------------------------
// Game helpers
// ---------------------------------------------------------------------------

export function adjustSkillForDifficulty(
  skill: number,
  difficulty: Difficulty,
): number {
  if (difficulty <= Difficulty.Easy) {
    return skill + 1;
  }
  if (difficulty >= Difficulty.Hard) {
    return skill - 1;
  }
  return skill;
}

export function wormholeExists(
  wormholes: number[],
  a: number,
  b?: number,
): boolean {
  const i = wormholes.indexOf(a);
  if (i < 0) return false;
  if (b === undefined || b < 0) return true;
  return wormholes[(i + 1) % wormholes.length] === b;
}

export function wormholeTarget(
  wormholes: number[],
  universe: StarSystem[],
  a: number,
): StarSystem | null {
  const i = wormholes.indexOf(a);
  if (i < 0) return null;
  return universe[wormholes[(i + 1) % wormholes.length]];
}
