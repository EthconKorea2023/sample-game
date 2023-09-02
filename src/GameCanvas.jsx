import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

export default function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
        position: [0, 0, 0],
      }}
      onPointerDown={(e) => {
        e.target.requestPointerLock();
      }}
    >
      <Experience />
    </Canvas>
  );
}
