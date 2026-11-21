// Issue No. 05 — October 2026. Full-length print edition.
// Figures are drawn from the sources on the Sources page; where sources disagreed we give
// the primary release or a range. Data published in early November about October is dated.

export default {
  slug: "2026-10",
  issueNumber: 5,
  month: "October 2026",
  title: "Resilience Under Strain",

  cover: {
    lines: ["Resilience"],
    gold: "Under Strain.",
    standfirst:
      "The IMF nudged world growth up to 3.1% and US GDP grew 3.4% — yet Brent climbed toward $117, euro inflation hit 4%, Alphabet lost half a trillion dollars in a day, and Christine Lagarde said she will leave the ECB early.",
    tags: ["IMF WEO", "Q3 GDP 3.4%", "$117 Oil", "Big Tech Slide", "Lagarde Exit"],
  },

  contents: {
    oneLine:
      "October's data said the economy is strong; its markets said it is fragile. Both were right.",
  },

  back: {
    text:
      "Issue No. 05 covered a month of strong numbers and nervous markets — 3.4% US growth, 4% euro inflation, oil near $117, a historic one-day loss for Alphabet and an early exit at the ECB. Next issue: the year's final month, and what the hikes have done.",
  },

  pages: [
    // ── 03 EDITOR ─────────────────────────────────────────────────────────
    {
      section: "Editor's Letter", toc: "Editor's Letter",
      kicker: "From the editor",
      title: "Strong numbers, nervous markets",
      left: [
        { t: "lead", text: "By the usual yardsticks, October was a good month for the world economy. The IMF raised its 2026 global growth forecast to **3.1%**. The US economy grew at a **3.4%** annual pace in the third quarter, beating forecasts. China grew 4.5%, also a beat. The euro area expanded 0.4% despite the energy shock." },
        { t: "p", text: "Markets told a different story. Brent rose about **14%** to around **$117** — its fourth straight monthly gain — as attacks on tankers and Saudi facilities continued. Euro-area inflation hit **4.0%**, its highest in three years. And on 29 October Alphabet lost roughly **$500 billion** of market value in a single day as investors balked at its AI spending." },
        { t: "p", text: "The two stories fit together. Growth is being carried by fewer engines — AI investment in America, exports from China — while energy costs squeeze everyone else. That concentration is what makes the economy look strong in the aggregate and fragile underneath." },
        { t: "p", text: "Then, on 29 October, the ECB announced that its president, Christine Lagarde, will step down on 7 February 2027, nine months early — opening a succession race in the middle of an inflation fight." },
      ],
      right: [
        { t: "box", title: "Three numbers that frame October", dot: "gold", paras: ["**3.4%** — US Q3 GDP growth (annualised), beating 3.2% forecasts", "**4.0%** — euro-area inflation, highest since 2023", "**~$500bn** — Alphabet's one-day loss in market value, 29 Oct"], source: "BEA; Eurostat; Fox Business." },
        { t: "quote", text: "An economy can be strong and fragile at the same time — when its strength rests on a few pillars.", by: "The Financial Frontier" },
        { t: "p", text: "Every figure carries a source; every story answers five questions; and where sources disagreed — on index returns or the month-end bond yield — we show the range." },
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
      section: "The Global Economy · The Outlook", foot: "The Global Economy", toc: "The Global Economy — The IMF's October View",
      kicker: "The big picture · Part I",
      title: "Up a tenth, with a warning",
      deck: "The IMF's October outlook lifted world growth slightly — and assumed the Strait of Hormuz stays shut until March.",
      left: [
        { t: "lead", text: "On 13 October the IMF's World Economic Outlook raised its forecast for 2026 world growth to **3.1%**, a tenth above July, slowing from 3.5% in 2025 before recovering to **3.4%** in 2027. AI investment is lifting growth enough to offset the damage from higher energy prices." },
        { t: "p", text: "The split between rich and poor economies narrowed in an unusual way. Advanced economies are forecast to grow **2.1%** in 2026 — boosted by the US at 2.3% — while emerging and developing economies slow to **3.7%**. India is the standout at **7.0%** in both 2026 and 2027." },
        { t: "p", text: "The biggest downgrade was in the Gulf. Saudi Arabia's 2026 outlook was cut by five points to a **3.3% contraction** (see Country Spotlight, p.29). The IMF's baseline assumes the Strait of Hormuz reopens only in **March 2027**, and it warned of growing risks from rising debt — including borrowing linked to AI." },
        { t: "fiveq",
          happened: "The IMF raised 2026 world growth to 3.1%, cut Saudi Arabia to –3.3% and assumed Hormuz reopens in March 2027.",
          matters: "Global growth is holding up, but it depends on AI spending and a war ending.",
          benefits: "AI-investing economies (the US) and fast growers (India).",
          hurt: "Gulf exporters trapped by Hormuz and energy-importing emerging markets.",
          takeaway: "The world is growing — on a narrower base and with more debt than before." },
      ],
      right: [
        { t: "chart", title: "IMF growth forecasts, Oct 2026 (%)", dot: "gold", unit: "%", data: [
          { label: "World", value: 3.1, tone: "gold" }, { label: "Advanced", value: 2.1, tone: "blue" }, { label: "Emerging", value: 3.7, tone: "violet" }, { label: "India", value: 7.0, tone: "green" }, { label: "Saudi Arabia", value: -3.3, tone: "red" } ],
          source: "IMF World Economic Outlook, 13 October 2026; CGTN; Saudi Gazette." },
        { t: "stats", items: [{ value: "Mar 2027", label: "IMF's assumed Hormuz reopening", tone: "red" }, { value: "2.3%", label: "US growth, 2026 and 2027", tone: "blue" }] },
        { t: "sidebar", title: "Baseline assumptions", text: "Every forecast rests on assumptions. The IMF's growth path depends on Hormuz reopening in March; if it stays shut longer, the Fund's own scenarios show weaker growth and higher inflation." },
      ],
    },

    // ── 05 GLOBAL II ──────────────────────────────────────────────────────
    {
      section: "The Global Economy · The Shocks", foot: "The Global Economy", toc: "The Global Economy — Three Shocks",
      kicker: "The big picture · Part II",
      title: "Three shocks, one month",
      deck: "Oil climbed, bond yields spiked and then fell, and the AI trade had its sharpest correction of the year.",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Oil near $117", dot: "red", text: "Attacks on tankers and Saudi facilities pushed Brent up about 14% to $117.64 — a fourth monthly gain.", source: "Nation Thailand; Reuters." },
          { title: "2 · Yields peak, then drop", dot: "blue", text: "The 10-year Treasury yield hit ~5.35% on 8 October, a 24-year high, then fell back toward ~4.9–5.0% as investors fled to safety.", source: "Cboe; Tradeweb; Trading Economics." },
          { title: "3 · AI's correction", dot: "violet", text: "Alphabet lost ~$500bn in a day; the Nasdaq had its worst month since March 2025.", source: "Fox Business; InvestingLive." },
        ] },
      ],
      left: [
        { t: "p", text: "The month moved in two phases. In early October, the bond sell-off that began in September continued, pushing long-term yields to their highest since 2002. In the second half, a sell-off in AI and mega-cap tech stocks sent investors into Treasuries, and yields fell sharply — a classic flight to safety." },
        { t: "p", text: "Meanwhile the typical stock did fine. The equal-weight S&P 500 rose about **5%** even as the headline index fell, because the losses were concentrated in the giants that dominate it. October was the mirror image of September." },
        { t: "fiveq",
          happened: "Oil rose ~14%, yields hit and then left a 24-year high, and big tech sold off.",
          matters: "The market's biggest companies are now its biggest source of risk.",
          benefits: "Bond holders in late October; equal-weight and value investors.",
          hurt: "Mega-cap tech holders; anyone exposed to AI-financing stocks.",
          takeaway: "In October the giants fell and everyone else rose — the rotation finally arrived." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "October returns (%)", dot: "violet", data: [
          { label: "Brent", value: 13.6 }, { label: "Equal-wt S&P", value: 4.9 }, { label: "S&P 500", value: -0.9, display: "≈–1%" }, { label: "Nasdaq Comp.", value: -5.3, display: "–5.3 to –6.0%" }, { label: "Bitcoin", value: -7.3 } ],
          source: "Nation Thailand; Vested Finance; InvestingLive; Forklog. Figures vary by source." },
        { t: "callout", title: "Key takeaway", text: "Strong data, weak giants: October's market rewarded breadth and punished concentration." },
      ],
    },

    // ── 06 US I ───────────────────────────────────────────────────────────
    {
      section: "Region · United States · I", foot: "Region · United States", toc: "United States — A 3.4% Quarter",
      kicker: "Region · United States",
      title: "A 3.4% quarter",
      deck: "America's economy accelerated in the summer — powered by consumers and an AI equipment boom.",
      left: [
        { t: "lead", text: "The advance estimate of third-quarter GDP, released on 29 October, showed the US economy growing at a **3.4%** annual rate — up from 2.2% in the second quarter and above the 3.2% consensus." },
        { t: "p", text: "Consumers kept spending: real consumer spending rose about **3.8%** annualised, adding 2.5 percentage points to growth. Investment added about **3.3 points**, led by equipment spending that surged roughly **21%** — largely AI-related — and by inventories, which alone contributed 1.6 points. Housing investment fell, and a jump in imports subtracted 2.6 points." },
        { t: "p", text: "A cleaner gauge of underlying demand — final sales to private domestic purchasers, which strips out trade, inventories and government — rose **4.9%**, up from 4.6%. That's strong by any standard, and it is why the Fed still sees a case for higher rates." },
        { t: "fiveq",
          happened: "Q3 GDP grew 3.4% (vs 3.2% expected), led by consumers and a ~21% surge in equipment investment.",
          matters: "Strong demand keeps inflation pressure up and a December Fed hike in play.",
          benefits: "Equipment makers, AI suppliers and workers in a still-growing economy.",
          hurt: "Home builders, as housing investment fell under high rates.",
          takeaway: "America's economy is running hot on AI investment and resilient consumers." },
      ],
      right: [
        { t: "chart", title: "Contributions to Q3 GDP growth (pts)", dot: "blue", data: [
          { label: "Consumers", value: 2.52, display: "+2.5", tone: "blue" }, { label: "Investment", value: 3.27, display: "+3.3", tone: "green" }, { label: "of which inventories", value: 1.61, display: "+1.6", tone: "gold" }, { label: "Imports", value: -2.64, display: "–2.6", tone: "red" } ],
          source: "BEA advance estimate, 29 Oct 2026; NAHB; TheStreet." },
        { t: "stats", items: [{ value: "3.4%", label: "Q3 GDP (annualised)", tone: "green" }, { value: "4.9%", label: "Final sales to private domestic buyers", tone: "blue" }] },
        { t: "sidebar", title: "Why imports subtract", text: "GDP counts what a country produces. Spending on imports is included in consumption and investment, so it's subtracted back out — a jump in imports lowers measured GDP even if demand is strong." },
      ],
    },

    // ── 07 US II ──────────────────────────────────────────────────────────
    {
      section: "Region · United States · II", foot: "Region · United States", toc: "United States — Prices",
      kicker: "Region · United States · II",
      title: "Inflation back at 3.7%",
      deck: "September's consumer prices jumped on gasoline — and core inflation rose for the first time since May.",
      left: [
        { t: "lead", text: "The September consumer price index, released on 14 October, rose **0.6%** in the month and **3.7%** over the year, up from 3.4% in August. Gasoline was the main driver: the BLS's seasonally adjusted gasoline index jumped **9.1%** in a single month (about 6.5% before adjustment)." },
        { t: "p", text: "The underlying picture worsened too. Core CPI rose 0.3% on the month and **2.6%** over the year, up from 2.4% — the first rise in the annual core rate since May, and slightly above forecasts. Shelter costs, including hotels, rose 0.4%." },
        { t: "p", text: "The report landed in the middle of the AI sell-off and deepened a slide in semiconductor stocks on the day. It also complicated the politics: coverage noted that inflation was rising with the midterm elections a month away." },
        { t: "fiveq",
          happened: "September CPI rose 0.6% m/m to 3.7% y/y; core rose to 2.6%; gasoline +9.1% (SA).",
          matters: "Inflation is moving away from target again, not toward it.",
          benefits: "Energy producers.",
          hurt: "Households, especially commuters; the Fed's credibility.",
          takeaway: "The disinflation of the summer has fully reversed." },
      ],
      right: [
        { t: "chart", title: "US CPI inflation, 2026 (y/y %)", dot: "gold", unit: "%", data: [
          { label: "June", value: 3.5, tone: "muted" }, { label: "July", value: 3.4, tone: "blue" }, { label: "August", value: 3.4, tone: "blue" }, { label: "September", value: 3.7, tone: "gold" } ],
          source: "BLS CPI releases, Jul–Oct 2026." },
        { t: "stats", items: [{ value: "+0.6%", label: "CPI, September m/m", tone: "red" }, { value: "2.6%", label: "Core CPI y/y (from 2.4%)", tone: "gold" }] },
        { t: "sidebar", title: "Seasonal adjustment", text: "Some prices follow yearly patterns — gasoline usually eases in September. Seasonal adjustment removes that pattern, so a price that holds steady when it normally falls shows up as a rise." },
      ],
    },

    // ── 08 FED ───────────────────────────────────────────────────────────
    {
      section: "Central Banks · The Federal Reserve", foot: "Central Banks", toc: "The Fed — A Hawkish Hold",
      kicker: "Central banks · The Fed",
      title: "A hold with two votes to hike",
      deck: "The Fed paused in October — but a governor and a regional president both wanted to keep going.",
      left: [
        { t: "lead", text: "On 28 October the FOMC held its target range at **3.75–4.00%** by a **10–2** vote. Governor Lisa Cook and Cleveland Fed President Beth Hammack dissented in favour of another quarter-point hike. Fortune noted it was the first time a governor and a regional president had dissented on the same side since October 1992." },
        { t: "p", text: "The statement said inflation \"remains elevated\" and upgraded the Fed's view of the economy, wording some analysts read as a hint of guidance Warsh has tried to avoid. In his press conference Warsh called returning inflation to 2% paramount, leaving a December hike firmly in play." },
        { t: "p", text: "Warsh also announced a procedural change: next year the committee will vote on rates at only **seven of its eight meetings**, using the remaining session for a broader strategy discussion. Markets saw the hold as a pause: the 2-year Treasury yield fell to about **4.71%**." },
        { t: "fiveq",
          happened: "The Fed held at 3.75–4.00% (10–2), with Cook and Hammack dissenting for a hike.",
          matters: "September's hike may not be the last; the committee is still split toward tightening.",
          benefits: "Borrowers, for one more month.",
          hurt: "Anyone hoping the hiking cycle was over.",
          takeaway: "October was a pause, not a peak." },
      ],
      right: [
        { t: "chart", type: "kv", title: "The October FOMC", dot: "blue", rows: [
          ["Decision", "Hold"], ["Target range", "3.75–4.00%"], ["Vote", "10–2"], ["Dissents (hike)", "Cook, Hammack"], ["Next year", "Rate votes at 7 of 8 meetings"], ["2-yr yield after", "~4.71%"] ],
          source: "Federal Reserve; Fortune; InvestingLive; Nation Thailand." },
        { t: "stats", items: [{ value: "1992", label: "Last time a governor and president dissented together", tone: "gold" }] },
        { t: "sidebar", title: "Governors vs presidents", text: "The FOMC has seven Board governors in Washington and five voting regional Fed presidents. Dissents from presidents are common; from governors, rare — which is why Cook's vote drew attention." },
      ],
    },

    // ── 09 SCORECARD ─────────────────────────────────────────────────────
    {
      section: "Central Banks · Scorecard", foot: "Central Banks", toc: "Central Bank Scorecard",
      kicker: "The policy map", kickerTone: "blue",
      title: "Mostly holds, one hike — and a resignation",
      deck: "After September's synchronised tightening, October was a month of pauses. India was the exception.",
      full: [
        { t: "table", title: "October 2026 decisions", dot: "blue", head: ["Central bank", "Rate", "Decision", "Note"], rows: [
          ["Reserve Bank of India", "5.50%", "**+25bp**, 7 Oct (unanimous)", "Stance: \"calibrated tightening\" (4–2)"],
          ["Bank of Korea", "3.00%", "Hold, 22 Oct (unanimous)", "Door open to a November hike"],
          ["Federal Reserve", "3.75–4.00%", "Hold, 28 Oct (10–2)", "Cook and Hammack voted to hike"],
          ["European Central Bank", "2.50% (deposit)", "Hold, 29 Oct", "Lagarde to step down 7 Feb 2027"],
          ["Bank of Japan", "1.25%", "Hold, 30 Oct (8–1)", "Takata voted to hike; growth forecast raised"],
          ["Bank of England", "3.75%", "No meeting", "Next decision 5 Nov; CPI 3.5%"],
          ["Reserve Bank of Australia", "4.60%", "No meeting", "Next decision 3 Nov"],
          ["Banco Central do Brasil", "13.75%", "No meeting", "Next 3–4 Nov; inflation at top of band"],
          ["Banxico (Mexico)", "6.50%", "No meeting", "Next 5 Nov"] ],
          source: "RBI; Korea Times; Federal Reserve; ECB; Bank of Japan via Newsquawk; central-bank calendars." },
      ],
      left: [
        { t: "p", text: "The pauses were hawkish ones. At the Fed and the Bank of Japan, members dissented in favour of hikes; the ECB said neutral \"is not necessarily a stopping point\"; Korea kept the door open. India's hike — and its shift to a \"calibrated tightening\" stance last used in 2018 — showed the tightening cycle spreading to fast-growing emerging markets." },
      ],
      right: [
        { t: "callout", title: "Key takeaway", text: "No one cut in October. The question for December is how many hike again." },
      ],
    },

    // ── 10 EUROPE / ECB ──────────────────────────────────────────────────
    {
      section: "Region · Europe · Euro Area", foot: "Region · Europe", toc: "Europe — The Euro Area & Lagarde",
      kicker: "Region · Europe",
      title: "Lagarde's early exit",
      deck: "The ECB held rates, euro inflation hit 4%, and the bank's president announced she will leave nine months early.",
      left: [
        { t: "lead", text: "On 29 October the ECB kept its deposit rate at **2.50%** (main refinancing 2.65%, marginal lending 2.90%) without pre-committing to a path. Lagarde reportedly called it an easy decision and said the neutral rate is not necessarily a stopping point. The same day, the ECB announced she will step down on **7 February 2027** — her eight-year term was due to end on 31 October 2027." },
        { t: "p", text: "Reports said the timing lets EU leaders appoint a successor before France's presidential election in April 2027. Lagarde called it \"a great pride and a huge privilege\" to have served. The announcement opened a succession race in the middle of the ECB's fight against inflation." },
        { t: "p", text: "The data showed the scale of that fight. Eurostat's flash estimates put third-quarter GDP growth at **0.4%** (1.3% year-on-year), and October inflation at **4.0%** — the highest since September 2023 — with energy inflation at **20.8%**. Core inflation held at **2.5%**." },
        { t: "fiveq",
          happened: "The ECB held at 2.50%; Lagarde will leave 7 Feb 2027; inflation hit 4.0% and Q3 GDP grew 0.4%.",
          matters: "A leadership change mid-inflation-fight raises uncertainty about the ECB's next steps.",
          benefits: "Candidates to succeed her; the euro area's growth, which held up.",
          hurt: "Households facing 20.8% energy inflation; borrowers if a hawk succeeds her.",
          takeaway: "Europe is growing modestly, inflating rapidly — and changing captains." },
      ],
      right: [
        { t: "chart", title: "Euro-area inflation, 2026 (y/y %)", dot: "gold", unit: "%", data: [
          { label: "July", value: 2.9, tone: "muted" }, { label: "August", value: 3.2, tone: "blue" }, { label: "September", value: 3.8, tone: "violet" }, { label: "Oct (flash)", value: 4.0, tone: "red" } ],
          source: "Eurostat flash and final estimates, Aug–Nov 2026." },
        { t: "stats", items: [{ value: "20.8%", label: "Energy inflation, October", tone: "red" }, { value: "+0.4%", label: "Q3 GDP, q/q (flash)", tone: "green" }] },
        { t: "sidebar", title: "Flash estimates", text: "Eurostat publishes early \"flash\" readings of GDP and inflation within days of a period's end. They're often revised: one report says the Q3 GDP figure was later raised to 0.6%, though another says it stayed at 0.4%." },
      ],
    },

    // ── 11 UK ────────────────────────────────────────────────────────────
    {
      section: "Region · Europe · United Kingdom", foot: "Region · Europe", toc: "Europe — United Kingdom",
      kicker: "Region · United Kingdom",
      title: "Petrol pushes UK inflation to 3.5%",
      deck: "British inflation jumped to its highest in almost a year — a \"pre-Budget dose of reality\".",
      left: [
        { t: "lead", text: "UK CPI inflation rose to **3.5%** in the year to September, from 3.1% in August, the ONS reported on 21 October. Prices rose 0.4% in the month. CPIH, which adds owner-occupiers' housing costs, rose to **3.6%**." },
        { t: "p", text: "Motor fuel was the main factor. The average price of petrol rose **8.2p** a litre between August and September to **169.5p** — the highest since August 2022 — and diesel hit its highest since July 2022. Transport made the largest upward contribution, while restaurants and hotels pulled the other way. Goods inflation rose to 3.2%; food inflation held at 1.3%." },
        { t: "p", text: "The Bank of England, which held at 3.75% in September by a 6–3 vote and forecast inflation above 4% early next year, had no October meeting. Its next decision was due on 5 November — with the government's Budget also approaching." },
        { t: "fiveq",
          happened: "UK CPI rose to 3.5% on the highest petrol prices since 2022.",
          matters: "It strengthens the case for the three BoE members who already want to hike.",
          benefits: "Fuel retailers and producers.",
          hurt: "Drivers, hauliers and the Treasury's Budget arithmetic.",
          takeaway: "The UK has caught up with the rest of Europe's energy inflation." },
      ],
      right: [
        { t: "chart", title: "UK CPI inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "June", value: 2.6, tone: "muted" }, { label: "July", value: 2.9, tone: "blue" }, { label: "August", value: 3.1, tone: "violet" }, { label: "September", value: 3.5, tone: "gold" } ],
          source: "ONS, Jul–Oct 2026." },
        { t: "stats", items: [{ value: "169.5p", label: "Average petrol price, Sep — highest since Aug 2022", tone: "red" }, { value: "3.6%", label: "CPIH, September", tone: "violet" }] },
        { t: "sidebar", title: "Fuel duty and inflation", text: "Pump prices include a fixed duty plus VAT. Because VAT is a percentage, a rise in oil prices is amplified at the pump — one reason fuel moves UK inflation so quickly." },
      ],
    },

    // ── 12 JAPAN ─────────────────────────────────────────────────────────
    {
      section: "Region · Japan", toc: "Japan",
      kicker: "Region · Japan",
      title: "A hawkish hold in Tokyo",
      deck: "The Bank of Japan paused after September's hike — and said underlying inflation has reached its goal.",
      left: [
        { t: "lead", text: "On 30 October the Bank of Japan held its policy rate at **1.25%**, the highest since 1995, by an **8–1** vote. Hajime Takata dissented, again preferring a hike. The Bank stated that underlying inflation has reached levels consistent with its 2% price target — a notable shift in language." },
        { t: "p", text: "It also upgraded its inflation outlook and raised its fiscal 2026 real GDP growth forecast by a tenth to **0.7%**. Tokyo's core inflation, a leading indicator for the nation, well exceeded 2% in October." },
        { t: "p", text: "The yen firmed after the decision, touching about **157.9** per dollar. ING said it now expects the next hikes in December and in March or April. The BoJ's caution continues to frustrate yen bulls: even at 1.25%, Japanese rates sit far below America's 3.75–4.00%." },
        { t: "fiveq",
          happened: "The BoJ held at 1.25% (8–1) and said underlying inflation is consistent with its target.",
          matters: "It's the clearest signal yet that Japan's deflation era is over.",
          benefits: "Savers and banks; the yen, modestly.",
          hurt: "Borrowers and a highly indebted government, as more hikes approach.",
          takeaway: "Japan has hit its inflation goal — now it has to decide how far to raise rates." },
      ],
      right: [
        { t: "chart", title: "BoJ policy rate, 2026 (%)", dot: "red", unit: "%", decimals: 2, data: [
          { label: "June", value: 1.0, tone: "muted" }, { label: "September", value: 1.25, tone: "gold" }, { label: "October (hold)", value: 1.25, tone: "blue" } ],
          source: "Bank of Japan; Newsquawk; Trading Economics." },
        { t: "stats", items: [{ value: "0.7%", label: "BoJ FY2026 growth forecast (+0.1)", tone: "green" }, { value: "~157.9", label: "Yen per $ after decision", tone: "gold" }] },
        { t: "sidebar", title: "Underlying inflation", text: "Measures that strip out volatile items to reveal the trend. The BoJ's statement that underlying inflation is now consistent with 2% matters more than any single month's headline number." },
      ],
    },

    // ── 13 CHINA ─────────────────────────────────────────────────────────
    {
      section: "Region · China", toc: "China",
      kicker: "Region · China",
      title: "Exports carry another quarter",
      deck: "China beat its growth forecast in the third quarter — almost entirely thanks to selling to the rest of the world.",
      left: [
        { t: "lead", text: "China's economy grew **4.5%** year-on-year in the third quarter, the statistics bureau said on 19 October — up from 4.3% in the second quarter and slightly above the 4.4% expected. Growth for the first nine months was **4.6%**, keeping Beijing on track for its 4.5–5.0% target. Quarter-on-quarter growth was 1.2%." },
        { t: "p", text: "September's data were firmer: industrial output rose **5.5%** and retail sales **1.1%**, up from August's 0.4%. But fixed-asset investment fell **7.2%** in the first nine months, and household consumption contributed just 2.1 points to growth — the weakest contribution since late 2022. Reporting credited exports for most of the beat." },
        { t: "p", text: "October's figures, released in mid-November, showed retail sales growth slipping back to **0.4%** — a reminder that September's stimulus-driven bounce in sentiment hadn't yet reached shoppers." },
        { t: "fiveq",
          happened: "Q3 GDP grew 4.5% (beat 4.4%), driven by exports; consumption's contribution hit a 2022 low.",
          matters: "China's reliance on exports adds to trade tensions and global price competition.",
          benefits: "Chinese exporters and buyers of cheap Chinese goods.",
          hurt: "Competing manufacturers abroad; Chinese households facing weak income growth.",
          takeaway: "China is hitting its targets — by selling to the world, not to itself." },
      ],
      right: [
        { t: "chart", title: "China real GDP, 2026 (y/y %)", dot: "red", unit: "%", data: [
          { label: "Q1", value: 5.0, tone: "muted" }, { label: "Q2", value: 4.3, tone: "red" }, { label: "Q3", value: 4.5, tone: "gold" }, { label: "Jan–Sep", value: 4.6, tone: "blue" } ],
          source: "National Bureau of Statistics of China, 19 Oct 2026; CGTN; Kuwait Times." },
        { t: "chart", type: "hbars", title: "September activity (y/y %)", dot: "blue", data: [
          { label: "Ind. output", value: 5.5, tone: "green" }, { label: "Retail sales", value: 1.1, tone: "gold" }, { label: "FAI (Jan–Sep)", value: -7.2 } ], source: "NBS; IndexBox." },
        { t: "sidebar", title: "Net exports", text: "Exports minus imports. When a country's growth relies on net exports, it depends on others' demand — and on others tolerating its trade surplus." },
      ],
    },

    // ── 14 INDIA ─────────────────────────────────────────────────────────
    {
      section: "Region · India", toc: "India",
      kicker: "Region · India",
      title: "India turns hawkish",
      deck: "The RBI raised rates for the first time since 2023 — and changed its stance to signal more could follow.",
      left: [
        { t: "lead", text: "On 7 October the Reserve Bank of India's Monetary Policy Committee raised the repo rate by 25 basis points to **5.50%**, unanimously. The standing deposit facility moved to 5.25%; the marginal standing facility and bank rate stayed at 5.75%." },
        { t: "p", text: "More striking was the change in stance, by a 4–2 majority, from neutral to **\"calibrated tightening\"** — a phrase the MPC last used in October 2018, before switching back to neutral in February 2019. It signals that the next move can only be another hike or a pause, not a cut." },
        { t: "p", text: "Governor Sanjay Malhotra cited a worsening inflation outlook and fresh global risks. August CPI had already reached 4.82%, and inflation was showing signs of broadening. Growth gives the RBI room: the IMF's October outlook put India's growth at **7.0%** in both 2026 and 2027 — the fastest of any major economy." },
        { t: "fiveq",
          happened: "The RBI hiked to 5.50% and switched to 'calibrated tightening' (4–2).",
          matters: "Even the world's fastest-growing big economy is now tightening against imported inflation.",
          benefits: "Indian savers; the rupee, at the margin.",
          hurt: "Borrowers and rate-sensitive sectors such as housing and autos.",
          takeaway: "India has the growth to absorb higher rates — and decided to use it." },
      ],
      right: [
        { t: "chart", title: "RBI repo rate, 2026 (%)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "June", value: 5.25, tone: "muted" }, { label: "August", value: 5.25, tone: "muted" }, { label: "7 October", value: 5.5, tone: "gold" } ],
          source: "Reserve Bank of India; Moneylife; PSU Connect." },
        { t: "stats", items: [{ value: "7.0%", label: "IMF India growth, 2026 & 2027", tone: "green" }, { value: "2018", label: "Last time the RBI used this stance", tone: "gold" }] },
        { t: "sidebar", title: "Policy stance", text: "Alongside the rate, many central banks announce a stance — accommodative, neutral or tightening — that guides expectations about the direction of future moves." },
      ],
    },

    // ── 15 MIDDLE EAST ───────────────────────────────────────────────────
    {
      section: "Region · Middle East", toc: "Middle East",
      kicker: "Region · Middle East",
      title: "Tankers, mines and refineries",
      deck: "The war's reach extended in October — from the strait to Saudi oil facilities.",
      left: [
        { t: "lead", text: "October brought attacks on several fronts. On 14 October Saudi Arabia reported a Houthi attack on Saudi Aramco in Dhahran; Brent settled at **$106.06**. By 22 October, after further attacks on Saudi energy and transport infrastructure, Brent had reached about **$111**." },
        { t: "p", text: "At sea, Iranian state media claimed that ships struck naval mines south of the Strait of Hormuz — claims we could not independently confirm. On 30 October the UK Maritime Trade Operations agency reported that a tanker in the strait had been struck by explosive devices attached from a small boat. Brent's December contract closed that day at **$117.64**." },
        { t: "p", text: "One surprise: according to two of three ship-tracking firms, Saudi Arabia exported more crude in October than in September despite the attacks. The IEA warned, however, that fresh strikes on Saudi infrastructure threatened the recovery in supply. Brent is now up more than 80% in 2026." },
        { t: "fiveq",
          happened: "Attacks hit Saudi facilities and Hormuz shipping; Brent rose to $117.64.",
          matters: "The conflict is now threatening the Gulf's alternative supply routes, not just the strait.",
          benefits: "Producers far from the Gulf — the US, Brazil, Norway, Guyana.",
          hurt: "Saudi Arabia's economy (see p.29) and every oil importer.",
          takeaway: "Each month the war finds a new way to raise the price of energy." },
      ],
      right: [
        { t: "chart", title: "Brent in October ($/bbl)", dot: "red", data: [
          { label: "End-Sep", value: 103.5, display: "$103.50", tone: "muted" }, { label: "14 Oct", value: 106.06, display: "$106.06", tone: "gold" }, { label: "22 Oct", value: 111, display: "~$111", tone: "violet" }, { label: "30 Oct", value: 117.64, display: "$117.64", tone: "red" } ],
          source: "Nation Thailand; kurs.com.ua; Reuters via Tribune." },
        { t: "sidebar", title: "Naval mines", text: "Explosives placed in shipping lanes. Even unconfirmed reports of mines raise insurance costs and slow traffic, because clearing a sea lane takes weeks of specialist work." },
      ],
    },

    // ── 16 AFRICA ────────────────────────────────────────────────────────
    {
      section: "Region · Africa", toc: "Africa",
      kicker: "Region · Africa",
      title: "Nigeria's disinflation keeps going",
      deck: "Inflation fell again in Africa's most populous country, while East Africa felt the fuel shock.",
      left: [
        { t: "lead", text: "**Nigeria's** headline inflation fell to **14.63%** in September from 15.39% in August, the statistics bureau reported on 15 October — the fourth straight monthly decline. October's figure, published in November, fell further to **14.06%**. That vindicated, for now, the central bank's 350bp rate \"reset\" in September." },
        { t: "p", text: "Food remains the sore point: Nigerian food inflation was **19.13%** in October, higher than a year earlier, even as headline inflation eased. **Kenya** moved the other way, with inflation rising to **6.8%** in September — its highest in a year — on food, transport, housing, electricity and fuel costs." },
        { t: "p", text: "In **Ghana**, the central bank held its policy rate at **14%** at its September meeting, citing balanced risks. South Africa's Reserve Bank, after its September hike to 7.25%, was due to meet again in November." },
        { t: "fiveq",
          happened: "Nigeria's inflation fell to 14.63% (Sep) and 14.06% (Oct); Kenya's rose to 6.8%.",
          matters: "Oil exporters and importers in Africa are on opposite sides of the energy shock.",
          benefits: "Nigerian consumers and borrowers.",
          hurt: "Kenyan households facing dearer fuel and food.",
          takeaway: "Africa's inflation map is being redrawn by oil — exporters improving, importers squeezed." },
      ],
      right: [
        { t: "chart", title: "Nigeria headline inflation (%)", dot: "gold", decimals: 2, unit: "%", data: [
          { label: "August", value: 15.39, tone: "muted" }, { label: "September", value: 14.63, tone: "blue" }, { label: "October", value: 14.06, tone: "green" } ],
          source: "National Bureau of Statistics (Nigeria) via Nairametrics, Oct–Nov 2026." },
        { t: "stats", items: [{ value: "6.8%", label: "Kenya inflation, Sep — 1-year high", tone: "red" }, { value: "14%", label: "Bank of Ghana policy rate (held)", tone: "blue" }] },
        { t: "sidebar", title: "Food vs headline", text: "Headline inflation can fall while food inflation stays high, if other prices — such as fuel or transport — are easing. For the poorest households, food inflation matters most." },
      ],
    },

    // ── 17 LATAM ─────────────────────────────────────────────────────────
    {
      section: "Region · Latin America", toc: "Latin America",
      kicker: "Region · Latin America",
      title: "Electricity lifts Latin prices",
      deck: "Power bills pushed inflation up in Brazil and Mexico, testing central banks that had been easing or holding.",
      left: [
        { t: "lead", text: "**Brazil's** annual inflation rose to **4.58%** in September from 4.22%, above the 4.50% forecast and at the top of the central bank's 1.5–4.5% tolerance band. Residential electricity jumped **7.98%** in the month. That complicates the easing cycle that took the Selic to 13.75% in September; the next meeting was set for 3–4 November." },
        { t: "p", text: "**Mexico's** inflation rose to **3.62%** in the first half of October from 3.42% a month earlier, slightly above forecasts, with core at **3.78%**. Electricity (+18.5%) and air fares (+14.8%) led the increase — giving Banxico little reason to cut from 6.50% at its 5 November meeting." },
        { t: "p", text: "In **Argentina**, October's monthly inflation — published in November — came in at **2.2%**, above expectations, though core inflation eased to 1.5%, its lowest in about 15 months. BBVA Research raised its 2026 inflation forecast to 31%." },
        { t: "fiveq",
          happened: "Brazil's inflation reached 4.58%, Mexico's 3.62% (1H Oct), Argentina's monthly rate 2.2%.",
          matters: "Rising inflation ends the region's room to keep easing as the Fed tightens.",
          benefits: "Power producers; savers earning high real rates.",
          hurt: "Households facing higher utility bills.",
          takeaway: "Latin America's easing window is closing as energy costs reach the electricity bill." },
      ],
      right: [
        { t: "chart", title: "Latest inflation (y/y %)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "Mexico (1H Oct)", value: 3.62, tone: "blue" }, { label: "Mexico core", value: 3.78, tone: "violet" }, { label: "Brazil (Sep)", value: 4.58, tone: "red" } ],
          source: "IBGE via Trading Economics; INEGI via Excelsior; Rio Times." },
        { t: "stats", items: [{ value: "+7.98%", label: "Brazil residential electricity, Sep m/m", tone: "red" }, { value: "2.2%", label: "Argentina CPI, Oct m/m", tone: "gold" }] },
        { t: "sidebar", title: "Tolerance band", text: "Many inflation-targeting central banks allow a range around the target. Brazil's goal is 3% with a band of ±1.5 points; breaching the top triggers a formal explanation from the central bank." },
      ],
    },

    // ── 18 APAC ──────────────────────────────────────────────────────────
    {
      section: "Region · Asia-Pacific & Oceania", toc: "Asia-Pacific & Oceania",
      kicker: "Region · Asia-Pacific & Oceania",
      title: "Seoul pauses, with the door open",
      deck: "After two summer hikes, Korea's central bank waited — but made clear it wasn't done.",
      top: [
        { t: "cards", cols: 2, items: [
          { title: "🇰🇷 South Korea", dot: "gold", paras: ["On 22 October the Bank of Korea held its base rate at **3.00%**, unanimously — its first hold since May, after hikes in July and August.", "Governor Shin Hyun-song left the door open to a November move, depending on third-quarter GDP and October prices. Inflation was in the 2% range in September and expected back near 3% in October."], source: "Korea Times; InvestingLive; Trading Economics." },
          { title: "🇦🇺 Australia", dot: "blue", paras: ["The Reserve Bank of Australia had no October meeting after its 29 September hike to **4.60%** — its fourth increase of 2026 and the highest since 2011.", "Its next decision was due on 3 November, with the board keeping an explicit tightening bias."], source: "RBA via CommBank, Savings.com.au." },
        ] },
      ],
      left: [
        { t: "p", text: "Strong exports gave Korea room to pause: chip and technology shipments have held up despite the AI stock sell-off. But with energy prices still rising and the won under pressure from a strong dollar, the BoK framed October as a pause, not an end, to tightening." },
        { t: "fiveq",
          happened: "Korea held at 3.00% (unanimous) with a hawkish bias; Australia stayed at 4.60%.",
          matters: "Asia-Pacific central banks are holding at high levels, not easing.",
          benefits: "Korean exporters, supported by tech demand.",
          hurt: "Indebted households in both countries.",
          takeaway: "In Asia, October's pauses came with an asterisk: more hikes possible." },
      ],
      right: [
        { t: "chart", title: "Policy rates, end-October (%)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "BoK", value: 3.0, tone: "gold" }, { label: "RBA", value: 4.6, tone: "blue" }, { label: "BoJ", value: 1.25, tone: "red" } ], source: "Bank of Korea; RBA; Bank of Japan." },
        { t: "callout", title: "The through-line", tone: "blue", text: "No cuts anywhere in the region: high energy prices and a strong dollar keep every central bank on guard." },
      ],
    },

    // ── 19 STOCKS ────────────────────────────────────────────────────────
    {
      section: "Markets · Equities", toc: "Stock Markets",
      kicker: "Markets",
      title: "The great rotation",
      deck: "The headline indices fell. The average stock rose. And Apple overtook Nvidia.",
      left: [
        { t: "lead", text: "The S&P 500 slipped about **1%** in October, closing at **7,580** on the 30th, and the Nasdaq Composite fell between **5.3% and 6.0%** — its worst month since March 2025. Yet the equal-weight S&P 500 rose about **4.9%**: most stocks gained while the giants that dominate the index fell." },
        { t: "p", text: "The losses were concentrated in AI and mega-cap technology. Alphabet lost about $500 billion in market value on 29 October alone. AI-infrastructure \"neoclouds\" such as CoreWeave and Nebius lost more than 25% in a single week as investors questioned how the build-out is financed. The Nasdaq 100 fell about 6.7%." },
        { t: "p", text: "On 30 October Apple closed at a market value of about **$5.03 trillion**, edging past Nvidia at about $4.93 trillion to reclaim the title of world's most valuable company — a move attributed to investors seeking the relative safety of its cash flows amid AI-spending worries." },
        { t: "fiveq",
          happened: "Nasdaq fell 5–6%, S&P ~1%, but the equal-weight index rose ~4.9%; Apple passed Nvidia.",
          matters: "Market leadership is shifting from AI builders to cash-rich and smaller companies.",
          benefits: "Diversified investors; Apple; value and small-cap stocks.",
          hurt: "Holders of AI infrastructure stocks and mega-cap tech.",
          takeaway: "October flipped September: the giants fell and the rest of the market rose." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "October returns (%)", dot: "violet", data: [
          { label: "Equal-wt S&P", value: 4.9 }, { label: "S&P 500", value: -1.0, display: "≈–1%" }, { label: "Nasdaq Comp.", value: -5.3 }, { label: "Nasdaq 100", value: -6.7 }, { label: "CoreWeave (1 wk)", value: -25, display: "> –25%" } ],
          source: "Vested Finance; InvestingLive; The Wealth Advisor; Business Times. Figures vary by source." },
        { t: "stats", items: [{ value: "$5.03T", label: "Apple, 30 Oct — now the most valuable", tone: "gold" }] },
        { t: "sidebar", title: "Neoclouds", text: "Newer cloud companies that rent out AI computing power, often financed with heavy borrowing. Because they rely on debt and a few big customers, they're among the most sensitive to doubts about AI returns." },
      ],
    },

    // ── 20 BONDS ─────────────────────────────────────────────────────────
    {
      section: "Markets · Fixed Income", toc: "Bond Markets",
      kicker: "Markets · Bonds",
      title: "A 24-year high — then a flight to safety",
      deck: "Treasury yields peaked early in October and fell sharply as the tech sell-off sent investors back to bonds.",
      left: [
        { t: "lead", text: "The US 10-year Treasury yield reached about **5.35%** on 8 October — a fresh 24-year high, extending September's sell-off. From there the trend reversed. As the AI sell-off deepened, investors bought Treasuries as a safe haven, and the 10-year fell to a one-month low." },
        { t: "p", text: "Measures of the month-end level vary: Tradeweb put the 10-year at **4.91%** at the close of October, down 25 basis points on the month; Trading Economics described a fall of about 36bp, with the yield around 5% on 30 October. Either way, October was the first month of falling yields since the summer." },
        { t: "p", text: "The Fed's hold helped short-dated bonds too: the 2-year yield fell to about **4.71%** after the 28 October decision. Lower yields eased pressure on borrowers — but the trigger, a stock-market sell-off, was hardly a comfortable reason." },
        { t: "fiveq",
          happened: "The 10-yr hit ~5.35% (8 Oct), then fell to ~4.9–5.0% by month-end.",
          matters: "Bonds acted as a safe haven again, cushioning the equity sell-off.",
          benefits: "Bond holders who bought near the peak.",
          hurt: "Those who sold bonds in early October's panic.",
          takeaway: "When stocks wobble, Treasuries still do their job." },
      ],
      right: [
        { t: "chart", title: "US 10-year Treasury yield (%)", dot: "blue", unit: "%", decimals: 2, data: [
          { label: "8 Oct peak", value: 5.35, tone: "red" }, { label: "End-Oct (Tradeweb)", value: 4.91, tone: "blue" }, { label: "2-yr after Fed", value: 4.71, tone: "violet" } ],
          source: "Cboe; Tradeweb; InvestingLive; Trading Economics." },
        { t: "sidebar", title: "Flight to safety", text: "When investors fear losses in risky assets, they move money into the safest available — usually government bonds. The surge in demand pushes bond prices up and yields down." },
        { t: "analysis", text: "October showed the bond market's two personalities: inflation-scared at the start of the month, recession-scared by the end." },
      ],
    },

    // ── 21 CURRENCIES ────────────────────────────────────────────────────
    {
      section: "Markets · Currencies", toc: "Currencies",
      kicker: "Markets · FX",
      title: "The dollar beats the G10",
      deck: "The dollar strengthened against every other major currency in October.",
      left: [
        { t: "lead", text: "The dollar rose against all its Group-of-10 peers in October, according to Bloomberg Línea, with the yen and sterling among the biggest losers. The dollar index ended the week of 30 October at **101.88**, near the 17-month highs reached at the start of the month." },
        { t: "p", text: "By 30 October the euro had slipped to about **$1.1160**, sterling stood near **$1.339**, and the dollar bought about **157.6** yen. Early in the month the dollar hit a 17-month high against the euro as the global bond sell-off lifted US yields more than European ones." },
        { t: "p", text: "A strong dollar during a period of falling Treasury yields is a sign of safe-haven demand: in a stock-market sell-off, investors worldwide still reach for dollars. That makes energy, priced in dollars, even more expensive for importers paying in euros, yen or rupees." },
        { t: "fiveq",
          happened: "The dollar rose against all G10 currencies; the index ended near 101.9.",
          matters: "A strong dollar adds to imported inflation everywhere else.",
          benefits: "US consumers buying imports; Americans abroad.",
          hurt: "Oil importers; emerging markets with dollar debt.",
          takeaway: "In a risk-off month, the dollar is still the world's safe harbour." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Currency marks, 30 October", dot: "violet", rows: [
          ["Dollar index (week close)", "101.88"], ["EUR/USD", "~1.1160"], ["GBP/USD", "~1.3392"], ["USD/JPY", "~157.55"] ],
          source: "RTT News; Bloomberg Línea; Khaleej Times." },
        { t: "sidebar", title: "G10 currencies", text: "The ten most traded currencies: the US, Canadian, Australian and New Zealand dollars, the euro, yen, pound, Swiss franc, Swedish krona and Norwegian krone." },
      ],
    },

    // ── 22 OIL ───────────────────────────────────────────────────────────
    {
      section: "Commodities · Energy", toc: "Oil & Energy",
      kicker: "Commodities",
      title: "Four months up, $117 and counting",
      deck: "Brent extended its rally to a fourth straight month — and is now up more than 80% in 2026.",
      left: [
        { t: "lead", text: "Brent's December contract closed at **$117.64** a barrel on 30 October, up about **13.6%** for the month (Trading Economics put the gain at more than 15%). It was the fourth consecutive monthly gain: from about $73 at the end of June, Brent has risen roughly 60% in four months." },
        { t: "p", text: "The rally was driven by escalating attacks: on Saudi facilities (14 and 22 October), on shipping in and near Hormuz (including the 30 October tanker strike), and by Iranian claims of mines. Each pushed traders to price higher risk of supply losses." },
        { t: "p", text: "The physical market was tighter than the futures. Even with the US strategic reserve drawdown completed in September and Saudi exports recovering, supply has not kept pace. The IMF's assumption that Hormuz reopens only in March 2027 implies elevated prices through the winter." },
        { t: "fiveq",
          happened: "Brent rose ~13.6% to $117.64, its fourth monthly gain and up 80%+ in 2026.",
          matters: "At these levels oil is a major drag on growth and driver of inflation worldwide.",
          benefits: "Non-Gulf producers and their governments' revenues.",
          hurt: "Importers, airlines, farmers and central banks trying to cut inflation.",
          takeaway: "The oil shock of 2026 is now one of the largest of the century." },
      ],
      right: [
        { t: "chart", title: "Brent month-end, 2026 ($/bbl)", dot: "red", data: [
          { label: "June", value: 72.92, display: "$73", tone: "muted" }, { label: "July", value: 90.12, display: "$90", tone: "gold" }, { label: "September", value: 103.5, display: "$104", tone: "violet" }, { label: "October", value: 117.64, display: "$118", tone: "red" } ],
          source: "Reuters; priceofoil.com; The Star; Nation Thailand. August close not shown (~mid-$80s)." },
        { t: "stats", items: [{ value: "+13.6%", label: "Brent, October", tone: "red" }, { value: ">80%", label: "Brent's rise in 2026", tone: "gold" }] },
        { t: "sidebar", title: "Risk premium", text: "The extra amount buyers pay above the cost of supply to insure against disruption. In October, every new attack added to it — even when barrels were still flowing." },
      ],
    },

    // ── 23 GOLD ──────────────────────────────────────────────────────────
    {
      section: "Commodities · Gold", toc: "Gold & Precious Metals",
      kicker: "Commodities",
      title: "Gold slips below $4,000",
      deck: "In a war-torn month, the traditional safe haven failed to shine.",
      left: [
        { t: "lead", text: "Gold fell below **$4,000** an ounce in late October for the first time since July, closing one Friday at **$3,995.81**. That left it well over 25% below its January peak above $5,400. Analysts noted a historic oddity: both gold and bitcoin — 2025's favourite safe havens — ranked among 2026's worst-performing major assets." },
        { t: "p", text: "Why no safe-haven bid during a war? Rate expectations. With central banks hiking and the Fed signalling more, real interest rates stayed high through early October, raising the opportunity cost of holding a metal that pays nothing. The dollar's strength added pressure, since gold is priced in dollars." },
        { t: "p", text: "The flight to safety in the second half of October went to Treasuries and the dollar, not gold — a reminder that in this cycle, investors seeking safety have preferred assets that pay a return." },
        { t: "fiveq",
          happened: "Gold fell below $4,000 for the first time since July despite war and market turmoil.",
          matters: "Gold's haven role is being challenged by high real yields and a strong dollar.",
          benefits: "Buyers accumulating at lower prices, including central banks.",
          hurt: "Holders who bought near January's peak.",
          takeaway: "In 2026, the safest asset has been the one that pays interest." },
      ],
      right: [
        { t: "chart", title: "Gold, 2026 ($/oz)", dot: "gold", data: [
          { label: "Jan peak", value: 5405, display: ">$5,400", tone: "violet" }, { label: "End-Aug", value: 4437, display: "$4,437", tone: "gold" }, { label: "Late Oct", value: 3996, display: "$3,996", tone: "red" } ],
          source: "Gulf News; Sprott; Mitrade/Bilello data." },
        { t: "sidebar", title: "Safe haven", text: "An asset expected to hold its value in a crisis. Gold, the dollar, Treasuries and the Swiss franc are classic havens — but which one investors choose depends on interest rates and the nature of the crisis." },
      ],
    },

    // ── 24 CRYPTO ────────────────────────────────────────────────────────
    {
      section: "Markets · Digital Assets", toc: "Cryptocurrency",
      kicker: "Digital assets",
      title: "A red 'Uptober'",
      deck: "Bitcoin's traditionally strong month turned negative for the second year running.",
      left: [
        { t: "lead", text: "Bitcoin fell about **7.3%** in October, according to Forklog's month-end review — the second red October in a row for a month crypto traders like to call \"Uptober\". It followed three straight monthly gains from July to September." },
        { t: "p", text: "Institutional flows reversed. Crypto ETFs as a group lost about **$2.48 billion** in October, after spot bitcoin ETFs took in $2.65 billion in September and $3.52 billion in August. The AI sell-off and broader risk aversion weighed on all speculative assets." },
        { t: "p", text: "Bitcoin and gold — both pitched as hedges against currency debasement — fell in the same month, adding to commentary that 2026 has been a hard year for \"alternative\" safe havens. When yields are high and the dollar strong, assets that pay nothing struggle." },
        { t: "fiveq",
          happened: "Bitcoin fell ~7.3% in October; crypto ETFs saw ~$2.5bn of outflows.",
          matters: "Crypto now trades with risk appetite, not as a war hedge.",
          benefits: "Buyers waiting for lower prices.",
          hurt: "Investors who bought the late-summer rally.",
          takeaway: "Bitcoin's August narrative — digital gold — faded as gold itself fell." },
      ],
      right: [
        { t: "chart", title: "Bitcoin monthly returns, 2026 (%)", dot: "violet", unit: "%", data: [
          { label: "Jul", value: 7.35, display: "~+7%", tone: "blue" }, { label: "Aug", value: 24.5, display: "~+25%", tone: "green" }, { label: "Sep", value: 6.3, display: "+6.3%", tone: "blue" }, { label: "Oct", value: -7.3, tone: "red" } ],
          source: "Binance; CoinGlass; Messari; Forklog." },
        { t: "stats", items: [{ value: "–$2.48bn", label: "Crypto ETF flows, October", tone: "red" }] },
        { t: "sidebar", title: "Risk-on, risk-off", text: "When investors feel confident, they buy volatile assets (risk-on); when nervous, they sell them (risk-off). Bitcoin increasingly behaves like a risk-on asset — falling with tech stocks." },
      ],
    },

    // ── 25 AI ────────────────────────────────────────────────────────────
    {
      section: "Theme · Artificial Intelligence", toc: "Artificial Intelligence",
      kicker: "Theme of the cycle",
      title: "The AI bill comes due",
      deck: "October was the month investors stopped asking whether AI demand is real — and started asking who pays for it.",
      left: [
        { t: "lead", text: "Three things happened to AI in October. The IMF credited AI investment with keeping global growth afloat. US GDP showed equipment investment surging about 21%, much of it AI-related. And the stock market punished the companies doing the spending." },
        { t: "p", text: "The sharpest blow fell on Alphabet, whose shares dropped about 12.6% on 29 October (see Company Spotlight, p.28). AI-infrastructure \"neoclouds\" fell further: CoreWeave and Nebius each lost more than 25% in a single week as investors questioned the financing behind the boom — weak free cash flow, heavy borrowing and dependence on a few customers." },
        { t: "p", text: "The IMF's October report made the macro point explicitly, warning of growing risks from rising debt, including borrowing related to AI. With long-term yields near 24-year highs earlier in the month, financing a data-centre build-out became markedly more expensive — and investors began demanding proof of returns, not just promises of demand." },
        { t: "fiveq",
          happened: "AI spending lifted GDP while AI spenders' shares fell; neoclouds dropped 25%+ in a week.",
          matters: "AI is now big enough to matter for growth, markets and financial stability.",
          benefits: "Companies selling AI services with strong cash flow.",
          hurt: "Highly leveraged AI builders and their lenders.",
          takeaway: "The AI boom has moved from a demand story to a financing story." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "AI-related moves, October (%)", dot: "violet", data: [
          { label: "US equipment inv. (Q3, ann.)", value: 20.9, display: "+20.9%", tone: "green" }, { label: "Alphabet (29 Oct)", value: -12.6 }, { label: "CoreWeave (1 week)", value: -25, display: "> –25%" } ],
          source: "BEA via TheStreet; Fox Business; The Wealth Advisor." },
        { t: "sidebar", title: "Free cash flow", text: "Cash from operations minus capital spending. Negative free cash flow means a company must borrow or raise equity to keep investing — fine in a boom, risky if returns disappoint." },
        { t: "callout", title: "Key takeaway", tone: "blue", text: "Markets now reward AI companies that make money from AI — and punish those that only spend on it." },
      ],
    },

    // ── 26 TRADE ─────────────────────────────────────────────────────────
    {
      section: "Theme · Global Trade", toc: "Global Trade",
      kicker: "The connective tissue",
      title: "Tariffs after the courts",
      deck: "A year of legal battles has reshaped America's tariff wall — but not lowered it much.",
      left: [
        { t: "lead", text: "Three court decisions frame US trade policy in late 2026. In **February**, the Supreme Court held that the emergency-powers law (IEEPA) does not authorise tariffs, wiping out the 10% \"fentanyl\" and reciprocal duties on Chinese goods. In **June**, it declined to review the first-term **Section 301** tariffs on China, leaving them — and more than $35 billion a year in duties — in place." },
        { t: "p", text: "In between, the administration rebuilt its tariff regime on other foundations: a temporary **Section 122** surcharge (which allows up to 15% for 150 days), then from 24 July new **Section 301** tariffs of 10–12.5% on 60 economies. Further Section 301 investigations, including one into China stemming from the first-term trade deal, could justify steeper duties." },
        { t: "p", text: "Meanwhile China kept exporting. Its third-quarter growth beat forecasts largely because of exports, even as its households spent less. The pattern — American tariffs, Chinese export strength — means trade frictions are likely to rise again." },
        { t: "fiveq",
          happened: "The courts struck down IEEPA tariffs but upheld Section 301; new Section 301 duties replaced them.",
          matters: "The legal basis changed; the level of protection largely didn't.",
          benefits: "US producers shielded by tariffs.",
          hurt: "US importers and consumers; exporters facing retaliation.",
          takeaway: "America's tariffs have proved more durable than the laws first used to impose them." },
      ],
      right: [
        { t: "chart", type: "kv", title: "The 2026 tariff timeline", dot: "blue", rows: [
          ["20 Feb", "Supreme Court: IEEPA can't impose tariffs"], ["Spring", "Section 122 surcharge (max 15%, 150 days)"], ["June", "Court leaves China Section 301 tariffs in place"], ["24 Jul", "New Section 301 tariffs, 10–12.5%, 60 economies"], ["Ongoing", "Further 301 probes incl. China"] ],
          source: "DLA Piper; STR; Bloomberg Law; NBC; CFR; USTR." },
        { t: "sidebar", title: "IEEPA", text: "The International Emergency Economic Powers Act lets a president regulate transactions during a declared national emergency. The Supreme Court ruled it does not extend to imposing tariffs, which the Constitution assigns to Congress." },
      ],
    },

    // ── 27 DASHBOARD ─────────────────────────────────────────────────────
    {
      section: "Macro Dashboard", toc: "Macro Dashboard",
      kicker: "The four gauges", kickerTone: "blue",
      title: "Macro Dashboard",
      deck: "Inflation, rates, growth and jobs — October's readings side by side.",
      full: [
        { t: "gauges", items: [
          { title: "Inflation (latest)", dot: "gold", values: [{ value: "4.0%", label: "Euro area, Oct flash", tone: "red" }, { value: "3.7%", label: "US CPI, Sep", tone: "gold" }, { value: "3.5%", label: "UK CPI, Sep" }, { value: "4.58%", label: "Brazil, Sep" }], source: "Eurostat; BLS; ONS; IBGE." },
          { title: "Policy rates", dot: "blue", values: [{ value: "3.75–4.00%", label: "Fed (hold, 10–2)", tone: "blue" }, { value: "5.50%", label: "RBI (+25bp)", tone: "gold" }, { value: "2.50%", label: "ECB (hold)" }], source: "Central banks, October 2026." },
          { title: "Growth", dot: "green", values: [{ value: "3.4%", label: "US Q3 (ann.)", tone: "green" }, { value: "4.5%", label: "China Q3 y/y" }, { value: "0.4%", label: "Euro area Q3 q/q" }, { value: "3.1%", label: "World 2026 (IMF)", tone: "green" }], source: "BEA; NBS; Eurostat; IMF." },
          { title: "US labour market", dot: "violet", values: [{ value: "+29k", label: "Payrolls, Sep", tone: "red" }, { value: "4.2%", label: "Unemployment, Sep" }, { value: "3.0%", label: "Wage growth" }], source: "BLS, released 2 October 2026." },
        ] },
        { t: "callout", title: "How the four fit together in October", text: "Growth surprised on the upside in the US, China and Europe, but inflation rose almost everywhere as oil passed $110. Central banks mostly paused after September's hikes — with hawkish dissents — and the US job market stayed soft. Strong output, weak hiring and rising prices: a combination that leaves policymakers little room for error." },
      ],
    },

    // ── 28 COMPANY ───────────────────────────────────────────────────────
    {
      section: "Company Spotlight", toc: "Company Spotlight — Alphabet",
      kicker: "Company spotlight",
      title: "Alphabet's $500 billion day",
      deck: "Google's parent doubled its cloud revenue — and suffered one of the largest one-day losses in market history.",
      left: [
        { t: "lead", text: "On 29 October Alphabet's shares fell about **12.6%** after its quarterly results, erasing roughly **$500 billion** of market value — reported as the second-largest single-day loss in stock-market history (one outlet put it above $550 billion and called it the company's worst day ever)." },
        { t: "p", text: "The business itself was growing fast. Google Cloud revenue more than doubled, up **103%** to **$30.7 billion**. But Alphabet said it expects capital spending of **$195–205 billion** this year, rising significantly in 2027, and reported **negative free cash flow of about $9.1 billion** for the quarter as infrastructure investment outran operating cash." },
        { t: "p", text: "Investors also flagged weaker-than-hoped search results, raising the question of whether AI chatbots are eating into Google's core advertising business. One analysis framed the sell-off not as a loss of faith in AI, but as a demand for proof that hundreds of billions in spending will earn a return." },
        { t: "fiveq",
          happened: "Alphabet fell ~12.6% (~$500bn) despite cloud revenue doubling, on $195–205bn capex and negative FCF.",
          matters: "It marked the moment AI spending itself became a reason to sell.",
          benefits: "Rivals and suppliers; investors who rotated to cash-rich firms like Apple.",
          hurt: "Alphabet shareholders and index funds heavily weighted to it.",
          takeaway: "Growth isn't enough when spending grows faster — the market wants the return, not just the revenue." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Alphabet, Q3 2026", dot: "red", rows: [
          ["Share move, 29 Oct", "≈ –12.6%"], ["Market value lost", "≈ $500bn"], ["Google Cloud revenue", "$30.7bn (+103%)"], ["2026 capex guide", "$195–205bn"], ["Quarterly free cash flow", "≈ –$9.1bn"] ],
          source: "Fox Business; NBC; Newstribune; InvestingCube — 29–30 Oct 2026." },
        { t: "quote", text: "The sell-off wasn't a verdict on AI. It was an invoice.", by: "The Financial Frontier" },
        { t: "sidebar", title: "Market capitalisation", text: "A company's share price times its number of shares. Because the biggest companies are worth trillions, a 12% move can erase more value in a day than most companies are worth in total." },
      ],
    },

    // ── 29 COUNTRY ───────────────────────────────────────────────────────
    {
      section: "Country Spotlight", toc: "Country Spotlight — Saudi Arabia",
      kicker: "Country spotlight",
      title: "Saudi Arabia: high prices, lost barrels",
      deck: "The world's biggest oil exporter is shrinking in a year of $100 oil — because it can't ship enough of it.",
      left: [
        { t: "lead", text: "In its October outlook, the IMF cut Saudi Arabia's 2026 forecast by five points, from **1.7% growth** to a **3.3% contraction** — the largest downgrade of any major economy. It expects a strong rebound of **7.9%** in 2027 if Hormuz reopens as assumed in March." },
        { t: "p", text: "The damage was visible in the summer data. Saudi GDP fell **4.8%** in the second quarter, its sharpest contraction since the pandemic, as oil activity plunged **24.7%** with the strait's closure. Higher prices only partly offset lower export volumes. October added direct attacks on Saudi facilities, including a Houthi strike on Saudi Aramco in Dhahran." },
        { t: "p", text: "The kingdom has cushions. The IMF credits its diversified export routes and logistics with limiting the damage, and says authorities redirected shipments to ease bottlenecks; ship-trackers showed exports rising in October. Non-oil activity has held up, and inflation is forecast at just 1.9%." },
        { t: "fiveq",
          happened: "The IMF cut Saudi 2026 growth to –3.3%; Q2 GDP fell 4.8% as oil activity dropped 24.7%.",
          matters: "Even the biggest oil producer loses when it can't get barrels to market.",
          benefits: "Saudi non-oil sectors; producers elsewhere filling the gap.",
          hurt: "Saudi public finances and oil-dependent jobs.",
          takeaway: "In a strait crisis, high prices can't compensate for barrels that can't move." },
      ],
      right: [
        { t: "chart", title: "Saudi Arabia GDP (%)", dot: "gold", data: [
          { label: "Q2 2026 (y/y)", value: -4.8, tone: "red" }, { label: "IMF 2026 (Jul)", value: 1.7, tone: "muted" }, { label: "IMF 2026 (Oct)", value: -3.3, tone: "red" }, { label: "IMF 2027", value: 7.9, tone: "green" } ],
          source: "GASTAT via Semafor and The National; IMF via Saudi Gazette." },
        { t: "stats", items: [{ value: "–24.7%", label: "Oil activity, Q2 2026", tone: "red" }, { value: "1.9%", label: "IMF 2026 inflation forecast", tone: "blue" }] },
        { t: "sidebar", title: "Volume vs price", text: "Export revenue is price times quantity. When a disruption cuts quantity sharply, even a big rise in price can leave revenue — and GDP — lower." },
      ],
    },

    // ── 30 CHARTS ────────────────────────────────────────────────────────
    {
      section: "Charts That Explain the Month", toc: "Charts That Explain the Month",
      kicker: "Data",
      title: "Three charts that explain October",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Strong growth", dot: "green", text: "US 3.4%, China 4.5%, euro area +0.4%." },
          { title: "2 · Rising prices", dot: "red", text: "Euro 4.0%, US 3.7%, UK 3.5%." },
          { title: "3 · Falling giants", dot: "violet", text: "Equal-weight +4.9% vs Nasdaq –5.3%." },
        ] },
      ],
      full: [
        { t: "g2", left: [
          { t: "chart", title: "Chart 1 · Q3 growth (%)", dot: "green", unit: "%", data: [{ label: "US (ann.)", value: 3.4, tone: "green" }, { label: "China (y/y)", value: 4.5, tone: "red" }, { label: "Euro (q/q)", value: 0.4, tone: "blue" }], source: "BEA; NBS; Eurostat." },
          { t: "chart", title: "Chart 2 · Latest inflation (%)", dot: "red", unit: "%", data: [{ label: "Euro area", value: 4.0, tone: "red" }, { label: "US", value: 3.7, tone: "gold" }, { label: "UK", value: 3.5, tone: "violet" }], source: "Eurostat; BLS; ONS." },
        ], right: [
          { t: "chart", title: "Chart 3 · October returns (%)", dot: "violet", unit: "%", data: [{ label: "Equal-wt", value: 4.9, tone: "green" }, { label: "S&P 500", value: -1.0, display: "≈–1%", tone: "blue" }, { label: "Nasdaq", value: -5.3, tone: "red" }], source: "Vested Finance; InvestingLive." },
          { t: "callout", title: "Read together", text: "Chart 1 says the economy is growing. Chart 2 says it's doing so with too much inflation — which means higher rates for longer. Chart 3 shows who pays: the most expensive, most rate-sensitive companies, even as the broad market holds up." },
        ] },
        { t: "note", text: "All figures sourced from the institutions listed on p.36. Charts are drawn to the values shown and are not to a common scale." },
      ],
    },

    // ── 31 INFOGRAPHIC ───────────────────────────────────────────────────
    {
      section: "Infographic", toc: "Infographic: Where the Money Went",
      kicker: "The month at a glance",
      title: "Where the money went",
      deck: "Out of AI giants and crypto; into oil, Treasuries, the dollar and the rest of the stock market.",
      full: [
        { t: "g2", left: [
          { t: "flows", title: "The rotation of October", items: [
            { label: "Out of AI mega-caps", width: 70, dir: "out", tag: "Nasdaq –5%" },
            { label: "Out of neoclouds", width: 60, dir: "out", tag: "> –25% in a week" },
            { label: "Out of crypto & gold", width: 34, dir: "out", tag: "ETF outflows" },
            { label: "Into oil", width: 62, tag: "+13.6%" },
            { label: "Into Treasuries (late Oct)", width: 48, tag: "flight to safety" },
            { label: "Into equal-weight stocks", width: 40, tag: "+4.9%" } ],
            note: "Widths illustrate direction and rough scale, not measured flows." },
        ], right: [
          { t: "bignums", items: [
            { kicker: "Biggest number", value: "$500bn", label: "Alphabet's one-day loss in value" },
            { kicker: "Boldest move", value: "Feb 2027", label: "Lagarde's early exit from the ECB", tone: "blue" },
            { kicker: "Biggest risk", value: "$117.64", label: "Brent, 30 October", tone: "red" } ] },
        ] },
        { t: "strip", items: [{ value: "3.1%", label: "IMF world growth 2026" }, { value: "3.4%", label: "US Q3 GDP" }, { value: "4.0%", label: "Euro-area inflation" }, { value: "$5.03T", label: "Apple, new #1" }] },
      ],
    },

    // ── 32 EXPLAINER ─────────────────────────────────────────────────────
    {
      section: "Economic Explainer", toc: "Explainer: How GDP Is Built",
      kicker: "Economics, explained",
      title: "What's inside a GDP number?",
      deck: "America grew 3.4% last quarter. Here's how that figure is assembled — and why parts of it can flatter.",
      left: [
        { t: "lead", text: "Gross domestic product measures the value of everything an economy produces in a period. The most common way to add it up is by spending: **C + I + G + (X – M)** — consumption, investment, government purchases, plus exports minus imports." },
        { t: "p", text: "Each piece \"contributes\" to growth. In the third quarter, US consumers added about 2.5 points of the 3.4%, and investment about 3.3 points. Imports subtracted about 2.6 points. (The pieces don't sum exactly to the headline because of rounding and government and export contributions.)" },
        { t: "p", text: "One piece deserves caution: **inventories**. When firms produce goods they don't sell yet, the stockpile counts as investment — it added about 1.6 points in Q3. Inventories often reverse the next quarter, which is why economists also watch \"final sales to private domestic purchasers\", which excludes them. That measure grew 4.9% — strong, but a different story from inventory-driven growth." },
        { t: "p", text: "Finally, the headline is annualised: it shows what growth would be if the quarter's pace continued for a year. Europe and China usually report quarter-on-quarter or year-on-year rates instead — so the euro area's 0.4% and America's 3.4% aren't as far apart as they look." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "GDP = C + I + G + (X – M)", dot: "gold", steps: [
          { value: "C", label: "Consumers: +2.5 pts in Q3", tone: "blue" },
          { value: "I", label: "Investment: +3.3 pts (inventories +1.6)", tone: "green" },
          { value: "G", label: "Government purchases", tone: "violet" },
          { value: "X–M", label: "Imports subtracted 2.6 pts", tone: "red" } ], source: "BEA advance estimate, Q3 2026." },
        { t: "sidebar", title: "Annualised vs quarterly", text: "A 0.4% quarterly rise compounds to roughly 1.6% over a year. America's 3.4% annualised equals about 0.84% in the quarter — closer to Europe's 0.4% than the headline suggests." },
        { t: "callout", title: "The takeaway", text: "Read the components, not just the headline — and check whether growth came from customers or from warehouses." },
      ],
    },

    // ── 33 VOCAB ─────────────────────────────────────────────────────────
    {
      section: "Vocabulary Builder", toc: "Vocabulary",
      kicker: "Speak the language",
      title: "Ten terms from this issue",
      deck: "Every phrase below appeared in October's stories.",
      full: [
        { t: "terms", items: [
          { term: "Annualised rate", def: "A quarter's growth scaled up to a yearly pace (p.32)." },
          { term: "Inventories", def: "Unsold goods counted as investment in GDP (p.06)." },
          { term: "Calibrated tightening", def: "An RBI stance signalling only hikes or pauses ahead (p.14)." },
          { term: "Flight to safety", def: "Moving money into government bonds during market stress (p.20)." },
          { term: "Neocloud", def: "A newer, often debt-funded AI cloud provider (p.19)." },
          { term: "Free cash flow", def: "Operating cash minus capital spending (p.25)." },
          { term: "Seasonal adjustment", def: "Removing regular yearly patterns from data (p.07)." },
          { term: "Tolerance band", def: "The range around an inflation target (p.17)." },
          { term: "IEEPA", def: "The emergency-powers law the Supreme Court said can't impose tariffs (p.26)." },
          { term: "Volume vs price", def: "Why revenue can fall even when prices rise (p.29)." },
        ] },
        { t: "callout", title: "Try it yourself", text: "\"Annualised GDP beat on inventories as neoclouds sold off and Treasuries rallied on a flight to safety.\" Decoded: growth looked strong partly because of stockpiling, while debt-funded AI firms fell and investors bought government bonds." },
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
          { t: "puzzle", icon: "🎯", title: "Guess the Company", dot: "gold", paras: ["Three clues, one October headline-maker:"], list: ["Its cloud revenue more than doubled to $30.7 billion.", "It plans to spend $195–205 billion this year.", "It lost about $500 billion in market value in one day."], answer: "Alphabet" },
          { t: "puzzle", icon: "🧠", title: "Trivia: true or false?", dot: "blue", paras: ["\"The US grew 3.4% in Q3, so its economy grew 3.4% in those three months.\""], answer: "False — 3.4% is annualised. Actual quarterly growth was about 0.84%." },
          { t: "puzzle", icon: "💡", title: "Scale check", dot: "green", paras: ["Alphabet's ~$500 billion one-day loss is roughly the size of Belgium's entire annual economic output — gone between one closing bell and the next."] },
        ], right: [
          { t: "meme", head: "Investors, October 2026:", a: "Your cloud revenue doubled!", b: "…and you spent HOW much?", emoji: "🧾", caption: "the AI invoice starter pack" },
          { t: "puzzle", icon: "🔢", title: "By the numbers", dot: "violet", paras: ["Match the number to the story:"], rows: [["4.0%", "Euro-area inflation"], ["$117.64", "Brent, 30 Oct"], ["7 Feb 2027", "Lagarde's last day"], ["10–2", "Fed vote to hold"]] },
          { t: "puzzle", icon: "🃏", title: "Cryptic clue", dot: "gold", paras: ["\"I count as investment until someone buys me. I flattered Q3 by 1.6 points. What am I?\""], answer: "Inventories" },
        ] },
        { t: "callout", icon: "😅", title: "The groan zone · three jokes we're not sorry for", text: "• Why did Apple overtake Nvidia? It finally found a chip it could *beat*.  • Oil went up four months in a row and asked for a fifth. The market said, \"That's *crude*.\"  • Lagarde announced her exit nine months early. The ECB called it *forward guidance*." },
        { t: "note", text: "All puzzles use figures reported for October 2026. Sources on p.36." },
      ],
    },

    // ── 35 CLOSE ─────────────────────────────────────────────────────────
    {
      section: "History · Culture · Ahead", toc: "History · Picks · The Month Ahead",
      kicker: "To close",
      title: "This month in history · What to read · The month ahead",
      full: [
        { t: "cards", cols: 3, items: [
          { title: "⏳ This month in history", dot: "gold", paras: ["On 19 October 1987 — \"Black Monday\" — the Dow Jones Industrial Average fell 22.6% in a single day, still its largest one-day percentage drop.", "Alphabet's 12.6% fall this month was one company, not a whole market — but its dollar size shows how concentrated today's indices have become."], source: "Historical context." },
          { title: "📚 Frontier picks", dot: "blue", paras: ["**Read:** the IMF's October 2026 WEO, chapter 1 — the clearest map of the year's risks.", "**Listen:** any explainer on how GDP is calculated, before the Q3 revision on 25 Nov.", "**Watch:** a documentary on the 1987 crash and the lessons for concentrated markets."], source: "Recommendations, not endorsements." },
          { title: "📅 The month ahead", dot: "violet", paras: ["**Watch for:** RBA (3 Nov), BoE and Banxico (5 Nov), Brazil (3–4 Nov) decisions; US October CPI and jobs; the US midterm elections; the Q3 GDP second estimate (25 Nov); and the race to succeed Lagarde."], source: "Forward-looking; not investment advice." },
        ] },
        { t: "table", title: "The October diary — key dates", dot: "gold", head: ["Date", "Event", "Page"], rows: [
          ["2 Oct", "US September jobs: +29k, unemployment 4.2%", "27"],
          ["7 Oct", "RBI hikes to 5.50%, 'calibrated tightening'", "14"],
          ["8 Oct", "10-yr Treasury yield ~5.35%, a 24-year high", "20"],
          ["13 Oct", "IMF WEO: world 3.1%, Saudi Arabia –3.3%", "04, 29"],
          ["14 Oct", "US CPI 3.7%; Houthi attack on Saudi Aramco", "07, 15"],
          ["15 Oct", "Nigeria inflation falls to 14.63%", "16"],
          ["19 Oct", "China Q3 GDP 4.5%", "13"],
          ["21 Oct", "UK CPI 3.5%", "11"],
          ["22 Oct", "Bank of Korea holds at 3.00%; Brent ~$111", "18, 15"],
          ["28 Oct", "Fed holds 10–2", "08"],
          ["29 Oct", "US Q3 GDP 3.4%; ECB holds; Lagarde exit; Alphabet –12.6%", "06, 10, 28"],
          ["30 Oct", "BoJ holds 8–1; Brent $117.64; Apple passes Nvidia; euro GDP +0.4%", "12, 22, 19"] ],
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
          "IMF — World Economic Outlook, 13 October 2026; CGTN; NBC; Daily Sabah; Saudi Gazette.",
          "BEA — GDP advance estimate, Q3 2026 (29 Oct); NAHB; TheStreet; Daily Sabah.",
          "BLS — CPI, September 2026 (14 Oct); Employment Situation, September 2026 (2 Oct).",
          "Federal Reserve — FOMC statement, 28 Oct 2026; Fortune; InvestingLive; Nation Thailand; Central Banking.",
          "ECB — monetary policy decisions and press release on the President's departure, 29 Oct 2026; Banque de France; Courthouse News; Paperjam.",
          "Eurostat — preliminary flash GDP Q3 2026 (30 Oct) and flash HICP October 2026; FXStreet; Investment Week.",
          "ONS — Consumer price inflation, September 2026 (21 Oct); Portfolio Adviser; Irish News.",
          "Bank of Japan — 30 Oct 2026 decision; Newsquawk; Trading Economics; ING.",
          "National Bureau of Statistics of China — Q3 GDP (19 Oct) and October data; CGTN; Kuwait Times; IndexBox.",
          "Reserve Bank of India — MPC resolution, 7 Oct 2026; Moneylife; PSU Connect; Oneindia.",
          "Nation Thailand; Reuters via Tribune and BOE Report; kurs.com.ua; Fox News — oil prices, Saudi attacks and Hormuz shipping.",
          "National Bureau of Statistics (Nigeria) via Nairametrics; Kenya NBS via Nairametrics; DG Trésor — Bank of Ghana.",
          "IBGE via Trading Economics; INEGI via Excelsior and Rio Times; Buenos Aires Times; BBVA Research — Latin America.",
          "Bank of Korea via Korea Times and InvestingLive; RBA via CommBank.",
          "Vested Finance; InvestingLive; Tapeboard; BYDFI; The Wealth Advisor — equity performance. Business Times / Bloomberg; 24/7 Wall St — Apple and Nvidia.",
          "Cboe; Tradeweb; Trading Economics — Treasury yields.",
          "RTT News; Bloomberg Línea; Khaleej Times — currencies.",
          "Mitrade (Bilello data); Gulf News; Sprott — gold. Forklog — bitcoin and ETF flows.",
          "Fox Business; NBC; Newstribune; InvestingCube — Alphabet.",
          "IMF; Semafor; The National; Saudi Gazette; Arab News — Saudi Arabia.",
          "DLA Piper; STR; Bloomberg Law; NBC News; CFR — tariffs and the courts.",
        ] },
        { t: "callout", title: "Method", text: "We separate fact (sourced figures), analysis (our reading) and opinion (labelled). Where sources disagreed — on the Nasdaq's monthly fall, the 10-year yield at month-end, or the size of Alphabet's loss — we give the range. Iranian claims about naval mines are reported as claims. Data published in early November about October is included and dated. The Financial Frontier is an educational publication. Nothing herein is investment advice." },
      ],
    },
  ],
};
