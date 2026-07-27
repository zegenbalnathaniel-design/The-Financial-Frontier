import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import IndicatorExplorer from "@/components/IndicatorExplorer";
import { INDICATORS, FAMILIES } from "@/lib/indicators";

export const metadata: Metadata = { title: "Indicator Explorer — The Financial Frontier", description: "Build your own view of the world economy — pick an indicator, choose economies, compare across time." };

export default function DataPage() {
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">Data lab</p>
        <h1 className="h-display mt-5 text-4xl sm:text-5xl">Indicator Explorer</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A table-builder for the world economy. Choose from {INDICATORS.length} indicators across {FAMILIES.length}
          {" "}families, pick your economies, and view the result as a line chart, bar chart, table or live ranking.
        </p>
      </Reveal>
      <div className="mt-10"><IndicatorExplorer /></div>
    </div>
  );
}
