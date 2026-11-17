"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe2, Maximize2, Newspaper, Sparkles, X } from "lucide-react";
import { focusCountry } from "@/lib/focus";
import { COUNTRIES } from "@/lib/countries";
import type { StoryOfDay } from "@/lib/live/story";

const ago = (iso?: string) => {
  if (!iso) return "";
  const m = Math.round((Date.now() - +new Date(iso)) / 60000);
  return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
};

export default function StoryOfTheDay() {
  const [story, setStory] = useState<StoryOfDay | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch("/api/story").then((r) => (r.ok ? r.json() : null)).then((s) => alive && s && setStory(s)).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const country = COUNTRIES.find((c) => c.code === story?.country);
  const external = story?.url?.startsWith("http");
  const showOnGlobe = () => { if (!story?.country) return; setOpen(false); focusCountry(story.country); };

  if (!story) {
    return <div className="glass-liquid h-64 animate-pulse" aria-label="Loading story of the day" />;
  }

  return (
    <>
      <motion.article layoutId="story-card" onClick={() => setOpen(true)}
        className="glass-liquid group relative cursor-pointer overflow-hidden"
        whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
        <div className="hairline-glow pointer-events-none absolute inset-0 z-10 rounded-[inherit]" aria-hidden />
        {story.image && (
          <div className="absolute inset-0">
            <img src={story.image} alt="" className="h-full w-full object-cover opacity-30 blur-[2px] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/40" />
          </div>
        )}
        <div className="relative grid gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip border-gold/40 text-gold"><Newspaper size={12} /> Story of the day · {story.dateLabel}</span>
              <span className="chip">{story.tag}</span>
              {country && <span className="chip"><Globe2 size={12} /> {country.name}</span>}
            </div>
            <h3 className="h-display mt-5 max-w-3xl text-2xl leading-tight sm:text-4xl">{story.headline}</h3>
            {story.summary && <p className="mt-4 max-w-3xl text-base leading-relaxed text-body line-clamp-3">{story.summary}</p>}
            <p className="mt-4 font-mono text-[11px] text-muted2">{story.source}{story.publishedAt ? ` · ${ago(story.publishedAt)}` : ""}{story.kind === "issue" ? " · live news feed offline, showing our latest issue" : ""}</p>
          </div>
          <span className="btn-ghost shrink-0 backdrop-blur"><Maximize2 size={15} /> Open the story</span>
        </div>
      </motion.article>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-midnight/70 backdrop-blur-md" onClick={() => setOpen(false)} />
              <motion.div layoutId="story-card" role="dialog" aria-modal="true" aria-label={story.headline}
                className="glass-liquid relative max-h-[92vh] w-full max-w-4xl overflow-y-auto">
                <div className="hairline-glow pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
                {story.image && (
                  <div className="relative h-56 overflow-hidden rounded-t-3xl sm:h-72">
                    <img src={story.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-[#08111F]/30 to-transparent" />
                  </div>
                )}
                <button onClick={() => setOpen(false)} aria-label="Close story" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-midnight/60 text-ink backdrop-blur hover:bg-white/10"><X size={16} /></button>
                <div className="p-7 sm:p-12">
                  <div className="flex flex-wrap gap-2">
                    <span className="chip border-gold/40 text-gold"><Newspaper size={12} /> {story.dateLabel}</span>
                    <span className="chip">{story.tag}</span>
                  </div>
                  <h2 className="h-display mt-5 text-3xl leading-tight sm:text-5xl">{story.headline}</h2>
                  <p className="mt-3 font-mono text-xs text-muted2">{story.source}{story.publishedAt ? ` · ${new Date(story.publishedAt).toLocaleString()}` : ""}</p>
                  {story.summary && <p className="mt-8 text-lg leading-relaxed text-body sm:text-xl">{story.summary}</p>}
                  {story.whyItMatters && (
                    <div className="mt-8 rounded-2xl border border-violet/25 bg-violet/[0.06] p-5">
                      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-violet"><Sparkles size={12} /> Why it matters · AI note</p>
                      <p className="mt-3 leading-relaxed text-body">{story.whyItMatters}</p>
                      <p className="mt-2 font-mono text-[9px] text-muted2">Written by AI from the headline and summary only. May contain errors.</p>
                    </div>
                  )}
                  <div className="mt-10 flex flex-wrap gap-3">
                    {story.url && (
                      <a href={story.url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn-primary">
                        {external ? `Read at ${story.source}` : "Read the issue"} <ArrowUpRight size={16} />
                      </a>
                    )}
                    {country && <button onClick={showOnGlobe} className="btn-ghost"><Globe2 size={16} /> Show {country.name} on the globe</button>}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
