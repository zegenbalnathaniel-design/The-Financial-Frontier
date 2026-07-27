import type { Metadata } from "next";
import { getAllReports } from "@/lib/reports";
import ReportCard from "@/components/ReportCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Reports — The Financial Frontier", description: "Every monthly report, newest first." };

export default function ReportsPage() {
  const reports = getAllReports();
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">Archive</p>
        <h1 className="h-display mt-5 text-4xl sm:text-5xl">Monthly reports</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">One deep, fully-sourced report each month. Read it on the site or download the PDF in screen or print form.</p>
      </Reveal>
      {reports.length === 0 ? (
        <div className="glass mt-14 border-dashed p-12 text-center">
          <p className="h-display text-lg">No reports yet</p>
          <p className="mt-2 text-sm text-muted">Add a JSON file to <code className="text-emerald">content/reports/</code> to publish the first issue.</p>
        </div>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, i) => (<Reveal key={r.slug} delay={0.05 * i}><ReportCard report={r} featured={i === 0} /></Reveal>))}
        </div>
      )}
      {reports.length > 0 && <p className="mt-12 text-sm text-muted2">{reports.length} {reports.length === 1 ? "issue" : "issues"} published. A new report lands at the start of each month.</p>}
    </div>
  );
}
