"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { COUNTRIES, type Country } from "@/lib/countries";

const R = 1.65;
const TILT: [number, number, number] = [0.35, 0, 0.12];
const NO_DATA = "#3a4a63";

/** Per-hub render data, computed by the parent (memoised) so the 3D scene stays dumb. */
export interface HubValue { value: number | null; color: string; label: string }
export type GlobeValues = Record<string, HubValue>;

export function toVec(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// ── Borders: fetched and triangulated ONCE per page, shared by every globe instance ──
let bordersPromise: Promise<Float32Array> | null = null;
function loadBorders(): Promise<Float32Array> {
  if (!bordersPromise) {
    bordersPromise = fetch("/borders.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((rings: number[][]) => {
        let n = 0;
        for (const ring of rings) n += Math.max(0, ring.length / 2 - 1);
        const out = new Float32Array(n * 6);
        const a = new THREE.Vector3(), b = new THREE.Vector3();
        let k = 0;
        const set = (v: THREE.Vector3, lat: number, lon: number) => {
          const phi = (90 - lat) * (Math.PI / 180), theta = (lon + 180) * (Math.PI / 180), r = R * 1.002;
          v.set(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
        };
        for (const ring of rings) {
          for (let i = 0; i < ring.length - 2; i += 2) {
            set(a, ring[i + 1], ring[i]); set(b, ring[i + 3], ring[i + 2]);
            out[k++] = a.x; out[k++] = a.y; out[k++] = a.z; out[k++] = b.x; out[k++] = b.y; out[k++] = b.z;
          }
        }
        return out;
      })
      .catch((e) => { bordersPromise = null; throw e; });
  }
  return bordersPromise;
}

function Borders({ opacity }: { opacity: number }) {
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);
  useEffect(() => {
    let alive = true;
    loadBorders().then((pos) => {
      if (!alive) return;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      setGeo(g);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => () => geo?.dispose(), [geo]);
  if (!geo) return null;
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#22d3ee" transparent opacity={opacity} />
    </lineSegments>
  );
}

// Atmosphere. Two shaders:
//  · rim   (front faces of the planet): brightens toward the limb — the thin bright edge.
//  · halo  (back faces of a larger shell): strongest at the planet's limb and fading to
//          zero at the shell's silhouette, so the glow has no hard outer edge.
const VERT = `varying vec3 vN; varying vec3 vV;
  void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`;
const rimShader = (color: string, power: number, strength: number) => new THREE.ShaderMaterial({
  uniforms: { uColor: { value: new THREE.Color(color) } },
  vertexShader: VERT,
  fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
    void main(){ float f = pow(1.0 - clamp(dot(vN, vV), 0.0, 1.0), ${power.toFixed(2)}); gl_FragColor = vec4(uColor, f * ${strength.toFixed(2)}); }`,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
});
const haloShader = (color: string, strength: number) => new THREE.ShaderMaterial({
  uniforms: { uColor: { value: new THREE.Color(color) } },
  vertexShader: VERT,
  fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
    void main(){ float f = pow(clamp(-dot(vN, vV), 0.0, 1.0), 2.4); gl_FragColor = vec4(uColor, f * ${strength.toFixed(2)}); }`,
  transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
});

function GlobeBody({ lite }: { lite: boolean }) {
  const halo = useMemo(() => haloShader("#22d3ee", 1.6), []);
  const rim = useMemo(() => rimShader("#3b82f6", 3.0, 0.75), []);
  useEffect(() => () => { halo.dispose(); rim.dispose(); }, [halo, rim]);
  return (
    <group>
      {/* The planet occludes pointer events, so hubs on the far side can't be hovered/clicked through it. */}
      <mesh onPointerOver={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry args={[R, lite ? 48 : 72, lite ? 48 : 72]} />
        <meshStandardMaterial color="#050d1c" roughness={1} metalness={0} emissive="#01050d" />
      </mesh>
      <mesh scale={1.0005} material={rim}><sphereGeometry args={[R, 48, 48]} /></mesh>
      <mesh scale={1.001}>
        <sphereGeometry args={[R, 36, 24]} />
        <meshBasicMaterial color="#1f6feb" wireframe transparent opacity={0.04} />
      </mesh>
      <Borders opacity={lite ? 0.3 : 0.48} />
      <mesh scale={1.18} material={halo}><sphereGeometry args={[R, 48, 48]} /></mesh>
    </group>
  );
}

function Hub({ country, v, selected, lite, onSelect }:
  { country: Country; v: HubValue; selected: boolean; lite: boolean; onSelect: (c: Country) => void }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => toVec(country.lat, country.lon), [country]);
  const ring = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  // Rings face outward from the globe centre. The hub's local frame never changes, so
  // orient once instead of calling lookAt() for every hub on every frame.
  useLayoutEffect(() => {
    for (const m of [ring.current, pulse.current]) if (m) m.lookAt(pos.clone().multiplyScalar(2));
  }, [pos]);
  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = (clock.elapsedTime * 0.9) % 1;
    pulse.current.scale.setScalar(1 + t * 2.2);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - t);
  });
  const color = v.value == null ? NO_DATA : v.color;
  const size = country.hub ? 0.03 : 0.02;
  const big = hovered || selected;
  return (
    <group position={pos}>
      <mesh raycast={() => null}>
        <sphereGeometry args={[big ? size * 1.7 : size, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* invisible, larger hit target — hubs are tiny on a phone */}
      {!lite && (
        <mesh onClick={(e) => { e.stopPropagation(); onSelect(country); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}>
          <sphereGeometry args={[size * 3.2, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
      {(country.hub || selected) && (
        <mesh ref={ring}>
          <ringGeometry args={[size * 1.8, size * 2.4, 24]} />
          <meshBasicMaterial color={color} transparent opacity={selected ? 0.95 : 0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
      {selected && (
        <mesh ref={pulse}>
          <ringGeometry args={[size * 2.4, size * 2.8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {!lite && (hovered || selected) && (
        <Html center distanceFactor={3.2} zIndexRange={[100, 0]} position={pos.clone().normalize().multiplyScalar(0.09).toArray()}>
          <div className="pointer-events-none select-none whitespace-nowrap rounded-lg border border-white/15 bg-navy/80 px-2.5 py-1.5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <div className="font-display text-[11px] font-semibold text-ink">{country.name}</div>
            <div className="font-mono text-[10px]" style={{ color }}>{v.value == null ? "no data this month" : v.label}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Arc({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: string }) {
  const { points, curve } = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.setLength(R * (1 + from.distanceTo(to) * 0.35));
    const c = new THREE.QuadraticBezierCurve3(from, mid, to);
    return { points: c.getPoints(48), curve: c };
  }, [from, to]);
  const dot = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random());
  useFrame((_, dt) => { t.current = (t.current + dt * 0.18) % 1; dot.current?.position.copy(curve.getPoint(t.current)); });
  return (
    <group>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.22} />
      <mesh ref={dot}><sphereGeometry args={[0.016, 8, 8]} /><meshBasicMaterial color={color} /></mesh>
    </group>
  );
}

const HUBS = COUNTRIES.filter((c) => c.hub);
const ANCHORS = ["US", "GB", "DE", "SG", "JP", "AE"];
const ARCS: [THREE.Vector3, THREE.Vector3][] = (() => {
  const anchorHubs = HUBS.filter((h) => ANCHORS.includes(h.code));
  return HUBS.map((h, i) => [anchorHubs[i % anchorHubs.length], h] as const)
    .filter(([a, b]) => a && a.code !== b.code)
    .map(([a, b]) => [toVec(a.lat, a.lon), toVec(b.lat, b.lon)]);
})();

/** Smoothly swings the camera to face a country, then hands control back to the user. */
function CameraFocus({ group, code, distance }: { group: React.RefObject<THREE.Group>; code?: string | null; distance: number }) {
  const { camera, controls } = useThree() as unknown as { camera: THREE.PerspectiveCamera; controls: { target: THREE.Vector3; update: () => void; autoRotate: boolean } | null };
  const target = useRef<THREE.Vector3 | null>(null);
  useEffect(() => {
    const c = COUNTRIES.find((x) => x.code === code);
    if (!c || !group.current) { target.current = null; return; }
    group.current.updateMatrixWorld();
    target.current = toVec(c.lat, c.lon).applyMatrix4(group.current.matrixWorld).normalize().multiplyScalar(distance);
  }, [code, group, distance]);
  useFrame((_, dt) => {
    if (!target.current) return;
    const k = 1 - Math.pow(0.002, dt); // frame-rate independent ease
    const cur = camera.position.clone();
    const len = THREE.MathUtils.lerp(cur.length(), distance, k);
    cur.normalize().lerp(target.current.clone().normalize(), k).normalize().multiplyScalar(len);
    camera.position.copy(cur);
    camera.lookAt(0, 0, 0);
    controls?.update();
    if (cur.distanceTo(target.current) < 0.01) target.current = null;
  });
  return null;
}

function Scene({ values, onSelect, spin, selectedCode, focusCode, lite }:
  { values: GlobeValues; onSelect: (c: Country) => void; spin: number; selectedCode?: string | null; focusCode?: string | null; lite: boolean }) {
  const g = useRef<THREE.Group>(null);
  // Spin pauses while a country is focused so the camera can settle on it.
  useFrame((_, dt) => { if (g.current && !focusCode) g.current.rotation.y += dt * 0.03 * spin; });
  return (
    <group ref={g} rotation={TILT}>
      <GlobeBody lite={lite} />
      {COUNTRIES.map((c) => (
        <Hub key={c.code} country={c} v={values[c.code] ?? { value: null, color: NO_DATA, label: "" }} selected={selectedCode === c.code} lite={lite} onSelect={onSelect} />
      ))}
      {ARCS.map(([a, b], i) => <Arc key={i} from={a} to={b} color="#22d3ee" />)}
      {!lite && <CameraFocus group={g} code={focusCode} distance={4.6} />}
    </group>
  );
}

function useInView<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

function Globe({ values, onSelect, interactive = true, spin = 1, selectedCode, focusCode, lite = false }:
  { values: GlobeValues; onSelect?: (c: Country) => void; interactive?: boolean; spin?: number; selectedCode?: string | null; focusCode?: string | null; lite?: boolean }) {
  // Render only while on screen — an idle WebGL loop is the heaviest thing on the page.
  const { ref, inView } = useInView<HTMLDivElement>();
  const noop = useRef(() => {}).current;
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={lite ? [1, 1.25] : [1, 1.75]} gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 3, 5]} intensity={1.15} />
        <directionalLight position={[-5, -2, -3]} intensity={0.45} color="#3b82f6" />
        <Scene values={values} onSelect={onSelect ?? noop} spin={spin} selectedCode={selectedCode} focusCode={focusCode} lite={lite} />
        {!lite && (
          <OrbitControls makeDefault enablePan={false} enableZoom={interactive} enableRotate={interactive}
            enableDamping dampingFactor={0.08} autoRotate={!focusCode} autoRotateSpeed={0.45} minDistance={3.2} maxDistance={8} />
        )}
      </Canvas>
    </div>
  );
}

// Memoised: a parent re-render (e.g. opening a panel) won't reconcile the 3D scene.
export default memo(Globe);
