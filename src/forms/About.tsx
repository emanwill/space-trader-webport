import SpriteImage from "../SpriteImage";

export default function About() {
  return (
    <div>
      <h2>Space Trader for Web 2.01</h2>
      {/* TODO: copyright of web port */}
      <p>Windows version copyright © 2005 by Jay French</p>
      <p>spacetrader@frenchfryz.com</p>
      <p>Palm version copyright © 2000-2002 by Peter Spronk</p>
      <p>space_trader@hotmail.com</p>
      <p>Pictures copyright © 2000 by Alexander Lawrence</p>
      <p>This game is freeware under a GNU General Public License.</p>
      <a href="http://spacetraderwin.sourceforge.net/">
        http://spacetraderwin.sourceforge.net/
      </a>
      <SpriteImage spriteId="splash" />
    </div>
  );
}
