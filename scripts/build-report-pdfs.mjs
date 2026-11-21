#!/usr/bin/env node
// Builds a print-ready A4 PDF for each monthly report from its JSON in content/reports/.
//
//   npm run pdfs              # every report that has no pdf yet
//   npm run pdfs -- 2026-11   # just one issue (re-builds even if it has a pdf)
//
// Uses only what is in the report JSON — no figures are invented — and prints it with
// headless Google Chrome. Writes public/reports/the-financial-frontier-issue-NN-screen.pdf
// and sets `pdf.screen` + `pageCount` in the JSON so the site picks it up.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { renderIssue } from "./pdf/render.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CONTENT = join(ROOT, "content/reports");
const OUT = join(ROOT, "public/reports");
const ISSUES = join(ROOT, "content/issues");
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const NAMES = {
  US: "United States", GB: "United Kingdom", JP: "Japan", IN: "India", CN: "China", DE: "Germany",
  FR: "France", IT: "Italy", ES: "Spain", CA: "Canada", BR: "Brazil", KR: "South Korea", AU: "Australia",
  CH: "Switzerland", SG: "Singapore", ZA: "South Africa", MX: "Mexico", SA: "Saudi Arabia", TR: "Türkiye",
};
const TONE = { up: "#00D084", down: "#F65B5B", gold: "#FBBF24", blue: "#3B82F6", cyan: "#22D3EE", violet: "#A78BFA", neutral: "#CBD5E1" };

const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Last word(s) of the title in gold, like the Issue 01 cover. */
function coverTitle(t) {
  const words = t.split(" ");
  const last = words.pop();
  return `${esc(words.join(" "))} <span class="gold">${esc(last)}.</span>`;
}

function hbars(rows, { baseline = 0, unit = "%", colorFor }) {
  if (!rows?.length) return "";
  const vals = rows.map((r) => r.value);
  const min = Math.min(baseline, ...vals), max = Math.max(baseline, ...vals);
  const span = max - min || 1;
  const W = 100, zero = ((baseline - min) / span) * W;
  const dp = vals.some((v) => !Number.isInteger(v)) ? 1 : 0; // "3.0%" next to "3.1%", not "3%"
  return `<div class="bars">${rows.map((r) => {
    const x = ((Math.min(r.value, baseline) - min) / span) * W;
    const w = (Math.abs(r.value - baseline) / span) * W;
    const c = colorFor(r);
    const v = `${r.value > 0 && baseline === 0 && min < 0 ? "+" : ""}${r.value.toFixed(dp)}${unit}`;
    return `<div class="bar-row"><div class="bar-label">${esc(r.name)}${r.note ? `<small>${esc(r.note)}</small>` : ""}</div>
      <div class="bar-track"><span class="bar-zero" style="left:${zero}%"></span><span class="bar" style="left:${x}%;width:${Math.max(w, 0.6)}%;background:${c}"></span></div>
      <div class="bar-val" style="color:${c}">${esc(v)}</div></div>`;
  }).join("")}</div>`;
}

function page(inner, { n, issue, month, cls = "" }) {
  return `<section class="page ${cls}">
    <header class="run"><span class="brand"><i></i>The Financial Frontier</span><span>${esc(month)} · Issue No. ${pad(issue)}</span></header>
    ${inner}
    <footer class="run foot"><span>Economics Explained. Markets Decoded.</span><span>${n}</span></footer>
  </section>`;
}

function render(r) {
  const issue = r.issueNumber, month = r.month;
  const pages = [];
  let n = 1;

  // 1 — cover
  pages.push(`<section class="page cover">
    <div class="glow g1"></div><div class="glow g2"></div>
    <svg class="globe" viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="200" r="190"/><ellipse cx="200" cy="200" rx="190" ry="70"/><ellipse cx="200" cy="200" rx="190" ry="135"/>
      <ellipse cx="200" cy="200" rx="70" ry="190"/><ellipse cx="200" cy="200" rx="135" ry="190"/><line x1="10" y1="200" x2="390" y2="200"/>
    </svg>
    <div class="cover-top"><span class="brand big"><i></i>The Financial Frontier</span><span class="mono">ISSUE No. ${pad(issue)}</span></div>
    <div class="cover-body">
      <span class="pill">MONTHLY BRIEFING · ${esc(month.toUpperCase())}</span>
      <h1>${coverTitle(r.title)}</h1>
      <p class="stand">${esc(r.standfirst)}</p>
      <div class="tags">${(r.tags ?? []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    </div>
    <div class="cover-foot"><div><b>Economics Explained. Markets Decoded.</b><br>Published ${esc(fmtDate(r.publishedAt))}</div><span class="mono">thefinancialfrontier.com</span></div>
  </section>`);

  // 2 — editor's note + the numbers
  n++;
  pages.push(page(`
    <p class="kicker">This month</p>
    <h2>The month in numbers</h2>
    ${r.editorsNote ? `<blockquote>${esc(r.editorsNote)}<cite>— From the editor</cite></blockquote>` : ""}
    <div class="grid">${r.indicators.map((i) => `<div class="stat"><p class="lbl">${esc(i.label)}</p>
      <p class="val" style="color:${TONE[i.tone] ?? TONE.neutral}">${esc(i.value)}</p>${i.note ? `<p class="note">${esc(i.note)}</p>` : ""}</div>`).join("")}</div>
  `, { n, issue, month }));

  // 3+ — stories, three per page
  const hs = r.highlights ?? [];
  for (let i = 0; i < hs.length; i += 3) {
    n++;
    pages.push(page(`
      <p class="kicker">What we covered${hs.length > 3 ? ` · ${i / 3 + 1} of ${Math.ceil(hs.length / 3)}` : ""}</p>
      <h2>${i === 0 ? "The stories that defined the month" : "The stories, continued"}</h2>
      <div class="stories">${hs.slice(i, i + 3).map((h, k) => `<article class="story">
        <span class="num">${pad(i + k + 1)}</span>
        <div>${h.tag ? `<span class="chip">${esc(h.tag)}</span>` : ""}<h3>${esc(h.title)}</h3><p>${esc(h.blurb)}</p></div>
      </article>`).join("")}</div>
    `, { n, issue, month }));
  }

  // charts
  const c = r.charts ?? {};
  const chartBlocks = [];
  if (c.growthForecast?.length) chartBlocks.push(`<div class="panel"><h4>Global growth forecasts, 2026 (%)</h4>${hbars(c.growthForecast, { colorFor: () => "#3B82F6" })}</div>`);
  if (c.growthVsInflation?.length) chartBlocks.push(`<div class="panel"><h4>Growth vs inflation (%)</h4>${hbars(c.growthVsInflation, { colorFor: (row) => (/cpi|infl|price/i.test(row.name) ? "#FBBF24" : "#3B82F6") })}</div>`);
  if (c.activityIndex?.length) {
    const base = c.activityBaseline ?? 0;
    chartBlocks.push(`<div class="panel"><h4>${esc(c.activityTitle ?? "Activity")}</h4>${hbars(c.activityIndex, { baseline: base, unit: base === 0 ? "%" : "", colorFor: (row) => (row.value >= base ? "#00D084" : "#F65B5B") })}
      ${base !== 0 ? `<p class="note">Line marks ${base}: above = expansion, below = contraction.</p>` : ""}</div>`);
  }
  if (chartBlocks.length) {
    n++;
    pages.push(page(`<p class="kicker">The charts</p><h2>What the data showed</h2><div class="charts">${chartBlocks.join("")}</div>`, { n, issue, month }));
  }

  // policy + snapshot
  const pol = c.policy;
  const snap = r.countrySnapshot ?? {};
  const snapRows = Object.entries(snap);
  if (pol || snapRows.length) {
    n++;
    const col = (title, items, color) => `<div class="pol"><h4 style="color:${color}">${title}</h4>${items?.length ? `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="note">None this month.</p>`}</div>`;
    const f = (v, d = 1) => (v === undefined ? "—" : `${Number(v).toFixed(d)}%`);
    // Rates stored as a range midpoint (e.g. Fed 3.875) print as the range: 3.75–4.00%.
    const rate = (v) => (v !== undefined && Math.round(v * 1000) % 250 === 125 ? `${(v - 0.125).toFixed(2)}–${(v + 0.125).toFixed(2)}%` : f(v, 2));
    pages.push(page(`
      ${pol ? `<p class="kicker">Central banks</p><h2>The policy scorecard</h2>
      <div class="policy">${col("Tightening", pol.tightening, "#F65B5B")}${col("Easing", pol.easing, "#00D084")}${col("Holding", pol.holding, "#3B82F6")}</div>` : ""}
      ${snapRows.length ? `<p class="kicker" style="margin-top:12mm">Month-end snapshot</p><h2>Where the major economies stood</h2>
      <table><thead><tr><th>Economy</th><th>GDP growth</th><th>Inflation</th><th>Policy rate</th></tr></thead><tbody>
      ${snapRows.map(([code, v]) => `<tr><td>${esc(NAMES[code] ?? code)}</td><td>${f(v.growth)}</td><td>${f(v.inflation)}</td><td>${rate(v.rate)}</td></tr>`).join("")}
      </tbody></table><p class="note">Only figures we could source for ${esc(month)} are shown; a dash means no new figure that month.</p>` : ""}
    `, { n, issue, month }));
  }

  // sources
  n++;
  pages.push(page(`
    <p class="kicker">Sources</p><h2>Where every number came from</h2>
    <ol class="sources">${(r.sources ?? []).map((s) => `<li>${s.url ? `<a href="${esc(s.url)}">${esc(s.name)}</a><br><small>${esc(s.url)}</small>` : esc(s.name)}</li>`).join("")}</ol>
    <div class="disclaimer"><b>The Financial Frontier</b> is an educational publication. Nothing here is investment advice.
    Figures are as published at month-end; later revisions are not reflected. Read online and explore the data at thefinancialfrontier.com/reports/${esc(r.slug)}.</div>
  `, { n, issue, month }));

  return { html: doc(`${month} — ${r.title}`, pages.join("")), pageCount: pages.length };
}

function doc(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #04070D; color: #E2E8F0; font-family: Inter, system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; padding: 22mm 18mm 20mm; page-break-after: always;
  background: radial-gradient(120% 70% at 85% 0%, #0F2440 0%, transparent 60%), linear-gradient(180deg, #08111F 0%, #04070D 100%); }
.page:last-child { page-break-after: auto; }
.run { position: absolute; left: 18mm; right: 18mm; top: 10mm; display: flex; justify-content: space-between; font: 500 8pt "JetBrains Mono", monospace; color: #64748B; letter-spacing: .08em; text-transform: uppercase; }
.run.foot { top: auto; bottom: 9mm; text-transform: none; letter-spacing: .02em; }
.brand { display: inline-flex; align-items: center; gap: 2.2mm; font-family: "Space Grotesk"; text-transform: none; letter-spacing: 0; color: #CBD5E1; font-weight: 600; }
.brand i { width: 3.4mm; height: 3.4mm; border-radius: 50%; border: 1.4px solid #FBBF24; display: inline-grid; place-items: center; }
.brand i::after { content: ""; width: 1.4mm; height: 1.4mm; border-radius: 50%; background: #3B82F6; }
.brand.big { font-size: 12pt; color: #F1F5F9; }
.mono { font: 500 8.5pt "JetBrains Mono", monospace; letter-spacing: .18em; color: #94A3B8; }
.gold { color: #FBBF24; }
/* cover */
.cover { padding: 0; }
.cover .glow { position: absolute; border-radius: 50%; filter: blur(30mm); }
.cover .g1 { width: 90mm; height: 90mm; right: 30mm; top: 10mm; background: rgba(251,191,36,.18); }
.cover .g2 { width: 110mm; height: 110mm; left: -20mm; bottom: 20mm; background: rgba(59,130,246,.22); }
.cover .globe { position: absolute; right: -40mm; top: 58mm; width: 175mm; height: 175mm; fill: none; stroke: #3B82F6; stroke-opacity: .35; stroke-width: 1; }
.cover-top { position: absolute; left: 18mm; right: 18mm; top: 20mm; display: flex; justify-content: space-between; align-items: center; }
.cover-body { position: absolute; left: 18mm; right: 40mm; top: 92mm; }
.pill { display: inline-block; font: 600 7.5pt Inter; letter-spacing: .06em; color: #FBBF24; border: 1px solid rgba(251,191,36,.5); background: rgba(251,191,36,.08); padding: 1.6mm 3.4mm; border-radius: 99px; }
.cover h1 { font: 600 44pt/1.04 "Space Grotesk"; color: #F1F5F9; margin-top: 7mm; letter-spacing: -.01em; }
.stand { margin-top: 8mm; font-size: 12pt; line-height: 1.55; color: #94A3B8; max-width: 140mm; }
.tags { margin-top: 7mm; display: flex; flex-wrap: wrap; gap: 2.4mm; }
.tags span { font: 500 7.5pt Inter; color: #60A5FA; border: 1px solid rgba(59,130,246,.45); background: rgba(59,130,246,.08); padding: 1.3mm 3mm; border-radius: 99px; }
.cover-foot { position: absolute; left: 18mm; right: 18mm; bottom: 18mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8.5pt; color: #94A3B8; line-height: 1.5; }
.cover-foot b { color: #F1F5F9; }
/* inner */
.kicker { font: 500 8pt "JetBrains Mono", monospace; letter-spacing: .2em; text-transform: uppercase; color: #00D084; }
h2 { font: 600 24pt/1.15 "Space Grotesk"; color: #F1F5F9; margin: 3mm 0 8mm; }
h3 { font: 600 15pt/1.25 "Space Grotesk"; color: #F1F5F9; margin: 2.5mm 0 2.5mm; }
h4 { font: 600 10.5pt "Space Grotesk"; color: #E2E8F0; margin-bottom: 4mm; }
blockquote { border-left: 2px solid #FBBF24; padding: 1mm 0 1mm 6mm; margin-bottom: 9mm; font: 400 13pt/1.55 "Space Grotesk"; color: #E2E8F0; }
blockquote cite { display: block; margin-top: 3mm; font: 500 8pt Inter; font-style: normal; color: #94A3B8; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.stat, .panel, .pol, .story { border: 1px solid rgba(148,163,184,.14); background: rgba(15,23,42,.55); border-radius: 3.5mm; }
.stat { padding: 4.5mm; }
.lbl { font-size: 8pt; color: #94A3B8; }
.val { font: 600 19pt "Space Grotesk"; margin-top: 1.5mm; }
.note { font-size: 7.5pt; color: #64748B; margin-top: 1.5mm; line-height: 1.45; }
.stories { display: grid; gap: 6mm; }
.story { display: grid; grid-template-columns: 16mm 1fr; padding: 8mm 7mm; min-height: 62mm; }
.story .num { font: 600 20pt "Space Grotesk"; color: #334155; }
.story p { font-size: 11pt; line-height: 1.65; color: #CBD5E1; }
.chip { font: 500 7.5pt "JetBrains Mono", monospace; letter-spacing: .12em; text-transform: uppercase; color: #22D3EE; }
.charts { display: grid; gap: 6mm; }
.panel { padding: 6mm; }
.bars { display: grid; gap: 3mm; }
.bar-row { display: grid; grid-template-columns: 40mm 1fr 18mm; align-items: center; gap: 4mm; }
.bar-label { font-size: 9pt; color: #CBD5E1; }
.bar-label small { display: block; font-size: 7pt; color: #64748B; }
.bar-track { position: relative; height: 5mm; background: rgba(148,163,184,.08); border-radius: 1.2mm; }
.bar { position: absolute; top: 0; bottom: 0; border-radius: 1.2mm; }
.bar-zero { position: absolute; top: -1mm; bottom: -1mm; width: 1px; background: rgba(226,232,240,.35); }
.bar-val { font: 500 9pt "JetBrains Mono", monospace; text-align: right; }
.policy { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.pol { padding: 5mm; min-height: 38mm; }
.pol ul { padding-left: 4mm; font-size: 9pt; line-height: 1.55; color: #CBD5E1; }
table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
th { text-align: left; font: 500 7.5pt "JetBrains Mono", monospace; letter-spacing: .1em; text-transform: uppercase; color: #64748B; padding: 2.5mm 3mm; border-bottom: 1px solid rgba(148,163,184,.25); }
td { padding: 2.6mm 3mm; border-bottom: 1px solid rgba(148,163,184,.1); color: #E2E8F0; font-family: "JetBrains Mono", monospace; }
td:first-child { font-family: Inter; }
.sources { padding-left: 5mm; display: grid; gap: 3.5mm; font-size: 9.5pt; line-height: 1.45; }
.sources a { color: #E2E8F0; text-decoration: none; }
.sources small { color: #60A5FA; font-size: 7.5pt; word-break: break-all; }
.disclaimer { position: absolute; left: 18mm; right: 18mm; bottom: 22mm; padding: 5mm; border-radius: 3mm; border: 1px solid rgba(251,191,36,.25); background: rgba(251,191,36,.05); font-size: 8.5pt; line-height: 1.55; color: #94A3B8; }
.disclaimer b { color: #FBBF24; }
</style></head><body>${body}</body></html>`;
}

// ── main ───────────────────────────────────────────────────────────────────
// A full-length edition (content/issues/<slug>.mjs, Issue 01 format, 35+ pages) is used when
// it exists; otherwise a short edition is generated from the report JSON alone.
if (!existsSync(CHROME)) { console.error(`Google Chrome not found at ${CHROME}. Set CHROME_PATH.`); process.exit(1); }
const only = process.argv[2];
const files = readdirSync(CONTENT).filter((f) => /^\d{4}-\d{2}\.json$/.test(f)).sort();
const tmp = mkdtempSync(join(tmpdir(), "ff-pdf-"));
const chrome = (args) => execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=10000", ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
let built = 0, failed = false;
for (const f of files) {
  const path = join(CONTENT, f);
  const r = JSON.parse(readFileSync(path, "utf8"));
  if (only ? r.slug !== only : r.pdf) continue;
  const issuePath = join(ISSUES, `${r.slug}.mjs`);
  const full = existsSync(issuePath);
  const { html, pageCount } = full
    ? renderIssue((await import(pathToFileURL(issuePath).href + `?t=${Date.now()}`)).default)
    : render(r);
  const htmlPath = join(tmp, `${r.slug}.html`);
  writeFileSync(htmlPath, html);
  if (process.env.FF_HTML_DIR) writeFileSync(join(process.env.FF_HTML_DIR, `${r.slug}.html`), html); // for previewing
  if (full) {
    // Refuse to publish a page whose text runs past its footer.
    const dom = chrome(["--dump-dom", `file://${htmlPath}`]);
    if (!/data-checked="1"/.test(dom)) { console.error(`✗ ${r.slug}: layout check did not run`); failed = true; continue; }
    const over = /data-overflow="([^"]*)"/.exec(dom)?.[1] ?? "";
    if (over) { console.error(`✗ ${r.slug}: content overflows on page(s) ${over}`); failed = true; if (!process.env.FF_FORCE) continue; }
  }
  const name = `the-financial-frontier-issue-${pad(r.issueNumber)}-screen.pdf`;
  chrome([`--print-to-pdf=${join(OUT, name)}`, `file://${htmlPath}`]);
  // Edit the JSON text in place (rather than re-serialising) so hand-written formatting survives.
  let text = readFileSync(path, "utf8");
  const pdfJson = `"pdf": ${JSON.stringify({ ...(r.pdf ?? {}), screen: `/reports/${name}` })}`;
  text = /"pdf"\s*:\s*\{[^}]*\}/.test(text) ? text.replace(/"pdf"\s*:\s*\{[^}]*\}/, pdfJson) : text.replace(/\n(\s*)"tags"\s*:/, `\n$1${pdfJson},\n$1"tags":`);
  text = /"pageCount"\s*:\s*\d+/.test(text) ? text.replace(/"pageCount"\s*:\s*\d+/, `"pageCount": ${pageCount}`) : text.replace(/\n(\s*)"tags"\s*:/, `\n$1"pageCount": ${pageCount},\n$1"tags":`);
  JSON.parse(text); // fail loudly rather than write a broken file
  writeFileSync(path, text);
  console.log(`✓ ${r.slug} → public/reports/${name} (${pageCount} pages${full ? ", full edition" : ", short edition"})`);
  built++;
}
rmSync(tmp, { recursive: true, force: true });
if (!built && !failed) console.log(only ? `No report with slug ${only}.` : "Every report already has a PDF. Pass a slug to rebuild one.");
if (failed) process.exit(1);
