import type { SpriteId } from "./SpriteImage";
import SpriteImage from "./SpriteImage";
import spritesheet from "./assets/spritesheet.json";

export type ShipType = Extract<
  SpriteId,
  | "sm"
  | "ship10"
  | "ship9"
  | "ship8"
  | "ship7"
  | "ship6"
  | "ship5"
  | "ship4"
  | "ship3"
  | "ship2"
  | "ship1"
  | "ship0"
  | "scorp"
  | "scarab"
  | "mantis"
  | "df"
  | "bottle"
>;

const shipSprites: {
  // ship type -> [ship, ship+damage, ship+shield, ship+shield+damage]
  [key in ShipType]: [SpriteId, SpriteId, SpriteId, SpriteId];
} = {
  sm: ["sm", "smd", "sm", "smd"],
  ship10: ["ship10", "ship10d", "ship10s", "ship10sd"],
  ship9: ["ship9", "ship9d", "ship9s", "ship9sd"],
  ship8: ["blank", "blank", "blank", "blank"],
  ship7: ["blank", "blank", "blank", "blank"],
  ship6: ["blank", "blank", "blank", "blank"],
  ship5: ["blank", "blank", "blank", "blank"],
  ship4: ["blank", "blank", "blank", "blank"],
  ship3: ["blank", "blank", "blank", "blank"],
  ship2: ["blank", "blank", "blank", "blank"],
  ship1: ["ship1", "ship1d", "ship1", "ship1d"],
  ship0: ["ship0", "ship0d", "ship0", "ship0d"],
  scorp: ["blank", "blank", "blank", "blank"],
  scarab: ["blank", "blank", "blank", "blank"],
  mantis: ["blank", "blank", "blank", "blank"],
  df: ["blank", "blank", "blank", "blank"],
  bottle: ["bottle", "bottled", "bottle", "bottled"],
};

const shipImageOffsets: {
  [key in ShipType]: [number, number, number, number];
} = {
  ship0: [22, 0, 19, 0], // flea
  ship1: [18, 0, 27, 0], // gnat
  ship2: [18, 0, 27, 0], // firefly
  ship3: [18, 0, 27, 0], // mosquito
  ship4: [12, 0, 40, 0], // bumblebee
  ship5: [12, 0, 40, 0], // beetle
  ship6: [7, 0, 50, 0], // hornet
  ship7: [7, 0, 50, 0], // grasshopper
  ship8: [2, 0, 60, 0], // termite
  ship9: [2, 0, 60, 0], // wasp
  sm: [7, 0, 49, 0], // space monster
  df: [21, 0, 22, 0], // dragonfly
  mantis: [15, 0, 34, 0], // mantis
  scarab: [7, 0, 49, 0], // scarab
  bottle: [9, 0, 46, 0], // bottle
  ship10: [2, 0, 60, 0], // custom ship
  scorp: [2, 0, 60, 0], // scorpion
};

export function ShipImage(p: {
  shipType: ShipType;
  hull: number;
  hullMax: number;
  shield: number;
  shieldMax: number;
}) {
  const [x, , w] = shipImageOffsets[p.shipType];

  const startDamage = Math.floor(x + w - (p.hull * w) / p.hullMax);

  const startShield =
    x + w + 2 - (p.shieldMax > 0 ? (p.shield * (w + 4)) / p.shieldMax : 0);

  const isDamaged = startDamage > x;

  const [img, imgDmg, imgShield, imgDmgShield] = shipSprites[p.shipType];

  return (
    <div
      style={{
        position: "relative",
        width: spritesheet.frames[p.shipType].frame.w,
        height: spritesheet.frames[p.shipType].frame.h,
      }}
    >
      {/* <SpriteImage
        spriteId="blank"
        style={{ position: "absolute", top: 0, left: 0 }}
      /> */}
      {isDamaged && startShield > x ? (
        <SpriteImage
          spriteId={imgDmg}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${Math.min(startDamage, startShield)}px 0 ${x}px)`,
          }}
        />
      ) : null}
      {isDamaged && startShield < startDamage ? (
        <SpriteImage
          spriteId={imgDmgShield}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${startDamage}px 0 ${startShield}px)`,
          }}
        />
      ) : null}
      {startShield > startDamage ? (
        <SpriteImage
          spriteId={img}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${startShield}px 0 ${startDamage}px)`,
          }}
        />
      ) : null}
      {startShield < x + w + 2 ? (
        <SpriteImage
          spriteId={imgShield}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${x + w + 2}px 0 ${startShield}px)`,
          }}
        />
      ) : null}
    </div>
  );
}

/*
"smd"
"sm"
"ship10sd"
"ship10s"
"ship10d"
"ship10"
"ship9sd"
"ship9s"
"ship9d"
"ship9"
"ship8sd"
"ship8s"
"ship8d"
"ship8"
"ship7sd"
"ship7s"
"ship7d"
"ship7"
"ship6sd"
"ship6s"
"ship6d"
"ship6"
"ship5sd"
"ship5s"
"ship5d"
"ship5"
"ship4sd"
"ship4s"
"ship4d"
"ship4"
"ship3sd"
"ship3s"
"ship3d"
"ship3"
"ship2sd"
"ship2s"
"ship2d"
"ship2"
"ship1d"
"ship1"
"ship0d"
"ship0"
"scorpsd"
"scorps"
"scorpd"
"scorp"
"scarabsd"
"scarabs"
"scarabd"
"scarab"
"mantissd"
"mantiss"
"mantisd"
"mantis"
"dummy_ship"
"dfsd"
"dfs"
"dfd"
"df"
"bottled"
"bottle"
"blank"
*/
