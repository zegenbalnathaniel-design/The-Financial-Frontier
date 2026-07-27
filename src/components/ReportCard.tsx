import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { Report } from "@/lib/types";

export default function ReportCard({ report, featured = false }: { report: Report; featured?: boolean }) {
  return (
    <Link href={`/reports/${report.slug}`} className="glass group block p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-emerald/25">
      <div className="flex items-center justify-between">
        <span className={`chip ${featured ? "border-emerald/40 text-emerald" : ""}`}>
          Issue No. {String(report.issueNumber).padStart(2, "0")}
        </span>
        <ArrowUpRight size={18} className="text-muted2 transition-colors group-hover:text-emerald" aria-hidden />
      </div>
      <h3 className={`h-display mt-4 ${featured ? "text-3xl" : "text-xl"}`}>{report.title}</h3>
      <p className="mt-1 font-mono text-sm text-emerald">{report.month}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{report.standfirst}</p>
      <div className="mt-5 flex items-center gap-2 text-xs text-muted2">
        <FileText size={14} aria-hidden />
        <span>{report.pageCount ?? "—"} pages</span><span aria-hidden>·</span><span>{report.sources.length} sources</span>
      </div>
    </Link>
  );
}
