"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { INDICATORS } from "@/lib/indicators";

const Globe = dynamic(() => import("./Globe"), { ssr: false, loading: () => null });

/** Non-interactive background globe that scales + fades as you scroll the hero. */
export default function HeroGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ind = INDICATORS[0];
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={reduce ? {} : { scale, opacity, y }}
        className="absolute -right-[14%] top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 md:block">
        <Globe ind={ind} onSelect={() => {}} interactive={false} spin={2.2} />
      </motion.div>
    </div>
  );
}
