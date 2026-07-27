# Adding a monthly report

The homepage feature, the archive, the ticker and the dashboard all read from **one JSON file per
month**. To publish a new issue you do two things — no code changes.

## The 2-minute version

```bash
# 1. Add your PDF(s)
cp my-issue.pdf public/reports/issue-02-screen.pdf

# 2. Copy last month's JSON and edit it
cp content/reports/2026-06.json content/reports/2026-07.json

# 3. Open the new file and change AT LEAST: slug, issueNumber, month, publishedAt
npm run dev
```

## Naming rules

| Thing | Rule | Example |
|---|---|---|
| JSON filename | `YYYY-MM.json` | `content/reports/2026-07.json` |
| `slug` field | must match the filename | `"2026-07"` |
| PDF path | anything under `public/` | `/reports/issue-02-screen.pdf` |
| URL you get | `/reports/<slug>` | `/reports/2026-07` |

The newest report is chosen by **`publishedAt`**, not the filename — always set it.

> ⚠️ Change the `slug` when you copy a file. Two files with the same slug show as one (the first
> wins); they won't crash the build, but only one appears. This is the #1 gotcha.

## Fields (see content/reports/2026-06.json for a full example)

- **Identity:** `slug`, `issueNumber`, `month`, `publishedAt`, `title`, `standfirst`, `tags`, `pageCount`
- **`pdf`:** `{ "screen": "/reports/...", "press": "/reports/..." }` — paths relative to `public/`. `press` is optional.
- **`editorsNote`** (optional): a pull-quote near the top of the report page.
- **`indicators[]`:** `{ label, value, note?, tone }` — first 4 show on the homepage, first 8 on the dashboard, all on the report page + ticker. `tone` ∈ up | down | gold | blue | cyan | violet | neutral.
- **`highlights[]`:** `{ tag?, title, blurb }` — the story cards.
- **`charts`:** each key is optional; omit one and that chart disappears cleanly.
  - `growthForecast: [{name, value}]`
  - `growthVsInflation: [{name, value, note?}]` — bars named CPI/inflation/price render gold, the rest blue
  - `activityIndex: [{name, value}]` + `activityBaseline` + `activityTitle` — horizontal bars vs a threshold (green above, red below)
  - `policy: { tightening[], easing[], holding[] }`
- **`sources[]`:** `{ name, url? }`.

## Publishing

```bash
npm run build     # catches malformed JSON and type errors before deploy
```

Push to your main branch (Vercel/Netlify/Cloudflare) — the new report is generated at build time.

## Troubleshooting

- **New report not showing:** make sure `publishedAt` is the latest date and the file ends in `.json`.
- **Build fails on JSON:** usually a trailing comma. Paste the file into any JSON validator.
- **Clicking a report 404s:** the file's `slug` doesn't match a generated page. Ensure the filename
  (minus `.json`) equals the `slug` field, delete `.next`, and run `npm run dev`.
- **PDF preview blank:** the `pdf.screen` path must start with `/` and the file must exist under
  `public/`. Some browsers block embedded PDFs — the "Open full screen" button always works.
