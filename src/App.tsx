import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SpriteImage from "./SpriteImage";
import { ShipImage } from "./ShipImage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <SpriteImage spriteId="scarabs" />
      <div className="flex flex-row gap-2">
        <ShipImage
          shipType="ship9"
          hull={50}
          hullMax={100}
          shield={5}
          shieldMax={20}
        />
        <ShipImage
          shipType="ship9"
          hull={100}
          hullMax={100}
          shield={0}
          shieldMax={0}
        />
        <ShipImage
          shipType="ship9"
          hull={100}
          hullMax={100}
          shield={20}
          shieldMax={20}
        />
        <ShipImage
          shipType="ship9"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="scarab"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="bottle"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="df"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="df"
          hull={50}
          hullMax={100}
          shield={12}
          shieldMax={20}
        />
        <ShipImage
          shipType="df"
          hull={50}
          hullMax={100}
          shield={7}
          shieldMax={20}
        />
        <ShipImage
          shipType="df"
          hull={50}
          hullMax={100}
          shield={2}
          shieldMax={20}
        />
        <ShipImage
          shipType="sm"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="ship1"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
        <ShipImage
          shipType="ship5"
          hull={50}
          hullMax={100}
          shield={17}
          shieldMax={20}
        />
      </div>
    </>
  );
}

export default App;
