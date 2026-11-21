// Issue No. 04 — September 2026. Full-length print edition.
// Figures are drawn from the sources on the Sources page; where sources disagreed we give
// the primary release or a range. Data published in early October about September is dated.

export default {
  slug: "2026-09",
  issueNumber: 4,
  month: "September 2026",
  title: "The Great Re-tightening",

  cover: {
    lines: ["The Great"],
    gold: "Re-tightening.",
    standfirst:
      "The Fed raised rates for the first time since 2023, the ECB and Bank of Japan hiked the same week, and Australia and South Africa followed. Brent broke $100 as Washington rejected Iran's plan to reopen Hormuz, and the 10-year Treasury yield hit its highest since 2002.",
    tags: ["Fed Hike", "ECB & BoJ", "Brent $100+", "Bond Rout", "Nigeria Reset"],
  },

  contents: {
    oneLine:
      "For two years the question was when rates would fall. In September it became how high they go.",
  },

  back: {
    text:
      "Issue No. 04 covered the month the world's central banks tightened together — five hikes in two weeks, oil above $100, a 24-year high in Treasury yields and a market held up by a handful of giants. Next issue: what all that tightening does to growth.",
  },

  pages: [
    // ── 03 EDITOR ─────────────────────────────────────────────────────────
    {
      section: "Editor's Letter", toc: "Editor's Letter",
      kicker: "From the editor",
      title: "Five hikes in two weeks",
      left: [
        { t: "lead", text: "Between 10 and 29 September, five central banks raised interest rates: the European Central Bank, the Federal Reserve, the Bank of Japan, the South African Reserve Bank and the Reserve Bank of Australia. A sixth, the Bank of England, held only because three of its nine members were outvoted." },
        { t: "p", text: "The reason was the same everywhere: an energy shock that refuses to fade. Brent crude rose about **14%** in September and ended the third quarter around **$103.50** — roughly **42%** higher than at the end of June. Euro-area inflation hit **3.8%**, a three-year high, with energy prices up nearly 19% on the year." },
        { t: "p", text: "Bond markets moved faster than the central banks. The 10-year US Treasury yield climbed to about **5.3%**, its highest since 2002, and the 30-year to nearly 5.7%. The cost of long-term borrowing for governments, companies and home-buyers jumped in a matter of weeks." },
        { t: "p", text: "Stocks told two stories. The S&P 500 barely moved. But the typical stock fell sharply: the equal-weight index lost about 4.4%, and six in ten S&P members dropped at least 5%. A handful of AI giants held the index up while the rest of the market felt the squeeze." },
      ],
      right: [
        { t: "box", title: "Three numbers that frame September", dot: "gold", paras: ["**3.75–4.00%** — the Fed's new target range, after its first hike since 2023", "**~5.3%** — US 10-year Treasury yield, highest since 2002", "**~$103.50** — Brent at quarter-end, up about 42% in Q3"], source: "Federal Reserve; CNN via KRDO; The Star / priceofoil.com." },
        { t: "quote", text: "When five central banks hike in a fortnight, the problem isn't local any more.", by: "The Financial Frontier" },
        { t: "p", text: "As always: every figure carries a source, every story answers five questions, and where sources disagreed — on the exact peak in yields or gold's monthly fall — we give the range." },
      ],
      full: [
        { t: "cards", cols: 2, items: [
          { title: "What we cover", text: "Eight regions, every major market and central bank, and the themes — energy, AI, trade — that link them." },
          { title: "How to read it", text: "Facts carry a source. Analysis is our reading of those facts. Opinion is labelled as opinion." },
        ] },
      ],
    },

    // ── 04 GLOBAL I ───────────────────────────────────────────────────────
    {
      section: "The Global Economy · Tightening", foot: "The Global Economy", toc: "The Global Economy — A Synchronised Squeeze",
      kicker: "The big picture · Part I",
      title: "A synchronised squeeze",
      deck: "Central banks rarely move together. In September, the energy shock forced their hand on three continents at once.",
      left: [
        { t: "lead", text: "The scale of September's tightening is easiest to see in a list: ECB +25bp (10 Sep), Fed +25bp (16 Sep), Bank of Japan +25bp (18 Sep), South Africa +25bp (23 Sep), Australia +25bp (29 Sep). Korea had already hiked twice over the summer. Only a handful of emerging markets with very high rates — Brazil, Nigeria — moved the other way." },
        { t: "p", text: "The common cause was energy. Brent rose from about $73 at the end of June to about $103.50 at the end of September. Futures peaked at **$109** on 15 September, while some physical cargoes traded as high as **$132** — evidence of real shortages, not just speculation. Higher fuel costs spread into transport, food and services, and inflation expectations started to drift up." },
        { t: "p", text: "The danger of synchronised tightening is that it compounds. Each central bank sets policy for its own economy, but together they tighten global financial conditions — raising borrowing costs for everyone at the same time as an oil shock is squeezing incomes." },
        { t: "fiveq",
          happened: "Five major central banks hiked within three weeks as Brent rose ~42% in the quarter.",
          matters: "Coordinated tightening into an energy shock raises the risk of a global slowdown.",
          benefits: "Savers, and currencies of the most hawkish central banks.",
          hurt: "Borrowers worldwide and economies with high debt.",
          takeaway: "The world's central banks chose to fight inflation first — and to fight it together." },
      ],
      right: [
        { t: "chart", title: "Brent crude, Q3 2026 ($/bbl)", dot: "red", data: [
          { label: "End-June", value: 72.92, display: "$72.92", tone: "muted" }, { label: "15 Sep peak (futures)", value: 109, display: "$109", tone: "red" }, { label: "30 Sep", value: 103.5, display: "~$103.50", tone: "gold" } ],
          source: "EIA; priceofoil.com; The Star, Sep 2026." },
        { t: "chart", type: "kv", title: "September's hikes", dot: "blue", rows: [
          ["ECB · 10 Sep", "2.25 → 2.50%"], ["Fed · 16 Sep", "3.50–3.75 → 3.75–4.00%"], ["BoJ · 18 Sep", "1.00 → 1.25%"], ["SARB · 23 Sep", "7.00 → 7.25%"], ["RBA · 29 Sep", "4.35 → 4.60%"] ],
          source: "Central-bank statements." },
        { t: "sidebar", title: "Spot vs futures", text: "Futures prices are for oil delivered months ahead; spot prices are for cargoes available now. When spot trades far above futures — $132 vs $109 — buyers are paying up for immediate barrels: a sign of genuine physical scarcity." },
      ],
    },

    // ── 05 GLOBAL II ──────────────────────────────────────────────────────
    {
      section: "The Global Economy · Three Shocks", foot: "The Global Economy", toc: "The Global Economy — Three Shocks",
      kicker: "The big picture · Part II",
      title: "Oil, yields and a narrow market",
      deck: "September's three shocks reinforced each other — and left the typical investor worse off than the headlines suggested.",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Oil above $100", dot: "red", text: "Iran rejected US terms (23 Sep) and Washington rejected Iran's plan to reopen Hormuz (28 Sep). Brent topped $107 before settling near $103.50.", source: "Nation Thailand; Al Jazeera; The Star." },
          { title: "2 · The bond rout", dot: "blue", text: "The US 10-year yield reached ~5.3% and the 30-year ~5.7%, both the highest since 2002, as investors demanded more to lend through an inflationary war.", source: "CNN via KRDO; Trading Economics." },
          { title: "3 · A two-tier market", dot: "violet", text: "The S&P 500 slipped ~0.5% but the equal-weight index fell ~4.4%; 60% of members dropped 5% or more.", source: "Kiplinger; Bizportal; Stocktwits." },
        ] },
      ],
      left: [
        { t: "p", text: "The chain ran like this. Higher oil raised inflation forecasts. Higher inflation forecasts pushed central banks to hike and bond investors to demand higher yields. Higher yields hurt most companies — especially smaller ones that borrow at floating rates — while the largest tech firms, sitting on cash and growing fast, were relatively insulated." },
        { t: "p", text: "That is why the index and the average stock diverged so sharply. The Russell 2000 of smaller companies fell more than 5%; the Dow lost about 4.3%. The Nasdaq, dominated by the AI giants, actually rose about 1.9%." },
        { t: "fiveq",
          happened: "Oil topped $100, long-term yields hit 24-year highs and most stocks fell while the index held.",
          matters: "Headline indices are understating how much tighter conditions have become.",
          benefits: "Mega-cap tech with cash and pricing power; savers.",
          hurt: "Small companies, indebted borrowers and bond holders.",
          takeaway: "In September the economy's pain showed up in the median stock, not the index." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "US equity returns, September (%)", dot: "violet", data: [
          { label: "Nasdaq Comp.", value: 1.9 }, { label: "S&P 500", value: -0.5 }, { label: "Dow", value: -4.3 }, { label: "Equal-wt S&P", value: -4.4 }, { label: "Russell 2000", value: -5.0, display: "< –5%" } ],
          source: "Kiplinger; Bizportal; E*TRADE. Figures vary slightly by source." },
        { t: "callout", title: "Key takeaway", text: "Oil set the pace, bonds amplified it, and only the biggest companies could outrun it." },
      ],
    },

    // ── 06 US I ───────────────────────────────────────────────────────────
    {
      section: "Region · United States · I", foot: "Region · United States", toc: "United States — Prices",
      kicker: "Region · United States",
      title: "Gasoline does it again",
      deck: "August's inflation data gave the Fed little comfort — and the jobs report that followed gave it even less clarity.",
      left: [
        { t: "lead", text: "The August consumer price index, released on 11 September, showed prices rising **0.4%** in a month — the most in three — and **3.4%** over the year, unchanged from July. Gasoline jumped **3.9%** in the month and was **27.4%** higher than a year earlier; the BLS said it accounted for over a third of the monthly increase." },
        { t: "p", text: "The underlying picture was mixed. Annual core inflation eased to **2.4%**, but core prices rose 0.3% on the month, above forecasts, and core services excluding housing rose 0.5% — the strongest since January. Shelter costs rose 0.3% after two months of 0.1%. One economist said the trends did not \"build confidence that inflation will cool soon\"." },
        { t: "p", text: "Growth data was revised up. The third estimate of second-quarter GDP, on 30 September, lifted first-quarter growth to **2.5%** from 2.1%. The Fed, for its part, raised its 2026 GDP projection to **2.3%**." },
        { t: "fiveq",
          happened: "August CPI rose 0.4% m/m (3.4% y/y); gasoline +3.9% m/m; core services ex-housing +0.5%.",
          matters: "Inflation is broadening beyond energy into services — the Fed's main worry.",
          benefits: "Energy producers and landlords.",
          hurt: "Commuters and renters; anyone whose wages lag prices.",
          takeaway: "September's hike was decided in the services data, not just at the pump." },
      ],
      right: [
        { t: "chart", title: "US inflation, August 2026 (%)", dot: "gold", data: [
          { label: "CPI y/y", value: 3.4, display: "3.4%", tone: "gold" }, { label: "Core y/y", value: 2.4, display: "2.4%", tone: "blue" }, { label: "Gasoline y/y", value: 27.4, display: "27.4%", tone: "red" } ],
          source: "BLS CPI, 11 Sep 2026; Desjardins; Trading Economics." },
        { t: "stats", items: [{ value: "+0.4%", label: "CPI, August m/m — most in 3 months", tone: "red" }, { value: "+0.5%", label: "Core services ex-shelter, m/m", tone: "gold" }] },
        { t: "sidebar", title: "Supercore", text: "Core services excluding housing — sometimes called \"supercore\" — tracks prices driven mainly by wages, such as healthcare, insurance and travel. Central banks watch it as a guide to how sticky inflation will be." },
      ],
    },

    // ── 07 US II ──────────────────────────────────────────────────────────
    {
      section: "Region · United States · II", foot: "Region · United States", toc: "United States — Jobs & Oil Reserves",
      kicker: "Region · United States · II",
      title: "Hiring stalls, reserves drain",
      deck: "The jobs market cooled again in September, and Washington emptied the last of its emergency oil release.",
      left: [
        { t: "lead", text: "The September jobs report, published on 2 October, showed employers adding just **29,000** jobs — far below the roughly 90,000 economists expected — with **60,000** jobs revised away from July and August. Unemployment rose to **4.2%** from 4.1%, and wage growth slowed to **3.0%**, below the 3.2% forecast. Private payrolls rose 46,000 while government shed 17,000." },
        { t: "p", text: "The swing — from –23,000 in July to +162,000 in August to +29,000 in September — shows a labour market cooling unevenly. It also made a second Fed hike in October less likely, even as inflation stayed high." },
        { t: "p", text: "Meanwhile the government tapped its emergency oil stocks once more. On 29 September the Energy Department offered up to **40 million barrels** from the Strategic Petroleum Reserve as an exchange — the final tranche of a **172 million-barrel** drawdown ordered in March. The reserve held **284.6 million** barrels on 18 September, the lowest since November 1982." },
        { t: "fiveq",
          happened: "Payrolls rose just 29k; unemployment hit 4.2%; the SPR fell to a 44-year low.",
          matters: "Slowing jobs and high inflation together are the Fed's hardest combination.",
          benefits: "Refiners and consumers who get SPR barrels now.",
          hurt: "Job-seekers; US energy security if the reserve stays low.",
          takeaway: "America is cooling at home while spending its buffers to fight an energy shock abroad." },
      ],
      right: [
        { t: "chart", title: "US payrolls, 2026 (thousands)", dot: "green", data: [
          { label: "July", value: -23, display: "–23k", tone: "red" }, { label: "August", value: 162, display: "+162k*", tone: "green" }, { label: "September", value: 29, display: "+29k", tone: "gold" } ],
          source: "BLS, Aug–Oct 2026. *August later revised down (KPMG cites 133k)." },
        { t: "stats", items: [{ value: "4.2%", label: "Unemployment, September", tone: "red" }, { value: "284.6m", label: "SPR barrels — lowest since 1982", tone: "gold" }] },
        { t: "sidebar", title: "SPR exchange", text: "In an exchange, companies borrow oil from the reserve and must return more later — so the stockpile refills automatically. It's cheaper for taxpayers than a sale, but it relies on oil being available to give back." },
      ],
    },

    // ── 08 THE FED ────────────────────────────────────────────────────────
    {
      section: "Central Banks · The Federal Reserve", foot: "Central Banks", toc: "The Fed — The First Hike Since 2023",
      kicker: "Central banks · The Fed",
      title: "The Fed hikes — unanimously",
      deck: "After three hawkish dissents in July and a tough speech in August, the Fed followed through.",
      left: [
        { t: "lead", text: "On 16 September the Federal Open Market Committee raised its target range by a quarter point to **3.75–4.00%** — its first hike since 2023. The vote was **12–0**. Markets had priced roughly a 90% chance of the move." },
        { t: "p", text: "The new projections explained why. Officials now expect headline PCE inflation of **3.7%** in 2026 and core PCE of **3.4%** — both up from June's 3.6% and 3.3%. Sixteen of the eighteen officials who submitted projections expect at least one more hike this year, with the median pencilling in another quarter point; only eight see a further move in 2027. Chair Warsh, unusually, did not submit a dot." },
        { t: "p", text: "Warsh called the move the \"right decision\", framed as supporting a timelier return to 2%. It was also politically pointed: several outlets described it as a break with President Trump, who had pressed for lower rates. An early market rally faded during the press conference as Warsh again declined to give guidance." },
        { t: "fiveq",
          happened: "The Fed raised rates 25bp to 3.75–4.00% by 12–0 and signalled another hike in 2026.",
          matters: "It confirmed the turn from easing to tightening in the world's most important central bank.",
          benefits: "Savers; the dollar, which rose about 2% in September.",
          hurt: "Borrowers, home-buyers and highly indebted firms.",
          takeaway: "The Fed has chosen credibility over comfort — and it did so unanimously." },
      ],
      right: [
        { t: "chart", title: "Fed PCE inflation projections, 2026 (%)", dot: "blue", unit: "%", data: [
          { label: "Headline (Jun)", value: 3.6, tone: "muted" }, { label: "Headline (Sep)", value: 3.7, tone: "gold" }, { label: "Core (Jun)", value: 3.3, tone: "muted" }, { label: "Core (Sep)", value: 3.4, tone: "blue" } ],
          source: "Federal Reserve Summary of Economic Projections, 16 Sep 2026, via Schwab." },
        { t: "stats", items: [{ value: "12–0", label: "FOMC vote to hike", tone: "blue" }, { value: "16 of 18", label: "Officials seeing another 2026 hike", tone: "gold" }] },
        { t: "sidebar", title: "The dot plot", text: "Each FOMC participant marks where they think rates should be at the end of each year. The chart of those dots isn't a promise — but it's the clearest window into how the committee is thinking." },
      ],
    },

    // ── 09 SCORECARD ─────────────────────────────────────────────────────
    {
      section: "Central Banks · Scorecard", foot: "Central Banks", toc: "Central Bank Scorecard",
      kicker: "The policy map", kickerTone: "blue",
      title: "Up, up, up — and two exceptions",
      deck: "September's decisions side by side. The rich world tightened; two high-rate emerging markets eased.",
      full: [
        { t: "table", title: "September 2026 decisions", dot: "blue", head: ["Central bank", "New rate", "Decision", "Note"], rows: [
          ["European Central Bank", "2.50% (deposit)", "**+25bp**, 10 Sep", "Second hike of 2026; no guidance"],
          ["Federal Reserve", "3.75–4.00%", "**+25bp**, 16 Sep (12–0)", "First hike since 2023"],
          ["Bank of England", "3.75%", "Hold, 17 Sep (6–3)", "Three votes to hike; sees CPI >4% early 2027"],
          ["Bank of Japan", "1.25%", "**+25bp**, 18 Sep (7–2)", "Highest since April 1995"],
          ["South African Reserve Bank", "7.25%", "**+25bp**, 23 Sep (6–0)", "Fuel-driven inflation risks"],
          ["Bank Indonesia", "5.75%", "Hold, 23 Sep", "Defending the rupiah"],
          ["Banxico (Mexico)", "6.50%", "Hold, 24 Sep (unanimous)", "\"Need not copy the Fed\""],
          ["Reserve Bank of Australia", "4.60%", "**+25bp**, 29 Sep (unanimous)", "Fourth hike of 2026"],
          ["Banco Central do Brasil", "13.75%", "Cut –25bp, 16 Sep", "Fifth straight cut"],
          ["Central Bank of Nigeria", "23.00%", "Cut –350bp, 22 Sep", "A \"reset\", not an easing cycle"] ],
          source: "ECB; Federal Reserve; Bank of England; BoJ via Nation Thailand; SARB; Bank Indonesia; Banxico; RBA via CommBank; BCB via Trading Economics; CBN via Premium Times." },
      ],
      left: [
        { t: "p", text: "Five hikes, three holds, two cuts. The cuts are the interesting part: Brazil and Nigeria both had policy rates far above inflation, giving them room to ease even as the world tightened. Mexico's governor said plainly that Banxico \"need not copy\" the Fed." },
      ],
      right: [
        { t: "callout", title: "Key takeaway", text: "If your inflation is energy-driven and your rates are low, you hiked. If your rates were already very high, you could ease." },
      ],
    },

    // ── 10 ECB & EUROPE ──────────────────────────────────────────────────
    {
      section: "Region · Europe · Euro Area", foot: "Region · Europe", toc: "Europe — The Euro Area",
      kicker: "Region · Europe",
      title: "The ECB hikes; inflation hits 3.8%",
      deck: "Frankfurt raised rates on 10 September. Three weeks later, inflation reached its highest in three years.",
      left: [
        { t: "lead", text: "The European Central Bank raised its deposit rate by a quarter point to **2.50%** on 10 September, effective 16 September, with the main refinancing rate at 2.65% and the marginal lending rate at 2.90%. It was the ECB's second hike of 2026. President Lagarde gave no guidance, saying decisions would be made meeting by meeting." },
        { t: "p", text: "New staff projections saw headline inflation averaging **3.0%** in 2026, **2.5%** in 2027 and 2.1% in 2028 — with 2027 revised up — and raised growth to 0.9% this year and 1.4% next. The projections were finalised about two weeks before the meeting, so they missed oil's late surge." },
        { t: "p", text: "That surge showed up quickly. Eurostat's flash estimate put September inflation at **3.8%**, up from 3.2%, with energy inflation at **18.8%**. Core inflation rose to 2.5%. Spain reached 5.0% and Italy 4.1%; Germany 3.3%." },
        { t: "fiveq",
          happened: "The ECB hiked to 2.50%; September inflation jumped to 3.8% on 18.8% energy inflation.",
          matters: "Europe's inflation is now well above the ECB's own forecasts.",
          benefits: "Savers; the euro against the yen.",
          hurt: "Southern European households facing 4–5% inflation; borrowers.",
          takeaway: "The ECB hiked into a number that was already out of date." },
      ],
      right: [
        { t: "chart", title: "Inflation, September 2026 flash (y/y %)", dot: "gold", unit: "%", data: [
          { label: "Germany", value: 3.3, tone: "blue" }, { label: "France", value: 3.4, tone: "violet" }, { label: "Euro area", value: 3.8, tone: "gold" }, { label: "Italy", value: 4.1, tone: "red" }, { label: "Spain", value: 5.0, tone: "red" } ],
          source: "Eurostat flash, early Oct 2026; Euronews; gmk.center." },
        { t: "chart", type: "kv", title: "ECB staff projections (Sep)", dot: "blue", rows: [["Inflation 2026 / 27 / 28", "3.0% / 2.5% / 2.1%"], ["Core 2026 / 27 / 28", "2.5% / 2.6% / 2.3%"], ["Growth 2026 / 27", "0.9% / 1.4%"]], source: "ECB, 10 Sep 2026; Morningstar." },
        { t: "sidebar", title: "Projection cut-off", text: "Central-bank forecasts are frozen on a cut-off date weeks before a meeting. When markets move fast — as oil did in September — the published numbers can be stale on the day they appear." },
      ],
    },

    // ── 11 UK ────────────────────────────────────────────────────────────
    {
      section: "Region · Europe · United Kingdom", foot: "Region · Europe", toc: "Europe — United Kingdom",
      kicker: "Region · United Kingdom",
      title: "The odd one out",
      deck: "As its peers hiked, the Bank of England held — by the narrowest workable margin.",
      left: [
        { t: "lead", text: "On 17 September the Bank of England kept Bank Rate at **3.75%** for a sixth straight meeting. The vote was again **6–3**, with Catherine Mann, Megan Greene and Huw Pill reported as wanting a rise to 4%. The decision left the Bank at odds with the Fed and ECB, both of which had hiked within the previous week." },
        { t: "p", text: "The data argued for the hawks. UK inflation rose to **3.1%** in August, a five-month high, and the Bank now expects it to top **4%** early next year as energy costs pass through. It warned that rates might have to rise if the Iran war drags on." },
        { t: "p", text: "Why hold? The majority judged that the UK economy is weaker than America's, and that a hike would add pain without changing the energy prices driving inflation. Markets disagreed, pricing a faster path from here." },
        { t: "fiveq",
          happened: "The BoE held at 3.75% (6–3) as UK inflation rose to 3.1% and was forecast above 4%.",
          matters: "A split committee makes every future meeting a live decision.",
          benefits: "Mortgage borrowers, for now.",
          hurt: "Savers, and sterling if markets see the BoE as behind the curve.",
          takeaway: "The Bank of England is betting that this inflation will pass. The market isn't sure." },
      ],
      right: [
        { t: "chart", title: "UK CPI inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "June", value: 2.6, tone: "muted" }, { label: "July", value: 2.9, tone: "blue" }, { label: "August", value: 3.1, tone: "gold" }, { label: "Early 2027 (BoE)", value: 4.0, display: ">4%", tone: "red" } ],
          source: "ONS; Bank of England, 17 Sep 2026." },
        { t: "stats", items: [{ value: "6–3", label: "MPC vote to hold, again", tone: "gold" }, { value: "6", label: "Meetings in a row at 3.75%", tone: "blue" }] },
        { t: "sidebar", title: "Behind the curve", text: "A central bank is \"behind the curve\" when it raises rates more slowly than inflation warrants — often forcing bigger hikes later. Avoiding that fate is why the three dissenters wanted to move now." },
      ],
    },

    // ── 12 JAPAN ─────────────────────────────────────────────────────────
    {
      section: "Region · Japan", toc: "Japan",
      kicker: "Region · Japan",
      title: "Japan's highest rates since 1995",
      deck: "The Bank of Japan hiked again — faster than at any time since 1990 — yet the yen fell.",
      left: [
        { t: "lead", text: "On 18 September the Bank of Japan raised its policy rate by a quarter point to **1.25%**, the highest since April 1995. Coming about three months after June's hike, it was the shortest gap between BoJ increases since 1990." },
        { t: "p", text: "The vote was **7–2**, and the two dissenters — Toichiro Asada and Ayano Sato — were doves who wanted to wait. The Bank's main concern was that inflation could rise above its 2% target. The new rate sits within the BoJ's estimated range for Japan's \"neutral\" rate of **1.1–2.5%** (see Explainer, p.32)." },
        { t: "p", text: "Markets were unimpressed. Investors judged the BoJ's guidance not hawkish enough, and with the Fed also hiking, the yen weakened to about **158.8** per dollar — after touching a seven-month high near 152.9 earlier in the month on hopes of faster tightening." },
        { t: "fiveq",
          happened: "The BoJ hiked to 1.25% (7–2), its highest since 1995; the yen weakened to ~158.8.",
          matters: "Japan is normalising rates after three decades near zero — slowly.",
          benefits: "Japanese savers and banks earning more on deposits.",
          hurt: "Borrowers, and a government with very high debt.",
          takeaway: "Even a 31-year high in rates isn't enough to close the gap with the Fed." },
      ],
      right: [
        { t: "chart", title: "BoJ policy rate, 2026 (%)", dot: "red", unit: "%", decimals: 2, data: [
          { label: "Start of year", value: 0.75, tone: "muted" }, { label: "June", value: 1.0, tone: "blue" }, { label: "18 Sep", value: 1.25, tone: "gold" } ],
          source: "Bank of Japan; Nation Thailand; NST. Start-of-year level implied by the June hike to 1.0%." },
        { t: "stats", items: [{ value: "7–2", label: "Vote — both dissents dovish", tone: "gold" }, { value: "~158.8", label: "Yen per $ after the decision", tone: "red" }] },
        { t: "sidebar", title: "Why the yen fell on a hike", text: "Currencies respond to the gap between interest rates. The Fed hiked to 4.00% two days earlier, so Japan's move didn't narrow the gap — and the BoJ's cautious tone suggested it wouldn't soon." },
      ],
    },

    // ── 13 CHINA ─────────────────────────────────────────────────────────
    {
      section: "Region · China", toc: "China",
      kicker: "Region · China",
      title: "Stimulus lifts the gauges",
      deck: "China's purchasing-manager surveys returned to growth in September as Beijing stepped up support for housing.",
      left: [
        { t: "lead", text: "China's official manufacturing PMI rose to **50.1** in September from 49.8, back above the 50 line that separates expansion from contraction. The non-manufacturing PMI jumped to **50.2** from 49.0, and the composite index reached **50.7** — its highest since December 2025. A private survey, RatingDog's manufacturing PMI, hit a five-month high of **52.1**." },
        { t: "p", text: "Stimulus helped. Officials announced new measures just before the release, including **subsidies for homebuyers' mortgage interest**. Oxford Economics said faster implementation supported a modest second-half recovery. Coverage also credited strong AI-related demand for factory activity." },
        { t: "p", text: "Analysts stayed cautious. The key question, one economist said, is whether property relief can lower household debt burdens enough to revive consumption — which, as summer's retail sales showed, remains weak. Beijing's growth target for the year is 4.5–5.0%; second-quarter growth was 4.3%." },
        { t: "fiveq",
          happened: "Manufacturing and services PMIs both rose above 50; Beijing added mortgage-interest subsidies.",
          matters: "A Chinese recovery would support commodity demand and Asian exporters.",
          benefits: "Homebuyers, developers and factories with AI-linked orders.",
          hurt: "Oil importers, if Chinese demand lifts prices further.",
          takeaway: "China's policy support is finally showing up in the surveys — the test is whether households follow." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "China PMIs, September 2026", dot: "red", baseline: 50, decimals: 1, data: [
          { label: "RatingDog mfg", value: 52.1, tone: "green" }, { label: "Composite", value: 50.7, tone: "green" }, { label: "Non-mfg", value: 50.2, tone: "green" }, { label: "Official mfg", value: 50.1, tone: "green" } ],
          source: "NBS, 30 Sep 2026; RatingDog; Trading Economics." },
        { t: "sidebar", title: "What a PMI is", text: "A monthly survey of purchasing managers. Above 50 means more firms report growth than contraction — a fast, forward-looking read on activity before official data arrives." },
      ],
    },

    // ── 14 INDIA ─────────────────────────────────────────────────────────
    {
      section: "Region · India", toc: "India",
      kicker: "Region · India",
      title: "Food lifts inflation toward 5%",
      deck: "India's inflation rose to its highest in about 20 months, narrowing the RBI's room to manoeuvre.",
      left: [
        { t: "lead", text: "India's consumer price inflation rose to **4.82%** in August from 4.45% in July, the statistics ministry reported in mid-September — under the new CPI series with a 2024 base year. Food inflation rose to **5.95%** from 5.52%." },
        { t: "p", text: "Societe Generale pointed to energy prices, a weaker rupee and an uneven monsoon as the main drivers, and warned that higher oil could weigh further on the rupee by swelling India's import bill. Economists said the room for aggressive monetary easing was limited." },
        { t: "p", text: "The Reserve Bank of India had no September meeting; its repo rate stayed at **5.25%** with a neutral stance after August's unanimous hold. Growth, at least, gave it breathing space: April–June GDP had grown 7.8%. The next policy meeting was set for 5–7 October." },
        { t: "fiveq",
          happened: "CPI rose to 4.82% in August, food to 5.95%; the RBI held at 5.25%.",
          matters: "Food and fuel make up a large share of Indian household budgets.",
          benefits: "Farmers selling at higher prices.",
          hurt: "Urban households and the poor, who spend most on food.",
          takeaway: "Strong growth gives the RBI patience — rising food prices test it." },
      ],
      right: [
        { t: "chart", title: "India CPI inflation (y/y %)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "July", value: 4.45, tone: "blue" }, { label: "August", value: 4.82, tone: "gold" }, { label: "Food, Aug", value: 5.95, tone: "red" } ],
          source: "MoSPI, Sep 2026 (base 2024=100); Times of Oman; Business Today." },
        { t: "stats", items: [{ value: "5.25%", label: "RBI repo rate (neutral)", tone: "blue" }, { value: "7.8%", label: "GDP growth, Apr–Jun", tone: "green" }] },
        { t: "sidebar", title: "A new CPI series", text: "India rebased its consumer price index in February 2026 to a 2024 base year, with updated weights. Comparisons with older figures need care, because the basket itself has changed." },
      ],
    },

    // ── 15 MIDDLE EAST ───────────────────────────────────────────────────
    {
      section: "Region · Middle East", toc: "Middle East",
      kicker: "Region · Middle East",
      title: "A plan at the UN, rejected in Washington",
      deck: "Iran offered to reopen Hormuz within a week. The White House said no — and oil leapt.",
      left: [
        { t: "lead", text: "At the United Nations General Assembly in late September, Iran proposed to reopen the Strait of Hormuz within **seven days** in exchange for the US releasing frozen Iranian funds, lifting sanctions and ending its naval blockade of Iranian ports. On 28 September President Trump rejected the plan. Brent rose more than 3% to top **$107**." },
        { t: "p", text: "It followed an earlier escalation: on 23 September, after Iran rejected what it called US demands for surrender, Brent jumped 3.86%. Tehran said it would not ease its conditions further. Late in the month some Middle East exports recovered, briefly pulling Brent back toward $102.59 on 29 September." },
        { t: "p", text: "The economic cost of the impasse keeps rising. Physical oil cargoes traded as high as $132 a barrel mid-month, and with Gulf production still below pre-war levels, the region's own economies are paying a heavy price alongside the importers." },
        { t: "fiveq",
          happened: "Iran offered to reopen Hormuz within a week for sanctions relief; the US rejected it.",
          matters: "The rejection extended the supply shock into the fourth quarter.",
          benefits: "Producers outside the Gulf; owners of ships on alternative routes.",
          hurt: "Gulf exporters, energy importers and the central banks fighting the inflation.",
          takeaway: "Hormuz has become a bargaining chip — and the price of each failed offer is paid at the pump." },
      ],
      right: [
        { t: "chart", title: "Brent, late September ($/bbl)", dot: "red", data: [
          { label: "15 Sep (futures peak)", value: 109, display: "$109", tone: "gold" }, { label: "28 Sep", value: 107, display: ">$107", tone: "red" }, { label: "29 Sep", value: 102.59, display: "$102.59", tone: "blue" }, { label: "30 Sep", value: 103.5, display: "$103.50", tone: "violet" } ],
          source: "EIA; Al Jazeera; Nation Thailand; The Star." },
        { t: "sidebar", title: "Blockade", text: "A naval blockade stops ships entering or leaving a country's ports. Iran's offer traded reopening Hormuz for an end to the US blockade of its own ports — two blockades, one negotiation." },
      ],
    },

    // ── 16 AFRICA ────────────────────────────────────────────────────────
    {
      section: "Region · Africa", toc: "Africa",
      kicker: "Region · Africa",
      title: "Pretoria hikes, Abuja cuts",
      deck: "Africa's two largest economies made opposite moves within 24 hours — for opposite reasons.",
      left: [
        { t: "lead", text: "On 22 September Nigeria's central bank cut its policy rate by **350 basis points**, from 26.5% to **23%** — the biggest reduction since 2007. The next day, South Africa's Reserve Bank raised its repo rate by 25bp to **7.25%**, unanimously, citing fuel-driven inflation risks from the Middle East conflict." },
        { t: "p", text: "The logic differs with the starting point. **Nigeria's** inflation had fallen to **15.39%** in August, leaving its policy rate far above it; the CBN called the move a \"reset\" rather than the start of an easing cycle (see Country Spotlight, p.29). **South Africa's** inflation was only 4.4%, but well above the SARB's 3% target, and the bank cut its 2026 growth forecast to **1.2%** from 1.4%." },
        { t: "p", text: "Elsewhere on the continent, oil exporters benefited from $100 crude while importers felt the pinch. The SARB signalled rates would stay near current levels for the rest of 2026." },
        { t: "fiveq",
          happened: "Nigeria cut 350bp to 23%; South Africa hiked 25bp to 7.25%.",
          matters: "High real rates gave Nigeria room to ease; South Africa's low target forced it to tighten.",
          benefits: "Nigerian borrowers and bond holders; South African savers.",
          hurt: "South African mortgage holders; Nigerian savers.",
          takeaway: "The same oil shock produced a cut in Abuja and a hike in Pretoria." },
      ],
      right: [
        { t: "chart", title: "Policy rate vs inflation (%)", dot: "gold", data: [
          { label: "Nigeria rate", value: 23, display: "23.0%", tone: "blue" }, { label: "Nigeria CPI", value: 15.39, display: "15.4%", tone: "red" }, { label: "SA rate", value: 7.25, display: "7.25%", tone: "blue" }, { label: "SA CPI", value: 4.4, display: "4.4%", tone: "red" } ],
          source: "CBN; SARB; NBS Nigeria; Stats SA — Sep 2026." },
        { t: "sidebar", title: "Inflation target", text: "South Africa now targets 3% inflation, among the lowest goals in emerging markets. A low target means even moderate inflation — 4.4% — counts as too high." },
      ],
    },

    // ── 17 LATIN AMERICA ─────────────────────────────────────────────────
    {
      section: "Region · Latin America", toc: "Latin America",
      kicker: "Region · Latin America",
      title: "Brazil keeps cutting, Mexico keeps waiting",
      deck: "Latin America's two giants stuck to their own paths — and said so out loud.",
      left: [
        { t: "lead", text: "On 16 September — the same day the Fed hiked — **Brazil's** central bank cut the Selic by 25bp to **13.75%**, unanimously, its fifth straight cut and the lowest rate in a year and a half. The minutes attributed the cut to a slowing economy and gave no explicit guidance for the November meeting." },
        { t: "p", text: "**Banxico** held Mexico's rate at **6.50%** on 24 September, unanimously, its third straight hold. Five days later Governor Victoria Rodríguez Ceja said Mexico's central bank \"need not copy\" the Fed. Minutes later showed members saw inflation risks tilted to the upside; BBVA expects rates on hold through 2027." },
        { t: "p", text: "The divergence from the Fed is a test. When US rates rise and Latin American rates fall, the gap that attracts foreign investors narrows — which can weaken currencies and import inflation. Brazil's high starting point gives it a large cushion; Mexico's smaller gap explains its caution." },
        { t: "fiveq",
          happened: "Brazil cut to 13.75% on the day the Fed hiked; Mexico held at 6.50%.",
          matters: "Diverging from the Fed tests the region's currencies.",
          benefits: "Brazilian borrowers and stocks.",
          hurt: "Brazilian savers; importers if the real weakens.",
          takeaway: "High rates at home let Brazil ignore the Fed — for now." },
      ],
      right: [
        { t: "chart", title: "Policy rates, end-September (%)", dot: "blue", unit: "%", data: [
          { label: "Brazil", value: 13.75, display: "13.75%", tone: "gold" }, { label: "Mexico", value: 6.5, display: "6.50%", tone: "blue" }, { label: "US (top)", value: 4.0, display: "4.00%", tone: "violet" } ],
          source: "BCB via Trading Economics; Banxico; Federal Reserve." },
        { t: "quote", text: "Mexico's central bank need not copy the Fed.", by: "Banxico Governor Victoria Rodríguez Ceja, 29 Sep 2026 (via Rio Times)" },
      ],
    },

    // ── 18 APAC ──────────────────────────────────────────────────────────
    {
      section: "Region · Asia-Pacific & Oceania", toc: "Asia-Pacific & Oceania",
      kicker: "Region · Asia-Pacific & Oceania",
      title: "Australia joins the hikers",
      deck: "Canberra's central bank raised rates to a 15-year high, while Jakarta held to protect its currency.",
      top: [
        { t: "cards", cols: 2, items: [
          { title: "🇦🇺 Australia", dot: "gold", paras: ["On 29 September the RBA raised its cash rate by 25bp to **4.60%** — its fourth increase of 2026 and the highest since November 2011. The decision was unanimous, and the board kept an explicit tightening bias.", "Australian inflation was reported at about 4% in August, double the top of the RBA's 2–3% target band."], source: "CommBank; NAB; Savings.com.au; Trading Economics." },
          { title: "🇮🇩 Indonesia", dot: "blue", paras: ["Bank Indonesia held its BI Rate at **5.75%** on 22–23 September, keeping its deposit facility at 4.75% and lending facility at 6.5%.", "The hold aimed to stabilise the rupiah amid higher oil prices and tighter global monetary conditions; BI projects 2026 growth of 4.9–5.7%."], source: "Bank Indonesia; Indonesia Business Post." },
        ] },
      ],
      left: [
        { t: "p", text: "Australia shows that even a commodity exporter isn't immune. Higher energy prices lifted household bills and business costs, and a tight jobs market kept services inflation high. Indonesia faces the emerging-market version of the problem: with the Fed hiking, capital flows out unless local rates stay attractive — so Bank Indonesia couldn't cut even though growth is soft." },
        { t: "fiveq",
          happened: "The RBA hiked to 4.60%, a 15-year high; Bank Indonesia held at 5.75%.",
          matters: "Asia-Pacific policy is being set by the Fed and the oil price as much as by local data.",
          benefits: "Australian savers; the rupiah.",
          hurt: "Australian mortgage holders, most on variable rates.",
          takeaway: "Across the Pacific, September's message was the same: no cuts while oil is above $100." },
      ],
      right: [
        { t: "chart", title: "RBA cash rate, 2026 (%)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "June/Aug", value: 4.35, tone: "muted" }, { label: "29 Sep", value: 4.6, tone: "gold" } ], source: "RBA via CommBank, 29 Sep 2026." },
        { t: "sidebar", title: "Variable-rate mortgages", text: "Most Australian mortgages float with the cash rate, so RBA hikes hit household budgets within weeks — a faster transmission than in the US, where most mortgages are fixed for 30 years." },
      ],
    },

    // ── 19 STOCKS ────────────────────────────────────────────────────────
    {
      section: "Markets · Equities", toc: "Stock Markets",
      kicker: "Markets",
      title: "Three-quarters of stocks fell",
      deck: "The S&P 500 barely moved in September. Its typical member had a miserable month.",
      left: [
        { t: "lead", text: "The S&P 500 slipped about **0.5%** in September — a calm-looking number in a historically weak month. Underneath, roughly three-quarters of its members fell: **60%** dropped at least 5%, and **27%** dropped at least 10%. The equal-weight version of the index lost about **4.4%**." },
        { t: "p", text: "The difference was the handful of mega-cap technology and AI-linked companies that dominate the index. The Nasdaq Composite actually rose about **1.9%**. The Dow, with more industrial and financial names, fell about 4.3%, and the small-cap Russell 2000 dropped more than 5%." },
        { t: "p", text: "Rising Treasury yields, $100 oil, AI-related risk and the Fed's hike were all cited as drivers. Higher yields hit smaller firms hardest, because they rely more on floating-rate borrowing and have less cash. Retail investors, notably, didn't flee." },
        { t: "fiveq",
          happened: "S&P 500 –0.5% but equal-weight –4.4%; 60% of members fell 5%+.",
          matters: "The index is masking broad weakness — and concentration risk is extreme.",
          benefits: "Holders of mega-cap tech.",
          hurt: "Small-cap, industrial and value investors.",
          takeaway: "September's market was really two markets: a few giants, and everyone else." },
      ],
      right: [
        { t: "chart", title: "Share of S&P 500 stocks, September", dot: "red", unit: "%", data: [
          { label: "Fell ≥5%", value: 60, tone: "red" }, { label: "Fell ≥10%", value: 27, tone: "violet" } ], source: "Morningstar/MarketWatch; Stocktwits, 30 Sep 2026." },
        { t: "stats", items: [{ value: "–0.5%", label: "S&P 500, September", tone: "gold" }, { value: "–4.4%", label: "Equal-weight S&P 500", tone: "red" }] },
        { t: "sidebar", title: "Concentration risk", text: "When a few stocks make up a large share of an index, its fortunes hinge on them. Index investors may own far more of a single theme — today, AI — than they realise." },
      ],
    },

    // ── 20 BONDS ─────────────────────────────────────────────────────────
    {
      section: "Markets · Fixed Income", toc: "Bond Markets",
      kicker: "Markets · Bonds",
      title: "The highest yields since 2002",
      deck: "The global bond sell-off deepened. Long-term US yields reached levels last seen 24 years ago.",
      left: [
        { t: "lead", text: "In the final days of September and the first of October, the 10-year Treasury yield climbed above **5.3%** — touching about 5.34% at one point — its highest level since 2002. The 30-year yield reached about **5.67–5.69%**, also a 24-year high. Reports described a \"global bond rout\"." },
        { t: "p", text: "Several forces combined: the Fed's hike and signal of more; inflation expectations lifted by $100 oil; heavy government borrowing as the US debt passes $40 trillion; and the term premium investors demand for lending long in an uncertain world. Real yields — what's left after expected inflation — rose sharply too: the 10-year real yield reached about **2.85%** on 24 September." },
        { t: "p", text: "Higher yields ripple through the whole economy. Mortgage rates, car loans and corporate borrowing all price off Treasuries. They also hit gold, which pays no interest, and the valuations of companies whose profits lie far in the future." },
        { t: "fiveq",
          happened: "10-year Treasury yield ~5.3% and 30-year ~5.7% — both highest since 2002.",
          matters: "This is the market tightening financial conditions on top of the Fed.",
          benefits: "Buyers of new bonds; pension funds needing income.",
          hurt: "Borrowers, existing bond holders and the federal budget.",
          takeaway: "The bond market is no longer asking whether rates stay high — only how high." },
      ],
      right: [
        { t: "chart", title: "US Treasury yields, late Sep / 1 Oct (%)", dot: "blue", unit: "%", decimals: 2, data: [
          { label: "10-yr real", value: 2.85, tone: "violet" }, { label: "10-yr nominal", value: 5.3, display: "~5.3%", tone: "blue" }, { label: "30-yr nominal", value: 5.68, display: "~5.7%", tone: "gold" } ],
          source: "CNN via KRDO; Trading Economics; BullionVault (real yield, 24 Sep)." },
        { t: "sidebar", title: "Real yield", text: "A bond's yield minus expected inflation — the true reward for lending. When real yields rise, holding cash and bonds becomes more attractive relative to gold and growth stocks." },
        { t: "analysis", text: "A 10-year yield above 5% changes the arithmetic for everyone: it's a risk-free return that competes with every other investment." },
      ],
    },

    // ── 21 CURRENCIES ────────────────────────────────────────────────────
    {
      section: "Markets · Currencies", toc: "Currencies",
      kicker: "Markets · FX",
      title: "The dollar's best month in a while",
      deck: "A hiking Fed and soaring yields brought the dollar roaring back.",
      left: [
        { t: "lead", text: "The dollar index gained roughly **2%** in September, ending two months of decline. By 1 October it was above **101.8**, its highest in about 17 months, as investors priced the chance of another Fed hike in October." },
        { t: "p", text: "The yen's month was a round trip. Early on, hopes of faster Bank of Japan tightening pushed it to a seven-month high near **152.9** per dollar. But after the BoJ's cautious hike on 18 September — two days after the Fed's — it slid back to about **158.8**." },
        { t: "p", text: "A stronger dollar has consequences abroad. It makes dollar-priced oil more expensive in local currencies, tightens conditions for emerging markets with dollar debts, and pressures central banks such as Bank Indonesia to keep rates high to defend their currencies." },
        { t: "fiveq",
          happened: "The dollar index rose ~2% to a 17-month high; the yen swung from 152.9 to 158.8.",
          matters: "A strong dollar exports US tightening to the rest of the world.",
          benefits: "Americans travelling or buying imports.",
          hurt: "Emerging markets with dollar debts; oil importers paying in dollars.",
          takeaway: "When the Fed hikes and yields jump, the dollar still rules." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Currency marks, September", dot: "violet", rows: [
          ["Dollar index, month", "≈ +2%"], ["Dollar index, 1 Oct", ">101.8 (17-month high)"], ["USD/JPY, early-Sep low", "~152.9"], ["USD/JPY, after BoJ", "~158.8"] ],
          source: "Trading Economics; Dow Jones via Morningstar; NST, Sep–Oct 2026." },
        { t: "sidebar", title: "Policy divergence", text: "When one central bank tightens faster than another, money flows toward the higher rates — strengthening that currency. September's Fed–BoJ gap was a textbook case." },
      ],
    },

    // ── 22 OIL ───────────────────────────────────────────────────────────
    {
      section: "Commodities · Energy", toc: "Oil & Energy",
      kicker: "Commodities",
      title: "Brent breaks $100",
      deck: "Oil's third-quarter gain of about 42% was its sharpest in years — and physical prices rose even faster.",
      left: [
        { t: "lead", text: "Brent settled at about **$103.50** a barrel on 30 September, up roughly **14%** in the month and about **42%** in the quarter, from $72.92 at the end of June. The futures price peaked at **$109** on 15 September; the US Energy Information Administration noted spot prices as high as **$132** around the same time." },
        { t: "p", text: "Diplomatic failure drove the final leg: Iran's rejection of US terms on 23 September and the White House's rejection of Iran's reopening plan on 28 September. Partial recoveries in Gulf exports and the SPR release offered only brief relief." },
        { t: "p", text: "Refining margins — the profit from turning crude into fuel — also rose through the quarter, which is why gasoline and diesel prices climbed even faster than crude in places. For consumers, the impact showed up in August's 3.9% monthly jump in US gasoline prices." },
        { t: "fiveq",
          happened: "Brent rose ~14% in September and ~42% in Q3 to ~$103.50; spot cargoes hit $132.",
          matters: "Oil above $100 feeds directly into inflation and forces central banks' hands.",
          benefits: "Oil producers outside the Gulf; refiners.",
          hurt: "Every fuel-importing economy and household.",
          takeaway: "September proved the energy shock isn't a spike — it's a regime." },
      ],
      right: [
        { t: "chart", title: "Brent, 2026 ($/bbl)", dot: "red", data: [
          { label: "End-Jun", value: 72.92, display: "$72.92", tone: "muted" }, { label: "End-Jul", value: 90.12, display: "$90.12", tone: "gold" }, { label: "End-Sep", value: 103.5, display: "~$103.50", tone: "red" } ],
          source: "Reuters (Jul); priceofoil.com; The Star (Sep)." },
        { t: "stats", items: [{ value: "+42%", label: "Brent in Q3 2026", tone: "red" }, { value: "$132", label: "Spot peak, mid-Sep (EIA)", tone: "gold" }] },
        { t: "sidebar", title: "Refining margin", text: "The difference between the price of crude and the products made from it. When refineries are stretched, margins widen — and fuel prices rise faster than oil itself." },
      ],
    },

    // ── 23 GOLD ──────────────────────────────────────────────────────────
    {
      section: "Commodities · Gold", toc: "Gold & Precious Metals",
      kicker: "Commodities",
      title: "Gold's real-yield problem",
      deck: "August's debasement rally reversed as real interest rates surged.",
      left: [
        { t: "lead", text: "Gold fell sharply in September — by about **5.5%** on one mid-morning estimate on the 30th and **8.5%** on BullionVault's month-end measure. Silver fell further, about **13.5%**. The World Gold Council linked the drop to the surge in US Treasury yields and the dollar." },
        { t: "p", text: "The key variable was the **real yield**. The 10-year inflation-protected yield climbed from about 2.68% on 18 September to about 2.85% on 24 September. Because gold pays nothing, a higher risk-free real return makes it relatively less attractive; CMC Markets put the recent correlation between the two at –0.53." },
        { t: "p", text: "Yet investors didn't abandon gold. Physically backed gold ETFs took in nearly **$10 billion** in September even as prices fell — with futures liquidation, rather than long-term selling, doing much of the damage. China's central bank extended its long run of gold purchases." },
        { t: "fiveq",
          happened: "Gold fell ~5.5–8.5% and silver ~13.5% as real yields jumped.",
          matters: "Gold is the purest test of real interest rates.",
          benefits: "Buyers who waited after August's spike.",
          hurt: "Short-term holders and leveraged futures traders.",
          takeaway: "In September, real yields beat fear — but long-term investors kept buying." },
      ],
      right: [
        { t: "chart", title: "September moves (%)", dot: "gold", data: [
          { label: "Gold (low est.)", value: -5.5, tone: "gold" }, { label: "Gold (BullionVault)", value: -8.5, tone: "red" }, { label: "Silver", value: -13.5, tone: "violet" } ],
          source: "Economies.com; BullionVault; World Gold Council." },
        { t: "stats", items: [{ value: "~$10bn", label: "Gold ETF inflows in September", tone: "green" }, { value: "2.85%", label: "10-yr real yield, 24 Sep", tone: "blue" }] },
        { t: "sidebar", title: "TIPS", text: "Treasury Inflation-Protected Securities pay interest on a principal that rises with inflation. Their yield is a direct market measure of the real interest rate." },
      ],
    },

    // ── 24 CRYPTO ────────────────────────────────────────────────────────
    {
      section: "Markets · Digital Assets", toc: "Cryptocurrency",
      kicker: "Digital assets",
      title: "Bitcoin breaks September's curse",
      deck: "In a month that usually brings losses, bitcoin rose — despite a setback in Washington.",
      left: [
        { t: "lead", text: "Bitcoin gained about **6.3%** in September, finishing near **$83,500** — a rare positive September in a month that has averaged losses since 2013. Most of the gain came in a burst: a 6.7% rise to about $86,600 on 21 September." },
        { t: "p", text: "The low point was political. On 15 September bitcoin closed at about **$75,600** — its lowest of the month — after the CLARITY Act, a bill to set rules for crypto markets, failed a Senate procedural vote. Prices recovered as institutional buying resumed." },
        { t: "p", text: "Spot bitcoin ETFs took in about **$2.65 billion** in September (Messari estimated $2.9 billion), their second-largest month since October 2025, though below August's $3.52 billion. A nine-day inflow streak ended on 30 September with outflows of about $149 million, and CryptoQuant estimated overall spot demand had shrunk." },
        { t: "fiveq",
          happened: "Bitcoin rose ~6.3% to ~$83,500 despite the CLARITY Act's Senate setback.",
          matters: "Bitcoin held up while gold fell — suggesting different buyers and drivers.",
          benefits: "ETF issuers and long-term holders.",
          hurt: "Traders who sold the mid-month regulatory dip.",
          takeaway: "Crypto's biggest risk in September came from Congress, not the Fed." },
      ],
      right: [
        { t: "chart", title: "Bitcoin, September 2026 ($k)", dot: "violet", data: [
          { label: "15 Sep low", value: 75.6, display: "$75.6k", tone: "red" }, { label: "21 Sep high", value: 86.6, display: "$86.6k", tone: "green" }, { label: "30 Sep", value: 83.5, display: "$83.5k", tone: "violet" } ],
          source: "Messari; FXStreet; The Block." },
        { t: "chart", title: "Spot bitcoin ETF flows ($bn)", dot: "green", data: [
          { label: "August", value: 3.52, display: "$3.52bn", tone: "muted" }, { label: "September", value: 2.65, display: "$2.65bn", tone: "green" } ], source: "SoSoValue via The Block." },
        { t: "sidebar", title: "Cloture", text: "A Senate vote to end debate and move a bill forward, needing 60 votes. Failing cloture doesn't kill a bill, but it signals it lacks the support to pass soon." },
      ],
    },

    // ── 25 AI ────────────────────────────────────────────────────────────
    {
      section: "Theme · Artificial Intelligence", toc: "Artificial Intelligence",
      kicker: "Theme of the cycle",
      title: "AI holds up the market — and borrows to do it",
      deck: "The AI giants were the only thing keeping indices afloat in September. The bill for building AI kept growing.",
      left: [
        { t: "lead", text: "In a month when three-quarters of S&P 500 stocks fell, AI-linked giants were the exception, lifting the Nasdaq about 1.9%. The clearest signal came from Oracle on 10 September: its order backlog — remaining performance obligations — jumped to **$664 billion**, up $209 billion in a year, after it booked more than **$30 billion** of new AI cloud contracts in a single quarter." },
        { t: "p", text: "But the same report showed what it costs. Oracle's free cash flow was **negative $5 billion** for the quarter because of data-centre spending, and it raised **$20 billion** by selling new shares through an at-the-market programme. In June it had disclosed plans to raise more debt and equity on top of the tens of billions already raised." },
        { t: "p", text: "That is the AI economy's central tension in 2026. Demand is enormous — but meeting it requires building data centres before customers pay, financed increasingly with borrowed money and new shares. With 10-year yields above 5%, that financing just got more expensive." },
        { t: "fiveq",
          happened: "Oracle's AI backlog hit $664bn while its free cash flow was –$5bn; AI giants lifted the Nasdaq.",
          matters: "AI build-outs are now large enough to depend on — and move — credit markets.",
          benefits: "Chip and cloud suppliers; shareholders of AI leaders.",
          hurt: "Existing shareholders diluted by new stock; lenders if demand disappoints.",
          takeaway: "AI growth is real, but it is being financed at the most expensive rates in two decades." },
      ],
      right: [
        { t: "chart", title: "Oracle, fiscal Q1 2027 ($bn)", dot: "violet", data: [
          { label: "Revenue", value: 19.3, display: "$19.3bn", tone: "blue" }, { label: "OCI revenue", value: 7.4, display: "$7.4bn", tone: "violet" }, { label: "Free cash flow", value: -5, display: "–$5bn", tone: "red" } ],
          source: "Oracle Q1 FY27 results, 10 Sep 2026." },
        { t: "stats", items: [{ value: "$664bn", label: "Oracle RPO (+$209bn y/y)", tone: "gold" }, { value: "+121%", label: "Cloud infrastructure growth", tone: "green" }] },
        { t: "sidebar", title: "RPO", text: "Remaining performance obligations: contracted revenue not yet delivered. A big RPO means signed demand — but it turns into cash only as data centres are built and switched on." },
      ],
    },

    // ── 26 TRADE ─────────────────────────────────────────────────────────
    {
      section: "Theme · Global Trade", toc: "Global Trade",
      kicker: "The connective tissue",
      title: "Trade in the downside scenario",
      deck: "The WTO warned in March what a long war would do to trade. By September, its downside case was the reality.",
      left: [
        { t: "lead", text: "When the war began, the World Trade Organization's March forecast put 2026 goods-trade growth at **1.9%**, down from 4.6% in 2025 — but warned that if the conflict persisted through the rest of the year, growth would slow to about **1.4%**. By the end of September, with Hormuz still contested, that downside case looked like the base case." },
        { t: "p", text: "The WTO highlighted why Hormuz matters beyond oil: traffic through the strait collapsed from about **138** commercial vessels a day to almost zero at the worst point, and about **one-third** of the world's fertiliser exports normally pass that way — a risk to food prices well beyond the Gulf." },
        { t: "p", text: "Two structural features cushioned the blow. About **72%** of world trade still takes place on the WTO's most-favoured-nation terms, and key AI goods — chips, semiconductors and data-transmission equipment — are exempt from most new tariffs, keeping the technology trade flowing even as energy trade seized up." },
        { t: "fiveq",
          happened: "Trade is tracking the WTO's 'prolonged conflict' scenario; fertiliser and energy flows are most exposed.",
          matters: "Slower trade and dearer fertiliser feed through to food prices next year.",
          benefits: "Exporters of AI hardware, largely exempt from tariffs.",
          hurt: "Food importers and farmers dependent on Gulf fertiliser.",
          takeaway: "The war's biggest trade effect may arrive in next year's food prices." },
      ],
      right: [
        { t: "chart", title: "WTO goods-trade growth, 2026 (%)", dot: "blue", unit: "%", data: [
          { label: "2025 actual", value: 4.6, tone: "muted" }, { label: "2026 baseline", value: 1.9, tone: "blue" }, { label: "2026 prolonged war", value: 1.4, tone: "red" } ],
          source: "WTO, Global Trade Outlook, March 2026." },
        { t: "stats", items: [{ value: "~1/3", label: "Fertiliser exports via Hormuz", tone: "gold" }, { value: "72%", label: "World trade on MFN terms", tone: "blue" }] },
        { t: "sidebar", title: "Most-favoured nation", text: "The WTO principle that a country must offer all members the same tariff it gives its best partner. The share of trade on MFN terms has fallen from about 80% as bilateral tariffs spread." },
      ],
    },

    // ── 27 DASHBOARD ─────────────────────────────────────────────────────
    {
      section: "Macro Dashboard", toc: "Macro Dashboard",
      kicker: "The four gauges", kickerTone: "blue",
      title: "Macro Dashboard",
      deck: "Inflation, rates, growth and jobs — September's readings side by side.",
      full: [
        { t: "gauges", items: [
          { title: "Inflation (latest)", dot: "gold", values: [{ value: "3.8%", label: "Euro area, Sep flash", tone: "red" }, { value: "3.4%", label: "US CPI, Aug", tone: "gold" }, { value: "3.1%", label: "UK CPI, Aug" }, { value: "4.82%", label: "India CPI, Aug" }], source: "Eurostat; BLS; ONS; MoSPI." },
          { title: "Policy rates", dot: "blue", values: [{ value: "3.75–4.00%", label: "Fed (+25bp)", tone: "blue" }, { value: "2.50%", label: "ECB (+25bp)" }, { value: "1.25%", label: "BoJ (+25bp)", tone: "gold" }], source: "Central banks, September 2026." },
          { title: "Growth", dot: "green", values: [{ value: "2.3%", label: "Fed US 2026 projection", tone: "green" }, { value: "0.9%", label: "ECB euro area 2026" }, { value: "50.7", label: "China composite PMI", tone: "green" }], source: "Fed SEP; ECB; NBS." },
          { title: "US labour market", dot: "violet", values: [{ value: "+29k", label: "Payrolls, Sep", tone: "red" }, { value: "4.2%", label: "Unemployment", tone: "red" }, { value: "3.0%", label: "Wage growth" }], source: "BLS, released 2 October 2026." },
        ] },
        { t: "callout", title: "How the four fit together in September", text: "Inflation rose fastest in Europe and stayed sticky in the US. Central banks responded with the most synchronised tightening in years. Growth forecasts held up for now, but the US job market softened again — setting up the classic late-cycle question of whether central banks would overdo it." },
      ],
    },

    // ── 28 COMPANY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Company Spotlight", toc: "Company Spotlight — Oracle",
      kicker: "Company spotlight",
      title: "Oracle's $664 billion backlog",
      deck: "A 49-year-old database company has become one of the biggest bets on the AI build-out — and one of its biggest borrowers.",
      left: [
        { t: "lead", text: "Oracle's results for the first quarter of fiscal 2027, released on 10 September, showed total revenue up **30%** to **$19.3 billion**. Its cloud infrastructure business grew **121%** to **$7.4 billion**, and cloud applications 10% to $4.2 billion. Adjusted earnings per share rose 30% to $1.92." },
        { t: "p", text: "The headline number was the backlog. Remaining performance obligations reached **$664 billion**, up $209 billion in a year, after Oracle signed more than **$30 billion** of additional AI cloud contracts in the quarter. It now expects full-year revenue of at least **$90 billion**." },
        { t: "p", text: "Turning that backlog into revenue requires building data centres first. Oracle's free cash flow was about **–$5 billion** in the quarter, and it sold **$20 billion** of new shares through an at-the-market programme to help fund the build. Earlier in the year it had reported capital spending above $55 billion for fiscal 2026 and debt measured in the low hundreds of billions." },
        { t: "fiveq",
          happened: "Oracle's RPO hit $664bn and cloud infrastructure grew 121%, funded partly by a $20bn share sale.",
          matters: "Oracle is a bellwether for whether AI contracts can be financed and delivered.",
          benefits: "Oracle's suppliers — chipmakers, power and construction firms.",
          hurt: "Existing shareholders diluted by new stock; creditors if AI demand slows.",
          takeaway: "Oracle has the orders. The question is whether it can build fast enough — at today's cost of money." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Oracle, Q1 fiscal 2027", dot: "violet", rows: [
          ["Total revenue", "$19.3bn (+30%)"], ["Cloud infrastructure", "$7.4bn (+121%)"], ["Remaining perf. obligations", "$664bn (+$209bn)"], ["Free cash flow", "≈ –$5bn"], ["Equity raised (ATM)", "$20bn"], ["FY27 revenue guide", "≥ $90bn"] ],
          source: "Oracle Q1 FY27 earnings release, 10 Sep 2026; FY26 figures from June coverage (Axios, Zacks)." },
        { t: "sidebar", title: "At-the-market offering", text: "A company sells new shares gradually into the market at prevailing prices, rather than in one big sale. It raises money quietly — but every new share slightly dilutes existing holders." },
      ],
    },

    // ── 29 COUNTRY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Country Spotlight", toc: "Country Spotlight — Nigeria",
      kicker: "Country spotlight",
      title: "Nigeria resets its interest rate",
      deck: "Africa's most populous country made the year's boldest rate cut — while the rest of the world was hiking.",
      left: [
        { t: "lead", text: "At its 307th meeting on 22 September, the Central Bank of Nigeria's Monetary Policy Committee cut the policy rate by **350 basis points**, from **26.5%** to **23%** — the largest reduction since 2007 — after holding in May and July. It left cash reserve requirements unchanged." },
        { t: "p", text: "The CBN was careful with its words, calling the move a \"reset\" rather than the start of an easing cycle. The logic: inflation had fallen to **15.39%** in August, from far higher levels, so even at 23% the real policy rate remains strongly positive. Analysts called the cut positive for markets but warned it would not quickly make credit cheap." },
        { t: "p", text: "Nigeria's position has improved through 2026. As an oil exporter it benefits from high crude prices; foreign reserves were around $52 billion in July, up from about $38 billion a year earlier; and the IMF kept its 2026 growth forecast at 4.1%. The test now is whether lower rates revive lending without reigniting inflation." },
        { t: "fiveq",
          happened: "The CBN cut 350bp to 23% — a 'reset' — as inflation fell to 15.39%.",
          matters: "It's a bet that Nigeria's disinflation is durable despite global turmoil.",
          benefits: "Borrowers, banks' bond portfolios and the government's interest bill.",
          hurt: "Savers, and the naira if investors seek higher returns elsewhere.",
          takeaway: "Nigeria's oil windfall bought it the freedom to cut when everyone else hiked." },
      ],
      right: [
        { t: "chart", title: "Nigeria: rate vs inflation (%)", dot: "gold", data: [
          { label: "Old MPR", value: 26.5, display: "26.5%", tone: "muted" }, { label: "New MPR", value: 23, display: "23.0%", tone: "blue" }, { label: "CPI, Aug", value: 15.39, display: "15.39%", tone: "red" } ],
          source: "CBN; Premium Times; Nairametrics; Trading Economics." },
        { t: "stats", items: [{ value: "–350bp", label: "Largest cut since 2007", tone: "green" }, { value: "~$52bn", label: "FX reserves, July", tone: "gold" }] },
        { t: "sidebar", title: "A rate 'reset'", text: "Central banks sometimes make one large move to re-align policy with changed conditions, then pause. Calling it a reset tells markets not to expect a series of further cuts." },
      ],
    },

    // ── 30 CHARTS ────────────────────────────────────────────────────────
    {
      section: "Charts That Explain the Month", toc: "Charts That Explain the Month",
      kicker: "Data",
      title: "Three charts that explain September",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Oil broke $100", dot: "red", text: "Brent +42% in Q3 to ~$103.50." },
          { title: "2 · Rates went up together", dot: "blue", text: "Fed, ECB, BoJ, SARB and RBA all hiked." },
          { title: "3 · Most stocks fell", dot: "violet", text: "Equal-weight –4.4% vs S&P –0.5%." },
        ] },
      ],
      full: [
        { t: "g2", left: [
          { t: "chart", title: "Chart 1 · Brent ($/bbl)", dot: "red", data: [{ label: "End-Jun", value: 72.92, display: "$72.9", tone: "muted" }, { label: "End-Jul", value: 90.12, display: "$90.1", tone: "gold" }, { label: "End-Sep", value: 103.5, display: "$103.5", tone: "red" }], source: "Reuters; priceofoil.com; The Star." },
          { t: "chart", title: "Chart 3 · September returns (%)", dot: "violet", unit: "%", data: [{ label: "Nasdaq", value: 1.9, tone: "green" }, { label: "S&P 500", value: -0.5, tone: "blue" }, { label: "Equal-wt", value: -4.4, tone: "red" }, { label: "Russell 2000", value: -5.0, display: "<–5%", tone: "violet" }], source: "Kiplinger; Bizportal; E*TRADE." },
        ], right: [
          { t: "chart", title: "Chart 2 · Rate changes in September (bp)", dot: "blue", data: [{ label: "Fed", value: 25, tone: "blue" }, { label: "ECB", value: 25, tone: "violet" }, { label: "BoJ", value: 25, tone: "gold" }, { label: "RBA", value: 25, tone: "green" }, { label: "SARB", value: 25, tone: "cyan" }, { label: "Brazil", value: -25, tone: "red" }], source: "Central-bank statements. Nigeria's –350bp reset (p.29) omitted for scale." },
          { t: "callout", title: "Read together", text: "Chart 1 is the shock. Chart 2 is the policy response — almost everyone tightened, except high-rate emerging markets. Chart 3 is the result: borrowing costs rose for everyone, and only companies big and profitable enough to ignore them held up." },
        ] },
        { t: "note", text: "All figures sourced from the institutions listed on p.36. Charts are drawn to the values shown and are not to a common scale." },
      ],
    },

    // ── 31 INFOGRAPHIC ───────────────────────────────────────────────────
    {
      section: "Infographic", toc: "Infographic: Where the Money Went",
      kicker: "The month at a glance",
      title: "Where the money went",
      deck: "Into the dollar and oil; out of bonds, gold and most stocks; a little into bitcoin and AI.",
      full: [
        { t: "g2", left: [
          { t: "flows", title: "The rotation of September", items: [
            { label: "Into oil (Brent +14%)", width: 70, tag: "war bid" },
            { label: "Into the dollar (+2%)", width: 40, tag: "Fed hike" },
            { label: "Into AI mega-caps", width: 30, tag: "Nasdaq +1.9%" },
            { label: "Out of long Treasuries", width: 72, dir: "out", tag: "24-yr high yields" },
            { label: "Out of gold & silver", width: 58, dir: "out", tag: "real yields" },
            { label: "Out of small caps", width: 46, dir: "out", tag: "< –5%" } ],
            note: "Widths illustrate direction and rough scale, not measured flows." },
        ], right: [
          { t: "bignums", items: [
            { kicker: "Biggest number", value: "$664bn", label: "Oracle's contracted AI backlog" },
            { kicker: "Boldest move", value: "–350bp", label: "Nigeria's rate reset", tone: "blue" },
            { kicker: "Biggest risk", value: "~5.3%", label: "US 10-year yield, highest since 2002", tone: "red" } ] },
        ] },
        { t: "strip", items: [{ value: "3.75–4.00%", label: "Fed target range" }, { value: "3.8%", label: "Euro-area inflation" }, { value: "$103.50", label: "Brent, 30 Sep" }, { value: "1.25%", label: "BoJ — highest since 1995" }] },
      ],
    },

    // ── 32 EXPLAINER ─────────────────────────────────────────────────────
    {
      section: "Economic Explainer", toc: "Explainer: The Neutral Rate",
      kicker: "Economics, explained",
      title: "What is the neutral rate?",
      deck: "Every central bank that hiked in September was really arguing about one invisible number.",
      left: [
        { t: "lead", text: "The neutral rate is the interest rate that neither speeds up nor slows down the economy — the level at which, with inflation at target and full employment, monetary policy is neither \"stimulative\" nor \"restrictive\". Economists sometimes call it r* (\"r-star\")." },
        { t: "p", text: "It can't be observed directly; it has to be estimated from how the economy behaves. That's why the Bank of Japan gives a wide range — **1.1% to 2.5%** in nominal terms — and why its 18 September hike to 1.25% only just entered that band. By that measure, Japanese policy is still close to neutral, not tight." },
        { t: "p", text: "The concept explains September's divisions. Hawks argue that rates are still near or below neutral, so policy isn't restraining inflation; doves argue that rates are already above neutral, so further hikes risk a recession. The Fed's move to 3.75–4.00% and the ECB's to 2.50% were both, in effect, judgments about where neutral now lies." },
        { t: "p", text: "Neutral isn't fixed. Higher government borrowing, an investment boom (such as AI) or a shift in savings can push it up. Many economists think the neutral rate has risen since the 2010s — one reason today's rates feel less punishing than their level suggests." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "Above, at or below neutral?", dot: "gold", steps: [
          { value: "Below", label: "Policy stimulates — growth and inflation rise", tone: "green" },
          { value: "Neutral", label: "Policy neither pushes nor pulls", tone: "gold" },
          { value: "Above", label: "Policy restrains — growth and inflation slow", tone: "red" } ], source: "Conceptual." },
        { t: "chart", title: "BoJ neutral range vs policy rate (%)", dot: "blue", unit: "%", decimals: 2, data: [{ label: "Neutral low", value: 1.1, tone: "muted" }, { label: "Policy rate", value: 1.25, tone: "gold" }, { label: "Neutral high", value: 2.5, tone: "muted" }], source: "Bank of Japan estimates." },
        { t: "callout", title: "The takeaway", text: "When central banks disagree, they're usually disagreeing about where neutral is — not about whether inflation is bad." },
      ],
    },

    // ── 33 VOCAB ─────────────────────────────────────────────────────────
    {
      section: "Vocabulary Builder", toc: "Vocabulary",
      kicker: "Speak the language",
      title: "Ten terms from this issue",
      deck: "Every phrase below appeared in September's stories.",
      full: [
        { t: "terms", items: [
          { term: "Neutral rate (r*)", def: "The rate that neither speeds nor slows the economy (p.32)." },
          { term: "Dot plot", def: "Fed officials' projections of future rates, one dot each (p.08)." },
          { term: "Supercore", def: "Core services excluding housing — a wage-driven inflation gauge (p.06)." },
          { term: "Real yield", def: "A bond's yield after expected inflation (p.20)." },
          { term: "Spot vs futures", def: "Price for immediate delivery vs a later date (p.04)." },
          { term: "SPR exchange", def: "Lending emergency oil that must be repaid with more oil (p.07)." },
          { term: "Behind the curve", def: "Raising rates too slowly for the inflation in front of you (p.11)." },
          { term: "RPO", def: "Contracted revenue not yet delivered — Oracle's is $664bn (p.28)." },
          { term: "Rate reset", def: "One large move to realign policy, not the start of a series (p.29)." },
          { term: "Concentration risk", def: "When a few stocks dominate an index's returns (p.19)." },
        ] },
        { t: "callout", title: "Try it yourself", text: "\"With real yields at 2.85%, the dot plot implies policy above neutral.\" Decoded: after inflation, bonds pay a solid return, and Fed officials expect rates high enough to restrain the economy." },
      ],
    },

    // ── 34 LIGHTER ───────────────────────────────────────────────────────
    {
      section: "The Lighter Side", toc: "The Lighter Side",
      kicker: "Because economics can be fun",
      title: "The Lighter Side",
      deck: "A little play before you go — every puzzle drawn from this month's real stories.",
      full: [
        { t: "g2", left: [
          { t: "puzzle", icon: "🎯", title: "Guess the Company", dot: "gold", paras: ["Three clues, one September headline-maker:"], list: ["Its contracted backlog reached $664 billion.", "Its cloud infrastructure revenue grew 121%.", "It sold $20 billion of new shares to fund data centres."], answer: "Oracle" },
          { t: "puzzle", icon: "🧠", title: "Trivia: true or false?", dot: "blue", paras: ["\"The S&P 500 fell only 0.5% in September, so most stocks did fine.\""], answer: "False — about three-quarters of its members fell, and 60% dropped at least 5%." },
          { t: "puzzle", icon: "💡", title: "Scale check", dot: "green", paras: ["Oracle's $664 billion backlog is larger than the annual GDP of most countries — roughly the size of Sweden's economy, in signed contracts for one company's cloud."] },
        ], right: [
          { t: "meme", head: "Central bankers, September 2026:", a: "After you…", b: "…no, after you — let's all hike", emoji: "🤝", caption: "the synchronised tightening starter pack" },
          { t: "puzzle", icon: "🔢", title: "By the numbers", dot: "violet", paras: ["Match the number to the story:"], rows: [["12–0", "Fed vote to hike"], ["1995", "Last time BoJ rates were this high"], ["–350bp", "Nigeria's rate cut"], ["$132", "Spot oil peak"]] },
          { t: "puzzle", icon: "🃏", title: "Cryptic clue", dot: "gold", paras: ["\"I'm invisible, estimated, argued over — and every hike in September was really about me. What am I?\""], answer: "The neutral rate" },
        ] },
        { t: "callout", icon: "😅", title: "The groan zone · three jokes we're not sorry for", text: "• Why did five central banks hike in the same fortnight? Nobody wanted to be the one left *behind the curve*.  • Gold asked the 10-year yield to slow down. The yield said, \"Sorry — I'm just being *real*.\"  • Oracle's backlog is so big it has its own *remaining performance obligations*." },
        { t: "note", text: "All puzzles use figures reported for September 2026. Sources on p.36." },
      ],
    },

    // ── 35 TO CLOSE ──────────────────────────────────────────────────────
    {
      section: "History · Culture · Ahead", toc: "History · Picks · The Month Ahead",
      kicker: "To close",
      title: "This month in history · What to read · The month ahead",
      full: [
        { t: "cards", cols: 3, items: [
          { title: "⏳ This month in history", dot: "gold", paras: ["On 16 September 1992 — \"Black Wednesday\" — the UK raised interest rates from 10% to 12% and announced a further rise to 15% in a single day trying to defend the pound, then gave up and left the European Exchange Rate Mechanism.", "It remains the classic lesson in the limits of using rates to fight markets — worth remembering in a month of hikes."], source: "Historical context." },
          { title: "📚 Frontier picks", dot: "blue", paras: ["**Read:** the Fed's September Summary of Economic Projections — the dot plot in full.", "**Listen:** any explainer on r-star and why it may have risen.", "**Watch:** a documentary on Black Wednesday and the 1992 currency crisis."], source: "Recommendations, not endorsements." },
          { title: "📅 The month ahead", dot: "violet", paras: ["**Watch for:** the IMF's October World Economic Outlook; Q3 GDP for the US, euro area and China; the ECB (late Oct) and Fed (28 Oct) meetings; RBI (5–7 Oct); and any movement on Hormuz."], source: "Forward-looking; not investment advice." },
        ] },
        { t: "table", title: "The September diary — key dates", dot: "gold", head: ["Date", "Event", "Page"], rows: [
          ["10 Sep", "ECB hikes to 2.50%; Oracle backlog $664bn", "10, 28"],
          ["11 Sep", "US CPI for August: 3.4%, +0.4% m/m", "06"],
          ["15 Sep", "Brent futures peak $109; bitcoin low after CLARITY Act vote", "22, 24"],
          ["16 Sep", "Fed hikes to 3.75–4.00% (12–0); Brazil cuts to 13.75%", "08, 17"],
          ["17 Sep", "BoE holds 6–3", "11"],
          ["18 Sep", "BoJ hikes to 1.25%, highest since 1995", "12"],
          ["22 Sep", "Nigeria cuts 350bp to 23%", "29"],
          ["23 Sep", "SARB hikes to 7.25%; Bank Indonesia holds; Brent +3.86%", "16, 18"],
          ["24 Sep", "Banxico holds at 6.50%", "17"],
          ["28 Sep", "US rejects Iran's Hormuz plan; Brent >$107", "15"],
          ["29 Sep", "RBA hikes to 4.60%; SPR offers final 40m barrels", "18, 07"],
          ["30 Sep–1 Oct", "China PMIs >50; 10-yr yield ~5.3%, highest since 2002", "13, 20"] ],
          source: "Compiled from the sources on p.36." },
      ],
    },

    // ── 36 SOURCES ───────────────────────────────────────────────────────
    {
      section: "Sources & Method", toc: "Sources & Method",
      kicker: "Sources & method",
      title: "Where every number came from",
      full: [
        { t: "sources", items: [
          "Federal Reserve — FOMC statement, SEP and press conference, 16 Sep 2026; Schwab; Fox Business; Semafor; Newsquawk; Morningstar.",
          "BLS — CPI, August 2026 (11 Sep); Employment Situation, September 2026 (2 Oct); Desjardins; Trading Economics; KPMG.",
          "BEA — GDP third estimate, Q2 2026 (30 Sep).",
          "US Department of Energy — SPR exchange offer (29 Sep); OPIS via Dow Jones; The National; 24/7 Wall St.",
          "ECB — monetary policy decision and staff projections, 10 Sep 2026; Morningstar; BBVA Research; Euronews.",
          "Eurostat — flash HICP, September 2026; Euronews; gmk.center; Eunews (final, 16 Oct).",
          "Bank of England — Monetary Policy Summary, 17 Sep 2026; Euronews; Khaleej Times; Morningstar.",
          "Bank of Japan — 18 Sep 2026 decision; Nation Thailand; NST; The Star; Babypips.",
          "National Bureau of Statistics of China — PMI, September 2026; Khaleej Times; Trading Economics; The Star.",
          "MoSPI — CPI, August 2026; Societe Generale via FXStreet; Business Today; Times of Oman.",
          "Al Jazeera; Nation Thailand; The Star; Ahram — Iran's Hormuz proposal and oil prices. EIA — Q3 crude review; priceofoil.com.",
          "SARB — MPC statement, 23 Sep 2026; SAnews; EWN. CBN — 307th MPC; Premium Times; Nairametrics; Forvis Mazars.",
          "Banco Central do Brasil via Trading Economics, Metrópoles; Banxico; FXStreet; BBVA Research; Rio Times.",
          "RBA via CommBank, NAB, Savings.com.au; Bank Indonesia press release.",
          "Kiplinger; Morningstar/MarketWatch; Stocktwits; Bizportal; E*TRADE; LPL — September equity performance.",
          "CNN via KRDO; Trading Economics; Bloomberg Government — Treasury yields.",
          "Trading Economics; Dow Jones via Morningstar; NST — dollar and yen.",
          "BullionVault; World Gold Council; CMC Markets; Economies.com; Business Today — gold and silver.",
          "Messari; The Block; SoSoValue; FXStreet; CryptoQuant — bitcoin and ETF flows.",
          "Oracle — Q1 FY2027 results (10 Sep 2026); Axios and Zacks (June results).",
          "WTO — Global Trade Outlook, March 2026; gCaptain; Global Trade Magazine.",
        ] },
        { t: "callout", title: "Method", text: "We separate fact (sourced figures), analysis (our reading) and opinion (labelled). Where sources disagreed — on the exact peak in Treasury yields, gold's monthly fall or September's index returns — we give the range. Some charts are conceptual and labelled as such. Data published in early October about September (jobs, euro-area flash inflation, China PMIs) is included and dated. The Financial Frontier is an educational publication. Nothing herein is investment advice." },
      ],
    },
  ],
};
