import spritesheet from "./assets/spritesheet.json";
import texture from "./assets/spritesheet.png";

export type SpriteId = keyof typeof spritesheet.frames;

export type SpriteImageProps = React.HTMLAttributes<HTMLDivElement> & {
  spriteId: SpriteId;
  scale?: number;
};

export default function SpriteImage({
  spriteId,
  style,
  scale = 1,
  ...rest
}: SpriteImageProps) {
  const { x, y, w, h } = spritesheet.frames[spriteId].frame;
  const { w: sheetW, h: sheetH } = spritesheet.meta.size;

  return (
    <div
      role="img"
      {...rest}
      style={{
        width: w * scale,
        height: h * scale,
        backgroundImage: `url(${texture})`,
        backgroundPosition: `-${x * scale}px -${y * scale}px`,
        backgroundSize: `${sheetW * scale}px ${sheetH * scale}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
