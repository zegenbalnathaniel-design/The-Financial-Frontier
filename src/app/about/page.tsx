import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About — The Financial Frontier", description: "Why this platform exists, and the rules it holds itself to." };

const principles = [
  { title: "Never fabricate a statistic", body: "Every figure is attributed. Where a number doesn't exist, we describe the trend and say so — including on the 3D visualisations, which are labelled as sample data until a live feed is wired in." },
  { title: "Show the disagreement", body: "Forecasts are scenarios, not prophecies. When the World Bank, S&P and the OECD disagree, we print all three." },
  { title: "Separate fact from opinion", body: "Sourced figures are fact. Our reading of them is analysis. Anything further is opinion, and it carries a label." },
  { title: "Name the winners and the losers", body: "Every economic event benefits someone and costs someone else. A story that names only one has told half of it." },
];

export default function AboutPage() {
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">About</p>
        <h1 className="h-display mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl">A financial-intelligence platform for people who want to actually understand the economy</h1>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-body">
          <p>Most economics coverage either assumes you already speak the language, or flattens a complex world into a headline that tells you nothing. The Financial Frontier is built on the belief that there's a third option — depth you can actually see and explore.</p>
          <p>We pair institutional-grade data with an immersive interface: an interactive globe, a live economic network, and a deep, fully-sourced report every month. No jargon left undefined. No statistic without a source.</p>
          <p className="text-muted">Whether this is your first economics read or your five-hundredth, the promise is the same: you'll leave understanding the world a little better than when you arrived.</p>
        </div>
      </Reveal>
      <section className="mt-20">
        <Reveal><h2 className="h-display text-2xl">The rules we hold ourselves to</h2></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}><article className="glass h-full p-6"><h3 className="h-display text-lg text-emerald">{p.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p></article></Reveal>
          ))}
        </div>
      </section>
      <Reveal><div className="glass mt-16 p-8">
        <p className="h-display text-xl leading-relaxed">&ldquo;Complex financial events can be made understandable — without ever being oversimplified.&rdquo;</p>
        <p className="mt-3 text-sm text-muted2">— The Financial Frontier</p>
        <Link href="/reports" className="mt-6 inline-block text-sm text-emerald hover:underline">Start with the latest report →</Link>
      </div></Reveal>
    </div>
  );
}
