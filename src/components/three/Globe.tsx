"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { COUNTRIES, type Country } from "@/lib/countries";
import { currentValue, colorForIndicator, fmt, type IndicatorMeta } from "@/lib/indicators";
import type { LiveSnapshot } from "@/lib/live/types";

const R = 1.65;

function toVec(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Real country outlines built from /borders.json as one LineSegments draw call. */
function Borders() {
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/borders.json")
      .then((r) => r.json())
      .then((rings: number[][]) => {
        if (!alive) return;
        const pos: number[] = [];
        for (const ring of rings) {
          for (let i = 0; i < ring.length - 2; i += 2) {
            const a = toVec(ring[i + 1], ring[i], R * 1.002);
            const b = toVec(ring[i + 3], ring[i + 2], R * 1.002);
            pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        setGeo(g);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  if (!geo) return null;
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#22d3ee" transparent opacity={0.42} />
    </lineSegments>
  );
}

function GlobeBody() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial color="#061020" roughness={1} metalness={0} />
      </mesh>
      <mesh scale={1.001}>
        <sphereGeometry args={[R, 36, 24]} />
        <meshBasicMaterial color="#1f6feb" wireframe transparent opacity={0.05} />
      </mesh>
      <Borders />
      <mesh scale={1.14}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#00d084" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.3}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Hub({ country, ind, onSelect, live }: { country: Country; ind: IndicatorMeta; onSelect: (c: Country) => void; live?: LiveSnapshot | null }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => toVec(country.lat, country.lon), [country]);
  const val = currentValue(country, ind, live);
  const color = colorForIndicator(ind, val);
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(() => { if (ringRef.current && country.hub) ringRef.current.lookAt(0, 0, 0); });
  const size = country.hub ? 0.03 : 0.02;
  return (
    <group position={pos}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(country); }}>
        <sphereGeometry args={[hovered ? size * 1.6 : size, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {country.hub && (
        <mesh ref={ringRef}>
          <ringGeometry args={[size * 1.8, size * 2.4, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
      {hovered && (
        <Html center distanceFactor={7} zIndexRange={[100, 0]}>
          <div className="pointer-events-none select-none whitespace-nowrap rounded-lg border border-white/10 bg-navy/90 px-2.5 py-1.5 text-center backdrop-blur">
            <div className="font-display text-[11px] font-semibold text-ink">{country.name}</div>
            <div className="font-mono text-[10px]" style={{ color }}>{fmt(val, ind)}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Arc({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: string }) {
  const { points, curve } = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const lift = 1 + from.distanceTo(to) * 0.35;
    mid.setLength(R * lift);
    const c = new THREE.QuadraticBezierCurve3(from, mid, to);
    return { points: c.getPoints(40), curve: c };
  }, [from, to]);
  const pulse = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random());
  useFrame((_, dt) => { t.current = (t.current + dt * 0.18) % 1; if (pulse.current) pulse.current.position.copy(curve.getPoint(t.current)); });
  return (
    <group>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.25} />
      <mesh ref={pulse}><sphereGeometry args={[0.016, 8, 8]} /><meshBasicMaterial color={color} /></mesh>
    </group>
  );
}

function Scene({ ind, onSelect, spin, live }: { ind: IndicatorMeta; onSelect: (c: Country) => void; spin: number; live?: LiveSnapshot | null }) {
  const g = useRef<THREE.Group>(null);
  const hubs = useMemo(() => COUNTRIES.filter((c) => c.hub), []);
  const arcs = useMemo(() => {
    const anchors = ["US", "GB", "DE", "SG", "JP", "AE"];
    const anchorHubs = hubs.filter((h) => anchors.includes(h.code));
    return hubs.map((h, i) => [anchorHubs[i % anchorHubs.length], h] as [Country, Country]).filter(([a, b]) => a && a.code !== b.code);
  }, [hubs]);
  useFrame((_, dt) => { if (g.current) g.current.rotation.y += dt * 0.03 * spin; });
  return (
    <group ref={g} rotation={[0.35, 0, 0.12]}>
      <GlobeBody />
      {COUNTRIES.map((c) => <Hub key={c.code} country={c} ind={ind} onSelect={onSelect} live={live} />)}
      {arcs.map(([a, b], i) => <Arc key={i} from={toVec(a.lat, a.lon)} to={toVec(b.lat, b.lon)} color="#22d3ee" />)}
    </group>
  );
}

/**
 * Pause the render loop while the globe is scrolled off-screen. An idle WebGL
 * canvas with a per-frame `useFrame` rotation + OrbitControls autoRotate is one of
 * the heaviest things on the page; freezing it (frameloop="never") while it isn't
 * visible removes that cost from every scroll frame. It resumes the instant a sliver
 * scrolls back into view.
 */
function useInView<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

function Globe({ ind, onSelect, interactive = true, spin = 1, live }:
  { ind: IndicatorMeta; onSelect: (c: Country) => void; interactive?: boolean; spin?: number; live?: LiveSnapshot | null }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#3b82f6" />
        <Scene ind={ind} onSelect={onSelect} spin={spin} live={live} />
        <OrbitControls enablePan={false} enableZoom={interactive} enableRotate={interactive}
          autoRotate autoRotateSpeed={0.5} minDistance={3.4} maxDistance={8} />
      </Canvas>
    </div>
  );
}

// Memoized so a parent re-render (e.g. selecting a country in GlobeSection) does not
// reconcile the entire 3D scene — only an `ind`/`spin` change re-renders the globe.
export default memo(Globe);
