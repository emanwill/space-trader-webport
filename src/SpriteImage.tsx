import spritesheet from "./assets/spritesheet.json";
import texture from "./assets/spritesheet.png";

export type SpriteId = keyof typeof spritesheet.frames;

export type SpriteImageProps = React.HTMLAttributes<HTMLDivElement> & {
  spriteId: SpriteId;
};

export default function SpriteImage({ spriteId, style, ...rest }: SpriteImageProps) {
  const { x, y, w, h } = spritesheet.frames[spriteId].frame;

  return (
    <div
      role="img"
      {...rest}
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${texture})`,
        backgroundPosition: `-${x}px -${y}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
