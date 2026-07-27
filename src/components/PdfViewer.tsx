"use client";
import { useState } from "react";
import { Download, ExternalLink, Printer } from "lucide-react";

export default function PdfViewer({ screen, press, title, pageCount }:
  { screen: string; press?: string; title: string; pageCount?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <a href={screen} target="_blank" rel="noopener noreferrer" className="btn-primary"><ExternalLink size={15} /> Open full screen</a>
        <a href={screen} download className="btn-ghost"><Download size={15} /> Screen PDF</a>
        {press && <a href={press} download className="btn-ghost"><Printer size={15} /> Print PDF</a>}
      </div>
      <div className="glass overflow-hidden p-2">
        {!failed ? (
          <iframe src={`${screen}#view=FitH`} title={`${title} — full PDF${pageCount ? `, ${pageCount} pages` : ""}`}
            className="h-[85vh] w-full rounded-xl bg-white" onError={() => setFailed(true)} />
        ) : (
          <div className="flex h-[40vh] flex-col items-center justify-center p-12 text-center">
            <p className="h-display text-lg">Your browser blocked the inline preview</p>
            <p className="mt-2 max-w-sm text-sm text-muted">Open it in a new tab or download it with the buttons above.</p>
            <a href={screen} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6"><ExternalLink size={15} /> Open the PDF</a>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted2">If the preview doesn&rsquo;t load, use &ldquo;Open full screen&rdquo; — some browsers block embedded PDFs.</p>
    </div>
  );
}
