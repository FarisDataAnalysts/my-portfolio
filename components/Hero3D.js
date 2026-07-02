"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Each bar acts like a candlestick from a stock chart, breathing gently
// and lifting further on mouse proximity — a nod to Faris's PSX trading
// background and his day-to-day work turning raw data into readable shape.
function Bars() {
  const group = useRef();
  const count = 28;

  const bars = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      x: (i - count / 2) * 0.55,
      base: 0.4 + Math.random() * 1.6,
      speed: 0.5 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2,
      gold: Math.random() > 0.75,
    }));
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((mesh, i) => {
      const b = bars[i];
      const wave = Math.sin(t * b.speed + b.offset) * 0.35;
      const proximity = Math.max(0, 1 - Math.abs(mouse.x * 7 - b.x) / 3);
      const h = b.base + wave + proximity * 1.2;
      mesh.scale.y = Math.max(0.15, h);
      mesh.position.y = mesh.scale.y / 2 - 1.2;
    });
    group.current.rotation.y = mouse.x * 0.15;
  });

  return (
    <group ref={group}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, 0, 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial
            color={b.gold ? "#D4A947" : "#00D9B5"}
            emissive={b.gold ? "#D4A947" : "#00D9B5"}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1.5, 9], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#00D9B5" />
        <pointLight position={[-5, 3, -5]} intensity={20} color="#D4A947" />
        <Bars />
        <fog attach="fog" args={["#0B0F1A", 8, 16]} />
      </Canvas>
    </div>
  );
}
