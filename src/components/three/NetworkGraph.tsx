"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { COUNTRIES, colorFor, type Country, type DataMode } from "@/lib/countries";

function fib(n: number, r = 2.3): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push(new THREE.Vector3(Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r));
  }
  return pts;
}

function Node({
  country, pos, mode, onHover,
}: { country: Country; pos: THREE.Vector3; mode: DataMode; onHover: (c: Country | null) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const base = 0.05 + Math.min(0.09, Math.abs(country.data.growth) * 0.014);
  useFrame((s) => {
    if (ref.current) {
      const p = 1 + Math.sin(s.clock.elapsedTime * 1.6 + phase) * 0.16;
      ref.current.scale.setScalar(p);
    }
  });
  const color = colorFor(mode, country.data[mode]);
  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={(e) => { e.stopPropagation(); onHover(country); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = "auto"; }}
    >
      <sphereGeometry args={[base, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.4} />
    </mesh>
  );
}

function Scene({
  countries, mode, onHover,
}: { countries: Country[]; mode: DataMode; onHover: (c: Country | null) => void }) {
  const positions = useMemo(() => fib(countries.length), [countries.length]);
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (group.current) group.current.rotation.y += dt * 0.05; });

  const edges = useMemo(() => {
    const list: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < countries.length; i++) {
      for (let j = i + 1; j < countries.length; j++) {
        const shared = countries[i].groups.filter((g) => countries[j].groups.includes(g));
        if (shared.length >= 2 && list.length < 90) {
          list.push({ a: positions[i], b: positions[j] });
        }
      }
    }
    return list;
  }, [countries, positions]);

  return (
    <group ref={group}>
      {edges.map((e, i) => (
        <Line key={i} points={[e.a, e.b]} color="#3b82f6" lineWidth={0.6} transparent opacity={0.12} />
      ))}
      {countries.map((c, i) => (
        <Node key={c.code} country={c} pos={positions[i]} mode={mode} onHover={onHover} />
      ))}
    </group>
  );
}

export default function NetworkGraph({
  countries, mode,
}: { countries: Country[]; mode: DataMode }) {
  const [hovered, setHovered] = useState<Country | null>(null);
  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 6, 6]} intensity={1.1} />
        <pointLight position={[-6, -4, -4]} intensity={0.5} color="#7c3aed" />
        <Scene countries={countries} mode={mode} onHover={setHovered} />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.3} minDistance={4} maxDistance={11} />
      </Canvas>
      {hovered && (
        <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-navy/90 px-3 py-2 backdrop-blur">
          <div className="font-display text-sm font-semibold text-ink">{hovered.name}</div>
          <div className="font-mono text-[11px] text-muted">
            {hovered.region} · growth {hovered.data.growth}% · infl {hovered.data.inflation}%
          </div>
        </div>
      )}
    </div>
  );
}
