import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { GLOSSARY, GLOSSARY_COUNT } from "@/lib/glossary";

export const metadata: Metadata = { title: "Learn Economics — The Financial Frontier", description: "Plain-language explainers for every indicator that moves the world economy." };

const framework = [
  { q: "What happened", a: "The event itself, stated plainly and with a source." },
  { q: "Why it matters", a: "The mechanism — how this ripples into the wider economy." },
  { q: "Who benefits", a: "Every event creates winners. We name them." },
  { q: "Who's hurt", a: "And it creates losers. We name them too." },
  { q: "Key takeaway", a: "The one sentence worth remembering." },
];

export default function LearnPage() {
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">Learn economics</p>
        <h1 className="h-display mt-5 text-4xl sm:text-5xl">The financial news, decoded</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          {GLOSSARY_COUNT} terms across {GLOSSARY.length} families of indicators — from GDP to the yield
          curve. Learn these and the headlines stop being a foreign language.
        </p>
      </Reveal>

      <section className="mt-16">
        <Reveal><h2 className="h-display text-2xl">How we read every story</h2></Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {framework.map((f, i) => (
            <Reveal key={f.q} delay={0.05 * i}>
              <li className="glass h-full p-5">
                <span className="font-mono text-xs font-semibold tracking-widest text-emerald">{String(i + 1).padStart(2, "0")}</span>
                <p className="h-display mt-3 text-base">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {GLOSSARY.map((group, gi) => (
        <section key={group.category} className="mt-16">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="h-display text-2xl">{group.category}</h2>
              <span className="font-mono text-xs text-muted2">{group.terms.length} terms</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted">{group.blurb}</p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {group.terms.map((t, i) => (
              <Reveal key={t.term} delay={Math.min(0.03 * i, 0.15)}>
                <article className="glass h-full p-5">
                  <h3 className="h-display text-lg text-emerald">{t.term}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.def}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
