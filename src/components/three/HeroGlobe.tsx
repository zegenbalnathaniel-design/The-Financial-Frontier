"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { INDICATORS, currentValue, colorForIndicator, fmt } from "@/lib/indicators";
import { COUNTRIES } from "@/lib/countries";
import type { GlobeValues } from "./Globe";

const Globe = dynamic(() => import("./Globe"), { ssr: false, loading: () => null });

/** Non-interactive background globe (lite renderer) that scales + fades as you scroll the hero. */
export default function HeroGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const values = useMemo<GlobeValues>(() => {
    const ind = INDICATORS[0];
    return Object.fromEntries(COUNTRIES.map((c) => { const v = currentValue(c, ind); return [c.code, { value: v, color: colorForIndicator(ind, v), label: fmt(v, ind) }]; }));
  }, []);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[12%] top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 lg:block">
        <motion.div style={reduce ? {} : { scale, opacity, y }} className="h-full w-full">
          <Globe values={values} interactive={false} spin={2.2} lite />
        </motion.div>
      </div>
    </div>
  );
}
