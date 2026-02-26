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
  ship8: ["ship8", "ship8d", "ship8s", "ship8sd"],
  ship7: ["ship7", "ship7d", "ship7s", "ship7sd"],
  ship6: ["ship6", "ship6d", "ship6s", "ship6sd"],
  ship5: ["ship5", "ship5d", "ship5s", "ship5sd"],
  ship4: ["ship4", "ship4d", "ship4s", "ship4sd"],
  ship3: ["ship3", "ship3d", "ship3s", "ship3sd"],
  ship2: ["ship2", "ship2d", "ship2s", "ship2sd"],
  ship1: ["ship1", "ship1d", "ship1", "ship1d"],
  ship0: ["ship0", "ship0d", "ship0", "ship0d"],
  scorp: ["scorp", "scorpd", "scorps", "scorpsd"],
  scarab: ["scarab", "scarabd", "scarabs", "scarabsd"],
  mantis: ["mantis", "mantisd", "mantiss", "mantissd"],
  df: ["df", "dfd", "dfs", "dfsd"],
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
  df: [21, 0, 22, 0], // dragonfly (note: shield graphic has 16px 'thickness')
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
  scale?: number;
  backgroundColor?: string;
}) {
  const scale = p.scale ?? 1;

  // Dragonfly (df) ship has a unique shield graphic
  const shieldThickness = p.shipType === "df" ? 16 : 2;

  const [hullImg, dmgImg, shieldImg] = shipSprites[p.shipType];
  const frame = spritesheet.frames[p.shipType].frame;
  const [shipMarginL, , shipW] = shipImageOffsets[p.shipType];

  const dmgWidth = Math.floor(((p.hullMax - p.hull) * shipW) / p.hullMax);
  const shieldWidth =
    p.shieldMax > 0
      ? Math.floor((p.shield * (shipW + 2 * shieldThickness)) / p.shieldMax)
      : 0;

  const dmgClipL = shipMarginL * scale;
  const dmgClipR = (frame.w - (shipMarginL + dmgWidth)) * scale;
  const shieldClipL =
    (shipMarginL + shipW + shieldThickness - shieldWidth) * scale;
  const shieldClipR =
    (frame.w - (shipMarginL + shipW + shieldThickness)) * scale;

  return (
    <div
      style={{
        position: "relative",
        width: frame.w * scale,
        height: frame.h * scale,
        flexShrink: 0,
        backgroundColor: p.backgroundColor ?? "#ffffff",
      }}
    >
      <SpriteImage
        spriteId={hullImg}
        scale={scale}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {shieldWidth > 0 ? (
        <SpriteImage
          spriteId={shieldImg}
          scale={scale}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${shieldClipR}px 0 ${shieldClipL}px)`,
          }}
        />
      ) : null}
      {dmgWidth > 0 ? (
        <SpriteImage
          spriteId={dmgImg}
          scale={scale}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${dmgClipR}px 0 ${dmgClipL}px)`,
          }}
        />
      ) : null}
    </div>
  );
}
