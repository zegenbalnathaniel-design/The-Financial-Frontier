import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import NetworkSection from "@/components/three/NetworkSection";

export const metadata: Metadata = { title: "Economic Network — The Financial Frontier", description: "A 3D map of the world's interconnected economies." };

export default function NetworkPage() {
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">Signature experience · 02</p>
        <h1 className="h-display mt-5 text-4xl sm:text-5xl">The 3D economic network</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Countries as nodes, blocs as connections. Filter by region, economic group or data mode and
          watch the network rebuild. Rotate, zoom and hover to explore how the world economy links together.
        </p>
      </Reveal>
      <div className="mt-10"><NetworkSection /></div>
      <p className="mt-6 max-w-3xl text-sm text-muted2">
        This visualisation runs on illustrative sample data seeded with our June 2026 figures. Wire a live
        source (IMF, World Bank, FRED) in <code className="text-emerald">src/lib/countries.ts</code> to make it authoritative.
      </p>
    </div>
  );
}
