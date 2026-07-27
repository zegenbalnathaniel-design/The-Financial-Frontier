"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Boxes, Globe2, Sparkles } from "lucide-react";
import Particles from "@/components/Particles";
import HeroGlobe from "@/components/three/HeroGlobe";

export default function Hero({ issue, month, slug, economies, terms }:
  { issue: string; month?: string; slug?: string; economies: number; terms: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const style = reduce ? {} : { y, opacity };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <Particles />
      <HeroGlobe />
      <motion.div style={style} className="shell relative py-20 sm:py-28">
        <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Issue No. {issue} · {month} · Live</span>
        <h1 className="h-display mt-6 max-w-4xl text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">
          Financial intelligence,<br /><span className="grad-text">reimagined in three dimensions.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Explore the world economy as a living system — an interactive globe with real borders, a
          real-time economic network, and a deep, fully-sourced report every month.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {slug && <Link href={`/reports/${slug}`} className="btn-primary">Read {month} <ArrowRight size={16} /></Link>}
          <Link href="/network" className="btn-ghost"><Boxes size={16} /> Explore the network</Link>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {[{ Icon: Globe2, n: `${economies}`, l: "economies mapped" },
            { Icon: Sparkles, n: `${terms}`, l: "glossary terms" },
            { Icon: Boxes, n: "23", l: "explorable indicators" }].map(({ Icon, n, l }) => (
            <div key={l} className="flex items-center gap-3">
              <Icon size={18} className="text-emerald" />
              <p className="text-sm text-muted"><span className="font-display font-semibold text-ink">{n}</span> {l}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 hidden items-center gap-2 text-muted2 sm:flex">
          <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="font-mono text-[11px] uppercase tracking-widest">Scroll to explore</motion.span>
        </div>
      </motion.div>
    </section>
  );
}
