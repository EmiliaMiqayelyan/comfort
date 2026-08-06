"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  Line,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import type { Group } from "three";

type LightingPreset = "studio" | "soft" | "dramatic" | "product";
type EnvironmentPreset = "apartment" | "city" | "warehouse" | "sunset";

interface ViewerCanvasProps {
  color: string;
  scale: { h: number; d: number };
  autoRotate: boolean;
  exploded: boolean;
  wireframe: boolean;
  showDimensions: boolean;
  lighting: LightingPreset;
  environment: EnvironmentPreset;
  heightMm: number;
  depthMm: number;
}

const LIGHTING_PRESETS: Record<
  LightingPreset,
  { ambient: number; key: number; fill: number }
> = {
  studio: { ambient: 0.45, key: 1.2, fill: 0.35 },
  soft: { ambient: 0.65, key: 0.75, fill: 0.5 },
  dramatic: { ambient: 0.2, key: 1.6, fill: 0.15 },
  product: { ambient: 0.55, key: 1.0, fill: 0.45 },
};

export function ViewerCanvas({
  color,
  scale,
  autoRotate,
  exploded,
  wireframe,
  showDimensions,
  lighting,
  environment,
  heightMm,
  depthMm,
}: ViewerCanvasProps) {
  return (
    <Canvas
      className="h-full min-h-[420px] w-full"
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <PerspectiveCamera makeDefault position={[0.28, 0.12, 0.42]} fov={38} />
      <color attach="background" args={["#f5f5f2"]} />
      <ambientLight intensity={LIGHTING_PRESETS[lighting].ambient} />
      <directionalLight
        castShadow
        position={[3, 4, 2]}
        intensity={LIGHTING_PRESETS[lighting].key}
      />
      <directionalLight
        position={[-2, 1.5, -1]}
        intensity={LIGHTING_PRESETS[lighting].fill}
      />
      <Environment preset={environment} />
      <ContactShadows
        position={[0, -0.08, 0]}
        opacity={0.35}
        scale={2.2}
        blur={2.4}
        far={1.2}
      />
      <BaseboardMesh
        color={color}
        scale={scale}
        autoRotate={autoRotate}
        exploded={exploded}
        wireframe={wireframe}
        showDimensions={showDimensions}
        heightMm={heightMm}
        depthMm={depthMm}
      />
      <OrbitControls
        enablePan
        enableZoom
        minDistance={0.18}
        maxDistance={1.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

function BaseboardMesh({
  color,
  scale,
  autoRotate,
  exploded,
  wireframe,
  showDimensions,
  heightMm,
  depthMm,
}: Omit<ViewerCanvasProps, "lighting" | "environment">) {
  const groupRef = useRef<Group>(null);
  const explode = exploded ? 0.035 : 0;

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const h = 0.16 * scale.h;
  const d = 0.032 * scale.d;
  const w = 0.55;

  const materialProps = {
    color,
    wireframe,
    roughness: wireframe ? 1 : 0.42,
    metalness: wireframe ? 0 : 0.08,
  };

  return (
    <group ref={groupRef} position={[0, -0.02, 0]}>
      <mesh
        castShadow
        receiveShadow
        position={[0, h * 0.42 + explode, -d * 0.15 - explode]}
      >
        <boxGeometry args={[w, h * 0.84, d * 0.55]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        position={[0, h * 0.92 + explode * 1.4, d * 0.08 + explode]}
      >
        <boxGeometry args={[w, d * 0.75, d * 0.95]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        position={[0, h * 0.08 - explode, d * 0.22 + explode * 0.8]}
      >
        <boxGeometry args={[w, d * 0.55, d * 0.7]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      <mesh
        castShadow
        position={[w * 0.18, h * 0.62, d * 0.42 + explode * 1.2]}
        rotation={[0, 0, -0.08]}
      >
        <boxGeometry args={[w * 0.12, h * 0.18, d * 0.35]} />
        <meshStandardMaterial {...materialProps} roughness={0.55} />
      </mesh>

      {showDimensions && (
        <DimensionOverlay heightMm={heightMm} depthMm={depthMm} h={h} d={d} w={w} />
      )}
    </group>
  );
}

function DimensionOverlay({
  heightMm,
  depthMm,
  h,
  d,
  w,
}: {
  heightMm: number;
  depthMm: number;
  h: number;
  d: number;
  w: number;
}) {
  const x = w * 0.55;
  const topY = h * 0.95;
  const bottomY = 0;
  const frontZ = d * 0.55;

  return (
    <group>
      <Line
        points={[
          [x, bottomY, frontZ],
          [x, topY, frontZ],
        ]}
        color="#c8a97e"
        lineWidth={1.5}
      />
      <Line
        points={[
          [x, bottomY, frontZ],
          [x + 0.06, bottomY, frontZ + 0.06],
        ]}
        color="#c8a97e"
        lineWidth={1.5}
      />
      <Line
        points={[
          [x, bottomY, frontZ + 0.06],
          [x + 0.06, bottomY, frontZ + 0.06],
        ]}
        color="#c8a97e"
        lineWidth={1.5}
      />

      <Html
        position={[x + 0.04, h * 0.5, frontZ]}
        center
        style={{ pointerEvents: "none" }}
      >
        <span className="glass rounded-full px-2 py-0.5 text-[10px] font-medium text-foreground shadow-soft">
          {heightMm} mm
        </span>
      </Html>

      <Html
        position={[x + 0.08, bottomY + 0.01, frontZ + 0.03]}
        center
        style={{ pointerEvents: "none" }}
      >
        <span className="glass rounded-full px-2 py-0.5 text-[10px] font-medium text-foreground shadow-soft">
          {depthMm} mm
        </span>
      </Html>
    </group>
  );
}
