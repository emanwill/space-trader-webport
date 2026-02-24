import type { StarSystem } from "./starSystem";
import type { CrewMember } from "./crewMember";
import { createCommander } from "./commander";
import { createShip } from "./ship";
import type { GameState } from "./gameState";
import type { GameOptions } from "./gameOptions";
import {
  CrewMemberId,
  Difficulty,
  PoliticalSystemType,
  ShipType,
  ShipyardId,
  Size,
  SpecialEventType,
  SpecialResource,
  EncounterType,
  GameEndType,
  StarSystemId,
  SystemPressure,
  TechLevel,
  VeryRareEncounter,
} from "./enums";
import {
  CLOSE_DISTANCE,
  FABRIC_RIP_INITIAL_PROBABILITY,
  GALAXY_HEIGHT,
  GALAXY_WIDTH,
  MIN_DISTANCE,
  politicalSystemsArray,
  shipSpecsArray,
  shipyards,
  specialEventsArray,
  tradeItemsArray,
} from "./consts";
import { distance, getRandom, randomSkill, wormholeExists } from "./functions";
import { initializeTradeItems } from "./starSystem";

const UNIVERSE_SIZE = 128; // StarSystemId.Acamar(0) through StarSystemId.Zonama(127)
const NUM_WORMHOLES = 6;
const NUM_SHIPYARDS = Object.keys(shipyards).length;

// ---------------------------------------------------------------------------
// Universe generation
// ---------------------------------------------------------------------------

export function generateUniverse(): {
  universe: StarSystem[];
  wormholes: number[];
} {
  const universe: StarSystem[] = [];
  const wormholes: number[] = new Array(NUM_WORMHOLES).fill(0);

  for (let i = 0; i < UNIVERSE_SIZE; i++) {
    const id = i as StarSystemId;
    let pressure = SystemPressure.None;
    let specRes = SpecialResource.Nothing;
    let size = getRandom(Size.Huge + 1) as Size;
    let polSys = politicalSystemsArray[getRandom(politicalSystemsArray.length)];
    let tech = getRandom(polSys.minTech, polSys.maxTech + 1) as TechLevel;

    // Galvon must be a Monarchy
    if (id === StarSystemId.Galvon) {
      size = Size.Large;
      polSys = politicalSystemsArray[PoliticalSystemType.Monarchy];
      tech = TechLevel.HiTech;
    }

    if (getRandom(100) < 15) {
      pressure = getRandom(
        SystemPressure.War,
        SystemPressure.Employment + 1,
      ) as SystemPressure;
    }
    if (getRandom(5) >= 3) {
      specRes = getRandom(
        SpecialResource.MineralRich,
        SpecialResource.Warlike + 1,
      ) as SpecialResource;
    }

    let x = 0;
    let y = 0;

    if (i < NUM_WORMHOLES) {
      // Place the first systems in a 3x2 grid near center
      x =
        Math.trunc((GALAXY_WIDTH * (1 + 2 * (i % 3))) / 6) -
        getRandom(-CLOSE_DISTANCE + 1, CLOSE_DISTANCE);
      y =
        Math.trunc((GALAXY_HEIGHT * (i < 3 ? 1 : 3)) / 4) -
        getRandom(-CLOSE_DISTANCE + 1, CLOSE_DISTANCE);
      wormholes[i] = i;
    } else {
      // Place remaining systems with minimum distance and at least one neighbor
      let ok = false;
      while (!ok) {
        x = getRandom(1, GALAXY_WIDTH);
        y = getRandom(1, GALAXY_HEIGHT);

        let closeFound = false;
        let tooClose = false;
        for (let j = 0; j < i && !tooClose; j++) {
          if (distance(universe[j], { x, y }) < MIN_DISTANCE) {
            tooClose = true;
          }
          if (distance(universe[j], { x, y }) < CLOSE_DISTANCE) {
            closeFound = true;
          }
        }
        ok = closeFound && !tooClose;
      }
    }

    universe.push({
      id,
      x,
      y,
      size,
      techLevel: tech,
      politicalSystemType: polSys.type,
      systemPressure: pressure,
      specialResource: specRes,
      specialEventType: SpecialEventType.NA,
      tradeItems: new Array(10).fill(0),
      countDown: 0,
      visited: false,
      shipyardId: ShipyardId.NA,
    });
  }

  // Randomize system locations to prevent alphabetical clustering
  for (let i = 0; i < universe.length; i++) {
    const j = getRandom(universe.length);
    if (!wormholeExists(wormholes, j)) {
      const tempX = universe[i].x;
      const tempY = universe[i].y;
      universe[i] = { ...universe[i], x: universe[j].x, y: universe[j].y };
      universe[j] = { ...universe[j], x: tempX, y: tempY };

      const w = wormholes.indexOf(i);
      if (w >= 0) {
        wormholes[w] = j;
      }
    }
  }

  // Randomize wormhole order
  for (let i = 0; i < wormholes.length; i++) {
    const j = getRandom(wormholes.length);
    const temp = wormholes[i];
    wormholes[i] = wormholes[j];
    wormholes[j] = temp;
  }

  return { universe, wormholes };
}

// ---------------------------------------------------------------------------
// Crew generation
// ---------------------------------------------------------------------------

export function generateCrewMemberList(
  universe: StarSystem[],
  difficulty: Difficulty,
): CrewMember[] {
  const mercenaries: (CrewMember | null)[] = new Array(
    CrewMemberId.Scorpion + 1,
  ).fill(null);
  const used: number[] = new Array(universe.length).fill(0);
  const d = difficulty;

  // Zeethibal may be on Kravat — reserve a spot
  used[StarSystemId.Kravat] = 1;

  // Special individuals with fixed skills
  mercenaries[CrewMemberId.Zeethibal] = {
    id: CrewMemberId.Zeethibal,
    skills: [5, 5, 5, 5],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Opponent] = {
    id: CrewMemberId.Opponent,
    skills: [5, 5, 5, 5],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Wild] = {
    id: CrewMemberId.Wild,
    skills: [7, 10, 2, 5],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Jarek] = {
    id: CrewMemberId.Jarek,
    skills: [3, 2, 10, 4],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Princess] = {
    id: CrewMemberId.Princess,
    skills: [4, 3, 8, 9],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.FamousCaptain] = {
    id: CrewMemberId.FamousCaptain,
    skills: [10, 10, 10, 10],
    currentSystemId: StarSystemId.NA,
  };

  // Quest opponents — skills scaled by difficulty
  mercenaries[CrewMemberId.Dragonfly] = {
    id: CrewMemberId.Dragonfly,
    skills: [4 + d, 6 + d, 1, 6 + d],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Scarab] = {
    id: CrewMemberId.Scarab,
    skills: [5 + d, 6 + d, 1, 6 + d],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.Scorpion] = {
    id: CrewMemberId.Scorpion,
    skills: [8 + d, 8 + d, 1, 6 + d],
    currentSystemId: StarSystemId.NA,
  };
  mercenaries[CrewMemberId.SpaceMonster] = {
    id: CrewMemberId.SpaceMonster,
    skills: [8 + d, 8 + d, 1, 1 + d],
    currentSystemId: StarSystemId.NA,
  };

  // Regular mercenaries — random skills, placed in random systems (max 3 per system)
  for (let i = 1; i < mercenaries.length; i++) {
    if (mercenaries[i] === null) {
      let sysId: StarSystemId;
      do {
        sysId = getRandom(universe.length) as StarSystemId;
      } while (used[sysId] >= 3);
      used[sysId]++;

      mercenaries[i] = {
        id: i as CrewMemberId,
        skills: [randomSkill(), randomSkill(), randomSkill(), randomSkill()],
        currentSystemId: sysId,
      };
    }
  }

  return mercenaries as CrewMember[];
}

// ---------------------------------------------------------------------------
// FindDistantSystem
// ---------------------------------------------------------------------------

export function findDistantSystem(
  universe: StarSystem[],
  baseSystemId: StarSystemId,
  specEvent: SpecialEventType,
): boolean {
  let bestDistance = 999;
  let system = -1;

  for (let i = 0; i < universe.length; i++) {
    const d = distance(universe[baseSystemId], universe[i]);
    if (
      d >= 70 &&
      d < bestDistance &&
      universe[i].specialEventType === SpecialEventType.NA
    ) {
      system = i;
      bestDistance = d;
    }
  }

  if (system >= 0) {
    universe[system] = {
      ...universe[system],
      specialEventType: specEvent,
    };
  }

  return system >= 0;
}

// ---------------------------------------------------------------------------
// Shipyard placement
// ---------------------------------------------------------------------------

export function placeShipyards(universe: StarSystem[]): boolean {
  const hiTechSystems: number[] = [];
  for (let i = 0; i < universe.length; i++) {
    if (universe[i].techLevel === TechLevel.HiTech) {
      hiTechSystems.push(i);
    }
  }

  if (hiTechSystems.length < NUM_SHIPYARDS) return false;

  for (let s = 0; s < NUM_SHIPYARDS; s++) {
    const idx = hiTechSystems[getRandom(hiTechSystems.length)];
    universe[idx] = {
      ...universe[idx],
      shipyardId: s as ShipyardId,
    };
  }

  return true;
}

// ---------------------------------------------------------------------------
// Special event placement
// ---------------------------------------------------------------------------

export function placeSpecialEvents(
  universe: StarSystem[],
  wormholes: number[],
): boolean {
  // Hard-coded event placements
  universe[StarSystemId.Baratas] = {
    ...universe[StarSystemId.Baratas],
    specialEventType: SpecialEventType.DragonflyBaratas,
  };
  universe[StarSystemId.Melina] = {
    ...universe[StarSystemId.Melina],
    specialEventType: SpecialEventType.DragonflyMelina,
  };
  universe[StarSystemId.Regulas] = {
    ...universe[StarSystemId.Regulas],
    specialEventType: SpecialEventType.DragonflyRegulas,
  };
  universe[StarSystemId.Zalkon] = {
    ...universe[StarSystemId.Zalkon],
    specialEventType: SpecialEventType.DragonflyDestroyed,
  };
  universe[StarSystemId.Daled] = {
    ...universe[StarSystemId.Daled],
    specialEventType: SpecialEventType.ExperimentStopped,
  };
  universe[StarSystemId.Gemulon] = {
    ...universe[StarSystemId.Gemulon],
    specialEventType: SpecialEventType.GemulonRescued,
  };
  universe[StarSystemId.Japori] = {
    ...universe[StarSystemId.Japori],
    specialEventType: SpecialEventType.JaporiDelivery,
  };
  universe[StarSystemId.Devidia] = {
    ...universe[StarSystemId.Devidia],
    specialEventType: SpecialEventType.JarekGetsOut,
  };
  universe[StarSystemId.Utopia] = {
    ...universe[StarSystemId.Utopia],
    specialEventType: SpecialEventType.MoonRetirement,
  };
  universe[StarSystemId.Nix] = {
    ...universe[StarSystemId.Nix],
    specialEventType: SpecialEventType.ReactorDelivered,
  };
  universe[StarSystemId.Acamar] = {
    ...universe[StarSystemId.Acamar],
    specialEventType: SpecialEventType.SpaceMonsterKilled,
  };
  universe[StarSystemId.Kravat] = {
    ...universe[StarSystemId.Kravat],
    specialEventType: SpecialEventType.WildGetsOut,
  };
  universe[StarSystemId.Endor] = {
    ...universe[StarSystemId.Endor],
    specialEventType: SpecialEventType.SculptureDelivered,
  };
  universe[StarSystemId.Galvon] = {
    ...universe[StarSystemId.Galvon],
    specialEventType: SpecialEventType.Princess,
  };
  universe[StarSystemId.Centauri] = {
    ...universe[StarSystemId.Centauri],
    specialEventType: SpecialEventType.PrincessCentauri,
  };
  universe[StarSystemId.Inthara] = {
    ...universe[StarSystemId.Inthara],
    specialEventType: SpecialEventType.PrincessInthara,
  };
  universe[StarSystemId.Qonos] = {
    ...universe[StarSystemId.Qonos],
    specialEventType: SpecialEventType.PrincessQonos,
  };

  // Assign Scarab to a wormhole endpoint without a special event
  let system: number;
  for (
    system = 0;
    system < wormholes.length &&
    universe[wormholes[system]].specialEventType !== SpecialEventType.NA;
    system++
  );
  if (system < wormholes.length) {
    universe[wormholes[system]] = {
      ...universe[wormholes[system]],
      specialEventType: SpecialEventType.ScarabDestroyed,
    };
  } else {
    return false;
  }

  // Find a Hi-Tech system without a special event for Artifact
  for (
    system = 0;
    system < universe.length &&
    !(
      universe[system].specialEventType === SpecialEventType.NA &&
      universe[system].techLevel === TechLevel.HiTech
    );
    system++
  );
  if (system < universe.length) {
    universe[system] = {
      ...universe[system],
      specialEventType: SpecialEventType.ArtifactDelivery,
    };
  } else {
    return false;
  }

  // Distance-based placements (closest system >= 70 parsecs from base)
  if (!findDistantSystem(universe, StarSystemId.Nix, SpecialEventType.Reactor))
    return false;
  if (
    !findDistantSystem(universe, StarSystemId.Gemulon, SpecialEventType.Gemulon)
  )
    return false;
  if (
    !findDistantSystem(
      universe,
      StarSystemId.Daled,
      SpecialEventType.Experiment,
    )
  )
    return false;
  if (
    !findDistantSystem(universe, StarSystemId.Endor, SpecialEventType.Sculpture)
  )
    return false;

  // Assign remaining events randomly based on occurrence counts
  for (let i = 0; i < specialEventsArray.length; i++) {
    for (let j = 0; j < specialEventsArray[i].occurrence; j++) {
      let s: number;
      do {
        s = getRandom(universe.length);
      } while (universe[s].specialEventType !== SpecialEventType.NA);

      universe[s] = {
        ...universe[s],
        specialEventType: specialEventsArray[i].type,
      };
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// Very rare encounters
// ---------------------------------------------------------------------------

export function resetVeryRareEncounters(): VeryRareEncounter[] {
  return [
    VeryRareEncounter.MarieCeleste,
    VeryRareEncounter.CaptainAhab,
    VeryRareEncounter.CaptainConrad,
    VeryRareEncounter.CaptainHuie,
    VeryRareEncounter.BottleOld,
    VeryRareEncounter.BottleGood,
  ];
}

// ---------------------------------------------------------------------------
// Full game initialization
// ---------------------------------------------------------------------------

export function initializeNewGame(
  commanderName: string,
  difficulty: Difficulty,
  pilotSkill: number,
  fighterSkill: number,
  traderSkill: number,
  engineerSkill: number,
  options: GameOptions,
): GameState {
  // Generate universe — retry until valid placement
  let universe: StarSystem[];
  let wormholes: number[];
  let good: boolean;

  do {
    ({ universe, wormholes } = generateUniverse());
    good = placeShipyards(universe);
    if (good) {
      good = placeSpecialEvents(universe, wormholes);
    }
  } while (!good);

  // Generate crew
  const mercenaries = generateCrewMemberList(universe, difficulty);

  // Create commander at a random system
  const startSystem = getRandom(universe.length) as StarSystemId;
  const commander = createCommander(
    commanderName,
    pilotSkill,
    fighterSkill,
    traderSkill,
    engineerSkill,
    startSystem,
  );

  // Give commander a Gnat ship
  const gnatSpec = shipSpecsArray.find((s) => s.type === ShipType.Gnat)!;
  const commanderShip = createShip(gnatSpec);
  commander.ship = commanderShip;

  // Mark start system as visited
  universe[startSystem] = { ...universe[startSystem], visited: true };

  // Initialize trade items for all systems
  for (let i = 0; i < universe.length; i++) {
    const polSys = politicalSystemsArray[universe[i].politicalSystemType];
    universe[i] = {
      ...universe[i],
      tradeItems: initializeTradeItems(
        universe[i],
        tradeItemsArray,
        polSys,
        difficulty,
      ),
    };
  }

  // Create special quest ships
  const dragonflySpec = shipSpecsArray.find(
    (s) => s.type === ShipType.Dragonfly,
  )!;
  const scarabSpec = shipSpecsArray.find((s) => s.type === ShipType.Scarab)!;
  const scorpionSpec = shipSpecsArray.find(
    (s) => s.type === ShipType.Scorpion,
  )!;
  const spaceMonsterSpec = shipSpecsArray.find(
    (s) => s.type === ShipType.SpaceMonster,
  )!;

  return {
    universe,
    wormholes,
    mercenaries,
    commander,

    dragonfly: createShip(dragonflySpec),
    scarab: createShip(scarabSpec),
    scorpion: createShip(scorpionSpec),
    spaceMonster: createShip(spaceMonsterSpec),
    opponent: createShip(gnatSpec),

    opponentDisabled: false,
    chanceOfTradeInOrbit: 100,
    clicks: 0,
    raided: false,
    inspected: false,
    tribbleMessage: false,
    arrivedViaWormhole: false,
    paidForNewspaper: false,
    litterWarning: false,
    newsEvents: [],

    difficulty,
    cheatEnabled: false,
    autoSave: false,
    easyEncounters: false,
    endStatus: GameEndType.NA,
    encounterType: EncounterType.BottleGood, // initial placeholder
    selectedSystemId: StarSystemId.NA,
    warpSystemId: StarSystemId.NA,
    trackedSystemId: StarSystemId.NA,
    targetWormhole: false,
    priceCargoBuy: new Array(10).fill(0),
    priceCargoSell: new Array(10).fill(0),

    questStatusArtifact: 0,
    questStatusDragonfly: 0,
    questStatusExperiment: 0,
    questStatusGemulon: 0,
    questStatusJapori: 0,
    questStatusJarek: 0,
    questStatusMoon: 0,
    questStatusPrincess: 0,
    questStatusReactor: 0,
    questStatusScarab: 0,
    questStatusSculpture: 0,
    questStatusSpaceMonster: 0,
    questStatusWild: 0,

    fabricRipProbability: FABRIC_RIP_INITIAL_PROBABILITY,
    justLootedMarie: false,
    canSuperWarp: false,
    chanceOfVeryRareEncounter: 5,
    veryRareEncounters: resetVeryRareEncounters(),
    options,
  };
}
