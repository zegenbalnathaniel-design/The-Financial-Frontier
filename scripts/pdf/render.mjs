// Renders a full-length issue (content/issues/<slug>.mjs) to print-ready HTML in the
// Issue 01 house style. Every page is built from a small set of blocks so the layout
// stays consistent: running header, gold kicker, display title, deck, two-column body
// (story + "five questions" grid on the left; chart, stats and sidebars on the right),
// and a footer with the section name and page number.

const TONE = {
  gold: "#F5C451", blue: "#3B9CF6", violet: "#A78BFA", green: "#34D399", red: "#F87171",
  cyan: "#22D3EE", white: "#F1F5F9", muted: "#94A3B8",
};
const SERIES = [TONE.blue, TONE.gold, TONE.violet, TONE.green, TONE.red, TONE.cyan];

export const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Minimal inline markup: **bold**, *italic*. Everything else is escaped. */
export const md = (s = "") =>
  esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");

const pad = (n) => String(n).padStart(2, "0");
const tone = (t, fallback = TONE.white) => TONE[t] ?? t ?? fallback;

// ── charts ──────────────────────────────────────────────────────────────────

/** Vertical bars with value labels (the Issue 01 look). data: [{label, value, display?, tone?}] */
function vbars({ data, unit = "", height = 120, decimals }) {
  const vals = data.map((d) => d.value);
  const max = Math.max(...vals, 0), min = Math.min(...vals, 0);
  const W = 300, H = height, top = 18, base = H - (min < 0 ? 34 : 22);
  const span = max - min || 1;
  const zeroY = top + ((max - 0) / span) * (base - top);
  const n = data.length, gap = 14, bw = Math.min(48, (W - 20 - gap * (n - 1)) / n);
  const x0 = (W - (bw * n + gap * (n - 1))) / 2;
  const dp = decimals ?? (vals.some((v) => !Number.isInteger(v)) ? 1 : 0);
  const bars = data.map((d, i) => {
    const x = x0 + i * (bw + gap);
    const y = d.value >= 0 ? top + ((max - d.value) / span) * (base - top) : zeroY;
    const h = Math.max(1.5, (Math.abs(d.value) / span) * (base - top));
    const c = tone(d.tone, SERIES[i % SERIES.length]);
    const label = d.display ?? `${d.value > 0 && min < 0 ? "+" : ""}${d.value.toFixed(dp)}${unit}`;
    const ly = d.value >= 0 ? y - 5 : y + h + 10;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="2" fill="${c}"/>
      <text x="${x + bw / 2}" y="${ly}" class="v">${esc(label)}</text>
      <text x="${x + bw / 2}" y="${H - 6}" class="l">${esc(d.label)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg"><line x1="8" x2="${W - 8}" y1="${zeroY}" y2="${zeroY}" class="axis"/>${bars}</svg>`;
}

/** Horizontal bars, optional baseline (e.g. PMI 50). data: [{label, value, display?, tone?}] */
function hbars({ data, unit = "", baseline = 0, decimals }) {
  const vals = data.map((d) => d.value);
  const lo = Math.min(baseline, ...vals), hi = Math.max(baseline, ...vals);
  const pad0 = baseline !== 0 ? (hi - lo) * 0.15 : 0;
  const min = lo - (baseline !== 0 ? pad0 : 0), max = hi + pad0, span = max - min || 1;
  const z = ((baseline - min) / span) * 100;
  const dp = decimals ?? (vals.some((v) => !Number.isInteger(v)) ? 1 : 0);
  return `<div class="hb">${data.map((d, i) => {
    const x = ((Math.min(d.value, baseline) - min) / span) * 100;
    const w = Math.max(0.8, (Math.abs(d.value - baseline) / span) * 100);
    const c = tone(d.tone, d.value >= baseline ? TONE.green : TONE.red);
    const label = d.display ?? `${d.value > 0 && baseline === 0 && min < 0 ? "+" : ""}${d.value.toFixed(dp)}${unit}`;
    return `<div class="hb-row"><span class="hb-l">${esc(d.label)}</span><span class="hb-t"><i class="hb-z" style="left:${z}%"></i><i class="hb-b" style="left:${x}%;width:${w}%;background:${c}"></i></span><span class="hb-v" style="color:${c}">${esc(label)}</span></div>`;
  }).join("")}${baseline !== 0 ? `<p class="hb-base">Line = ${baseline}</p>` : ""}</div>`;
}

/** Two labelled columns of items (e.g. "Easing ↓ / Tightening ↑"). */
function split({ left, right }) {
  const col = (c) => `<div><p class="sp-h" style="color:${tone(c.tone, TONE.gold)}">${esc(c.title)}</p>${c.items.map((x) => `<p class="sp-i">${md(x)}</p>`).join("")}</div>`;
  return `<div class="sp">${col(left)}${col(right)}</div>`;
}

/** A labelled ladder / scale of steps (conceptual or sourced). */
function ladder({ steps }) {
  return `<div class="lad">${steps.map((s, i) => `<div class="lad-s" style="border-color:${tone(s.tone, SERIES[i % SERIES.length])}"><b style="color:${tone(s.tone, SERIES[i % SERIES.length])}">${esc(s.value)}</b><span>${md(s.label)}</span></div>`).join("")}</div>`;
}

/** Small key/value table inside a card. */
function kv({ rows }) {
  return `<table class="kv">${rows.map((r) => `<tr><td>${md(r[0])}</td><td>${md(r[1])}</td></tr>`).join("")}</table>`;
}

function chartBody(c) {
  switch (c.type) {
    case "hbars": return hbars(c);
    case "split": return split(c);
    case "ladder": return ladder(c);
    case "kv": return kv(c);
    default: return vbars(c);
  }
}

// ── blocks ──────────────────────────────────────────────────────────────────

const blocks = {
  lead: (b) => `<p class="lead">${md(b.text)}</p>`,
  p: (b) => `<p class="body">${md(b.text)}</p>`,
  fiveq: (b) => `<div class="fq">
    <div><h6 class="g">What happened</h6><p>${md(b.happened)}</p></div>
    <div><h6 class="g">Why it matters</h6><p>${md(b.matters)}</p></div>
    <div><h6 class="b">Who benefits</h6><p>${md(b.benefits)}</p></div>
    <div><h6 class="b">Who's hurt</h6><p>${md(b.hurt)}</p></div>
    <div class="fq-k"><h6 class="g">Key takeaway</h6><p>${md(b.takeaway)}</p></div></div>`,
  chart: (b) => `<div class="card"><p class="card-h"><i style="background:${tone(b.dot, TONE.gold)}"></i>${md(b.title)}</p>${chartBody(b)}${b.source ? `<p class="src">${md(b.source)}</p>` : ""}</div>`,
  stat: (b) => `<div class="stat"><p class="stat-v" style="color:${tone(b.tone)}">${esc(b.value)}</p><p class="stat-l">${md(b.label)}</p></div>`,
  stats: (b) => `<div class="stats" style="grid-template-columns:repeat(${b.items.length},1fr)">${b.items.map((s) => blocks.stat(s)).join("")}</div>`,
  sidebar: (b) => `<div class="side" style="border-color:${tone(b.tone, TONE.blue)}"><h6 style="color:${tone(b.tone, TONE.blue)}">${esc(b.icon ?? "▤")} ${esc(b.label ?? "Sidebar")} · ${esc(b.title)}</h6><p>${md(b.text)}</p></div>`,
  analysis: (b) => `<div class="card an"><p class="an-h">${esc(b.title ?? "Frontier analysis")}</p><p>${md(b.text)}</p></div>`,
  callout: (b) => `<div class="side" style="border-color:${tone(b.tone, TONE.gold)}"><h6 style="color:${tone(b.tone, TONE.gold)}">${esc(b.icon ?? "◇")} ${esc(b.title)}</h6><p>${md(b.text)}</p></div>`,
  quote: (b) => `<blockquote class="q">“${md(b.text)}”${b.by ? `<cite>— ${esc(b.by)}</cite>` : ""}</blockquote>`,
  box: (b) => `<div class="card"><p class="card-h">${b.dot ? `<i style="background:${tone(b.dot)}"></i>` : ""}${md(b.title)}</p>${(b.paras ?? [b.text]).map((t) => `<p class="box-p">${md(t)}</p>`).join("")}${b.source ? `<p class="src">${md(b.source)}</p>` : ""}</div>`,
  cards: (b) => `<div class="cards" style="grid-template-columns:repeat(${b.cols ?? b.items.length},1fr)">${b.items.map((c) => blocks.box(c)).join("")}</div>`,
  table: (b) => `<div class="card"><p class="card-h"><i style="background:${tone(b.dot, TONE.gold)}"></i>${md(b.title)}</p><table class="tbl"><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>${b.source ? `<p class="src">${md(b.source)}</p>` : ""}</div>`,
  gauges: (b) => `<div class="gauges">${b.items.map((g) => `<div class="card"><p class="card-h"><i style="background:${tone(g.dot)}"></i>${esc(g.title)}</p><div class="g-row">${g.values.map((v) => `<div><p class="g-v" style="color:${tone(v.tone)}">${esc(v.value)}</p><p class="g-l">${md(v.label)}</p></div>`).join("")}</div><p class="src">${md(g.source)}</p></div>`).join("")}</div>`,
  terms: (b) => `<div class="terms">${b.items.map((t) => `<div class="term"><h5>${esc(t.term)}</h5><p>${md(t.def)}</p></div>`).join("")}</div>`,
  strip: (b) => `<div class="strip">${b.items.map((s, i) => `<div style="border-color:${tone(s.tone, SERIES[i % SERIES.length])}"><b>${esc(s.value)}</b><span>${md(s.label)}</span></div>`).join("")}</div>`,
  bignums: (b) => `<div class="bignums">${b.items.map((s) => `<div class="card"><p class="bn-k" style="color:${tone(s.tone, TONE.gold)}">${esc(s.kicker)}</p><p class="bn-v">${esc(s.value)}</p><p class="bn-l">${md(s.label)}</p></div>`).join("")}</div>`,
  flows: (b) => `<div class="card"><p class="card-h"><i style="background:${TONE.gold}"></i>${esc(b.title)}</p>${b.items.map((f) => `<div class="flow"><p>${md(f.label)}</p><div><i style="width:${f.width}%;background:${tone(f.tone, f.dir === "out" ? TONE.red : TONE.gold)}"></i>${f.tag ? `<span>${esc(f.tag)}</span>` : ""}</div></div>`).join("")}<p class="src">${md(b.note)}</p></div>`,
  puzzle: (b) => `<div class="card pz"><p class="card-h"><i style="background:${tone(b.dot, TONE.gold)}"></i>${esc(b.icon ?? "")} ${esc(b.title)}</p>${(b.paras ?? []).map((t) => `<p class="box-p">${md(t)}</p>`).join("")}${b.list ? `<ol class="pz-l">${b.list.map((x) => `<li>${md(x)}</li>`).join("")}</ol>` : ""}${b.rows ? kv({ rows: b.rows }) : ""}${b.answer ? `<p class="pz-a-h">Answer:</p><p class="pz-a" style="color:${tone(b.dot, TONE.gold)}">${md(b.answer)}</p>` : ""}</div>`,
  meme: (b) => `<div class="card"><p class="card-h" style="color:${TONE.gold}">😂 Econ meme of the month</p><div class="meme"><p class="meme-h">${esc(b.head)}</p><p class="meme-a">“${md(b.a)}</p><p class="meme-b">${md(b.b)}”</p><p class="meme-e">${esc(b.emoji ?? "🫠")}</p><p class="meme-c">— ${esc(b.caption)}</p></div></div>`,
  sources: (b) => `<ol class="srcs">${b.items.map((s) => `<li>${md(s)}</li>`).join("")}</ol>`,
  note: (b) => `<p class="note">${md(b.text)}</p>`,
  spacer: (b) => `<div style="height:${b.h ?? 4}mm"></div>`,
  g2: (b) => `<div class="g2"><div>${renderBlocks(b.left)}</div><div>${renderBlocks(b.right)}</div></div>`,
};

export function renderBlocks(list = []) {
  return list.map((b) => {
    const fn = blocks[b.t];
    if (!fn) throw new Error(`Unknown block type: ${b.t}`);
    return fn(b);
  }).join("");
}

// ── pages ───────────────────────────────────────────────────────────────────

function frame(issue, p, n, inner) {
  return `<section class="page" data-page="${n}">
    <header class="run"><span>${esc(p.run ?? p.section)}</span><span>Issue No. ${pad(issue.issueNumber)}</span></header>
    <div class="content">${inner}</div>
    <footer class="run foot"><span>${esc(p.foot ?? p.section)}</span><b>${pad(n)}</b></footer>
  </section>`;
}

function head(p) {
  return `<p class="kicker" style="--k:${tone(p.kickerTone, TONE.gold)}">${esc(p.kicker)}</p>
    <h1 class="title">${md(p.title)}</h1>${p.deck ? `<p class="deck">${md(p.deck)}</p>` : ""}`;
}

function standard(issue, p, n) {
  const cols = p.left || p.right
    ? `<div class="cols${p.wideRight ? " wr" : ""}"><div>${renderBlocks(p.left)}</div><div>${renderBlocks(p.right)}</div></div>` : "";
  return frame(issue, p, n, `${head(p)}${renderBlocks(p.top)}${cols}${renderBlocks(p.full)}`);
}

function cover(issue, p) {
  return `<section class="page cover">
    <div class="glow gw1"></div><div class="glow gw2"></div>
    <svg class="globe" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="190"/><ellipse cx="200" cy="200" rx="190" ry="70"/><ellipse cx="200" cy="200" rx="190" ry="135"/><ellipse cx="200" cy="200" rx="70" ry="190"/><ellipse cx="200" cy="200" rx="135" ry="190"/><line x1="10" y1="200" x2="390" y2="200"/></svg>
    <div class="cv-top"><span class="brand"><i></i>The Financial Frontier</span><span class="mono">ISSUE No. ${pad(issue.issueNumber)}</span></div>
    <div class="cv-body"><span class="pill">MONTHLY BRIEFING · ${esc(issue.month.toUpperCase())}</span>
      <h1>${p.lines.map((l) => esc(l)).join("<br>")}${p.gold ? `<br><span class="gold">${esc(p.gold)}</span>` : ""}</h1>
      <p class="stand">${md(p.standfirst)}</p>
      <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
    <div class="cv-foot"><div><b>Economics Explained. Markets Decoded.</b><br>Finance made interesting — published every two weeks.</div><span class="mono">thefinancialfrontier.com</span></div>
  </section>`;
}

function contents(issue, p, n, toc) {
  const half = Math.ceil(toc.length / 2);
  const col = (items, c) => `<div>${items.map((t) => `<div class="toc"><b style="color:${c}">${pad(t.n)}</b><span>${esc(t.label)}</span></div>`).join("")}</div>`;
  return frame(issue, { section: "The Financial Frontier", run: "The Financial Frontier", foot: "The Financial Frontier" }, n, `
    <p class="kicker">In this issue</p><h1 class="title">Contents</h1>
    <div class="toc-grid">${col(toc.slice(0, half), TONE.gold)}${col(toc.slice(half), TONE.blue)}</div>
    <div class="card toc-box"><div><p class="tb-h" style="color:${TONE.gold}">The month in one line</p><p class="tb-main">${md(p.oneLine)}</p></div>
      <div><p class="tb-h" style="color:${TONE.blue}">Our method</p><p>Every major story is built on five questions: what happened, why it matters, who benefits, who's hurt, and the key takeaway.</p></div>
      <div><p class="tb-h" style="color:${TONE.muted}">On the data</p><p>Figures are drawn from the public institutions listed on p.${pad(p.sourcesPage)}. We separate fact, analysis and opinion throughout.</p></div></div>`).replace(`data-page="${n}"`, `data-page="${n}"`);
}

function back(issue, p) {
  return `<section class="page cover back">
    <div class="glow gw3"></div><div class="glow gw4"></div>
    <div class="bk-top"><span class="brand"><i></i>The Financial Frontier</span></div>
    <div class="bk-body"><h1>Economics Explained.<br>Markets Decoded.<br><span class="gold">Finance Made Interesting.</span></h1>
      <p class="stand">${md(p.text)}</p>
      <div class="tags"><span>Published biweekly</span><span class="gt">Independent · Educational</span></div></div>
    <div class="bk-foot"><p>© 2026 The Financial Frontier. Educational use only; not investment advice. Figures attributed to the public sources on p.${pad(p.sourcesPage)}.</p><span class="mono">No. ${pad(issue.issueNumber)}</span></div>
  </section>`;
}

export function renderIssue(issue) {
  // Page numbers: cover = 1, contents = 2, then content pages in order, back cover last.
  const pages = issue.pages;
  const toc = [];
  let n = 2;
  for (const p of pages) { n++; if (p.toc) toc.push({ n, label: p.toc }); }
  const sourcesPage = toc.find((t) => /sources/i.test(t.label))?.n ?? n;
  const out = [cover(issue, issue.cover), contents(issue, { ...issue.contents, sourcesPage }, 2, toc)];
  n = 2;
  for (const p of pages) { n++; out.push(standard(issue, p, n)); }
  out.push(back(issue, { ...issue.back, sourcesPage }));
  return { html: doc(`${issue.month} — ${issue.title}`, out.join("")), pageCount: out.length };
}

// ── document + styles ───────────────────────────────────────────────────────

function doc(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>${CSS}</style></head><body>${body}
<script>
// Overflow check used by the build: flags any page whose content runs past the footer.
window.addEventListener('load', () => document.fonts.ready.then(() => {
  const over = [...document.querySelectorAll('.page .content')].filter(c => c.scrollHeight > c.clientHeight + 1).map(c => c.parentElement.dataset.page);
  document.body.dataset.checked = '1';
  document.body.dataset.overflow = over.join(',');
}));
</script></body></html>`;
}

const CSS = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #070C16; color: #CBD5E1; font: 400 9.6pt/1.5 Inter, system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
b { color: #F1F5F9; font-weight: 600; }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; page-break-after: always;
  background: radial-gradient(90% 45% at 100% 0%, rgba(30,58,95,.28), transparent 70%), linear-gradient(180deg, #08101C 0%, #070C16 100%); }
.page:last-child { page-break-after: auto; }
.run { position: absolute; left: 17mm; right: 17mm; top: 9.5mm; display: flex; justify-content: space-between; font: 500 6.6pt Inter; letter-spacing: .16em; text-transform: uppercase; color: #64748B; }
.run.foot { top: auto; bottom: 9mm; padding-top: 2.4mm; border-top: 1px solid rgba(148,163,184,.16); }
.run.foot b { color: ${TONE.gold}; font-weight: 600; letter-spacing: .05em; }
.content { position: absolute; left: 17mm; right: 17mm; top: 17mm; bottom: 19mm; overflow: hidden; }
.kicker { display: flex; align-items: center; gap: 3mm; font: 600 7.6pt Inter; letter-spacing: .2em; text-transform: uppercase; color: var(--k, ${TONE.gold}); }
.kicker::before { content: ""; width: 5.5mm; height: 1.4px; background: var(--k, ${TONE.gold}); }
.title { font: 600 25pt/1.08 "Space Grotesk"; color: #F8FAFC; margin: 2.4mm 0 2mm; letter-spacing: -.01em; max-width: 160mm; }
.deck { font-size: 10.6pt; line-height: 1.45; color: #94A3B8; margin-bottom: 5.5mm; max-width: 165mm; }
.cols { display: grid; grid-template-columns: 1.12fr .88fr; gap: 7mm; }
.cols.wr { grid-template-columns: .9fr 1.1fr; }
.cols > div > * + * { margin-top: 3.6mm; }
.lead { font-size: 11.2pt; line-height: 1.55; color: #E2E8F0; }
.body { font-size: 9.4pt; line-height: 1.58; color: #B6C2D3; }
.lead + .body, .body + .body { margin-top: 2.6mm !important; }
.fq { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(148,163,184,.2); border-radius: 2.6mm; overflow: hidden; }
.fq > div { padding: 2.6mm 3.2mm; border-bottom: 1px solid rgba(148,163,184,.14); }
.fq > div:nth-child(odd):not(.fq-k) { border-right: 1px solid rgba(148,163,184,.14); }
.fq-k { grid-column: 1 / -1; background: rgba(15,23,42,.9); border-bottom: 0 !important; }
.fq h6 { font: 700 6.6pt Inter; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 1mm; }
.fq h6.g { color: ${TONE.gold}; } .fq h6.b { color: ${TONE.blue}; }
.fq p { font-size: 8.4pt; line-height: 1.45; color: #CBD5E1; }
.card { background: rgba(20,32,54,.72); border: 1px solid rgba(148,163,184,.16); border-radius: 2.6mm; padding: 3.6mm 4mm; }
.card-h { display: flex; align-items: center; gap: 2mm; font: 600 8.8pt "Space Grotesk"; color: #F1F5F9; margin-bottom: 2.4mm; }
.card-h i { width: 1.8mm; height: 1.8mm; border-radius: 50%; flex: none; }
.box-p { font-size: 8.8pt; line-height: 1.52; color: #CBD5E1; }
.box-p + .box-p { margin-top: 1.8mm; }
.src { margin-top: 2mm; font-size: 7pt; font-style: italic; color: #64748B; line-height: 1.4; }
.chart-svg { width: 100%; display: block; }
.chart-svg .axis { stroke: rgba(148,163,184,.3); stroke-width: 1; }
.chart-svg .v { font: 600 8.5px Inter; fill: #E2E8F0; text-anchor: middle; }
.chart-svg .l { font: 500 6.8px Inter; fill: #94A3B8; text-anchor: middle; }
.hb { display: grid; gap: 2mm; }
.hb-row { display: grid; grid-template-columns: 27mm 1fr 15mm; gap: 2.4mm; align-items: center; }
.hb-l { font-size: 7.8pt; color: #CBD5E1; }
.hb-t { position: relative; height: 3.6mm; background: rgba(148,163,184,.08); border-radius: 1mm; }
.hb-z { position: absolute; top: -1mm; bottom: -1mm; width: 1px; background: rgba(226,232,240,.4); }
.hb-b { position: absolute; top: 0; bottom: 0; border-radius: 1mm; }
.hb-v { font: 600 7.8pt Inter; text-align: right; }
.hb-base { font-size: 6.8pt; color: #64748B; }
.sp { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.sp-h { font: 700 6.8pt Inter; letter-spacing: .14em; text-transform: uppercase; padding-bottom: 1.2mm; border-bottom: 1px solid rgba(148,163,184,.2); margin-bottom: 1.4mm; }
.sp-i { font-size: 8.4pt; padding: .8mm 0; color: #E2E8F0; }
.lad { display: grid; gap: 1.8mm; }
.lad-s { display: grid; grid-template-columns: 22mm 1fr; align-items: center; gap: 3mm; border-left: 2px solid; padding: 1mm 0 1mm 3mm; }
.lad-s b { font: 600 11pt "Space Grotesk"; }
.lad-s span { font-size: 8pt; color: #CBD5E1; }
.kv { width: 100%; border-collapse: collapse; font-size: 8.4pt; }
.kv td { padding: 1.5mm 0; border-bottom: 1px solid rgba(148,163,184,.14); color: #CBD5E1; }
.kv td:last-child { text-align: right; color: #F1F5F9; font-weight: 600; }
.stats { display: grid; gap: 3mm; }
.stat-v { font: 600 21pt/1.05 "Space Grotesk"; letter-spacing: -.01em; }
.stat-l { font-size: 7.6pt; color: #94A3B8; margin-top: .8mm; line-height: 1.35; }
.side { background: rgba(20,32,54,.72); border-left: 2.5px solid; border-radius: 0 2.6mm 2.6mm 0; padding: 3mm 3.8mm; }
.side h6 { font: 700 6.8pt Inter; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 1.2mm; }
.side p { font-size: 8.5pt; line-height: 1.5; color: #CBD5E1; }
.an-h { font: 600 9pt "Space Grotesk"; color: ${TONE.gold}; margin-bottom: 1.6mm; }
.an p:not(.an-h) { font-size: 8.6pt; line-height: 1.5; }
.q { border-left: 2.5px solid ${TONE.gold}; padding: 1mm 0 1mm 4mm; font: 500 12.5pt/1.38 "Space Grotesk"; color: #F1F5F9; }
.q cite { display: block; margin-top: 1.8mm; font: 400 7.6pt Inter; font-style: normal; color: #94A3B8; }
.cards { display: grid; gap: 4mm; }
.tbl { width: 100%; border-collapse: collapse; font-size: 8.3pt; }
.tbl th { text-align: left; font: 700 6.4pt Inter; letter-spacing: .12em; text-transform: uppercase; color: #64748B; padding: 1.6mm 2mm; border-bottom: 1px solid rgba(148,163,184,.25); }
.tbl td { padding: 1.8mm 2mm; border-bottom: 1px solid rgba(148,163,184,.1); color: #E2E8F0; vertical-align: top; }
.gauges { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5mm; }
.g-row { display: flex; flex-wrap: wrap; gap: 3mm 6mm; }
.g-v { font: 600 17pt/1.1 "Space Grotesk"; }
.g-l { font-size: 7.2pt; color: #94A3B8; }
.terms { display: grid; grid-template-columns: 1fr 1fr; gap: 3.2mm 6mm; }
.term { border-bottom: 1px solid rgba(148,163,184,.14); padding-bottom: 2.6mm; }
.term h5 { font: 600 11pt "Space Grotesk"; color: #F1F5F9; margin-bottom: 1mm; }
.term p { font-size: 8.6pt; line-height: 1.48; color: #B6C2D3; }
.strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5mm; }
.strip > div { border-top: 2px solid; padding-top: 2.4mm; text-align: center; }
.strip b { display: block; font: 600 13pt "Space Grotesk"; }
.strip span { font-size: 7.4pt; color: #94A3B8; }
.bignums { display: grid; gap: 4mm; }
.bn-k { font: 700 6.6pt Inter; letter-spacing: .12em; text-transform: uppercase; }
.bn-v { font: 600 25pt/1.1 "Space Grotesk"; color: #F8FAFC; }
.bn-l { font-size: 8.2pt; color: #94A3B8; }
.flow { margin-bottom: 2.6mm; }
.flow p { font-size: 7.4pt; color: #94A3B8; margin-bottom: .8mm; }
.flow div { display: flex; align-items: center; gap: 2mm; }
.flow i { display: block; height: 3.6mm; border-radius: .8mm; }
.flow span { font-size: 7pt; color: #CBD5E1; }
.pz-l { padding-left: 4.5mm; font-size: 8.6pt; line-height: 1.5; color: #CBD5E1; }
.pz-a-h { margin-top: 2mm; font-size: 7.6pt; color: #94A3B8; }
.pz-a { font: 600 10pt "Space Grotesk"; }
.meme { border: 1px dashed rgba(148,163,184,.25); border-radius: 2mm; padding: 4mm; text-align: center; }
.meme-h { font: 500 8.6pt Inter; letter-spacing: .04em; color: #F1F5F9; text-transform: uppercase; }
.meme-a { font: 500 10.5pt "Space Grotesk"; color: ${TONE.gold}; margin-top: 2mm; }
.meme-b { font: 500 10.5pt "Space Grotesk"; color: ${TONE.blue}; margin-top: 1mm; }
.meme-e { font-size: 20pt; margin-top: 1mm; }
.meme-c { font-size: 7.6pt; color: #94A3B8; }
.srcs { padding-left: 5mm; display: grid; gap: 1.5mm; font-size: 7.9pt; line-height: 1.42; color: #B6C2D3; }
.note { font-size: 7.4pt; color: #64748B; line-height: 1.45; text-align: center; }
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.g2 > div > * + * { margin-top: 4mm; }
* + .cards, * + .gauges, * + .terms, * + .strip, * + .g2, * + .card, * + .side, * + .note, * + .table { margin-top: 4.5mm; }
* + .cols { margin-top: 5mm; }
.cards > *, .gauges > *, .bignums > *, .stats > *, .terms > *, .strip > * { margin-top: 0 !important; }
.toc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 9mm; margin-top: 6mm; }
.toc { display: grid; grid-template-columns: 9mm 1fr; padding: 1.55mm 0; border-bottom: 1px solid rgba(148,163,184,.14); font-size: 8.6pt; color: #E2E8F0; }
.toc b { font-weight: 500; }
.toc-box { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; margin-top: 7mm; padding: 5mm; }
.toc-box p { font-size: 8.2pt; color: #94A3B8; line-height: 1.5; }
.toc-box .tb-main { color: #E2E8F0; font-size: 8.8pt; }
.tb-h { font: 600 8.4pt "Space Grotesk"; margin-bottom: 1.5mm; }
/* cover + back */
.cover { padding: 0; background: radial-gradient(80% 50% at 20% 85%, rgba(37,99,235,.22), transparent 60%), linear-gradient(180deg, #071022 0%, #0A1B35 100%); }
.glow { position: absolute; border-radius: 50%; filter: blur(28mm); }
.gw1 { width: 80mm; height: 80mm; right: 40mm; top: 15mm; background: rgba(245,196,81,.16); }
.gw2 { width: 90mm; height: 90mm; left: -10mm; bottom: 40mm; background: rgba(59,130,246,.2); }
.gw3 { width: 90mm; height: 90mm; left: -10mm; top: -10mm; background: rgba(59,130,246,.22); }
.gw4 { width: 90mm; height: 90mm; right: -20mm; bottom: -10mm; background: rgba(245,196,81,.10); }
.globe { position: absolute; right: -38mm; top: 62mm; width: 165mm; height: 165mm; fill: none; stroke: #3B82F6; stroke-opacity: .35; stroke-width: 1; }
.brand { display: inline-flex; align-items: center; gap: 2.4mm; font: 600 11.5pt "Space Grotesk"; color: #F1F5F9; }
.brand i { width: 4mm; height: 4mm; border-radius: 50%; border: 1.4px solid ${TONE.gold}; display: inline-grid; place-items: center; }
.brand i::after { content: ""; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: ${TONE.blue}; }
.mono { font: 500 7.6pt Inter; letter-spacing: .22em; color: #94A3B8; }
.gold { color: ${TONE.gold}; }
.cv-top { position: absolute; left: 17mm; right: 17mm; top: 19mm; display: flex; justify-content: space-between; align-items: center; }
.cv-body { position: absolute; left: 17mm; right: 45mm; top: 96mm; }
.pill { display: inline-block; font: 600 7pt Inter; letter-spacing: .06em; color: ${TONE.gold}; border: 1px solid rgba(245,196,81,.5); background: rgba(245,196,81,.08); padding: 1.5mm 3.2mm; border-radius: 99px; }
.cover h1, .back h1 { font: 600 37pt/1.06 "Space Grotesk"; color: #F1F5F9; margin-top: 5mm; letter-spacing: -.01em; }
.stand { margin-top: 6mm; font-size: 11.4pt; line-height: 1.55; color: #94A3B8; max-width: 125mm; }
.tags { margin-top: 6mm; display: flex; flex-wrap: wrap; gap: 2.2mm; }
.tags span { font: 500 7pt Inter; color: #60A5FA; border: 1px solid rgba(59,130,246,.45); background: rgba(59,130,246,.08); padding: 1.2mm 2.8mm; border-radius: 99px; }
.tags span.gt { color: ${TONE.gold}; border-color: rgba(245,196,81,.45); background: rgba(245,196,81,.08); }
.cv-foot { position: absolute; left: 17mm; right: 17mm; bottom: 19mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8pt; color: #94A3B8; line-height: 1.5; }
.back { background: radial-gradient(70% 45% at 10% 5%, rgba(37,99,235,.25), transparent 60%), linear-gradient(180deg, #071022 0%, #0A1B35 100%); }
.bk-top { position: absolute; left: 19mm; top: 30mm; }
.bk-body { position: absolute; left: 19mm; right: 40mm; top: 105mm; }
.back h1 { font-size: 26pt; line-height: 1.18; }
.bk-foot { position: absolute; left: 19mm; right: 19mm; bottom: 28mm; padding-top: 3mm; border-top: 1px solid rgba(148,163,184,.2); display: flex; justify-content: space-between; font-size: 7.4pt; color: #64748B; }
.bk-foot p { max-width: 110mm; line-height: 1.5; }
`;
