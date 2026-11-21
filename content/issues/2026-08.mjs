// Issue No. 03 — August 2026. Full-length print edition.
// Figures are drawn from the sources on the Sources page; where sources disagreed we give
// the primary release or a range. Data released in early September about August is dated.

export default {
  slug: "2026-08",
  issueNumber: 3,
  month: "August 2026",
  title: "Warsh Draws a Line",

  cover: {
    lines: ["Warsh Draws"],
    gold: "a Line.",
    standfirst:
      "At Jackson Hole the Fed chair called 2% a \"firm fixed target\" and put a hike back on the table. Stocks set records anyway, gold had its best month since January, bitcoin jumped a quarter — and a jobs rebound handed the hawks their case.",
    tags: ["Jackson Hole", "Debasement Trade", "Gold +9.7%", "Nvidia", "$40T Debt"],
  },

  contents: {
    oneLine:
      "The central bank talked tougher and markets rallied harder — buying the things that hold value when people doubt a currency.",
  },

  back: {
    text:
      "Issue No. 03 covered the month the Fed drew a line — a hawkish Jackson Hole, a debt that passed $40 trillion, gold and bitcoin surging, and an economy that suddenly started hiring again. Next issue: the hikes arrive.",
  },

  pages: [
    // ── 03 EDITOR'S LETTER ────────────────────────────────────────────────
    {
      section: "Editor's Letter", toc: "Editor's Letter",
      kicker: "From the editor",
      title: "Tough talk, rising markets",
      left: [
        { t: "lead", text: "August had a puzzle at its centre. On 28 August, in his first Jackson Hole keynote, Federal Reserve Chair Kevin Warsh called the 2% inflation goal \"a firm fixed target\" and said, in effect, that the Fed had work to do. Markets heard a promise of higher rates. Then they bought almost everything anyway." },
        { t: "p", text: "The S&P 500 set record highs and gained about **2.7%** for the month. Gold jumped about **9.7%**, its best month since January. Bitcoin rose roughly **25%**, its best month since late 2024. And on 18 August the US national debt passed **$40 trillion** — just five months after it crossed $39 trillion." },
        { t: "p", text: "Those moves are connected. When investors worry that governments will borrow without limit and that inflation will stay above target, they reach for assets that can't be printed — gold, silver, bitcoin, and the shares of companies with pricing power. Analysts called it the return of the \"debasement trade\"." },
        { t: "p", text: "The data then gave the hawks their ammunition. On 4 September, the August jobs report showed employers adding **162,000** workers — roughly triple what forecasters expected. A rate hike in September stopped looking like a threat and started looking like a plan." },
      ],
      right: [
        { t: "box", title: "Three numbers that frame August", dot: "gold", paras: ["**$40 trillion** — US national debt, passed on 18 August", "**3.7%** — PCE inflation cited by Warsh at Jackson Hole", "**+9.7%** — spot gold in August, best month since January"], source: "US Treasury via AP; Federal Reserve; Sprott." },
        { t: "quote", text: "When people doubt the money, they buy the things money can't make more of.", by: "The Financial Frontier" },
        { t: "p", text: "Our method doesn't change: every figure carries a source, every story answers five questions, and where sources disagreed — on gold's monthly gain or Nvidia's share move — we show the range." },
      ],
      full: [
        { t: "cards", cols: 2, items: [
          { title: "What we cover", text: "Eight regions, every major market and central bank — plus the themes, from AI to tariffs, that tie them together." },
          { title: "How to read it", text: "Facts carry a source. Analysis is our reading of those facts. Opinion is labelled as opinion." },
        ] },
      ],
    },

    // ── 04 GLOBAL I ───────────────────────────────────────────────────────
    {
      section: "The Global Economy · Borrowing", foot: "The Global Economy", toc: "The Global Economy — The Cost of Money",
      kicker: "The big picture · Part I",
      title: "The world pays more to borrow",
      deck: "From Washington to Tokyo, long-term borrowing costs climbed to levels not seen in decades — and the debt they finance kept growing.",
      left: [
        { t: "lead", text: "The defining global trend of August wasn't a growth forecast — it was the price of money. The US 10-year Treasury yield touched **4.75%** in mid-August, its highest in 20 months, while the 30-year briefly reached about **5.31%**. In Japan the 10-year government bond yield hit roughly **2.93–2.95%**, its highest since 1996." },
        { t: "p", text: "Behind the rise sat a wall of borrowing. The US national debt passed **$40 trillion** on 18 August, only five months after it crossed $39 trillion; interest payments alone now exceed a trillion dollars a year. Analysts also pointed to heavy bond issuance by AI companies funding data centres. More supply of bonds, with inflation still above target, means investors demand higher yields." },
        { t: "p", text: "The growth picture was unchanged from July: the IMF sees the world growing **3.0%** this year, the OECD 2.8% and the World Bank 2.5%. What changed in August was the cost of financing that growth." },
        { t: "fiveq",
          happened: "Long-term yields hit multi-decade highs in the US and Japan as US debt passed $40 trillion.",
          matters: "Long-term yields set the cost of mortgages, corporate loans and government borrowing.",
          benefits: "Savers and new bond buyers locking in higher income.",
          hurt: "Heavily indebted governments, home-buyers and companies that need to refinance.",
          takeaway: "The era of cheap long-term money is over — and August made that plain on two continents." },
      ],
      right: [
        { t: "chart", title: "Long-term yields, mid-August highs (%)", dot: "blue", unit: "%", decimals: 2, data: [
          { label: "Japan 10-yr", value: 2.95, display: "~2.95%", tone: "violet" }, { label: "US 10-yr", value: 4.75, tone: "blue" }, { label: "US 30-yr", value: 5.31, display: "~5.31%", tone: "gold" } ],
          source: "Trading Economics; Jiji/Nikkei via Adnkronos; Nikkei. Intraday highs, mid-August 2026." },
        { t: "chart", title: "2026 world growth forecasts (%)", dot: "gold", unit: "%", data: [
          { label: "World Bank (Jun)", value: 2.5, tone: "muted" }, { label: "OECD (Jun)", value: 2.8, tone: "violet" }, { label: "IMF (Jul)", value: 3.0, tone: "blue" } ], source: "World Bank; OECD; IMF." },
        { t: "sidebar", title: "Term premium", text: "The extra yield investors demand to lend for a long time rather than roll over short loans. It rises when the outlook for inflation and government borrowing gets more uncertain — exactly August's mood." },
      ],
    },

    // ── 05 GLOBAL II ──────────────────────────────────────────────────────
    {
      section: "The Global Economy · Three Forces", foot: "The Global Economy", toc: "The Global Economy — Three Forces",
      kicker: "The big picture · Part II",
      title: "Three forces behind August",
      deck: "A hawkish central bank, a flight to hard assets and on-off diplomacy in the Gulf pulled markets in different directions.",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · The hawkish Fed", dot: "blue", text: "Warsh's Jackson Hole speech said inflation (PCE 3.7%) was too high and rates may need to rise. Futures moved to price roughly a 60% chance of a September hike.", source: "Federal Reserve; NPR; CME pricing." },
          { title: "2 · The debasement trade", dot: "gold", text: "Gold (+9.7%), silver and bitcoin (+25%) rallied as investors hedged against deficits, a softer dollar and sticky inflation.", source: "Sprott; IG; CoinGlass via Cointelegraph." },
          { title: "3 · Hormuz diplomacy", dot: "red", text: "Iran–Oman talks on managing the strait raised hopes, then stalled. Brent swung from below $80 (4 Aug) to $91.49 (18 Aug) and back to the mid-$80s.", source: "The National; Reuters via Tribune." },
        ] },
      ],
      left: [
        { t: "p", text: "These forces don't fit neatly together — which is why August felt contradictory. A central bank that promises to fight inflation should, in theory, strengthen its currency and cool speculative assets. Instead the dollar slipped for a second month, and gold and bitcoin surged." },
        { t: "p", text: "The reconciliation is credibility. Investors weren't betting against the Fed's words; they were hedging against the possibility that fiscal reality — a $40 trillion debt and a war to fund — would make those words hard to keep. Stocks rose because company earnings, led by AI, kept growing faster than the cost of money." },
        { t: "fiveq",
          happened: "Hawkish Fed rhetoric, a hard-asset rally and stop-start Gulf diplomacy all landed in one month.",
          matters: "Markets are pricing fiscal risk alongside monetary policy.",
          benefits: "Holders of gold, silver, bitcoin and AI leaders.",
          hurt: "Bond holders and anyone holding cash that earns less than inflation.",
          takeaway: "In August the market listened to the Fed — and then bought insurance against it." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "Asset returns, August 2026 (%)", dot: "gold", data: [
          { label: "Bitcoin", value: 24.5, display: "+24–25%", tone: "violet" }, { label: "Silver", value: 15, display: "≈+15%", tone: "cyan" }, { label: "Gold (spot)", value: 9.67, display: "+9.7%", tone: "gold" },
          { label: "EM stocks", value: 3.4, tone: "green" }, { label: "S&P 500", value: 2.7, tone: "blue" }, { label: "WTI crude", value: 1.3, tone: "red" } ],
          source: "CoinGlass; Sprott; Savvy Wealth; Advisor Perspectives; our July/Aug issues. Silver approximate." },
        { t: "callout", title: "Key takeaway", text: "When rate hikes and hard-asset rallies arrive together, the market is questioning the policy mix, not the economy." },
      ],
    },

    // ── 06 US I ───────────────────────────────────────────────────────────
    {
      section: "Region · United States · I", foot: "Region · United States", toc: "United States — The Hiring Rebound",
      kicker: "Region · United States",
      title: "Hiring snaps back",
      deck: "July's payroll scare reversed. The August jobs report beat forecasts by a mile — and made a rate hike look justified.",
      left: [
        { t: "lead", text: "The jobs report published on 4 September showed US employers adding **162,000** jobs in August — about three times what economists expected (forecasts clustered around 55,000–65,000). Private employers added 127,000 and government 35,000. Revisions added another **55,000** jobs to June and July." },
        { t: "p", text: "The unemployment rate held at **4.1%**, with about 7.0 million people out of work, while the participation rate rose 0.2 points to **61.6%** — a partial recovery from July's five-year low. Average hourly earnings were up **3.1%** on the year." },
        { t: "p", text: "Growth data was steadier. The second estimate of second-quarter GDP, on 26 August, kept growth at **1.5%** annualised, while real gross domestic income — the same economy measured from the income side — grew **2.2%**." },
        { t: "fiveq",
          happened: "Payrolls rose 162,000 against ~55,000–65,000 expected; unemployment held at 4.1%.",
          matters: "A firm labour market removes the main argument against raising rates.",
          benefits: "Workers and job-seekers; participation recovered.",
          hurt: "Borrowers, as traders raised September hike odds and yields rose.",
          takeaway: "One strong report turned \"maybe a hike\" into \"probably a hike\"." },
      ],
      right: [
        { t: "chart", title: "US payrolls (thousands)", dot: "green", data: [
          { label: "July", value: -23, display: "–23k", tone: "red" }, { label: "Aug (expected)", value: 60, display: "~55–65k", tone: "muted" }, { label: "August", value: 162, display: "+162k", tone: "green" } ],
          source: "BLS Employment Situation, 7 Aug and 4 Sep 2026; consensus via Kelly Services / CME." },
        { t: "stats", items: [{ value: "4.1%", label: "Unemployment rate, August", tone: "white" }, { value: "61.6%", label: "Participation (+0.2pt)", tone: "gold" }] },
        { t: "stats", items: [{ value: "3.1%", label: "Wage growth, y/y", tone: "white" }, { value: "2.2%", label: "Real GDI, Q2 (ann.)", tone: "blue" }] },
        { t: "sidebar", title: "GDP vs GDI", text: "GDP adds up spending; GDI adds up incomes. In theory they match; in practice they differ because of measurement gaps. When GDI runs ahead, it can hint that GDP will later be revised up." },
      ],
    },

    // ── 07 US II ──────────────────────────────────────────────────────────
    {
      section: "Region · United States · II", foot: "Region · United States", toc: "United States — Prices & the Debt",
      kicker: "Region · United States · II",
      title: "Inflation eases — the debt doesn't",
      deck: "Consumer prices cooled a little in July. The national debt, meanwhile, passed a number that would have seemed absurd a decade ago.",
      left: [
        { t: "lead", text: "The July consumer price index, released on 12 August, showed prices rising **0.1%** in the month and **3.4%** over the year — down from 3.5% in June and in line with forecasts. Core inflation, excluding food and energy, eased to **2.5%** from 2.6%." },
        { t: "p", text: "Gasoline fell **2.9%** from June but was still about **25%** higher than a year earlier, a reminder that the energy shock is far from over. The Fed's preferred gauge was hotter: at Jackson Hole, Warsh cited PCE inflation of **3.7%** year-on-year." },
        { t: "p", text: "On 18 August the Treasury's total public debt outstanding passed **$40 trillion** — about $40.05 trillion that day. It had crossed $39 trillion only five months earlier, and $38 trillion five months before that. Reporting tied the pace to defence costs from the Iran war, social programmes and interest costs now above a trillion dollars a year. That works out to roughly **$117,000** per person." },
        { t: "fiveq",
          happened: "July CPI eased to 3.4% (core 2.5%) while the national debt passed $40 trillion.",
          matters: "Faster borrowing adds bond supply and can keep long-term rates and inflation expectations high.",
          benefits: "Holders of Treasuries earning higher yields.",
          hurt: "Future taxpayers; programmes squeezed by rising interest costs.",
          takeaway: "Inflation is drifting down slowly. The debt is going up quickly. Markets noticed both." },
      ],
      right: [
        { t: "chart", title: "US inflation, July 2026 (y/y %)", dot: "gold", unit: "%", data: [
          { label: "CPI", value: 3.4, tone: "gold" }, { label: "Core CPI", value: 2.5, tone: "blue" }, { label: "PCE", value: 3.7, tone: "red" } ],
          source: "BLS CPI, 12 Aug 2026; PCE as cited by Chair Warsh, 28 Aug 2026." },
        { t: "chart", title: "US national debt ($ trillion)", dot: "red", data: [
          { label: "Oct 2025", value: 38, display: "$38T", tone: "muted" }, { label: "~Mar 2026", value: 39, display: "$39T", tone: "violet" }, { label: "18 Aug 2026", value: 40.05, display: "$40.05T", tone: "red" } ],
          source: "US Treasury via AP, Al Jazeera and WSJ (via WSB-TV), Aug 2026." },
        { t: "sidebar", title: "The debt limit", text: "Congress caps how much the Treasury may borrow. The Bipartisan Policy Center expects the current $41.1 trillion limit to be reached between late winter and mid-summer 2027 — setting up another political fight." },
      ],
    },

    // ── 08 THE FED ────────────────────────────────────────────────────────
    {
      section: "Central Banks · The Federal Reserve", foot: "Central Banks", toc: "The Fed — Jackson Hole",
      kicker: "Central banks · The Fed",
      title: "\"A firm fixed target\"",
      deck: "Kevin Warsh's first Jackson Hole speech as chair was short on promises and long on resolve.",
      left: [
        { t: "lead", text: "There was no Fed meeting in August, so all eyes were on the Kansas City Fed's annual symposium in Jackson Hole, Wyoming. On 28 August, Warsh endorsed the Fed's 2% inflation goal — measured by the PCE index — as \"a firm fixed target\", and said the Fed's predominant focus right now should be on prices." },
        { t: "p", text: "He set out a test: the Fed must be confident that underlying inflation is moving to its objective \"clearly and at sufficient speed\". If not, \"we have work to do.\" He acknowledged the central bank bears responsibility for **65 months** of elevated inflation and said the inflation data were \"more concerning\" than the job market." },
        { t: "p", text: "Investors took the speech as a signal that rates are likely to go higher; markets priced roughly a **60%** chance of a hike at the 15–16 September meeting. Most economists in attendance praised it, though KPMG noted that it defended the target firmly while leaving the route there deliberately vague. Gold dipped about 1% during the speech — then resumed its climb." },
        { t: "fiveq",
          happened: "Warsh called 2% \"a firm fixed target\" and signalled hikes if inflation doesn't fall fast enough.",
          matters: "It reset expectations: the Fed's next move was now more likely up than down.",
          benefits: "Savers; the Fed's credibility, if it follows through.",
          hurt: "Borrowers and rate-sensitive sectors such as housing.",
          takeaway: "A central bank can tighten with words before it moves rates." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Jackson Hole, 28 August — key points", dot: "blue", rows: [
          ["Target", "2% PCE, \"firm fixed\""], ["PCE inflation cited", "3.7% y/y"], ["Months above target", "65"], ["Next FOMC", "15–16 September"], ["Market hike odds", "~60%"] ],
          source: "Federal Reserve; NPR; Fortune; Al Jazeera; CME pricing." },
        { t: "quote", text: "We must be confident that underlying inflation is moving to our objective, clearly and at sufficient speed.", by: "Kevin Warsh, Jackson Hole, 28 Aug 2026" },
        { t: "sidebar", title: "Why PCE, not CPI?", text: "The Fed targets the personal consumption expenditures index because it covers more spending (including what employers and government pay for on households' behalf) and adjusts as people switch products. It usually runs a little below CPI — but not in mid-2026." },
      ],
    },

    // ── 09 SCORECARD ─────────────────────────────────────────────────────
    {
      section: "Central Banks · Scorecard", foot: "Central Banks", toc: "Central Bank Scorecard",
      kicker: "The policy map", kickerTone: "blue",
      title: "A quiet month — except in Seoul",
      deck: "The big Western central banks took their summer break. Those that met mostly held; Korea hiked again.",
      full: [
        { t: "table", title: "August 2026 decisions and signals", dot: "blue", head: ["Central bank", "Rate", "August action", "Signal"], rows: [
          ["Federal Reserve", "3.50–3.75%", "No meeting", "Jackson Hole: hike possible (15–16 Sep)"],
          ["European Central Bank", "2.25%", "No meeting", "Account (27 Aug): Sept hike \"almost fully priced\""],
          ["Bank of England", "3.75%", "No meeting", "July vote was 6–3; next 17 Sep"],
          ["Bank of Japan", "1.00%", "No meeting", "Hike expected in September"],
          ["Bank of Korea", "3.00%", "**Hike +25bp**, 27 Aug (6–1)", "Second hike in a row"],
          ["Reserve Bank of India", "5.25%", "Hold, 5 Aug (unanimous)", "Neutral; FY27 CPI forecast cut to 5.0%"],
          ["Reserve Bank of Australia", "4.35%", "Hold, 11–12 Aug (unanimous)", "Door open to hikes"],
          ["Banco Central do Brasil", "14.00%", "**Cut –25bp**, 5 Aug", "Cautious easing continues"],
          ["Banxico (Mexico)", "6.50%", "Hold, 6 Aug (unanimous)", "Target reached only Q4 2027"] ],
          source: "Central-bank statements; Business Standard; NAB; Focus Economics; Banxico; O Povo; ECB account of the July meeting." },
      ],
      left: [
        { t: "p", text: "The table shows a world split in two. Where inflation is driven by imported energy and weak currencies — Korea, and soon Europe and Japan — central banks were tightening or preparing to. Where rates were already very high — Brazil — they kept edging down. India and Mexico sat in the middle, holding with a cautious eye on oil." },
      ],
      right: [
        { t: "callout", title: "Key takeaway", text: "August was the calm before September's storm: four of the world's biggest central banks were signalling hikes for their next meeting." },
      ],
    },

    // ── 10 INDIA ─────────────────────────────────────────────────────────
    {
      section: "Region · India", toc: "India",
      kicker: "Region · India",
      title: "A 7.8% quarter, despite the war",
      deck: "India's economy grew far faster than expected in the spring — led by services and investment — while the RBI held steady.",
      left: [
        { t: "lead", text: "India's GDP grew **7.8%** year-on-year in April–June, the first quarter of fiscal 2026-27, the statistics ministry said on 31 August. That beat the RBI's 7.0% projection and the 7.1% expected in a Reuters poll of 58 economists, and came despite fears that the Iran war would drag on growth." },
        { t: "p", text: "Services and fixed investment led the way, while manufacturing grew and agriculture and mining weakened. Real gross value added rose **8.2%**, and nominal GDP grew **10.3%** to ₹88.27 lakh crore. Finance Minister Nirmala Sitharaman said reforms were \"bearing results\"." },
        { t: "p", text: "Earlier in the month, on 5 August, the RBI's Monetary Policy Committee held the repo rate at **5.25%**, unanimously, with a neutral stance. It trimmed its fiscal-year inflation forecast to **5.0%** from 5.1%, but flagged volatile oil, the monsoon and El Niño as reasons for caution. The next meeting is 5–7 October." },
        { t: "fiveq",
          happened: "Q1 FY27 GDP grew 7.8% (beat 7.0–7.1% forecasts); the RBI held at 5.25%.",
          matters: "India is growing fast enough to absorb an oil shock — for now.",
          benefits: "Services firms, investors in capital goods and infrastructure.",
          hurt: "Farm incomes, as agriculture weakened.",
          takeaway: "India's growth engine is investment and services — not luck." },
      ],
      right: [
        { t: "chart", title: "India real GDP growth, Apr–Jun 2026 (%)", dot: "green", unit: "%", data: [
          { label: "RBI forecast", value: 7.0, tone: "muted" }, { label: "Reuters poll", value: 7.1, tone: "violet" }, { label: "Actual", value: 7.8, tone: "green" }, { label: "Real GVA", value: 8.2, tone: "blue" } ],
          source: "MoSPI, 31 August 2026; Reuters; RBI." },
        { t: "stats", items: [{ value: "5.25%", label: "RBI repo (held, 5 Aug)", tone: "blue" }, { value: "5.0%", label: "RBI FY27 CPI forecast", tone: "gold" }] },
        { t: "sidebar", title: "GDP vs GVA", text: "Gross value added measures what each sector produces; GDP adds taxes and subtracts subsidies on products. GVA is the cleaner read on what's happening in industry and services." },
      ],
    },

    // ── 11 CHINA ─────────────────────────────────────────────────────────
    {
      section: "Region · China", toc: "China",
      kicker: "Region · China",
      title: "Hot factories, tepid shoppers",
      deck: "China's summer data told the same story twice: production holds up, consumption keeps fading.",
      left: [
        { t: "lead", text: "July's numbers, released on 17 August, showed industrial output growth slowing to **4.5%** year-on-year from 5.3% in June, while retail sales rose just **0.6%**. Reuters pointed to weak domestic demand, extreme weather and the fading effect of state support." },
        { t: "p", text: "August's data, published on 15 September, deepened the split. Industrial output re-accelerated to **5.2%**, driven by high-tech goods — industrial robot output jumped **34.6%**. But retail sales slowed to **0.4%**, with car sales down 18.5%. Fixed-asset investment fell **7.2%** in the first eight months, property investment slid **19.9%**, and urban unemployment rose to **5.3%**." },
        { t: "p", text: "Trade was the bright spot: total goods trade reached 4.65 trillion yuan in August, up **19.8%** on a year earlier. Commerzbank's verdict: industrial output beat expectations, but structural imbalances are widening." },
        { t: "fiveq",
          happened: "Industrial output and exports stayed firm; retail sales grew less than 1%; property investment fell ~20%.",
          matters: "A China that can't spend at home pushes its surplus abroad.",
          benefits: "Buyers of Chinese goods; high-tech manufacturers.",
          hurt: "Car dealers, property developers and competing exporters elsewhere.",
          takeaway: "China's two-speed economy is getting faster at one speed and slower at the other." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "China, year-on-year (%)", dot: "red", data: [
          { label: "Robots (Aug)", value: 34.6, tone: "violet" }, { label: "Trade (Aug)", value: 19.8, tone: "blue" }, { label: "Ind. output (Aug)", value: 5.2, tone: "green" },
          { label: "Retail (Aug)", value: 0.4, tone: "gold" }, { label: "FAI (Jan–Aug)", value: -7.2 }, { label: "Property inv.", value: -19.9 } ],
          source: "NBS, 17 Aug and 15 Sep 2026; Khaleej Times; Commerzbank; China Daily." },
        { t: "stats", items: [{ value: "5.3%", label: "Urban unemployment, August", tone: "red" }] },
        { t: "sidebar", title: "Fixed-asset investment", text: "Spending on buildings, infrastructure and equipment. In China it has long been the main growth engine; a 7% fall signals that property and local-government building are still shrinking." },
      ],
    },

    // ── 12 JAPAN ─────────────────────────────────────────────────────────
    {
      section: "Region · Japan", toc: "Japan",
      kicker: "Region · Japan",
      title: "Weak growth, 30-year-high yields",
      deck: "Japan's economy undershot forecasts — yet its bond yields hit their highest since 1996.",
      left: [
        { t: "lead", text: "Japan's preliminary second-quarter GDP, released in mid-August, showed growth of just **0.3%** on the quarter — **1.1%** annualised, well short of the 2.0% expected. Private consumption was flat and exports slowed. (A later revision nudged the quarterly figure to 0.4%.)" },
        { t: "p", text: "Normally weak growth pushes bond yields down. Instead, the 10-year Japanese government bond yield climbed to about **2.93%** on 17 August and briefly **2.95%** — the highest since 1996. Rising overseas yields and bets on a near-term Bank of Japan hike did the work." },
        { t: "p", text: "The yen, rescued by intervention in late July, held around **159** per dollar, and forecasters such as DL Research expected the BoJ to raise its 1.0% policy rate in September. The weak growth print complicated that path but, most analysts said, didn't derail it." },
        { t: "fiveq",
          happened: "Q2 GDP grew 1.1% annualised (vs 2.0% expected); 10-year JGB yields hit a 30-year high.",
          matters: "Japan holds the world's largest public debt relative to GDP — higher yields raise its cost.",
          benefits: "Japanese savers and life insurers buying higher-yielding bonds.",
          hurt: "The government's budget and borrowers with floating-rate loans.",
          takeaway: "After three decades of near-zero rates, Japan is relearning what interest costs." },
      ],
      right: [
        { t: "chart", title: "Japan Q2 GDP (annualised %)", dot: "red", unit: "%", data: [
          { label: "Expected", value: 2.0, tone: "muted" }, { label: "Actual (prelim.)", value: 1.1, tone: "red" } ], source: "Cabinet Office via Al Jazeera, Fortune, AP — Aug 2026." },
        { t: "stats", items: [{ value: "~2.95%", label: "10-yr JGB high — since 1996", tone: "gold" }, { value: "1.0%", label: "BoJ policy rate", tone: "blue" }] },
        { t: "sidebar", title: "Why yields rose on bad news", text: "Japanese yields are being pulled up by global yields and by expectations that the BoJ will keep normalising policy. Domestic growth matters less when the whole world's cost of money is rising." },
      ],
    },

    // ── 13 EUROPE I ──────────────────────────────────────────────────────
    {
      section: "Region · Europe · Euro Area", foot: "Region · Europe", toc: "Europe — The Euro Area",
      kicker: "Region · Europe",
      title: "Energy pushes the ECB toward a hike",
      deck: "Euro-area inflation climbed again, and the ECB's own minutes made a September rise look all but certain.",
      left: [
        { t: "lead", text: "Eurostat confirmed July inflation at **2.9%**, and its flash estimate for August — published on 1 September — jumped to **3.3%**. Energy did nearly all the work: energy inflation surged to **14.3%** from 10.3%, while services eased to 3.0%." },
        { t: "p", text: "The ECB had no meeting in August, but the account of its July meeting, published on 27 August, was hard to misread. Markets, it noted, had a September hike \"almost fully priced in\", with another priced by February 2027. Reuters sources said policymakers were set to raise rates in September but had little appetite to signal more." },
        { t: "p", text: "Europe's specific problem is gas. ECB economists noted that gas prices had risen about **16%** since the June meeting, citing geopolitical tension, low storage levels and strong Asian demand. On the growth side, a resilient second quarter led analysts to revise 2026 growth forecasts up toward 0.8–0.9%." },
        { t: "fiveq",
          happened: "Euro-area inflation rose to 3.3% (flash) on 14.3% energy inflation; the ECB signalled a September hike.",
          matters: "Europe imports most of its gas — the Gulf shock lands directly on bills and factories.",
          benefits: "Savers; the euro, which hit a two-month high near $1.16.",
          hurt: "Energy-intensive industry and households facing higher heating costs into winter.",
          takeaway: "Europe's inflation problem is an energy problem — and winter is coming." },
      ],
      right: [
        { t: "chart", title: "Euro-area inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "June", value: 2.8, tone: "muted" }, { label: "July", value: 2.9, tone: "blue" }, { label: "Aug (flash)", value: 3.3, tone: "gold" }, { label: "Aug energy", value: 14.3, tone: "red" } ],
          source: "Eurostat, 31 Jul, 19 Aug and 1 Sep 2026." },
        { t: "stats", items: [{ value: "+16%", label: "Gas prices since June ECB meeting", tone: "red" }, { value: "2.25%", label: "ECB deposit rate", tone: "blue" }] },
        { t: "sidebar", title: "The account", text: "The ECB publishes a summary of each policy meeting about four weeks later. Unlike the press conference, it reveals the range of views around the table — and in August it showed a council leaning toward a hike." },
      ],
    },

    // ── 14 UK ────────────────────────────────────────────────────────────
    {
      section: "Region · Europe · United Kingdom", foot: "Region · Europe", toc: "Europe — United Kingdom",
      kicker: "Region · United Kingdom",
      title: "The price cap bites",
      deck: "UK inflation jumped back up in July as the regulator's energy price cap rose 13%.",
      left: [
        { t: "lead", text: "UK consumer price inflation rose to **2.9%** in the year to July, the Office for National Statistics reported on 19 August — up from a 15-month low of 2.6% in June and the highest since March. Prices rose 0.3% in the month alone." },
        { t: "p", text: "The main driver was the energy regulator Ofgem's price cap, which rose **13%** on 1 July, feeding straight into household gas and electricity bills. CPIH, which includes owner-occupiers' housing costs, rose to **3.1%** from 2.8%." },
        { t: "p", text: "The Bank of England had no August meeting. But its July vote — 6–3, with three members wanting a hike — left markets watching the 17 September decision closely. The Bank's own forecast had inflation heading toward about 3.25% by year-end; July's jump suggested it was on track." },
        { t: "fiveq",
          happened: "UK CPI rose to 2.9% in July after Ofgem's 13% price-cap increase.",
          matters: "Energy bills are now the main source of UK inflation, and they reset every quarter.",
          benefits: "Energy suppliers; savers if the BoE hikes.",
          hurt: "Households, especially lower-income ones spending more on heating and power.",
          takeaway: "June's dip was a pause — the energy shock has now reached British kitchens." },
      ],
      right: [
        { t: "chart", title: "UK inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "CPI June", value: 2.6, tone: "muted" }, { label: "CPI July", value: 2.9, tone: "gold" }, { label: "CPIH July", value: 3.1, tone: "violet" } ],
          source: "ONS, 19 August 2026." },
        { t: "stats", items: [{ value: "+13%", label: "Ofgem price cap, 1 July", tone: "red" }, { value: "3.75%", label: "Bank Rate (next decision 17 Sep)", tone: "blue" }] },
        { t: "sidebar", title: "The price cap", text: "Ofgem limits what suppliers can charge per unit of gas and electricity on standard tariffs, updating it every three months to reflect wholesale costs. When wholesale prices jump, the cap follows a quarter later." },
      ],
    },

    // ── 15 MIDDLE EAST ───────────────────────────────────────────────────
    {
      section: "Region · Middle East", toc: "Middle East",
      kicker: "Region · Middle East",
      title: "Talks, threats and a strait in limbo",
      deck: "Diplomacy over Hormuz advanced and stalled in turn — and even a US ally found itself threatened.",
      left: [
        { t: "lead", text: "August opened with hope. Iran and Oman reported progress on an agreement to manage traffic through the Strait of Hormuz, and Brent fell below **$80** on 4 August for the first time in nearly a month. Then US–Iran negotiations deadlocked, shipping slowed again, and by 18 August Brent was back at **$91.49**." },
        { t: "p", text: "On 17 August President Trump said on Fox News that he would bomb Oman if it \"gets in the way\" of a US–Iran deal — his second such threat after one in May. Regional officials told AP he was unhappy that Oman was close to its own arrangement with Iran on ship traffic. Trump insisted the strait was \"open and operating\"; mediation was by then being driven by Qatar and Pakistan." },
        { t: "p", text: "Late in the month the pendulum swung back. Hopes for the Iran–Oman talks pushed Brent down to $85.85 on 26 August, and Qatar's prime minister travelled to Iran to relaunch diplomacy." },
        { t: "fiveq",
          happened: "Iran–Oman talks on Hormuz raised hopes, US–Iran talks stalled, and Trump threatened Oman.",
          matters: "Every headline about the strait moved oil by several dollars a barrel.",
          benefits: "Traders who can stomach volatility; Oman's ports outside the strait (see p.29).",
          hurt: "Gulf exporters dependent on the strait; importers facing unpredictable prices.",
          takeaway: "Hormuz is now a negotiation, not just a shipping lane — and every round moves the oil price." },
      ],
      right: [
        { t: "chart", title: "Brent crude in August ($/bbl)", dot: "red", data: [
          { label: "4 Aug", value: 79.5, display: "<$80", tone: "green" }, { label: "18 Aug", value: 91.49, display: "$91.49", tone: "red" }, { label: "26 Aug", value: 85.85, display: "$85.85", tone: "gold" }, { label: "27 Aug", value: 87.43, display: "~$87.43", tone: "blue" } ],
          source: "The National; Reuters via Tribune, Kitco and NST, Aug 2026." },
        { t: "sidebar", title: "Mediators", text: "Small states such as Oman, Qatar and Switzerland often carry messages between enemies who won't talk directly. Their leverage is trust from both sides — which is why a threat against a mediator is so unusual." },
      ],
    },

    // ── 16 AFRICA ────────────────────────────────────────────────────────
    {
      section: "Region · Africa", toc: "Africa",
      kicker: "Region · Africa",
      title: "A cooler month for prices",
      deck: "Lower fuel and food prices gave several African economies a break from inflation — though few expected it to last.",
      left: [
        { t: "lead", text: "**South Africa's** inflation fell to **4.3%** in July from 5.0% in June, Statistics South Africa reported on 19 August — the first slowdown in five months and below the 4.5% expected. Food inflation dropped to **0.9%**, the lowest in more than 16 years. Analysts warned it could rise again as oil climbed; August's figure, published in September, ticked up to 4.4%." },
        { t: "p", text: "In **Zambia**, inflation fell to **6.2%** in August, the lowest since February 2018, and **Mozambique's** eased to 6.45%. **Ghana**, fresh from finishing its debt restructuring, saw inflation edge up to **5.0%** in August from 4.6% in July — still low by its own recent history — while its central bank's dollar auctions drew bids of $399 million against $125 million on offer." },
        { t: "p", text: "The pattern reflects food more than oil. A good harvest season eased grocery prices across southern Africa, offsetting part of the fuel shock. But with Brent back near $90, central banks kept rates on hold rather than cutting." },
        { t: "fiveq",
          happened: "Inflation fell in South Africa, Zambia and Mozambique; Ghana's rose slightly.",
          matters: "Cheaper food protects the poorest households, who spend most on it.",
          benefits: "Consumers, especially lower-income households.",
          hurt: "Farmers facing lower prices; fuel-importing businesses.",
          takeaway: "Africa got a food dividend in August — but the fuel bill hasn't gone away." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "Inflation, latest (y/y %)", dot: "gold", data: [
          { label: "Mozambique (Aug)", value: 6.45, display: "6.45%", tone: "violet" }, { label: "Zambia (Aug)", value: 6.2, tone: "blue" }, { label: "Ghana (Aug)", value: 5.0, tone: "gold" }, { label: "S. Africa (Jul)", value: 4.3, tone: "green" } ],
          source: "Stats SA; Ghana Statistical Service; ZamStats; INE Mozambique — via Trading Economics and Business Day." },
        { t: "stats", items: [{ value: "0.9%", label: "SA food inflation — 16-year low", tone: "green" }] },
        { t: "sidebar", title: "Base effects", text: "Annual inflation compares prices with a year earlier. If prices jumped last year, this year's rate can fall even without prices dropping — a quirk that often explains sudden swings." },
      ],
    },

    // ── 17 LATIN AMERICA ─────────────────────────────────────────────────
    {
      section: "Region · Latin America", toc: "Latin America",
      kicker: "Region · Latin America",
      title: "Brazil trims, Mexico waits",
      deck: "Latin America's two largest economies took different paths in the same week.",
      left: [
        { t: "lead", text: "On 5 August, **Brazil's** central bank cut the Selic by a quarter point to **14.00%**, continuing a cautious easing cycle. Inflation is above target and the bank had warned that the outlook was more challenging, but with rates this high, real borrowing costs remain punishing." },
        { t: "p", text: "A day later **Banxico** held Mexico's policy rate at **6.50%**, unanimously — its second straight hold. It kept its end-2026 headline and core inflation forecasts at **3.5%** but said inflation would reach its 3% target only in the fourth quarter of 2027. Analysts read the tone as slightly more hawkish; BBVA expects no change through year-end." },
        { t: "p", text: "In **Argentina**, monthly inflation edged up in July on winter-holiday prices, snapping three months of slowdown, after June's ten-month low of 1.9%. The IMF had welcomed President Milei's plan to reform the central bank in July." },
        { t: "fiveq",
          happened: "Brazil cut to 14.00%; Mexico held at 6.50%; Argentina's inflation ticked up.",
          matters: "The region is easing from very high rates while the US debates hikes — a narrowing gap.",
          benefits: "Brazilian borrowers; Mexican savers enjoying high real rates.",
          hurt: "Exporters if a hawkish Fed strengthens the dollar again.",
          takeaway: "Latin America's central banks are moving carefully because they remember the last inflation." },
      ],
      right: [
        { t: "chart", title: "Policy rates after August (%)", dot: "blue", unit: "%", data: [
          { label: "Brazil", value: 14.0, display: "14.00%", tone: "gold" }, { label: "Mexico", value: 6.5, display: "6.50%", tone: "blue" }, { label: "US (top)", value: 3.75, display: "3.75%", tone: "violet" } ],
          source: "Banco Central do Brasil via O Povo; Banxico; Federal Reserve." },
        { t: "stats", items: [{ value: "Q4 2027", label: "When Banxico sees inflation at 3%", tone: "gold" }] },
        { t: "sidebar", title: "Carry trade", text: "Borrowing in a low-rate currency to invest in a high-rate one. Brazil's 14% rates attract carry traders — supporting the real, until global risk appetite turns." },
      ],
    },

    // ── 18 ASIA-PACIFIC ──────────────────────────────────────────────────
    {
      section: "Region · Asia-Pacific & Oceania", toc: "Asia-Pacific & Oceania",
      kicker: "Region · Asia-Pacific & Oceania",
      title: "Korea hikes again, Australia waits",
      deck: "Two developed Pacific economies, two different answers to the same imported-inflation problem.",
      top: [
        { t: "cards", cols: 2, items: [
          { title: "🇰🇷 South Korea", dot: "gold", paras: ["On 27 August the Bank of Korea raised its base rate by 25bp to **3.00%** — its second hike in a row after July's. Six of seven members voted for it; Hwang Geon-il dissented.", "The board described the move as pre-emptive, aimed at stopping inflation from spreading as growth stays robust."], source: "Focus Economics; Asia Economy; NST, 27 Aug 2026." },
          { title: "🇦🇺 Australia", dot: "blue", paras: ["The Reserve Bank of Australia held its cash rate at **4.35%** at its August meeting, unanimously, as expected.", "Commentators noted the RBA kept the door open to further hikes if inflation proved sticky."], source: "NAB; RBA; CommBank, Aug 2026." },
        ] },
      ],
      left: [
        { t: "p", text: "Korea's back-to-back hikes make it the region's most aggressive tightener. Its reasons echo Europe's: imported energy, a weaker currency and household debt that leaves little room for error. Australia, with an exporter's economy and higher rates already, could afford to wait." },
        { t: "fiveq",
          happened: "Korea hiked to 3.00% (6–1); Australia held at 4.35%.",
          matters: "Rate paths across Asia are diverging with exposure to energy imports.",
          benefits: "Korean savers; the won.",
          hurt: "Korea's heavily indebted households.",
          takeaway: "In Asia, how much energy you import decides how fast you hike." },
      ],
      right: [
        { t: "chart", title: "Bank of Korea base rate (%)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "June", value: 2.5, tone: "muted" }, { label: "July", value: 2.75, tone: "blue" }, { label: "August", value: 3.0, tone: "gold" } ], source: "Bank of Korea, 2026." },
        { t: "callout", title: "The through-line", tone: "blue", text: "Energy importers with weak currencies tighten first; commodity exporters can wait." },
      ],
    },

    // ── 19 STOCKS ────────────────────────────────────────────────────────
    {
      section: "Markets · Equities", toc: "Stock Markets",
      kicker: "Markets",
      title: "Records, but on narrow shoulders",
      deck: "Four US indices hit all-time highs in August. Technology did most of the lifting.",
      left: [
        { t: "lead", text: "Stocks shrugged off the Fed. The S&P 500 gained about **2.7%** in August, closing near **7,686**; the Nasdaq rose roughly **4%** and the Dow about 1.3%. Four indices set all-time highs during the month: the S&P 500, the Dow, the Russell 2000 and the equal-weight S&P 500." },
        { t: "p", text: "Yet breadth narrowed again. Technology stocks rose about **6.25%** and generated more than **three-quarters** of the S&P 500's monthly return, recovering much of July's slide. Mid-month gains came on hopes for a Hormuz deal and easing rate fears; late-month, Nvidia's results and Jackson Hole set the tone." },
        { t: "p", text: "Outside the US, emerging-market stocks gained about **3.4%** and developed markets about 2.6%. A weaker dollar helped: when the dollar falls, foreign assets are worth more to US investors and dollar debts are easier to service." },
        { t: "fiveq",
          happened: "The S&P 500 rose ~2.7% to records; tech (+6.25%) drove three-quarters of the gain.",
          matters: "Concentrated leadership makes the index vulnerable to a handful of names.",
          benefits: "Tech and AI shareholders; emerging-market investors.",
          hurt: "Defensive and value investors who rotated in July and lagged in August.",
          takeaway: "The rotation of July reversed: in August, the giants led again." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "Returns, August 2026 (%)", dot: "blue", data: [
          { label: "US tech sector", value: 6.25, display: "+6.25%", tone: "violet" }, { label: "Nasdaq", value: 3.9, display: "≈+4%", tone: "blue" }, { label: "EM stocks", value: 3.4, tone: "green" },
          { label: "S&P 500", value: 2.7, tone: "gold" }, { label: "DM stocks", value: 2.6, tone: "cyan" }, { label: "Dow", value: 1.3, display: "≈+1.3%", tone: "muted" } ],
          source: "Advisor Perspectives; Vested Finance; Saxo; Savvy Wealth. Figures vary slightly by source." },
        { t: "stats", items: [{ value: "~7,686", label: "S&P 500 close, 31 August", tone: "gold" }] },
        { t: "sidebar", title: "Breadth", text: "How many stocks are participating in a rally. Narrow breadth — gains concentrated in a few giants — tends to make indices more fragile, because there's less support if leaders stumble." },
      ],
    },

    // ── 20 BONDS ─────────────────────────────────────────────────────────
    {
      section: "Markets · Fixed Income", toc: "Bond Markets",
      kicker: "Markets · Bonds",
      title: "A 20-month high for the 10-year",
      deck: "Treasury yields climbed on supply, inflation risk and a hawkish Fed — then eased as oil fell.",
      left: [
        { t: "lead", text: "In mid-August the 10-year Treasury yield rose toward **4.75%**, its highest in 20 months, as \"surging credit supply and inflation risks\" extended a sell-off in long-dated bonds. The 30-year briefly touched about **5.31%**." },
        { t: "p", text: "Two kinds of borrowing were blamed: soaring debt issuance from AI companies building data centres, and higher deficit spending by the federal government. When more bonds come to market than investors want at current prices, prices fall and yields rise." },
        { t: "p", text: "Late in the month, yields eased — to about **4.65%** on 25 August — as lower energy prices softened near-term inflation fears. Schwab raised its expected range for the 10-year to 4.25–4.75%. The September jobs-report surprise would push them up again." },
        { t: "fiveq",
          happened: "The 10-year yield hit ~4.75% (a 20-month high) before easing to ~4.65%.",
          matters: "Higher long-term yields tighten financial conditions even without a Fed hike.",
          benefits: "Buyers of new bonds locking in higher yields.",
          hurt: "Mortgage borrowers and the Treasury's interest bill.",
          takeaway: "Bond supply is now a macro force in its own right — from Washington and from Silicon Valley." },
      ],
      right: [
        { t: "chart", title: "US Treasury yields, August (%)", dot: "blue", unit: "%", decimals: 2, data: [
          { label: "10-yr, mid-Aug high", value: 4.75, tone: "blue" }, { label: "10-yr, 25 Aug", value: 4.65, tone: "violet" }, { label: "30-yr high", value: 5.31, display: "~5.31%", tone: "gold" } ],
          source: "Trading Economics; Nikkei; Schwab, Aug 2026." },
        { t: "sidebar", title: "Supply and demand for bonds", text: "Governments and companies sell bonds to borrow. If issuance grows faster than buyers' appetite, they must offer higher yields to clear the market — regardless of what the central bank does with short-term rates." },
        { t: "analysis", text: "AI is now affecting the bond market as well as the stock market. Data centres are financed partly with debt, and that borrowing competes with the Treasury for the same investors." },
      ],
    },

    // ── 21 CURRENCIES ────────────────────────────────────────────────────
    {
      section: "Markets · Currencies", toc: "Currencies",
      kicker: "Markets · FX",
      title: "The dollar's second soft month",
      deck: "A hawkish Fed couldn't stop the dollar slipping — a sign of how much else was weighing on it.",
      left: [
        { t: "lead", text: "The dollar index fell for a second straight month in August — by about **0.2%**, a small move that hid bigger swings. It hit a three-month low of about **98.80** on 21 August as traders trimmed Fed hike bets after softer data, before Jackson Hole and the jobs report revived them." },
        { t: "p", text: "The euro reached a two-month high near **$1.1614** in mid-August, supported by expectations of an ECB hike. The yen held around **159** per dollar after the late-July intervention; one report said the US Treasury had funded its share of yen purchases from its euro holdings." },
        { t: "p", text: "Fiscal worries played a part too: some reports tied the dollar's dip to the national debt crossing $40 trillion. A currency is, among other things, a claim on a government's credibility — and August's debasement trade was partly a vote on that." },
        { t: "fiveq",
          happened: "The dollar index slipped ~0.2% (second monthly fall), touching 98.80 on 21 Aug.",
          matters: "A softer dollar eases financial conditions worldwide.",
          benefits: "Emerging markets with dollar debts; US exporters; gold.",
          hurt: "European and Japanese exporters as their currencies firm.",
          takeaway: "Hawkish words weren't enough to lift the dollar while fiscal doubts grew." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Currency marks, August", dot: "violet", rows: [
          ["Dollar index low (21 Aug)", "98.80"], ["Dollar index, month", "≈ –0.2%"], ["EUR/USD high (mid-Aug)", "~1.1614"], ["USD/JPY (after intervention)", "~159"] ],
          source: "Trading Economics; RTT News; BBVA, Aug–Sep 2026." },
        { t: "sidebar", title: "Safe-haven currencies", text: "In a crisis, investors traditionally buy the dollar, the Swiss franc and the yen. When the dollar falls during a war, it suggests investors are worried about the US itself — its debt and its politics — not just the world." },
      ],
    },

    // ── 22 OIL ───────────────────────────────────────────────────────────
    {
      section: "Commodities · Energy", toc: "Oil & Energy",
      kicker: "Commodities",
      title: "A $12 round trip",
      deck: "Oil ended August barely changed — after one of its most volatile months of the year.",
      left: [
        { t: "lead", text: "WTI crude closed August at about **$85.76**, up just **1.3%** on the month. That calm figure hides a wild ride: Brent fell below **$80** on 4 August on Iran–Oman progress, surged to **$91.49** by 18 August as talks stalled, and dropped back to the mid-$80s by month-end." },
        { t: "p", text: "Supply was being rebuilt in the background. OPEC+ had agreed in July to add 188,000 barrels a day for August, and Gulf producers worked to restore output cut during the spring closure. S&P Global said it did not expect Gulf production to recover fully until at least early 2027." },
        { t: "p", text: "For consumers, the result was relief at the pump rather than a reversal: US gasoline fell 2.9% in July but stayed about 25% higher than a year earlier. Europe's bigger worry was gas, up about 16% since June ahead of winter." },
        { t: "fiveq",
          happened: "Oil swung about $12 a barrel on Hormuz headlines but ended nearly flat (WTI +1.3%).",
          matters: "Volatility itself is costly — it makes planning and hedging harder for every fuel user.",
          benefits: "Traders and producers able to lock in high prices on the spikes.",
          hurt: "Airlines, hauliers and importers who can't hedge every swing.",
          takeaway: "Oil is no longer pricing barrels. It's pricing diplomacy." },
      ],
      right: [
        { t: "chart", title: "Brent swings in August ($/bbl)", dot: "red", data: [
          { label: "4 Aug low", value: 79.5, display: "<$80", tone: "green" }, { label: "18 Aug high", value: 91.49, display: "$91.49", tone: "red" }, { label: "WTI close", value: 85.76, display: "$85.76", tone: "gold" } ],
          source: "The National; Reuters; Savvy Wealth (WTI month-end)." },
        { t: "stats", items: [{ value: "+1.3%", label: "WTI in August", tone: "gold" }, { value: "+16%", label: "European gas since June", tone: "red" }] },
        { t: "sidebar", title: "Hedging", text: "Locking in a future price with a contract today. Airlines and utilities hedge fuel to avoid nasty surprises — but hedges cost money and never cover everything, so volatile months still hurt." },
      ],
    },

    // ── 23 GOLD ──────────────────────────────────────────────────────────
    {
      section: "Commodities · Gold", toc: "Gold & Precious Metals",
      kicker: "Commodities",
      title: "Gold's best month since January",
      deck: "The \"debasement trade\" returned — and precious metals led it.",
      left: [
        { t: "lead", text: "Spot gold rose **$391.23** an ounce in August — about **9.7%** — to close near **$4,437**, its strongest monthly gain since January, according to Sprott. Gold futures rose about 9.1% to around $4,482. Silver did even better, gaining roughly 15%." },
        { t: "p", text: "Analysts at IG described the move as the return of the debasement trade: gold, silver and bitcoin rallying together as global bond yields hit multi-decade highs and investors questioned governments' fiscal discipline. It followed a sharp unwind of the same trade in June." },
        { t: "p", text: "Context matters: gold had peaked in late January above $5,400 before a hawkish turn at the Fed dragged it lower, and silver had fallen about **53%** from its January peak near $121.6. So August was a powerful rebound from a much lower base — not a new record. Silver also has its own support: 2026 is on track to be its sixth straight year of supply deficit." },
        { t: "fiveq",
          happened: "Spot gold rose ~9.7% to ~$4,437; silver gained ~15%.",
          matters: "Precious metals are a real-time poll on confidence in paper money and public finances.",
          benefits: "Holders of gold and silver; central banks with large reserves.",
          hurt: "Jewellery buyers and industrial users of silver.",
          takeaway: "Gold rose even as the Fed got tougher — a vote of doubt on fiscal policy, not monetary policy." },
      ],
      right: [
        { t: "chart", title: "Gold, August 2026 ($/oz)", dot: "gold", data: [
          { label: "End-July (spot)", value: 4046, display: "~$4,046", tone: "muted" }, { label: "End-Aug (spot)", value: 4437, display: "$4,437", tone: "gold" }, { label: "Jan record", value: 5405, display: ">$5,400", tone: "violet" } ],
          source: "Sprott (+$391.23, +9.67%); Gulf News; IG. End-July implied." },
        { t: "stats", items: [{ value: "–53%", label: "Silver's drawdown from its January peak (before August)", tone: "red" }] },
        { t: "sidebar", title: "Supply deficit", text: "When a commodity's yearly consumption exceeds new production, stocks are drawn down to fill the gap. Six straight years of silver deficits mean inventories are shrinking — supportive for prices over time." },
      ],
    },

    // ── 24 CRYPTO ────────────────────────────────────────────────────────
    {
      section: "Markets · Digital Assets", toc: "Cryptocurrency",
      kicker: "Digital assets",
      title: "Bitcoin's best August since 2017",
      deck: "The digital version of the debasement trade had its strongest month in almost two years.",
      left: [
        { t: "lead", text: "Bitcoin rose about **24–25%** in August, according to CoinGlass data, closing near **$78,400** — its best month since November 2024 and its third-best August on record, behind 2017 (+65.6%) and 2013 (+30.7%)." },
        { t: "p", text: "Institutional money drove it. US spot bitcoin ETFs took in **$3.52 billion** of net inflows in August, their highest monthly total of 2026, according to SoSoValue — a dramatic reversal from June's record outflows and July's modest $194 million of inflows." },
        { t: "p", text: "The narrative was the same as gold's: an asset with a fixed supply, bought as a hedge against heavy government borrowing and a softer dollar. Analysts still cautioned that September is historically weak for crypto, and bitcoin briefly dipped below $77,000 in the first days of the month." },
        { t: "fiveq",
          happened: "Bitcoin gained ~24–25% to ~$78,400; spot ETFs drew $3.52bn.",
          matters: "Large ETF flows show crypto is now part of mainstream portfolio hedging.",
          benefits: "Holders who bought June's lows; ETF issuers.",
          hurt: "Short sellers betting the bear market would continue.",
          takeaway: "Bitcoin traded like digital gold in August — and investors paid up for it." },
      ],
      right: [
        { t: "chart", title: "Bitcoin's best Augusts (%)", dot: "violet", unit: "%", data: [
          { label: "2017", value: 65.6, tone: "violet" }, { label: "2013", value: 30.7, tone: "blue" }, { label: "2026", value: 24.5, display: "~24–25%", tone: "gold" } ],
          source: "CoinGlass; ChainCatcher via KuCoin." },
        { t: "chart", title: "Spot bitcoin ETF net flows ($m)", dot: "green", data: [
          { label: "July", value: 194, display: "+$194m", tone: "muted" }, { label: "August", value: 3520, display: "+$3.52bn", tone: "green" } ], source: "SoSoValue via Cointelegraph; Galaxy Research." },
        { t: "sidebar", title: "Fixed supply", text: "Bitcoin's code caps total supply at 21 million coins. That scarcity is the core of the \"digital gold\" argument — and why it trades alongside gold when people fear currency debasement." },
      ],
    },

    // ── 25 AI ────────────────────────────────────────────────────────────
    {
      section: "Theme · Artificial Intelligence", toc: "Artificial Intelligence",
      kicker: "Theme of the cycle",
      title: "The AI trade recovers its nerve",
      deck: "After July's rout, August brought the numbers investors wanted — and a new worry about how AI is being financed.",
      left: [
        { t: "lead", text: "On 26 August Nvidia reported quarterly revenue of **$96.2 billion**, up **106%** on a year earlier, with data-centre revenue of **$89 billion** (+117%). It guided next-quarter revenue to about **$108 billion**, above the roughly $104 billion analysts expected, and forecast 70% growth for the following fiscal year." },
        { t: "p", text: "The results helped technology stocks gain about **6.25%** in August, recovering much of July's chip sell-off. But there were cracks: Nvidia expects its gross margin to fall from 75% toward **71–72%** because of rising memory costs — the same squeeze that hurt Apple in July — and its outlook assumes no data-centre sales to China." },
        { t: "p", text: "The new worry was financing. Bond analysts blamed part of the rise in long-term Treasury yields on soaring debt issuance by AI companies. The AI boom is no longer paid for only out of cash flow; it is increasingly borrowed — linking the fortunes of tech stocks to the bond market." },
        { t: "fiveq",
          happened: "Nvidia doubled revenue and guided above forecasts; AI firms' borrowing added to bond supply.",
          matters: "AI investment is big enough to move both equity indices and interest rates.",
          benefits: "Chip designers and cloud providers with pricing power.",
          hurt: "Memory buyers facing higher costs; bond holders facing extra supply.",
          takeaway: "AI demand is real. The question has moved from 'will it pay?' to 'who's borrowing to build it?'" },
      ],
      right: [
        { t: "chart", title: "Nvidia, fiscal Q2 2027 ($bn)", dot: "green", data: [
          { label: "Revenue", value: 96.2, display: "$96.2bn", tone: "green" }, { label: "Data centre", value: 89, display: "$89bn", tone: "blue" }, { label: "Q3 guide", value: 108, display: "~$108bn", tone: "gold" } ],
          source: "Nvidia results release, 26 Aug 2026; SiliconANGLE." },
        { t: "stats", items: [{ value: "+106%", label: "Nvidia revenue growth, y/y", tone: "green" }, { value: "71–72%", label: "Gross margin guide (from 75%)", tone: "gold" }] },
        { t: "sidebar", title: "Gross margin", text: "The share of revenue left after the direct cost of making a product. Nvidia's ~75% is extraordinary for a hardware company; a few points lower still leaves it among the most profitable firms on Earth." },
      ],
    },

    // ── 26 TRADE ─────────────────────────────────────────────────────────
    {
      section: "Theme · Global Trade", toc: "Global Trade",
      kicker: "The connective tissue",
      title: "America rebuilds its tariff wall",
      deck: "After the courts struck down one set of tariffs, Washington built a new one under a different law.",
      left: [
        { t: "lead", text: "On 24 July the 10% global import surcharge imposed under Section 122 of the Trade Act expired. In its place, the US Trade Representative imposed new **Section 301** tariffs of **10% to 12.5%** on imports from **60** major trading partners — together accounting for about **99%** of US imports." },
        { t: "p", text: "The new tariffs are framed around forced-labour enforcement. Seventeen economies that have agreed to prohibit forced-labour imports through \"Agreements on Reciprocal Trade\" pay the lower 10% rate. Goods already covered by Section 232 national-security duties — steel, aluminium and others — are exempt." },
        { t: "p", text: "By August, law firm Covington counted six new Section 301 proceedings, several concluded in record time, and importers were challenging the tariffs at the US Court of International Trade. More investigations into excess manufacturing capacity could bring higher rates on particular countries." },
        { t: "fiveq",
          happened: "New Section 301 tariffs (10–12.5%) replaced the expired Section 122 surcharge on 60 economies.",
          matters: "Tariff costs stay high even after a court defeat — only the legal basis changed.",
          benefits: "Domestic producers competing with imports; countries that signed reciprocal deals.",
          hurt: "Importers, and consumers who pay higher prices.",
          takeaway: "America's tariff policy has proved durable: it changes its legal clothes, not its shape." },
      ],
      right: [
        { t: "chart", type: "kv", title: "The new tariff regime", dot: "blue", rows: [
          ["Legal basis", "Section 301 (forced labour)"], ["Effective", "24 July 2026"], ["Rates", "10% – 12.5%"], ["Economies covered", "60 (~99% of imports)"], ["At the 10% rate", "17 (reciprocal deals)"], ["Exempt", "Section 232 goods"] ],
          source: "USTR; Orrick; Holland & Knight; Morgan Lewis; Covington, Jul–Aug 2026." },
        { t: "stats", items: [{ value: "+19.8%", label: "China's goods trade, August (yuan)", tone: "green" }] },
        { t: "sidebar", title: "Section 301", text: "A provision of the Trade Act of 1974 that lets the US respond to foreign practices it judges unfair. It was the basis for the 2018 China tariffs — and is harder to challenge in court than emergency powers." },
      ],
    },

    // ── 27 DASHBOARD ─────────────────────────────────────────────────────
    {
      section: "Macro Dashboard", toc: "Macro Dashboard",
      kicker: "The four gauges", kickerTone: "blue",
      title: "Macro Dashboard",
      deck: "Inflation, rates, growth and jobs — August's readings side by side.",
      full: [
        { t: "gauges", items: [
          { title: "Inflation (latest)", dot: "gold", values: [{ value: "3.4%", label: "US CPI, July", tone: "gold" }, { value: "3.3%", label: "Euro area, Aug flash" }, { value: "2.9%", label: "UK CPI, July" }, { value: "3.7%", label: "US PCE (Warsh)", tone: "red" }], source: "BLS; Eurostat; ONS; Federal Reserve." },
          { title: "Policy rates", dot: "blue", values: [{ value: "3.50–3.75%", label: "Fed (hike signalled)", tone: "blue" }, { value: "3.00%", label: "Bank of Korea (+25bp)", tone: "gold" }, { value: "14.00%", label: "Brazil (–25bp)" }], source: "Central banks, August 2026." },
          { title: "Growth", dot: "green", values: [{ value: "7.8%", label: "India Apr–Jun", tone: "green" }, { value: "1.5%", label: "US Q2 (2nd est.)" }, { value: "1.1%", label: "Japan Q2 (ann.)", tone: "red" }], source: "MoSPI; BEA; Cabinet Office." },
          { title: "US labour market", dot: "violet", values: [{ value: "+162k", label: "Payrolls, Aug", tone: "green" }, { value: "4.1%", label: "Unemployment" }, { value: "61.6%", label: "Participation", tone: "gold" }], source: "BLS, released 4 September 2026." },
        ] },
        { t: "callout", title: "How the four fit together in August", text: "Inflation eased slightly in the US but rose in Europe and the UK as energy bills reset. Growth was strong in India and soft in Japan. US hiring rebounded. Put together, the gauges pointed one way: toward the rate hikes that September would deliver." },
      ],
    },

    // ── 28 COMPANY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Company Spotlight", toc: "Company Spotlight — Nvidia",
      kicker: "Company spotlight",
      title: "Nvidia: $96 billion in a quarter",
      deck: "The company at the centre of the AI boom doubled its revenue again — and the market still couldn't decide how to react.",
      left: [
        { t: "lead", text: "Nvidia's second quarter of fiscal 2027, reported on 26 August, produced **$96.2 billion** of revenue — up **106%** in a year. Data-centre sales, the chips that train and run AI models, reached **$89 billion**, beating the roughly $86 billion Wall Street expected. Adjusted earnings were **$2.22** a share against about $2.10 forecast." },
        { t: "p", text: "Its guidance was bolder still: about **$108 billion** next quarter, plus or minus 2%, versus roughly $104 billion expected — and around **70%** revenue growth next fiscal year, against analysts' 44%. The outlook assumes no data-centre compute sales to China." },
        { t: "p", text: "The share reaction was confused. Reports variously had the stock dipping 1–2% after hours, then rising more than 5% during the call; one had it up about 7% the next morning. The disagreement itself is telling: at Nvidia's size, even spectacular numbers are partly priced in, and investors are watching margins — guided down to 71–72% on memory costs — as closely as growth." },
        { t: "fiveq",
          happened: "Nvidia's revenue rose 106% to $96.2bn and it guided to ~$108bn next quarter.",
          matters: "Nvidia's results are the best single read on global AI investment.",
          benefits: "Nvidia, its suppliers (such as TSMC) and data-centre builders.",
          hurt: "Rivals competing for the same customers; memory buyers squeezed on cost.",
          takeaway: "The AI build-out is still accelerating — the debate is about margins and financing, not demand." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Nvidia, fiscal Q2 2027", dot: "green", rows: [
          ["Revenue", "$96.2bn (+106%)"], ["Data centre", "$89bn (+117%)"], ["Adj. EPS", "$2.22 vs ~$2.10"], ["Q3 guide", "~$108bn ±2%"], ["Next FY growth guide", "~70% (Street 44%)"], ["Gross margin", "75% → 71–72% guide"] ],
          source: "Nvidia results release; SiliconANGLE; Insider Monkey; Fortune, 26–27 Aug 2026." },
        { t: "quote", text: "At Nvidia's scale, beating forecasts isn't news. Beating them by enough to surprise is.", by: "The Financial Frontier" },
        { t: "sidebar", title: "Guidance", text: "A company's own forecast for coming results. Share prices often move more on guidance than on the quarter just reported, because markets price the future." },
      ],
    },

    // ── 29 COUNTRY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Country Spotlight", toc: "Country Spotlight — Oman",
      kicker: "Country spotlight",
      title: "Oman: the Gulf state outside the strait",
      deck: "A quiet sultanate became the centre of Hormuz diplomacy — and geography turned out to be its best economic asset.",
      left: [
        { t: "lead", text: "Most Gulf oil must pass through the Strait of Hormuz to reach the open sea. Oman's doesn't: its main export terminals and ports — including **Duqm** and Salalah — lie outside the strait on the Arabian Sea. That simple fact let Oman keep shipping crude through the conflict, when neighbours' exports were trapped." },
        { t: "p", text: "The World Bank credits that geography for a far milder slowdown than in states wholly dependent on the strait, and projects Omani growth of about **2.4%** in 2026; S&P later put it at **3.5%**, citing favourable trade logistics. Kuwait, with no other outlet, was reported to be evaluating a route to Duqm — though analysts note major political and commercial obstacles to any pipeline." },
        { t: "p", text: "Oman's other asset is trust. Long dubbed the \"Switzerland of the Middle East\" for its neutrality, it was negotiating directly with Iran over managing Hormuz traffic in August — which drew the US president's threat on 17 August. Its ports have not been immune either: Duqm and Salalah were struck by projectiles during the conflict." },
        { t: "fiveq",
          happened: "Oman kept exporting through ports outside Hormuz and mediated Iran talks — and drew a US threat.",
          matters: "Alternative routes reduce the world's dependence on one chokepoint.",
          benefits: "Oman's economy and ports; buyers seeking non-Hormuz supply.",
          hurt: "Oman's diplomatic position, caught between Washington and Tehran.",
          takeaway: "In a strait crisis, the most valuable real estate is the coast just outside it." },
      ],
      right: [
        { t: "chart", title: "Oman 2026 growth forecasts (%)", dot: "gold", unit: "%", data: [
          { label: "World Bank", value: 2.4, tone: "blue" }, { label: "S&P (Sep)", value: 3.5, tone: "gold" } ], source: "World Bank; S&P Global via The National, 2026." },
        { t: "chart", type: "kv", title: "Oman's position", dot: "blue", rows: [["Key ports", "Duqm, Salalah, Sohar"], ["Outside Hormuz?", "Main terminals, yes"], ["Role", "Mediator with Iran"]], source: "The National; Carnegie; PISM." },
        { t: "sidebar", title: "Chokepoints", text: "Narrow passages that carry a large share of world trade — Hormuz, the Suez Canal, the Strait of Malacca. When one is blocked, the value of routes around it soars." },
      ],
    },

    // ── 30 CHARTS ────────────────────────────────────────────────────────
    {
      section: "Charts That Explain the Month", toc: "Charts That Explain the Month",
      kicker: "Data",
      title: "Three charts that explain August",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Hard assets surged", dot: "gold", text: "Bitcoin +25%, gold +9.7%: the debasement trade returned." },
          { title: "2 · Debt kept climbing", dot: "red", text: "US debt passed $40 trillion; yields hit 20-month highs." },
          { title: "3 · Jobs came back", dot: "green", text: "Payrolls swung from –23k to +162k." },
        ] },
      ],
      full: [
        { t: "g2", left: [
          { t: "chart", title: "Chart 1 · August returns (%)", dot: "gold", unit: "%", data: [{ label: "Bitcoin", value: 24.5, display: "~25%", tone: "violet" }, { label: "Gold", value: 9.7, tone: "gold" }, { label: "S&P 500", value: 2.7, tone: "blue" }, { label: "WTI", value: 1.3, tone: "red" }], source: "CoinGlass; Sprott; Advisor Perspectives; Savvy Wealth." },
          { t: "chart", title: "Chart 2 · US debt ($T)", dot: "red", data: [{ label: "Oct 2025", value: 38, display: "$38T", tone: "muted" }, { label: "~Mar 2026", value: 39, display: "$39T", tone: "violet" }, { label: "Aug 2026", value: 40.05, display: "$40.05T", tone: "red" }], source: "US Treasury via AP." },
        ], right: [
          { t: "chart", title: "Chart 3 · US payrolls (k)", dot: "green", data: [{ label: "July", value: -23, display: "–23k", tone: "red" }, { label: "August", value: 162, display: "+162k", tone: "green" }], source: "BLS." },
          { t: "callout", title: "Read together", text: "Chart 2 is the worry: borrowing that keeps growing. Chart 1 is the response: investors hedging with assets that can't be printed. Chart 3 is the trigger for what came next — a job market strong enough that the Fed could hike without fearing it would break something." },
        ] },
        { t: "note", text: "All figures sourced from the institutions listed on p.36. Charts are drawn to the values shown and are not to a common scale." },
      ],
    },

    // ── 31 INFOGRAPHIC ───────────────────────────────────────────────────
    {
      section: "Infographic", toc: "Infographic: Where the Money Went",
      kicker: "The month at a glance",
      title: "Where the money went",
      deck: "Into gold, silver and bitcoin; back into tech; out of long bonds and, gently, out of the dollar.",
      full: [
        { t: "g2", left: [
          { t: "flows", title: "The rotation of August", items: [
            { label: "Into bitcoin (ETF inflows $3.5bn)", width: 84, tag: "+25%" },
            { label: "Into silver & gold", width: 66, tag: "debasement" },
            { label: "Back into tech", width: 48, tag: "+6.25%" },
            { label: "Into emerging markets", width: 30, tag: "+3.4%" },
            { label: "Out of long Treasuries", width: 34, dir: "out", tag: "yields up" },
            { label: "Out of the dollar", width: 14, dir: "out", tag: "–0.2%" } ],
            note: "Widths illustrate direction and rough scale, not measured flows." },
        ], right: [
          { t: "bignums", items: [
            { kicker: "Biggest number", value: "$40T", label: "US national debt, passed 18 August" },
            { kicker: "Boldest move", value: "+162k", label: "Payrolls — triple the forecast", tone: "blue" },
            { kicker: "Biggest risk", value: "~60%", label: "Market odds of a September Fed hike", tone: "red" } ] },
        ] },
        { t: "strip", items: [{ value: "$4,437", label: "Gold, 31 Aug (spot)" }, { value: "~$78.4k", label: "Bitcoin, 31 Aug" }, { value: "7.8%", label: "India Apr–Jun GDP" }, { value: "2.95%", label: "Japan 10-yr high" }] },
      ],
    },

    // ── 32 EXPLAINER ─────────────────────────────────────────────────────
    {
      section: "Economic Explainer", toc: "Explainer: The Debasement Trade",
      kicker: "Economics, explained",
      title: "What is the debasement trade?",
      deck: "Why gold, silver and bitcoin can rise together even when a central bank is talking tough.",
      left: [
        { t: "lead", text: "To *debase* a currency originally meant mixing cheaper metal into coins, so each coin held less silver or gold. Today it means a government's money losing value through persistent inflation — often because the state borrows heavily and, investors fear, will tolerate inflation to make its debts easier to carry." },
        { t: "p", text: "The debasement trade is the investment response: buying assets whose supply can't easily be increased. Gold and silver are the classics; bitcoin, with its fixed 21 million coin limit, is the modern addition. Some investors also count shares in companies with strong pricing power and real assets such as property." },
        { t: "p", text: "Why did it come back in August, when the Fed was promising to fight inflation? Because the worry isn't about this year's interest rate. It's about the long run: a $40 trillion debt growing by a trillion dollars every few months, deficits funding a war, and interest costs above a trillion a year. Investors were hedging against the possibility that fiscal pressure eventually overwhelms monetary resolve." },
        { t: "p", text: "The trade can unwind quickly, as it did in June, when real interest rates rise sharply or confidence returns. That's why it's a hedge, not a certainty." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "How the trade works", dot: "gold", steps: [
          { value: "1", label: "Debt and deficits keep rising ($40T)", tone: "red" },
          { value: "2", label: "Investors doubt inflation will return to 2%", tone: "gold" },
          { value: "3", label: "They buy scarce assets: gold, silver, bitcoin", tone: "violet" },
          { value: "4", label: "Prices rise even as rates rise", tone: "green" } ], source: "Conceptual; August 2026 figures from pp.07, 23–24." },
        { t: "sidebar", title: "A little history", text: "Roman emperors steadily reduced the silver content of the denarius, from nearly pure under Augustus to a few per cent by the late third century — one of history's clearest cases of debasement, and of the inflation that followed." },
        { t: "callout", title: "The takeaway", text: "The debasement trade is a bet on fiscal behaviour, not on the next rate decision." },
      ],
    },

    // ── 33 VOCAB ─────────────────────────────────────────────────────────
    {
      section: "Vocabulary Builder", toc: "Vocabulary",
      kicker: "Speak the language",
      title: "Ten terms from this issue",
      deck: "Every phrase below appeared in August's stories.",
      full: [
        { t: "terms", items: [
          { term: "Debasement", def: "A currency losing value through persistent inflation, often tied to heavy borrowing (p.32)." },
          { term: "Jackson Hole", def: "The Kansas City Fed's annual August symposium, often used for big policy signals (p.08)." },
          { term: "PCE inflation", def: "The Fed's preferred price gauge, at 3.7% in August (p.07)." },
          { term: "Term premium", def: "Extra yield for lending long; rises with uncertainty (p.04)." },
          { term: "GDI", def: "Gross domestic income — GDP measured from the income side (p.06)." },
          { term: "Price cap", def: "Ofgem's limit on standard UK energy tariffs, reset quarterly (p.14)." },
          { term: "Section 301", def: "US trade law used for the new 10–12.5% tariffs (p.26)." },
          { term: "Gross margin", def: "Revenue left after direct production costs — Nvidia's is ~75% (p.28)." },
          { term: "Chokepoint", def: "A narrow passage carrying a large share of trade, like Hormuz (p.29)." },
          { term: "Carry trade", def: "Borrowing cheaply in one currency to invest in a higher-yielding one (p.17)." },
        ] },
        { t: "callout", title: "Try it yourself", text: "\"Gold rallied on the debasement trade as term premia rose.\" Decoded: investors bought gold as a hedge against currency weakness, while demanding more yield to lend to governments for long periods." },
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
          { t: "puzzle", icon: "🎯", title: "Guess the Company", dot: "gold", paras: ["Three clues, one August headline-maker:"], list: ["Its quarterly revenue more than doubled to $96.2 billion.", "Its data-centre chips made $89 billion of that.", "It warned memory costs will trim its 75% margin."], answer: "Nvidia" },
          { t: "puzzle", icon: "🧠", title: "Trivia: true or false?", dot: "blue", paras: ["\"The Fed raised rates in August 2026.\""], answer: "False — there was no August meeting. The Fed chair *signalled* a possible hike at Jackson Hole." },
          { t: "puzzle", icon: "💡", title: "Scale check", dot: "green", paras: ["The US debt grew by about **$1 trillion in five months**. That's roughly **$6.6 billion a day** — about $76,000 every second."] },
        ], right: [
          { t: "meme", head: "Investors, August 2026:", a: "The Fed will fight inflation…", b: "…anyway, buying gold just in case", emoji: "🪙", caption: "the debasement trade in one picture" },
          { t: "puzzle", icon: "🔢", title: "By the numbers", dot: "violet", paras: ["Match the number to the story:"], rows: [["$40T", "US national debt"], ["162k", "August payrolls"], ["7.8%", "India's Apr–Jun growth"], ["2.95%", "Japan 10-yr yield high"]] },
          { t: "puzzle", icon: "🃏", title: "Cryptic clue", dot: "gold", paras: ["\"I'm 2%, firm and fixed; a chair defended me in Wyoming. What am I?\""], answer: "The Fed's inflation target" },
        ] },
        { t: "callout", icon: "😅", title: "The groan zone · three jokes we're not sorry for", text: "• Why did gold go to Jackson Hole? It heard there'd be a *firm* fixed target to rally against.  • Bitcoin and silver walked into a bar. The bartender said, \"Let me guess — you're both *hedging*.\"  • The US debt passed $40 trillion. Asked how it felt, it said it was just getting *started*." },
        { t: "note", text: "All puzzles use figures reported for August 2026. Sources on p.36." },
      ],
    },

    // ── 35 TO CLOSE ──────────────────────────────────────────────────────
    {
      section: "History · Culture · Ahead", toc: "History · Picks · The Month Ahead",
      kicker: "To close",
      title: "This month in history · What to read · The month ahead",
      full: [
        { t: "cards", cols: 3, items: [
          { title: "⏳ This month in history", dot: "gold", paras: ["On 15 August 1971, President Nixon \"closed the gold window\", ending the dollar's convertibility into gold for foreign governments. It ended the Bretton Woods system — and began the era of pure paper money.", "Fifty-five years later, August's debasement trade is a reminder that the question it raised — what backs a currency? — never fully went away."], source: "Historical context." },
          { title: "📚 Frontier picks", dot: "blue", paras: ["**Read:** Warsh's Jackson Hole text — short, and the clearest statement of the Fed's priorities.", "**Listen:** any primer on the 1971 \"Nixon shock\".", "**Watch:** a documentary on Japan's lost decades, for context on 30-year-high yields."], source: "Recommendations, not endorsements." },
          { title: "📅 The month ahead", dot: "violet", paras: ["**Watch for:** the Fed (15–16 Sep), BoE (17 Sep), ECB and BoJ September meetings; August CPI (11 Sep); Iran–Oman talks; and whether gold and bitcoin hold their gains."], source: "Forward-looking; not investment advice." },
        ] },
        { t: "table", title: "The August diary — key dates", dot: "gold", head: ["Date", "Event", "Page"], rows: [
          ["4 Aug", "Brent falls below $80 on Iran–Oman progress", "15"],
          ["5 Aug", "RBI holds at 5.25%; Brazil cuts to 14.00%", "10, 17"],
          ["6 Aug", "Banxico holds at 6.50%", "17"],
          ["11–12 Aug", "RBA holds at 4.35%", "18"],
          ["12 Aug", "US CPI for July: 3.4%, core 2.5%", "07"],
          ["17 Aug", "Japan Q2 GDP misses; JGB yield 30-yr high; Trump threatens Oman", "12, 15"],
          ["18 Aug", "US debt passes $40 trillion; Brent $91.49", "07, 22"],
          ["19 Aug", "UK CPI 2.9%; South Africa CPI 4.3%", "14, 16"],
          ["26 Aug", "Nvidia: $96.2bn revenue; US Q2 GDP 2nd est. 1.5%", "25, 28"],
          ["27 Aug", "Bank of Korea hikes to 3.00%; ECB account", "13, 18"],
          ["28 Aug", "Warsh at Jackson Hole: \"a firm fixed target\"", "08"],
          ["31 Aug", "India Q1 GDP 7.8%; gold +9.7% for the month", "10, 23"] ],
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
          "Federal Reserve — Chair Warsh, Jackson Hole keynote, 28 Aug 2026; coverage by NPR, Fortune, Axios, Al Jazeera, KPMG, Fox Business.",
          "BLS — CPI, July 2026 (12 Aug); Employment Situation, August 2026 (4 Sep); St. Louis Fed flash report; Kelly Services; Commercial Observer.",
          "BEA — GDP second estimate, Q2 2026 (26 Aug).",
          "US Treasury via AP, Al Jazeera, PBS, Irish Times, WSB-TV (WSJ) — national debt passes $40 trillion (18–19 Aug); Bipartisan Policy Center.",
          "Trading Economics, Schwab — US Treasury yields; Nikkei, Jiji via Adnkronos, Euronews — Japanese government bond yields.",
          "Advisor Perspectives, Vested Finance, Saxo, Savvy Wealth, Cetera, Tapeboard — August 2026 equity recaps.",
          "Sprott, IG, Advisor Perspectives — gold and silver; Gulf News — January record.",
          "CoinGlass via Cointelegraph and Forklog; SoSoValue; ChainCatcher via KuCoin — bitcoin and ETF flows.",
          "Nvidia — Q2 fiscal 2027 results (26 Aug); SiliconANGLE; Fortune; Insider Monkey; Invezz.",
          "The National, Reuters (via Tribune, Kitco, NST), Khaleej Times — oil prices and Hormuz talks; Al Jazeera, PBS, SCMP, UPI — Trump's threat to Oman.",
          "Trading Economics, RTT News, BBVA Research — dollar index, euro and yen.",
          "Eurostat — HICP, July final and August flash; ECB — account of the 22–23 July meeting (27 Aug); Euronews; ABN AMRO; Continuum Economics.",
          "ONS — Consumer price inflation, July 2026 (19 Aug); PwC; Morningstar.",
          "Cabinet Office (Japan) via Al Jazeera, Fortune, AP; DL Research.",
          "MoSPI / PIB — Q1 FY2026-27 GDP (31 Aug); Reserve Bank of India — MPC statement (5 Aug); Business Standard.",
          "National Bureau of Statistics of China — July (17 Aug) and August (15 Sep) data; Commerzbank; Khaleej Times; China Daily.",
          "Bank of Korea; Focus Economics; Asia Economy — 27 Aug hike. NAB, RBA — August hold.",
          "Banxico statement (6 Aug); BBVA Research; Bloomberg Línea. Banco Central do Brasil via O Povo (5 Aug). Buenos Aires Times.",
          "Statistics South Africa (19 Aug); Business Day; Trading Economics — Ghana, Zambia, Mozambique.",
          "USTR; Orrick; Holland & Knight; Morgan Lewis; Covington; Axios — Section 301 tariffs.",
          "World Bank; S&P Global via The National; Carnegie Endowment; PISM; Oman Observer — Oman.",
        ] },
        { t: "callout", title: "Method", text: "We separate fact (sourced figures), analysis (our reading) and opinion (labelled). Where sources disagreed — on gold's exact monthly gain, the S&P 500's return or Nvidia's share move — we give the range. Some charts are conceptual and are labelled as such. Data published in early September about August (jobs, China's August data, euro-area flash inflation) is included and dated. The Financial Frontier is an educational publication. Nothing herein is investment advice." },
      ],
    },
  ],
};
