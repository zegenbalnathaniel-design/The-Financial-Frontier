// Issue No. 02 — July 2026. Full-length print edition (rendered by scripts/build-report-pdfs.mjs).
// Every figure below is drawn from the sources listed on the Sources page. Where sources
// disagreed we use the primary release or say "about"; conceptual charts are labelled.

export default {
  slug: "2026-07",
  issueNumber: 2,
  month: "July 2026",
  title: "The Ceasefire That Wasn't",

  cover: {
    lines: ["The Ceasefire"],
    gold: "That Wasn't.",
    standfirst:
      "US strikes on Iran shattered a fragile truce and sent crude up by a quarter. The Fed held with three votes for a hike, the IMF trimmed world growth to 3.0%, and the AI trade had its worst month since 2008 for chipmakers.",
    tags: ["Iran & Hormuz", "Divided Fed", "Oil +24%", "Chip Rout", "Yen Intervention"],
  },

  contents: {
    oneLine:
      "A truce that broke, an oil price that jumped, and a market that stopped trusting the AI boom — all in the same four weeks.",
  },

  back: {
    text:
      "Issue No. 02 covered the month a ceasefire collapsed — oil's sharpest jump since March, a Federal Reserve leaning toward a hike, a historic chip sell-off and a yen rescue. Next issue, we follow the inflation those shocks set in motion.",
  },

  pages: [
    // ── 03 EDITOR'S LETTER ────────────────────────────────────────────────
    {
      section: "Editor's Letter", toc: "Editor's Letter",
      kicker: "From the editor",
      title: "A truce is not a peace",
      left: [
        { t: "lead", text: "June ended with hope: a memorandum signed on 17 June had pulled oil back to its pre-war level and calmed the Gulf. July took that hope apart in a week. After three attacks on tankers in the Strait of Hormuz, the United States struck Iranian targets, and the price of risk came roaring back." },
        { t: "p", text: "Brent crude finished July at **$90.12** a barrel, up roughly **24%** — its strongest month since March. Shipping insurers raised Hormuz war-risk premiums, the US Navy-led maritime centre declared the transit threat \"severe\", and the inflation that had just started to cool in America found a new source of fuel." },
        { t: "p", text: "Central banks noticed. The Federal Reserve held rates for a fifth meeting, but three of its twelve voters wanted a hike. The Bank of England split 6–3 the same way. South Korea actually raised rates, its first increase since 2023. The direction of travel for monetary policy quietly reversed." },
        { t: "p", text: "Meanwhile the stock market changed its mind about artificial intelligence. Chipmakers had their worst month since October 2008 even as one cloud giant reported its fastest growth in years. July was the month investors started asking who gets paid for the AI boom — not just who spends on it." },
      ],
      right: [
        { t: "box", title: "Three numbers that frame July", dot: "gold", paras: ["**$90.12** — Brent crude, 31 July close (+24% in the month)", "**9–3** — the Fed vote to hold, with three dissents for a hike", "**–21%** — Philadelphia Semiconductor Index in July, worst month since 2008"], source: "Reuters via The Peninsula; Federal Reserve; Bloomberg via Fortune." },
        { t: "quote", text: "A ceasefire lowers the temperature. It doesn't remove the fuel.", by: "The Financial Frontier" },
        { t: "p", text: "This is our second issue. As before, every figure carries a source, every analysis is labelled, and every story answers the same five questions. Where sources disagreed — and in July they often did — we say so." },
      ],
      full: [
        { t: "cards", cols: 2, items: [
          { title: "What we cover", text: "Eight regions, every major market, the central banks — and the themes (energy, AI, trade) that tie them together." },
          { title: "How to read it", text: "Facts carry a source. Analysis is our reading of those facts. Opinion is labelled as opinion." },
        ] },
      ],
    },

    // ── 04 GLOBAL I ───────────────────────────────────────────────────────
    {
      section: "The Global Economy · The Outlook", foot: "The Global Economy", toc: "The Global Economy — The Outlook",
      kicker: "The big picture · Part I",
      title: "Crosscurrents of war and technology",
      deck: "The IMF's mid-year update trimmed this year and lifted next — a war dragging growth down, an AI boom pushing it up.",
      left: [
        { t: "lead", text: "On 8 July the International Monetary Fund published its World Economic Outlook Update under a telling title: *Global Economy in Crosscurrents of War and Technology*. It now expects the world economy to grow **3.0%** in 2026 — a tenth of a point below April — and **3.4%** in 2027, a little better than before." },
        { t: "p", text: "The two forces pull in opposite directions. The Middle East war and its energy shock raise costs for every importer of oil and gas. The AI investment boom — data centres, chips, power — props up spending and trade in the economies building it. The net result is a world that is still growing, but unevenly and with less room for error." },
        { t: "p", text: "The more worrying number was inflation. The Fund raised its 2026 global headline inflation forecast by 0.3 points to **4.7%**, and said the disinflation that began in early 2024 has stalled. It expects 3.9% in 2027 — still well above where central banks want it." },
        { t: "fiveq",
          happened: "The IMF cut 2026 world growth to 3.0%, raised 2027 to 3.4% and lifted 2026 inflation to 4.7%.",
          matters: "Disinflation has stalled — so interest rates are less likely to fall, and may rise.",
          benefits: "AI-investing economies and energy exporters outside the conflict zone.",
          hurt: "Energy importers and households, as prices rise faster than expected.",
          takeaway: "The world is not slowing sharply — but it has stopped getting cheaper, and that changes everything for central banks." },
      ],
      right: [
        { t: "chart", title: "IMF world growth forecasts (%)", dot: "gold", unit: "%", data: [
          { label: "2026 (Apr)", value: 3.1, tone: "muted" }, { label: "2026 (Jul)", value: 3.0, tone: "blue" },
          { label: "2027 (Jul)", value: 3.4, tone: "gold" } ], source: "IMF World Economic Outlook Update, 8 July 2026." },
        { t: "stats", items: [{ value: "4.7%", label: "IMF 2026 global inflation (+0.3pt)", tone: "red" }, { value: "2.3%", label: "IMF 2026 US growth (unchanged)", tone: "blue" }] },
        { t: "sidebar", title: "Why 0.1 point matters", text: "A tenth of a point of world growth is roughly a hundred billion dollars of output. More important is the direction: the IMF says the downside risks — war, trade fragmentation, a market correction — outweigh the upside." },
        { t: "analysis", text: "The headline number barely moved. The story is underneath: inflation forecasts went up, not down. An outlook where growth holds but prices don't fall is exactly the one that keeps interest rates higher for longer." },
      ],
    },

    // ── 05 GLOBAL II ──────────────────────────────────────────────────────
    {
      section: "The Global Economy · The Shocks", foot: "The Global Economy", toc: "The Global Economy — Three Shocks",
      kicker: "The big picture · Part II",
      title: "Three shocks in one month",
      deck: "July's surprises came from the Gulf, from Silicon Valley and from the price data — and each one made the others worse.",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · The war shock", dot: "red", text: "Renewed US–Iran fighting from about 7 July ended the June truce. Hormuz transits were again treated as severe-risk, and Brent rose about 24% in the month.", source: "Al Jazeera; Reuters, July 2026." },
          { title: "2 · The AI shock", dot: "violet", text: "Investors began to doubt whether giant AI budgets will pay off. The Philadelphia Semiconductor Index fell 21% — its worst month since October 2008.", source: "Bloomberg via Fortune, 2 Aug 2026." },
          { title: "3 · The price shock", dot: "gold", text: "June's soft US inflation print (3.5%) relied on a 9.7% monthly drop in gasoline. With oil back up, markets priced a likely Fed hike by September.", source: "BLS CPI, 14 Jul; CME FedWatch via Reuters." },
        ] },
      ],
      left: [
        { t: "p", text: "Each shock on its own would have been manageable. Together, they formed a loop. Higher oil feeds inflation; higher inflation makes rate hikes more likely; the prospect of higher rates is poison for richly valued growth stocks — exactly the AI names that were already wobbling. By the end of the month the 10-year US Treasury yield had risen about 30 basis points to roughly **4.75%**." },
        { t: "p", text: "That chain is why July felt bigger than its headline numbers. The S&P 500 finished almost exactly flat. But beneath the surface, money rotated violently: out of chips and into energy, out of the dollar and into the yen, out of long bonds as yields climbed." },
        { t: "fiveq",
          happened: "War, an AI rethink and an inflation scare arrived together and reinforced one another.",
          matters: "Interlocking shocks leave policymakers with no move that fixes all three.",
          benefits: "Energy producers and holders of cash earning higher yields.",
          hurt: "Growth investors, bond holders and fuel-importing economies.",
          takeaway: "July's lesson: the shocks that matter are the ones that connect." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "How the shocks connect", dot: "gold", steps: [
          { value: "Oil ↑", label: "Hormuz risk lifts crude ~24%", tone: "red" },
          { value: "CPI ↑", label: "Fuel feeds back into inflation", tone: "gold" },
          { value: "Rates ↑", label: "10-yr yield +30bp; hike odds rise", tone: "blue" },
          { value: "Tech ↓", label: "High-valuation chips sell off", tone: "violet" } ], source: "Frontier framework; figures from sources on p.36." },
        { t: "sidebar", title: "What a basis point is", text: "One hundredth of a percentage point. A 30bp rise in the 10-year yield — from about 4.45% to 4.75% — lifts the cost of mortgages and corporate borrowing across the economy." },
        { t: "callout", title: "Key takeaway", text: "Watch the links, not the headlines: one oil shock reached the bond market and the chip sector inside a single month." },
      ],
    },

    // ── 06 US I ───────────────────────────────────────────────────────────
    {
      section: "Region · United States · I", foot: "Region · United States", toc: "United States — Growth & Jobs",
      kicker: "Region · United States",
      title: "Slower growth, softer jobs",
      deck: "The world's largest economy grew at its slowest pace in a year — and the jobs data that followed was weaker still.",
      left: [
        { t: "lead", text: "The first estimate of second-quarter GDP, released on 30 July, showed the US economy growing at a **1.5%** annual rate — down from 2.1% in the first quarter and below the 2.1% economists expected. Consumer spending, investment and exports rose, but government spending fell and imports climbed." },
        { t: "p", text: "Then came the jobs report for July, published on 7 August: employers **shed 23,000 jobs**, the first negative month since February, against expectations of a gain. Revisions removed more than 100,000 jobs from May and June. Government payrolls fell by over 50,000 and leisure and hospitality by about 40,000." },
        { t: "p", text: "The unemployment rate actually dipped to **4.1%** from 4.2% — but for a bad reason. Labour-force participation fell to **61.4%**, the lowest since February 2021, as people stopped looking for work. Wage growth slowed to 3.2% a year." },
        { t: "fiveq",
          happened: "Q2 GDP grew 1.5% (annualised); July payrolls fell 23,000 and participation hit a five-year low.",
          matters: "A cooling job market weakens the case for the rate hike that higher oil prices were building.",
          benefits: "Borrowers, if softer data keeps the Fed from hiking.",
          hurt: "Job-seekers, younger workers and public-sector employees.",
          takeaway: "The US isn't in recession — but July's data showed an economy losing momentum just as prices turned up again." },
      ],
      right: [
        { t: "chart", title: "US real GDP growth (annualised %)", dot: "blue", unit: "%", data: [
          { label: "Q1 2026", value: 2.1, tone: "blue" }, { label: "Q2 (expected)", value: 2.1, tone: "muted" }, { label: "Q2 (actual)", value: 1.5, tone: "gold" } ],
          source: "BEA advance estimate, 30 Jul 2026; LSEG consensus. Q1 later revised to 2.5% (30 Sep)." },
        { t: "stats", items: [{ value: "–23k", label: "Payrolls, July (BLS, 7 Aug)", tone: "red" }, { value: "4.1%", label: "Unemployment rate, July", tone: "white" }] },
        { t: "stats", items: [{ value: "61.4%", label: "Participation — lowest since Feb 2021", tone: "gold" }, { value: "3.2%", label: "Wage growth, y/y", tone: "white" }] },
        { t: "sidebar", title: "When lower unemployment is bad news", text: "The jobless rate only counts people actively looking for work. If discouraged workers drop out, the rate can fall even as the job market weakens — which is why economists watch participation alongside it." },
      ],
    },

    // ── 07 US II ──────────────────────────────────────────────────────────
    {
      section: "Region · United States · II", foot: "Region · United States", toc: "United States — Prices",
      kicker: "Region · United States · II",
      title: "The inflation relief that came from the pump",
      deck: "June's price data looked like a turning point. It was mostly the price of gasoline — and gasoline was about to turn again.",
      left: [
        { t: "lead", text: "Released on 14 July, the June consumer price index showed prices **falling 0.4%** in a single month — the kind of print the Federal Reserve had been waiting for. Annual inflation dropped to **3.5%** from 4.2% in May." },
        { t: "p", text: "Look closer and the relief had one source. The energy index fell **5.7%** in June, its biggest monthly drop since April 2020, and gasoline alone fell **9.7%** as oil briefly returned to pre-war levels after the June truce. Even after that fall, gasoline was still up **26.7%** on a year earlier." },
        { t: "p", text: "Underlying inflation was calmer. Core prices — excluding food and energy — were unchanged on the month and up **2.6%** on the year, down from 2.9%. Food rose 3.0%. One economist warned he was \"highly skeptical\" that inflation had rolled over: by the time the data was out, oil was climbing again." },
        { t: "p", text: "The GDP report added a warning of its own. The price index for everything Americans bought rose at a **5.7%** annualised pace in the second quarter, and core PCE inflation — the Fed's preferred gauge — ran at **3.4%**." },
        { t: "fiveq",
          happened: "June CPI fell 0.4% m/m (3.5% y/y) on a 9.7% gasoline drop; core held at 2.6%.",
          matters: "Headline relief built on fuel prices can reverse as fast as oil does.",
          benefits: "Drivers and households, briefly; anyone hoping the Fed would pause.",
          hurt: "Forecasters who read June as the end of the inflation problem.",
          takeaway: "Core inflation is the signal; gasoline is the noise — and in July the noise got loud again." },
      ],
      right: [
        { t: "chart", title: "US inflation, June 2026 (y/y %)", dot: "gold", unit: "%", data: [
          { label: "Headline CPI", value: 3.5, tone: "gold" }, { label: "Core CPI", value: 2.6, tone: "blue" }, { label: "Food", value: 3.0, tone: "violet" }, { label: "Gasoline", value: 26.7, tone: "red" } ],
          source: "BLS Consumer Price Index, released 14 July 2026." },
        { t: "stats", items: [{ value: "–9.7%", label: "Gasoline, June m/m", tone: "green" }, { value: "–5.7%", label: "Energy index — biggest drop since Apr 2020", tone: "green" }] },
        { t: "sidebar", title: "Headline vs core", text: "Headline inflation includes everything. Core strips out food and energy, whose prices swing with weather and wars. Central banks set policy on the trend that core reveals — but households live with the headline." },
        { t: "analysis", title: "Frontier analysis · opinion", text: "A month of falling prices is welcome, but this one was borrowed from the oil market. With Brent up a quarter by month-end, the July CPI (due 12 August) was always likely to give some of it back." },
      ],
    },

    // ── 08 THE FED ────────────────────────────────────────────────────────
    {
      section: "Central Banks · The Federal Reserve", foot: "Central Banks", toc: "The Fed — A Divided Hold",
      kicker: "Central banks · The Fed",
      title: "A Fed divided — upward",
      deck: "For the first time in this cycle, the dissent at the Federal Reserve came from those who wanted higher rates, not lower.",
      left: [
        { t: "lead", text: "On 29 July the Federal Open Market Committee held its benchmark rate at **3.50–3.75%** — a fifth straight meeting without a change since its last cut in December 2025. But the vote was **9–3**, and all three dissenters wanted to *raise* rates by a quarter point." },
        { t: "p", text: "The dissenters were three regional Fed presidents: Beth Hammack of Cleveland, Lorie Logan of Dallas and Neel Kashkari of Minneapolis. Their argument, set out afterwards, was that inflation risks becoming entrenched unless the Fed tightens now. June's meeting had been unanimous; July's was the most divided in years." },
        { t: "p", text: "Chair Kevin Warsh offered no forward guidance — no hint about the next move — and defended dropping it. Markets drew their own conclusions: futures priced roughly a **72%** chance of a hike in September straight after the decision, before softer data later trimmed that to around 63%." },
        { t: "fiveq",
          happened: "The Fed held at 3.50–3.75% by 9–3; three presidents voted for a 25bp hike.",
          matters: "The debate inside the Fed has flipped from \"when to cut\" to \"whether to hike\".",
          benefits: "Savers earning higher rates on cash; the dollar, at the margin.",
          hurt: "Borrowers, home-buyers and rate-sensitive stocks.",
          takeaway: "A hold with three hawkish dissents is not neutral — it's a warning." },
      ],
      right: [
        { t: "chart", type: "kv", title: "The July FOMC at a glance", dot: "blue", rows: [
          ["Decision", "Hold"], ["Target range", "3.50–3.75%"], ["Vote", "9–3"], ["Dissents", "Hammack, Logan, Kashkari (hike)"], ["Meetings unchanged", "5 in a row"], ["Forward guidance", "None"] ],
          source: "Federal Reserve statement, 29 July 2026; Schwab; Investing.com." },
        { t: "stats", items: [{ value: "~72%", label: "Market odds of a Sept hike, right after the decision", tone: "gold" }] },
        { t: "sidebar", title: "What a dissent signals", text: "FOMC votes are usually unanimous. A dissent is a public, on-the-record disagreement — and three at once tells markets that the committee's centre of gravity may shift at the next meeting." },
        { t: "sidebar", title: "Forward guidance", tone: "gold", text: "Hints from a central bank about future policy. Dropping it keeps options open, but it also leaves markets to guess — which can make them more volatile around every data release." },
      ],
    },

    // ── 09 CENTRAL BANK SCORECARD ─────────────────────────────────────────
    {
      section: "Central Banks · Scorecard", foot: "Central Banks", toc: "Central Bank Scorecard",
      kicker: "The policy map", kickerTone: "blue",
      title: "Most banks held. The votes said 'up'.",
      deck: "July's decisions, side by side. Only one major central bank moved — but the dissent everywhere pointed the same way.",
      full: [
        { t: "table", title: "Latest decisions, as at end-July 2026", dot: "blue", head: ["Central bank", "Rate", "Latest decision", "Signal"], rows: [
          ["Federal Reserve (US)", "3.50–3.75%", "Hold, 29 Jul (9–3)", "Three votes to hike"],
          ["European Central Bank", "2.25% (deposit)", "Hold, 23 Jul", "Sept hike \"almost fully priced\""],
          ["Bank of England", "3.75%", "Hold, 30 Jul (6–3)", "Three votes to hike to 4%"],
          ["Bank of Japan", "1.00%", "Hold, 31 Jul (8–1)", "One vote to hike to 1.25%"],
          ["Bank of Korea", "2.75%", "**Hike +25bp**, 16 Jul (7–0)", "First hike since Jan 2023"],
          ["Reserve Bank of India", "5.25%", "Hold, 5 Jun (neutral)", "Next meeting 3–5 Aug"],
          ["Banco Central do Brasil", "14.25%", "Cut –25bp, 17 Jun", "Cut again to 14.00% on 5 Aug"],
          ["Banxico (Mexico)", "6.50%", "Hold, 25 Jun", "Easing cycle seen as over"],
          ["South African Reserve Bank", "7.00%", "Hold, July", "Hiked in May"],
          ["Central Bank of Nigeria", "26.50%", "Hold, July", "Inflation easing"] ],
          source: "Central-bank statements; Euronews; AJ Bell; Trading Economics; Korea Times; RBI; Bloomberg Línea; Itaú; French Treasury." },
      ],
      left: [
        { t: "p", text: "The pattern is clearer than the table's long column of \"hold\". At the Fed and the Bank of England, a quarter of the committee voted to tighten. At the Bank of Japan, one member did. In Seoul, the whole board did. Only in Latin America — where rates are already very high — were central banks still cutting." },
      ],
      right: [
        { t: "callout", title: "Key takeaway", text: "July marked the turn: the world's rate-setters stopped debating cuts and started arguing about hikes." },
      ],
    },

    // ── 10 INDIA ─────────────────────────────────────────────────────────
    {
      section: "Region · India", toc: "India",
      kicker: "Region · India",
      title: "Still the fastest — still exposed",
      deck: "India keeps the growth crown among large economies, but July showed how much of its outlook is written in the Gulf and the sky.",
      left: [
        { t: "lead", text: "India remains the growth standout. The IMF's July update put 2026 growth at **6.4%** — trimmed a tenth from April — while lifting 2027 to **6.7%**. The Reserve Bank of India's own projection for 2026-27 is **6.6%**, after growth of 7.6% in 2025-26." },
        { t: "p", text: "The pressure is on prices. CPI inflation rose to **3.9%** in May from 3.5% in April and edged up again in June, driven by food and fuel. The RBI projects inflation averaging **5.1%** in 2026-27, peaking near **5.9%** in the October–December quarter — close to the top of its tolerance band." },
        { t: "p", text: "At its June meeting the RBI's Monetary Policy Committee held the repo rate at **5.25%** with a neutral stance, unanimously. Its late-July bulletin was blunt about the risks: the West Asia truce \"remained short lived\", and a sub-normal monsoon with El Niño risk threatens food prices." },
        { t: "fiveq",
          happened: "IMF trimmed India to 6.4%; inflation rose on food and fuel; the RBI held at 5.25% ahead of its 3–5 Aug meeting.",
          matters: "India imports most of its oil — Hormuz risk lands directly on its inflation rate.",
          benefits: "Portfolio investors: net foreign inflows stayed positive in June and July.",
          hurt: "Households facing dearer food and fuel; farmers if the monsoon fails.",
          takeaway: "India's growth story is intact. Its inflation story now depends on the Gulf and the rains." },
      ],
      right: [
        { t: "chart", title: "RBI inflation projections, 2026-27 (%)", dot: "gold", unit: "%", data: [
          { label: "Q1", value: 4.2, tone: "blue" }, { label: "Q2", value: 5.1, tone: "blue" }, { label: "Q3", value: 5.9, tone: "red" }, { label: "Q4", value: 5.4, tone: "gold" } ],
          source: "Reserve Bank of India, Monetary Policy Statement, June 2026." },
        { t: "stats", items: [{ value: "5.25%", label: "RBI repo rate (held, neutral)", tone: "blue" }, { value: "6.4%", label: "IMF 2026 growth", tone: "green" }] },
        { t: "sidebar", title: "The tolerance band", text: "The RBI targets 4% inflation with a band of 2–6%. A projected 5.9% peak sits just inside the ceiling — which is why the RBI's language turned more cautious even as it held rates." },
      ],
    },

    // ── 11 CHINA ─────────────────────────────────────────────────────────
    {
      section: "Region · China", toc: "China",
      kicker: "Region · China",
      title: "Slowest growth in three years",
      deck: "Factories and exporters are still humming. Households and investors are not — and the gap is getting wider.",
      left: [
        { t: "lead", text: "China's economy grew **4.3%** year-on-year in the second quarter, data from the National Bureau of Statistics showed on 15 July — the slowest pace since 2022, down from 5.0% in the first quarter and short of the 4.5% markets expected. First-half growth was **4.7%**." },
        { t: "p", text: "The split inside the numbers is the real story. June industrial output rose **5.3%**, beating forecasts, and exports stayed strong. But investment slumped, and retail sales grew just **1.0%** in June — and that was celebrated as the first increase in years. Services spending did better, up 5.4% in the first half." },
        { t: "p", text: "Analysts called it a widening divide between exports and domestic demand. The IMF nonetheless raised its 2026 forecast for China to **4.6%** from 4.4% — inside the government's 4.5–5.0% target range, but only just." },
        { t: "fiveq",
          happened: "Q2 GDP slowed to 4.3% y/y; industry beat forecasts while consumption and investment lagged.",
          matters: "An export-led China pushes its weakness onto trading partners through cheap goods.",
          benefits: "Buyers of Chinese manufactured goods; Chinese exporters.",
          hurt: "Competing manufacturers abroad, and Chinese households facing a weak property and jobs market.",
          takeaway: "China can still make things. The question is whether its own people will buy them." },
      ],
      right: [
        { t: "chart", title: "China real GDP, y/y (%)", dot: "red", unit: "%", data: [
          { label: "Q1 2026", value: 5.0, tone: "blue" }, { label: "Q2 2026", value: 4.3, tone: "red" }, { label: "H1 2026", value: 4.7, tone: "gold" }, { label: "IMF 2026", value: 4.6, tone: "violet" } ],
          source: "National Bureau of Statistics of China, 15 July 2026; IMF WEO Update, July 2026." },
        { t: "chart", type: "hbars", title: "June activity (y/y %)", dot: "blue", data: [
          { label: "Industrial output", value: 5.3, tone: "blue" }, { label: "Services (H1)", value: 5.4, tone: "violet" }, { label: "Retail sales", value: 1.0, tone: "gold" } ], source: "NBS; ING." },
        { t: "sidebar", title: "Domestic demand", text: "Spending by a country's own households, firms and government. When it is weak, growth relies on exports — which makes the economy hostage to tariffs and to demand abroad." },
      ],
    },

    // ── 12 JAPAN ─────────────────────────────────────────────────────────
    {
      section: "Region · Japan", toc: "Japan",
      kicker: "Region · Japan",
      title: "The yen hits 164 — and Tokyo steps in",
      deck: "A currency at its weakest in four decades forced Japan's hand, while the Bank of Japan kept rates on hold — for now.",
      left: [
        { t: "lead", text: "In late July the yen fell to **163.99** per dollar, close to its weakest level in about forty years. On 30 July it suddenly surged more than 3%, to around **157.8**. Traders suspected official intervention; on 3 August Japan confirmed it had bought yen in a coordinated operation with the United States." },
        { t: "p", text: "A day later the Bank of Japan held its policy rate at **1.0%**, by an 8–1 vote. Board member Hajime Takata dissented, proposing a hike to 1.25%. The Bank nudged its fiscal 2026 growth forecast up to **0.6%** from 0.5% and said core inflation should run well above its 2% target from the second half of the fiscal year." },
        { t: "p", text: "The weak yen is the link between Japan and the oil shock. Japan imports almost all its energy, priced in dollars; a cheap yen makes every barrel more expensive. Core CPI was still a modest **1.6%** in June, but most economists expect one more quarter-point hike before the end of the year." },
        { t: "fiveq",
          happened: "The yen fell to ~164/$; Japan intervened with US coordination; the BoJ held at 1.0% (8–1).",
          matters: "A falling currency imports inflation, especially for an energy importer like Japan.",
          benefits: "Japanese exporters, whose overseas earnings are worth more in yen.",
          hurt: "Japanese households paying more for imported fuel and food.",
          takeaway: "When a central bank won't raise rates fast enough, the finance ministry ends up defending the currency instead." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "The yen in late July (¥ per $)", dot: "red", steps: [
          { value: "163.99", label: "Low, ~23 July — near a 40-year weak point", tone: "red" },
          { value: "163.32", label: "Close before intervention, 29 July", tone: "gold" },
          { value: "~157.8", label: "After the 30 July surge (+3%)", tone: "green" } ], source: "Reuters via The Edge; Xinhua via The Star; Trading Economics." },
        { t: "stats", items: [{ value: "1.0%", label: "BoJ policy rate (held 8–1)", tone: "blue" }, { value: "1.6%", label: "Core CPI, June (y/y)", tone: "gold" }] },
        { t: "sidebar", title: "Coordinated intervention", text: "When two governments act together in a currency market, the signal is stronger: it tells traders that both sides want the move. Joint operations are rare, which is why the 3 August confirmation mattered." },
      ],
    },

    // ── 13 EUROPE I ──────────────────────────────────────────────────────
    {
      section: "Region · Europe · Euro Area", foot: "Region · Europe", toc: "Europe — The Euro Area",
      kicker: "Region · Europe",
      title: "A hawkish pause in Frankfurt",
      deck: "Six weeks after its first hike in nearly three years, the ECB held — and made clear it was ready to go again.",
      left: [
        { t: "lead", text: "At its 22–23 July meeting the European Central Bank kept its deposit rate at **2.25%**, its main refinancing rate at 2.40% and its marginal lending rate at 2.65%. The decision was unanimous, though some governors asked whether a rise should have been considered." },
        { t: "p", text: "President Christine Lagarde said the Governing Council was \"well positioned\" to watch how the energy shock evolves, refused to pre-commit to any path and ruled out forward guidance. Analysts read the tone as hawkish: the ECB dropped the \"more balanced\" risk language it had used in June, and markets priced a September hike as almost certain." },
        { t: "p", text: "The data backed the hawks. Eurostat's flash estimate on 31 July put euro-area inflation at **2.9%**, up from 2.8% in June. Energy inflation jumped from 8.5% to **10.0%**, and core inflation edged up to **2.5%**. Asked about her own future, Lagarde told reporters they would not be rid of her before 2027." },
        { t: "fiveq",
          happened: "The ECB held at 2.25% with a hawkish tone; July inflation rose to 2.9% on energy.",
          matters: "Europe imports its energy, so the Gulf shock feeds straight into its prices.",
          benefits: "Savers and the euro, which strengthened against the dollar late in the month.",
          hurt: "Borrowers and a fragile recovery that needed cheaper credit.",
          takeaway: "A pause is not a peak. The ECB was telling markets September was live." },
      ],
      right: [
        { t: "chart", title: "Euro-area inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "May", value: 3.2, tone: "muted" }, { label: "June", value: 2.8, tone: "blue" }, { label: "July (flash)", value: 2.9, tone: "gold" }, { label: "July energy", value: 10.0, tone: "red" } ],
          source: "Eurostat flash estimate, 31 July 2026; ECB." },
        { t: "stats", items: [{ value: "2.25%", label: "ECB deposit rate (held)", tone: "blue" }, { value: "2.5%", label: "Core inflation, July", tone: "gold" }] },
        { t: "sidebar", title: "Three ECB rates", text: "The deposit rate (what banks earn overnight at the ECB) is the one that steers markets today. The main refinancing and marginal lending rates sit above it, forming a corridor." },
      ],
    },

    // ── 14 EUROPE II — UK ────────────────────────────────────────────────
    {
      section: "Region · Europe · United Kingdom", foot: "Region · Europe", toc: "Europe — United Kingdom",
      kicker: "Region · United Kingdom",
      title: "Lower inflation, a split vote",
      deck: "Britain's inflation fell to a 15-month low. A third of the Bank of England's rate-setters wanted to raise rates anyway.",
      left: [
        { t: "lead", text: "UK consumer price inflation eased to **2.6%** in the year to June, from 2.8% in May, the Office for National Statistics reported on 22 July. Motor fuel was the biggest downward pull, and food inflation cooled sharply to **1.7%** from 4.6%." },
        { t: "p", text: "Eight days later the Bank of England held Bank Rate at **3.75%** for the fifth time this year — but by a **6–3** vote. Three members wanted an increase to 4%, a tighter split than the 7–2 economists had expected. The Bank said inflation had eased, but that energy prices remain \"high and volatile\" because of the Middle East conflict." },
        { t: "p", text: "The Bank's own forecast has inflation climbing back toward roughly **3.25%** by the end of 2026 as higher energy costs pass through to bills. The next decision is due on 17 September." },
        { t: "fiveq",
          happened: "UK CPI fell to 2.6%; the BoE held at 3.75% with three votes for a hike.",
          matters: "Today's low inflation reading is expected to reverse — and the MPC is split on how to respond.",
          benefits: "Households, for now, as fuel and food prices cool.",
          hurt: "Mortgage borrowers if the hawks win the argument in the autumn.",
          takeaway: "The UK's inflation dip looked temporary even on the day it was published." },
      ],
      right: [
        { t: "chart", title: "UK inflation (y/y %)", dot: "gold", unit: "%", data: [
          { label: "CPI May", value: 2.8, tone: "muted" }, { label: "CPI June", value: 2.6, tone: "blue" }, { label: "CPIH June", value: 2.8, tone: "violet" }, { label: "BoE end-2026", value: 3.25, display: "~3.25%", tone: "gold" } ],
          source: "ONS, 22 July 2026; Bank of England Monetary Policy Report, July 2026." },
        { t: "stats", items: [{ value: "6–3", label: "MPC vote to hold at 3.75%", tone: "gold" }, { value: "1.7%", label: "UK food inflation, June", tone: "green" }] },
        { t: "sidebar", title: "CPI vs CPIH", text: "CPIH adds owner-occupiers' housing costs to the standard CPI basket. It is the ONS's preferred broad measure; the Bank of England targets CPI." },
      ],
    },

    // ── 15 MIDDLE EAST ───────────────────────────────────────────────────
    {
      section: "Region · Middle East", toc: "Middle East",
      kicker: "Region · Middle East",
      title: "The strait slams shut again",
      deck: "June's memorandum bought three weeks of calm. July's attacks put Hormuz back at the centre of the world economy.",
      left: [
        { t: "lead", text: "Renewed hostilities began around **7 July**, after three attacks on commercial vessels in the Strait of Hormuz. The United States responded with waves of air strikes on Iranian targets and revoked a temporary waiver on sanctions for Iranian oil. Iran declared the strait closed; Washington insisted it was open." },
        { t: "p", text: "Shippers didn't wait to find out. The US Navy-led Joint Maritime Information Center raised the transit threat to **severe**, the International Maritime Organization recorded eight ships hit between 13 and 20 July, and insurers sharply raised war-risk premiums — or declined cover altogether." },
        { t: "p", text: "Only days earlier, on 5 July, seven OPEC+ members had agreed to add **188,000 barrels a day** in August, as Gulf exports recovered from the near-paralysis of the spring. Alliance output had collapsed from 42.77 million barrels a day in February to 33.13 million in May. The UAE, notably, left OPEC and OPEC+ with effect from 1 May." },
        { t: "fiveq",
          happened: "Tanker attacks and US strikes ended the June truce; Hormuz risk was raised to severe.",
          matters: "About a fifth of the world's oil normally passes through the strait.",
          benefits: "Producers outside the Gulf and owners of tankers on safer routes.",
          hurt: "Gulf exporters whose barrels are trapped, and every energy importer.",
          takeaway: "In energy, a truce only lowers the risk premium — it never removes it." },
      ],
      right: [
        { t: "chart", title: "OPEC+ crude output (million b/d)", dot: "red", data: [
          { label: "Feb 2026", value: 42.77, display: "42.77", tone: "blue" }, { label: "May 2026", value: 33.13, display: "33.13", tone: "red" } ],
          source: "OPEC data via Gulf News / Al-Ahram, July 2026." },
        { t: "stats", items: [{ value: "+188k", label: "OPEC+ August quota rise (b/d), 5 July", tone: "gold" }, { value: "8", label: "Ships hit, 13–20 July (IMO)", tone: "red" }] },
        { t: "sidebar", title: "War-risk insurance", text: "Ordinary marine insurance excludes war. Ships entering a conflict zone need extra war-risk cover, priced per voyage. When premiums jump — or cover disappears — cargoes reroute or stop, even if no one formally closes the route." },
      ],
    },

    // ── 16 AFRICA ────────────────────────────────────────────────────────
    {
      section: "Region · Africa", toc: "Africa",
      kicker: "Region · Africa",
      title: "One continent, diverging prices",
      deck: "Inflation fell in Nigeria and rose in South Africa — while Ghana closed the last chapter of its debt crisis.",
      left: [
        { t: "lead", text: "Africa's big economies moved in opposite directions in July. In **Nigeria**, inflation was reported to have eased to about **15.4%**, foreign reserves stood near **$52 billion** on 20 July (up from about $38 billion a year earlier) and the central bank held its policy rate at **26.5%**. The IMF kept its 2026 growth forecast at 4.1%." },
        { t: "p", text: "**South Africa** went the other way: inflation rose to **5.0%** in June, the highest in two years, and the Reserve Bank held its rate at **7.0%** after hiking in May. S&P cut its growth projections for 2026 and 2027. In **Kenya**, inflation edged up to 6.5% in July on transport and food." },
        { t: "p", text: "In **Ghana**, the government settled the exchange of its Saderea notes on 13 July — the final piece of a sovereign bond restructuring that began in October 2024 (see Country Spotlight, p.29). Its currency, the cedi, ended July as the continent's weakest performer this year." },
        { t: "fiveq",
          happened: "Nigeria's inflation eased and reserves rose; South Africa's inflation climbed; Ghana finished restructuring.",
          matters: "Oil exporters and oil importers feel the Gulf shock in opposite ways.",
          benefits: "Nigeria, as higher crude lifts export revenue and reserves.",
          hurt: "Importers such as South Africa and Kenya, through fuel and transport costs.",
          takeaway: "\"Africa\" isn't one trade: the same oil price helps Lagos and hurts Johannesburg." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "Inflation, latest (y/y %)", dot: "gold", data: [
          { label: "Nigeria (Jul)", value: 15.43, display: "15.4%", tone: "red" }, { label: "Kenya (Jul)", value: 6.5, tone: "gold" }, { label: "S. Africa (Jun)", value: 5.0, tone: "blue" } ],
          source: "French Treasury weekly briefs; Semafor; national statistics, July 2026." },
        { t: "chart", type: "kv", title: "Policy rates (July)", dot: "blue", rows: [["Nigeria (CBN)", "26.5% — hold"], ["South Africa (SARB)", "7.0% — hold"]], source: "Central-bank decisions, July 2026." },
        { t: "sidebar", title: "Foreign reserves", text: "Hard currency a central bank holds to pay for imports and defend its currency. Nigeria's rise to about $52bn gives it a buffer if oil prices swing back down." },
      ],
    },

    // ── 17 LATIN AMERICA ─────────────────────────────────────────────────
    {
      section: "Region · Latin America", toc: "Latin America",
      kicker: "Region · Latin America",
      title: "Still cutting, carefully",
      deck: "While the rich world argued about hikes, Latin America's central banks kept easing — slowly, and with one eye on oil.",
      left: [
        { t: "lead", text: "**Brazil's** central bank cut its Selic rate by a quarter point to **14.25%** in June — but warned that the inflation outlook had worsened, raising its 2026 inflation projection to **5.2%** from 4.6%. It would cut again, to 14.00%, on 5 August. With inflation above target, real interest rates stay among the highest in the world." },
        { t: "p", text: "**Mexico's** Banxico held at **6.50%** on 25 June, and its minutes suggested the easing cycle has ended. Inflation kept falling: **3.10%** in the first half of July, the lowest since late 2020 and inside the target band for a fourth straight fortnight." },
        { t: "p", text: "In **Argentina**, monthly inflation slowed to **1.9%** in June, the lowest in about ten months — a boost for President Milei's programme — before ticking up in July on winter-holiday prices. The IMF kept its 3.5% growth forecast and welcomed Milei's plan to reform the central bank; Managing Director Georgieva visited on 28–29 July." },
        { t: "fiveq",
          happened: "Brazil kept cutting from 14.25%; Mexico paused at 6.50%; Argentina's inflation hit a ten-month low.",
          matters: "High real rates give the region room to ease even as the US debates hikes.",
          benefits: "Borrowers and equities in easing economies; commodity exporters.",
          hurt: "Consumers in fuel-importing economies as oil climbs.",
          takeaway: "Latin America is easing from very high rates — a different problem from the rich world's." },
      ],
      right: [
        { t: "chart", title: "Policy rates, end-July (%)", dot: "blue", unit: "%", data: [
          { label: "Brazil", value: 14.25, display: "14.25%", tone: "gold" }, { label: "Mexico", value: 6.5, display: "6.50%", tone: "blue" }, { label: "US (top)", value: 3.75, display: "3.75%", tone: "violet" } ],
          source: "Banco Central do Brasil; Banxico; Federal Reserve." },
        { t: "stats", items: [{ value: "3.10%", label: "Mexico inflation, 1H July", tone: "green" }, { value: "1.9%", label: "Argentina monthly CPI, June", tone: "gold" }] },
        { t: "sidebar", title: "Real interest rate", text: "The policy rate minus inflation. Brazil's 14.25% against ~5% inflation leaves a real rate near 9% — a powerful brake that lets the central bank cut without losing control." },
      ],
    },

    // ── 18 ASIA-PACIFIC ──────────────────────────────────────────────────
    {
      section: "Region · Asia-Pacific & Oceania", toc: "Asia-Pacific & Oceania",
      kicker: "Region · Asia-Pacific & Oceania",
      title: "Seoul hikes first",
      deck: "Beyond China and Japan, the region's central banks faced the same mix: imported energy inflation and weaker currencies.",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "🇰🇷 South Korea", dot: "gold", text: "The Bank of Korea raised its base rate **25bp to 2.75%** on 16 July — unanimously, and for the first time since January 2023 — citing June inflation of **3.2%**, a weaker won and financial-stability risks." },
          { title: "🇦🇺 Australia", dot: "blue", text: "The Reserve Bank of Australia held its cash rate at **4.35%** at its June meeting; its next decision was due in August. Markets debated whether the RBA's tightening was finished." },
          { title: "🇹🇼 Taiwan", dot: "violet", text: "Chip-exporting Asia felt July's semiconductor sell-off most. Morningstar noted that even Taiwan Semiconductor was punished for its bumper capital-spending plans despite beating expectations." },
        ] },
      ],
      left: [
        { t: "p", text: "South Korea's move is a template for the region. Like Japan, it imports almost all its energy; unlike Japan, its central bank chose to act early, before inflation expectations drifted. Minutes later showed all seven board members backed the hike, a sharp turn from June's 5–2 vote to hold." },
        { t: "fiveq",
          happened: "Korea hiked to 2.75%; Australia held at 4.35%; Asia's chip exporters sold off.",
          matters: "Energy importers with weak currencies face the fastest pass-through to prices.",
          benefits: "Savers in Korea; exporters with dollar revenue.",
          hurt: "Indebted households (Korea's are among the most leveraged in Asia).",
          takeaway: "In Asia the oil shock arrived through the currency market first." },
      ],
      right: [
        { t: "chart", title: "Bank of Korea base rate (%)", dot: "gold", unit: "%", decimals: 2, data: [
          { label: "June (hold)", value: 2.5, tone: "muted" }, { label: "16 July (hike)", value: 2.75, tone: "gold" } ], source: "Bank of Korea; Korea Times, 16 July 2026." },
        { t: "callout", title: "The through-line", tone: "blue", text: "Weak currencies + imported energy = earlier rate hikes. Korea moved first; markets wondered who would follow." },
      ],
    },

    // ── 19 STOCK MARKETS ─────────────────────────────────────────────────
    {
      section: "Markets · Equities", toc: "Stock Markets",
      kicker: "Markets",
      title: "Flat on top, chaos underneath",
      deck: "The S&P 500 barely moved in July. Inside it, the biggest rotation in years took place.",
      left: [
        { t: "lead", text: "Judged by its headline, July was a non-event: the S&P 500 ended the month down just **0.06%**. But the average stock did far better than the index, and the biggest stocks did far worse. The equal-weight S&P 500 posted its best relative performance against the main index on record." },
        { t: "p", text: "The winners were the old economy. Energy was the top sector, up about **12.6%**, as crude surged; financials also gained. The losers were the market's former leaders: the technology sector fund XLK fell about **8%**, the Nasdaq Composite lost about **3.2%**, the Nasdaq 100 about **6.6%**, and small caps in the Russell 2000 slipped about 2.6%." },
        { t: "p", text: "Earnings season sharpened the split. Amazon jumped after reporting its fastest cloud growth in years, while Apple fell on weaker guidance (see Company Spotlight, p.28). The market wasn't selling everything — it was choosing." },
        { t: "fiveq",
          happened: "The S&P 500 was flat while energy rose ~12.6% and tech fell ~8%.",
          matters: "Index stability can hide huge moves underneath — and risk concentrated in a few names.",
          benefits: "Diversified and value investors; energy shareholders.",
          hurt: "Portfolios concentrated in mega-cap tech and semiconductors.",
          takeaway: "July didn't end the bull market. It changed who was leading it." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "US equity returns, July 2026 (%)", dot: "gold", data: [
          { label: "Energy sector", value: 12.6 }, { label: "S&P 500", value: -0.06, display: "–0.06%" }, { label: "Russell 2000", value: -2.62, display: "–2.6%" },
          { label: "Nasdaq Comp.", value: -3.2 }, { label: "Nasdaq 100", value: -6.6 }, { label: "Tech (XLK)", value: -7.96, display: "–8.0%" } ],
          source: "Cetera; Tapeboard; YCharts; Nasdaq — July 2026 recaps. Figures approximate." },
        { t: "sidebar", title: "Equal-weight vs cap-weight", text: "The standard S&P 500 weights companies by size, so a handful of giants dominate. The equal-weight version gives all 500 the same say — a better gauge of how the typical stock is doing." },
        { t: "sidebar", title: "Rotation", tone: "gold", text: "When investors sell one group of stocks to buy another rather than leaving the market. Rotations keep indices calm while individual sectors swing wildly." },
      ],
    },

    // ── 20 BONDS ─────────────────────────────────────────────────────────
    {
      section: "Markets · Fixed Income", toc: "Bond Markets",
      kicker: "Markets · Bonds",
      title: "The long end defies the Fed",
      deck: "The Fed held rates still. The bond market raised them for it.",
      left: [
        { t: "lead", text: "The yield on the 10-year US Treasury note finished July at about **4.75%** — its highest close of the quarter — after rising roughly **30 basis points** in the month. CME data showed 10-year futures touching a year-to-date high near 4.74% on the final day." },
        { t: "p", text: "Two forces did the lifting: oil prices, which raised expected inflation, and a Fed that refused to promise anything. When investors expect higher inflation and see a central bank leaning toward hikes, they demand more to lend for ten years. Yields eased slightly in early August, to about 4.70%, as hike odds faded." },
        { t: "p", text: "The 10-year yield is the anchor for American borrowing. Mortgage rates, corporate bonds and many loans price off it. A 30bp rise in one month is the market tightening financial conditions on the Fed's behalf." },
        { t: "fiveq",
          happened: "The 10-year Treasury yield rose ~30bp to ~4.75%, a quarterly high.",
          matters: "Long-term borrowing costs rose even without a Fed move.",
          benefits: "New buyers of bonds locking in higher yields.",
          hurt: "Existing bondholders (prices fall as yields rise) and home-buyers.",
          takeaway: "Markets don't wait for central banks — they price what they expect them to do." },
      ],
      right: [
        { t: "chart", title: "US 10-year Treasury yield (%)", dot: "blue", decimals: 2, unit: "%", data: [
          { label: "End-June (approx.)", value: 4.45, display: "~4.45%", tone: "muted" }, { label: "31 July", value: 4.75, tone: "blue" }, { label: "2 Aug", value: 4.70, display: "4.70%", tone: "violet" } ],
          source: "Advisor Perspectives; CME Group; Mortgage News Daily. End-June level implied by the +30bp move." },
        { t: "sidebar", title: "Price and yield move opposite", text: "When a bond's price falls, its yield rises. So \"yields up 30bp\" means bonds got cheaper — and borrowing across the economy got dearer." },
        { t: "analysis", text: "In July the bond market did what three Fed dissenters wanted: it tightened. That may be why the committee felt no rush to act — the market was already doing the work." },
      ],
    },

    // ── 21 CURRENCIES ────────────────────────────────────────────────────
    {
      section: "Markets · Currencies", toc: "Currencies",
      kicker: "Markets · FX",
      title: "A week the dollar lost its grip",
      deck: "The dollar ended July weaker — not because America got worse, but because Japan got serious.",
      left: [
        { t: "lead", text: "The US dollar index fell about **1.3%** in July. Most of the damage came in the final week: from 101.47 on 24 July to about **99.91** at the weekly close, its biggest weekly drop in three months." },
        { t: "p", text: "The trigger was the yen. On 30 July the dollar slid from 163.32 yen to about **158.9** in a day as Japanese authorities bought yen — an intervention later confirmed as coordinated with the United States. The dollar index fell about 1% that day, to roughly 99.87." },
        { t: "p", text: "Other currencies joined in. The euro rose to about **$1.1535** from $1.1452 on the same day, helped by expectations that the ECB would hike in September. The Fed's refusal to give guidance added to the dollar's uncertainty." },
        { t: "fiveq",
          happened: "The dollar index fell ~1.3% in July, mostly in the last week, as Japan bought yen.",
          matters: "A weaker dollar eases pressure on countries that import oil and borrow in dollars.",
          benefits: "Emerging-market borrowers with dollar debts; US exporters.",
          hurt: "Japanese exporters, whose overseas profits shrink in yen terms.",
          takeaway: "Currency markets can move more on one government's decision than on a month of data." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Currency moves, late July", dot: "violet", rows: [
          ["Dollar index, 24 Jul → 31 Jul", "101.47 → 99.91"], ["USD/JPY, 29 → 30 Jul", "163.32 → 158.93"], ["EUR/USD, 29 → 30 Jul", "1.1452 → 1.1535"], ["Dollar index, July", "≈ –1.3%"] ],
          source: "Xinhua via The Star; RTT News; Trading Economics." },
        { t: "sidebar", title: "The dollar index (DXY)", text: "A measure of the dollar against six major currencies — dominated by the euro, with the yen, pound, Canadian dollar, Swedish krona and Swiss franc. Above 100 means a stronger dollar than the index's 1973 base." },
        { t: "callout", title: "Key takeaway", text: "July's dollar dip was made in Tokyo, not Washington." },
      ],
    },

    // ── 22 OIL ───────────────────────────────────────────────────────────
    {
      section: "Commodities · Energy", toc: "Oil & Energy",
      kicker: "Commodities",
      title: "Oil's best month since March",
      deck: "A month that began with oil near pre-war prices ended with Brent above $90.",
      left: [
        { t: "lead", text: "Brent crude settled at **$90.12** a barrel on 31 July, up about **24%** for the month — its strongest gain since March, when the war began. US benchmark WTI rose about 21% to **$84.67**. Barchart, measuring a later futures contract, put the gain nearer 20%." },
        { t: "p", text: "The month had started very differently. After the 17 June memorandum, crude had slipped back toward pre-war levels near $72 and OPEC+ was adding supply. The renewed fighting from 7 July reversed all of it: by 13 July oil was about 9% above its pre-war level, and it kept climbing as insurers withdrew cover for Hormuz." },
        { t: "p", text: "Energy shocks travel. Fuel feeds into freight; freight into the price of almost everything. Container lines added surcharges to pass on higher bunker-fuel costs, and spot container rates — already up sharply since the war began in February — kept rising." },
        { t: "fiveq",
          happened: "Brent rose ~24% to $90.12; WTI ~21% to $84.67.",
          matters: "Oil is an input to nearly everything; its price acts as a tax or subsidy on the whole economy.",
          benefits: "Producers outside the Gulf, and energy shareholders (sector +12.6%).",
          hurt: "Importers, airlines, hauliers and households.",
          takeaway: "Oil priced the risk of the strait, not the barrels flowing through it." },
      ],
      right: [
        { t: "chart", title: "Crude oil, 31 July settle ($/bbl)", dot: "red", data: [
          { label: "Pre-war ref.", value: 72, display: "~$72", tone: "muted" }, { label: "WTI", value: 84.67, display: "$84.67", tone: "gold" }, { label: "Brent", value: 90.12, display: "$90.12", tone: "red" } ],
          source: "Reuters via The Peninsula / QNA, 31 July 2026; Gulf News (pre-war reference)." },
        { t: "stats", items: [{ value: "+24%", label: "Brent in July", tone: "red" }, { value: "+21%", label: "WTI in July", tone: "gold" }] },
        { t: "sidebar", title: "Brent vs WTI", text: "Two benchmarks for crude. Brent prices oil from the North Sea and sets the world price; WTI (West Texas Intermediate) prices US oil. Brent usually trades a few dollars higher." },
        { t: "note", text: "Early August: Brent fell more than 4% to about $84 on 3 August as US–Iran talks were set to resume." },
      ],
    },

    // ── 23 GOLD ──────────────────────────────────────────────────────────
    {
      section: "Commodities · Gold", toc: "Gold & Precious Metals",
      kicker: "Commodities",
      title: "Gold rises — quietly",
      deck: "War usually lifts gold. In July, the prospect of higher interest rates held it back.",
      left: [
        { t: "lead", text: "Gold ended July with a small gain — its first monthly rise since February. Estimates of the move range from about **0.5%** to about **1%**, with month-end prices around **$4,050–4,107** an ounce depending on the measure." },
        { t: "p", text: "That is modest given a month of war. The reason is the tug-of-war at gold's heart. Conflict and inflation push it up; higher interest rates pull it down, because gold pays no income and must compete with bonds now yielding close to 4.75%. In July, the rate effect almost cancelled the war effect." },
        { t: "p", text: "Context matters too: gold had hit a record **$5,405** an ounce on 29 January and was still about **25%** below that peak. The dollar's late-July slide gave it some support. Silver, more tied to industry, slumped." },
        { t: "fiveq",
          happened: "Gold rose about 0.5–1% in July, its first monthly gain since February.",
          matters: "Gold reflects the balance between fear and interest rates.",
          benefits: "Long-term holders and central banks that bought earlier.",
          hurt: "Buyers who chased the January peak, still about 25% under water.",
          takeaway: "When rates are rising, even war struggles to make gold shine." },
      ],
      right: [
        { t: "chart", title: "Gold ($/oz)", dot: "gold", data: [
          { label: "Record, 29 Jan", value: 5405, display: "$5,405", tone: "gold" }, { label: "End-July (approx.)", value: 4080, display: "~$4,050–4,107", tone: "blue" } ],
          source: "World Gold Council; Perth Mint; Gulf News; Trading Economics." },
        { t: "chart", type: "split", title: "What pulled gold each way in July", dot: "gold", left: { title: "Tailwinds", tone: "green", items: ["Middle East war", "Weaker dollar (late July)", "Inflation fears"] }, right: { title: "Headwinds", tone: "red", items: ["Rising Treasury yields", "Fed hike odds", "Distance from record"] }, source: "Frontier framework, July 2026 conditions." },
        { t: "sidebar", title: "Opportunity cost", text: "What you give up by choosing one asset over another. Holding gold means giving up the interest a bond would pay — so higher yields make gold relatively less attractive." },
      ],
    },

    // ── 24 CRYPTO ────────────────────────────────────────────────────────
    {
      section: "Markets · Digital Assets", toc: "Cryptocurrency",
      kicker: "Digital assets",
      title: "A rebound in a bear market",
      deck: "Bitcoin had a good month — in a market that still feels like winter.",
      left: [
        { t: "lead", text: "Bitcoin rose roughly **7%** in July, opening near **$58,560** and closing around **$61,815**, according to one month-end summary; Galaxy Research called it the second-best month of the year. It traded mostly between the high $50,000s and mid-$60,000s." },
        { t: "p", text: "The rebound came after a dismal June, when bitcoin hit a 21-month low and spot bitcoin ETFs logged their worst month on record. In July those ETFs turned to net inflows of about **$194 million**. A soft US inflation print on 14 July briefly pushed the price toward $64,000." },
        { t: "p", text: "But the mood stayed cautious. K33 Research said July was on track for the lowest average daily trading volume since November 2023, the Fear & Greed Index sat in \"fear\" most of the month, and Bitvavo described the bear market as entering its tenth month. Progress on the US CLARITY Act, a crypto market-structure bill, stalled." },
        { t: "fiveq",
          happened: "Bitcoin gained ~7% to ~$61,800; ETFs returned to inflows; volumes hit multi-year lows.",
          matters: "Thin volumes mean rallies are fragile and easily reversed.",
          benefits: "Holders who bought June's lows.",
          hurt: "Traders betting on a quick return to the old highs.",
          takeaway: "A good month is not a new cycle — and July's rally happened on very little trading." },
      ],
      right: [
        { t: "chart", title: "Bitcoin, July 2026 ($)", dot: "violet", data: [
          { label: "Open", value: 58560, display: "$58.6k", tone: "muted" }, { label: "Low", value: 57750, display: "$57.8k", tone: "red" }, { label: "High", value: 66910, display: "$66.9k", tone: "green" }, { label: "Close", value: 61815, display: "$61.8k", tone: "violet" } ],
          source: "Binance monthly summary; Galaxy Research; CryptoRank (which put the gain at 9.2%)." },
        { t: "stats", items: [{ value: "+$194m", label: "Spot bitcoin ETF net inflows, July", tone: "green" }] },
        { t: "sidebar", title: "Spot ETF", text: "An exchange-traded fund that holds the actual asset — here, bitcoin — so investors can buy exposure through an ordinary brokerage account. Flows in and out are a good read on institutional demand." },
      ],
    },

    // ── 25 AI ────────────────────────────────────────────────────────────
    {
      section: "Theme · Artificial Intelligence", toc: "Artificial Intelligence",
      kicker: "Theme of the cycle",
      title: "The AI trade's worst month since 2008",
      deck: "Nobody stopped spending on AI in July. Investors just started asking who would earn a return on it.",
      left: [
        { t: "lead", text: "The Philadelphia Semiconductor Index plunged **21%** in July — its worst month since October 2008. Around twenty of the world's largest chip companies lost roughly **$1 trillion** of market value between them. AMD fell about 18% and Marvell about 37%." },
        { t: "p", text: "The trigger was doubt, not a collapse in demand. Investors questioned whether the hyperscalers' vast AI infrastructure budgets can earn returns big enough to justify chipmakers' valuations. Even firms that beat expectations — ASML and Taiwan Semiconductor among them — were punished for their bumper spending plans. Leverage, profit-taking and a report that DeepSeek is developing its own AI processor added fuel." },
        { t: "p", text: "The irony arrived at month-end. Amazon reported its cloud arm growing **37%**, its fastest pace in years, and raised its 2026 capital-spending plan to about **$220 billion** — saying even that would not be enough to meet demand. Spending is not slowing. What changed in July is that the market started separating the companies that collect AI revenue from those that merely supply the shovels." },
        { t: "fiveq",
          happened: "Chip stocks fell 21% on doubts about AI returns, even as cloud demand stayed strong.",
          matters: "AI investment is now a large share of growth; a rethink hits markets and the economy.",
          benefits: "Cloud providers selling AI capacity, like AWS.",
          hurt: "Chip investors and companies whose costs rise with AI (memory, power).",
          takeaway: "The AI boom continues — the question is who gets paid for it." },
      ],
      right: [
        { t: "chart", type: "hbars", title: "July 2026 moves (%)", dot: "violet", data: [
          { label: "Amazon", value: 14, display: "≈+14%", tone: "green" }, { label: "AMD", value: -18 }, { label: "SOX index", value: -21 }, { label: "Marvell", value: -37 } ],
          source: "Bloomberg via Fortune; Nasdaq/Motley Fool. Amazon's monthly gain approximate." },
        { t: "stats", items: [{ value: "$1T", label: "Chip market value lost in July (~20 firms)", tone: "red" }, { value: "$220B", label: "Amazon 2026 capex plan", tone: "blue" }] },
        { t: "sidebar", title: "Capex", text: "Capital expenditure — money spent on long-lived assets such as data centres and chips. Today's AI capex is tomorrow's revenue only if customers pay enough to use what was built." },
      ],
    },

    // ── 26 TRADE ─────────────────────────────────────────────────────────
    {
      section: "Theme · Global Trade", toc: "Global Trade",
      kicker: "The connective tissue",
      title: "Trade slows, freight speeds up",
      deck: "World trade is growing more slowly — and moving goods around got more expensive in July.",
      left: [
        { t: "lead", text: "The IMF expects world trade volumes to grow **3.5%** in 2026, down from **5.0%** in 2025, before recovering to **4.3%** in 2027. It blamed the unwinding of last year's front-loading — when importers rushed goods in ahead of tariffs — plus tariffs themselves and supply-chain adjustment." },
        { t: "p", text: "In July, the cost of moving goods rose again. Spot container rates had already jumped about **80%** since the war began in February. Less than 2% of global container capacity passes through Hormuz, but carriers passed on higher fuel costs through surcharges, and an early peak season as importers tried to beat new tariffs pushed Asia–US rates up further." },
        { t: "p", text: "The tariff map itself was shifting. The US Supreme Court ruled against the administration's emergency tariffs in February, and temporary Section 122 tariffs were due to expire on 24 July — so the US Trade Representative began hearings on new Section 301 tariffs to replace them. Importers faced steep tariff bills on top of rising freight." },
        { t: "fiveq",
          happened: "IMF trade growth seen at 3.5% in 2026; freight costs rose on fuel and tariff front-running.",
          matters: "Dearer shipping and uncertain tariffs raise prices and delay investment.",
          benefits: "Carriers and alternative suppliers outside conflict and tariff zones.",
          hurt: "Importers and consumers who pay both the freight and the tariff.",
          takeaway: "Trade isn't collapsing — it's getting slower and more expensive at the same time." },
      ],
      right: [
        { t: "chart", title: "World trade volume growth (%)", dot: "blue", unit: "%", data: [
          { label: "2025", value: 5.0, tone: "muted" }, { label: "2026f", value: 3.5, tone: "gold" }, { label: "2027f", value: 4.3, tone: "blue" } ],
          source: "IMF WEO Update, July 2026." },
        { t: "stats", items: [{ value: "~80%", label: "Rise in container spot rates since late Feb", tone: "red" }, { value: "<2%", label: "Share of container capacity via Hormuz", tone: "blue" }] },
        { t: "sidebar", title: "Front-loading", text: "Bringing purchases forward to beat an expected price rise or tariff. It flatters trade data today and borrows from tomorrow — which is why 2026 trade growth looks weaker." },
      ],
    },

    // ── 27 DASHBOARD ─────────────────────────────────────────────────────
    {
      section: "Macro Dashboard", toc: "Macro Dashboard",
      kicker: "The four gauges", kickerTone: "blue",
      title: "Macro Dashboard",
      deck: "Inflation, rates, growth and jobs — July's readings side by side.",
      full: [
        { t: "gauges", items: [
          { title: "Inflation (latest)", dot: "gold", values: [{ value: "3.5%", label: "US CPI, June", tone: "gold" }, { value: "2.9%", label: "Euro area, July flash" }, { value: "2.6%", label: "UK CPI, June" }, { value: "3.2%", label: "S. Korea, June" }], source: "BLS; Eurostat; ONS; Statistics Korea." },
          { title: "Policy rates", dot: "blue", values: [{ value: "3.50–3.75%", label: "Fed (hold, 9–3)", tone: "blue" }, { value: "2.25%", label: "ECB deposit" }, { value: "+25bp", label: "Bank of Korea", tone: "gold" }], source: "Central-bank statements, July 2026." },
          { title: "Growth", dot: "green", values: [{ value: "3.0%", label: "World 2026 (IMF)", tone: "green" }, { value: "1.5%", label: "US Q2 (ann.)" }, { value: "4.3%", label: "China Q2 y/y", tone: "red" }, { value: "6.4%", label: "India 2026 (IMF)", tone: "green" }], source: "IMF; BEA; NBS." },
          { title: "US labour market", dot: "violet", values: [{ value: "–23k", label: "Payrolls, July", tone: "red" }, { value: "4.1%", label: "Unemployment" }, { value: "61.4%", label: "Participation", tone: "gold" }], source: "BLS, released 7 August 2026." },
        ] },
        { t: "callout", title: "How the four fit together in July", text: "Inflation stopped falling as oil jumped; central banks held but their votes leaned toward hikes; growth slowed in the US and China; and the US job market softened. That combination — weaker growth, firmer prices, hawkish voters — is the uncomfortable mix every later issue this year has had to reckon with." },
      ],
    },

    // ── 28 COMPANY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Company Spotlight", toc: "Company Spotlight — Amazon",
      kicker: "Company spotlight",
      title: "Amazon vs Apple: one boom, two fates",
      deck: "Both beat earnings on the same night. One soared, one sank — and the reason says a lot about the AI economy.",
      left: [
        { t: "lead", text: "After the bell on 30 July, Amazon reported second-quarter revenue of **$200.6 billion**, up **19.6%** on a year earlier. Its cloud division, AWS, grew **37%** to **$42.2 billion** — its fastest pace in 18 quarters. Amazon raised its 2026 capital-spending plan to about **$220 billion** and said even that would not be enough to meet cloud demand." },
        { t: "p", text: "Apple reported the same evening and also beat expectations, with earnings of **$2.02** a share against $1.88 forecast. But it guided next-quarter revenue growth to **9–11%**, below the 12% analysts wanted, citing constraints on advanced chips and memory, plus currency effects." },
        { t: "p", text: "The market's verdict was brutal and clear. Amazon shares jumped roughly **12–15%** the next day; Apple's fell about **7–8%** in early trading (reports of the close varied). Commentators summed it up: Amazon *captures* AI demand through AWS, while Apple *pays* for it through dearer memory and scarce chips." },
        { t: "fiveq",
          happened: "Amazon's AWS grew 37% and its stock soared; Apple beat but guided lower and fell.",
          matters: "Investors are separating AI's earners from AI's cost-bearers.",
          benefits: "Cloud providers selling AI capacity; their suppliers of power and space.",
          hurt: "Device makers squeezed by memory and chip shortages.",
          takeaway: "In the AI economy, it pays to be the landlord, not the tenant." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Q2 2026 results, 30 July", dot: "gold", rows: [
          ["Amazon revenue", "$200.6bn (+19.6%)"], ["AWS revenue", "$42.2bn (+37%)"], ["Amazon 2026 capex", "~$220bn"], ["Apple EPS (FQ3)", "$2.02 vs $1.88 est."], ["Apple FQ4 growth guide", "9–11% (vs 12% est.)"] ],
          source: "Company results via Stocktwits, 24/7 Wall St, Zacks, SiliconANGLE." },
        { t: "chart", title: "Share move, 31 July (approx. %)", dot: "blue", data: [
          { label: "Amazon", value: 13, display: "+12–15%", tone: "green" }, { label: "Apple", value: -7.5, display: "–7–8%", tone: "red" } ], source: "24/7 Wall St; Nasdaq; Quartz — reports varied." },
        { t: "quote", text: "Two companies beat the same night. The market priced who pays for AI and who gets paid.", by: "The Financial Frontier" },
      ],
    },

    // ── 29 COUNTRY SPOTLIGHT ─────────────────────────────────────────────
    {
      section: "Country Spotlight", toc: "Country Spotlight — Ghana",
      kicker: "Country spotlight",
      title: "Ghana closes the book on default",
      deck: "Nearly four years after it stopped paying its debts, Ghana completed the last piece of its restructuring in July.",
      left: [
        { t: "lead", text: "On **13 July**, Ghana settled the exchange of its Saderea notes — a small bond, originally **$253.2 million**, with about **$117.8 million** still outstanding in January. The finance ministry called it the final chapter of the restructuring of the country's bonded debt that began in October 2024." },
        { t: "p", text: "The terms show how restructurings work in practice. For each $1,000 of old Saderea notes, holders received **$982.21** of Ghana's existing 2035 Eurobonds and **$330** of its 2037 Eurobonds. S&P had said the overall restructuring covers about **97%** of the debt in its scope, and Fitch upgraded Ghana to **B** with a positive outlook in May." },
        { t: "p", text: "Not everything is fixed. The cedi, after a strong 2025, ended July as Africa's weakest-performing currency this year. Still, an analyst review in early August described Ghana as combining fast growth with low inflation — a long way from the crisis that forced it to default." },
        { t: "fiveq",
          happened: "Ghana completed its Saderea bond exchange, ending its external bond restructuring.",
          matters: "Finishing a restructuring lets a country rebuild credit and, eventually, borrow again.",
          benefits: "Ghana's government and bondholders who accepted new paper.",
          hurt: "Creditors who took losses; importers hit by a weaker cedi.",
          takeaway: "Defaults end not with a bang but with paperwork — and Ghana's paperwork is done." },
      ],
      right: [
        { t: "chart", type: "kv", title: "Ghana's exit, by the numbers", dot: "gold", rows: [
          ["Saderea original size", "$253.2m"], ["Outstanding, Jan 2026", "~$117.8m"], ["Per $1,000 old notes", "$982.21 (2035s) + $330 (2037s)"], ["Debt covered (S&P)", "~97%"], ["Fitch rating (May)", "B, positive outlook"] ],
          source: "Ghana Ministry of Finance; Cleary Gottlieb; S&P; Fitch." },
        { t: "sidebar", title: "Sovereign restructuring", text: "When a government can't repay, it negotiates with creditors to swap old debt for new bonds with lower value, lower interest or longer maturities. It is painful for lenders, but often the only path back to growth." },
        { t: "callout", title: "The bigger picture", tone: "blue", text: "Ghana joins Zambia and Sri Lanka among recent defaulters that have completed deals — evidence that the slow international framework for debt relief does, eventually, deliver." },
      ],
    },

    // ── 30 CHARTS ────────────────────────────────────────────────────────
    {
      section: "Charts That Explain the Month", toc: "Charts That Explain the Month",
      kicker: "Data",
      title: "Three charts that explain July",
      top: [
        { t: "cards", cols: 3, items: [
          { title: "1 · Oil jumped", dot: "red", text: "Brent +24%, WTI +21% in July — the month's prime mover." },
          { title: "2 · Chips sank", dot: "violet", text: "SOX –21%, its worst month since Oct 2008." },
          { title: "3 · Votes turned", dot: "gold", text: "Hawkish dissents at the Fed, BoE and BoJ; a hike in Korea." },
        ] },
      ],
      full: [
        { t: "g2", left: [
          { t: "chart", title: "Chart 1 · Monthly change, July (%)", dot: "red", unit: "%", data: [{ label: "Brent", value: 24, tone: "red" }, { label: "WTI", value: 21, tone: "gold" }, { label: "Energy stocks", value: 12.6, tone: "green" }, { label: "Gold", value: 0.5, display: "+0.5–1%", tone: "gold" }], source: "Reuters; Tapeboard; Gold sources on p.36." },
          { t: "chart", title: "Chart 2 · Tech in July (%)", dot: "violet", unit: "%", data: [{ label: "Nasdaq Comp.", value: -3.2, tone: "blue" }, { label: "Nasdaq 100", value: -6.6, tone: "violet" }, { label: "SOX", value: -21, tone: "red" }], source: "Bloomberg via Fortune; Tapeboard." },
        ], right: [
          { t: "chart", title: "Chart 3 · Votes to hike, July meetings", dot: "gold", data: [{ label: "Fed", value: 3, display: "3 of 12", tone: "blue" }, { label: "BoE", value: 3, display: "3 of 9", tone: "violet" }, { label: "BoJ", value: 1, display: "1 of 9", tone: "red" }, { label: "BoK", value: 7, display: "7 of 7", tone: "gold" }], source: "Central-bank statements and minutes." },
          { t: "callout", title: "Read together", text: "Chart 1 is the cause: an oil shock. Chart 3 is the policy response: committees tilting toward higher rates. Chart 2 is the consequence: the most rate-sensitive, richly valued stocks fell hardest. The same sequence would repeat, louder, in the months that followed." },
        ] },
        { t: "note", text: "All figures sourced from the institutions listed on p.36. Charts are drawn to the values shown and are not to a common scale." },
      ],
    },

    // ── 31 INFOGRAPHIC ───────────────────────────────────────────────────
    {
      section: "Infographic", toc: "Infographic: Where the Money Went",
      kicker: "The month at a glance",
      title: "Where the money went",
      deck: "Out of chips, into crude; out of the dollar, into the yen; out of long bonds as yields climbed.",
      full: [
        { t: "g2", left: [
          { t: "flows", title: "The rotation of July", items: [
            { label: "Out of semiconductors", width: 82, dir: "out", tag: "–21%" },
            { label: "Out of mega-cap tech", width: 46, dir: "out", tag: "≈–8%" },
            { label: "Out of long Treasuries", width: 38, dir: "out", tag: "yields +30bp" },
            { label: "Into oil & energy", width: 78, tag: "war bid" },
            { label: "Into the yen (late July)", width: 40, tag: "intervention" },
            { label: "Into equal-weight / value", width: 34, tag: "breadth" } ],
            note: "Widths illustrate direction and rough scale, not measured flows." },
        ], right: [
          { t: "bignums", items: [
            { kicker: "Biggest number", value: "$1T", label: "Chip market value lost in July" },
            { kicker: "Boldest move", value: "+25bp", label: "Bank of Korea's first hike since 2023", tone: "blue" },
            { kicker: "Biggest risk", value: "$90", label: "Brent crude — and rising", tone: "red" } ] },
        ] },
        { t: "strip", items: [{ value: "3.0%", label: "IMF world growth 2026" }, { value: "3.5%", label: "US CPI, June" }, { value: "4.75%", label: "US 10-yr yield" }, { value: "~164", label: "Yen low per $" }] },
      ],
    },

    // ── 32 EXPLAINER ─────────────────────────────────────────────────────
    {
      section: "Economic Explainer", toc: "Explainer: Currency Intervention",
      kicker: "Economics, explained",
      title: "What is currency intervention?",
      deck: "Japan bought yen in July. Here's how a government fights the market — and why it doesn't always win.",
      left: [
        { t: "lead", text: "Most of the time, exchange rates float: the yen's value is set by millions of trades a day. Intervention is when a government steps into that market itself — buying its own currency to push it up, or selling to push it down." },
        { t: "p", text: "To *support* a weak currency, a country spends its foreign reserves. Japan holds well over a trillion dollars' worth. Its finance ministry orders the central bank to sell dollars and buy yen; the sudden wave of yen demand drives the price up — as it did on 30 July, when the yen jumped more than 3% in a day." },
        { t: "p", text: "The catch is that intervention treats the symptom, not the cause. The yen was weak because Japanese interest rates (1.0%) are far below American ones (3.50–3.75%), so investors earn more holding dollars. Unless that gap narrows — through a BoJ hike or Fed cuts — the pressure tends to return. That is why intervention is most powerful when it is coordinated, as July's was, and backed by a credible change in policy." },
        { t: "p", text: "Countries sometimes intervene the other way, selling their currency to keep exports cheap. Done persistently, that can lead to accusations of currency manipulation — which is why the United States agreeing to *join* Japan's operation was a significant signal." },
      ],
      right: [
        { t: "chart", type: "ladder", title: "How intervention works", dot: "gold", steps: [
          { value: "1", label: "Currency falls fast (yen ~164/$)", tone: "red" },
          { value: "2", label: "Ministry orders reserve sales: sell $, buy ¥", tone: "gold" },
          { value: "3", label: "Yen demand spikes; price jumps (+3%)", tone: "green" },
          { value: "4", label: "Lasting only if rate gap narrows", tone: "blue" } ], source: "Conceptual; July 2026 figures from p.12." },
        { t: "sidebar", title: "A little history", text: "The 1985 Plaza Accord was the most famous coordinated intervention: the US, Japan, West Germany, France and the UK agreed to push the dollar down. It worked — the dollar fell by about half against the yen over two years." },
        { t: "callout", title: "The takeaway", text: "Intervention can stop a panic. Only interest rates can change a trend." },
      ],
    },

    // ── 33 VOCABULARY ────────────────────────────────────────────────────
    {
      section: "Vocabulary Builder", toc: "Vocabulary",
      kicker: "Speak the language",
      title: "Ten terms from this issue",
      deck: "Every phrase below appeared in July's stories. Learn these and the financial news stops being a foreign language.",
      full: [
        { t: "terms", items: [
          { term: "Dissent", def: "A recorded vote against a central bank's decision. Three at the Fed in July — all for a hike (p.08)." },
          { term: "Forward guidance", def: "A central bank's hints about future policy. The Fed has dropped it for now (p.08)." },
          { term: "Intervention", def: "A government buying or selling currency to move its price — as Japan did with the yen (p.32)." },
          { term: "War-risk premium", def: "Extra insurance cost for ships entering a conflict zone, like Hormuz (p.15)." },
          { term: "Participation rate", def: "Share of adults working or looking for work. Fell to 61.4% in the US (p.06)." },
          { term: "Core inflation", def: "Inflation excluding food and energy; the trend central banks watch (p.07)." },
          { term: "Equal-weight index", def: "An index giving every company the same weight — a gauge of the typical stock (p.19)." },
          { term: "Capex", def: "Capital expenditure on long-lived assets such as data centres (p.25)." },
          { term: "Front-loading", def: "Pulling purchases forward to beat a tariff or price rise (p.26)." },
          { term: "Restructuring", def: "Swapping unpayable debt for new bonds on easier terms — as Ghana completed (p.29)." },
        ] },
        { t: "callout", title: "Try it yourself", text: "\"Three FOMC members dissented in favour of a hike as yields rose.\" Decoded: three Fed policymakers formally voted for higher rates, and the bond market pushed long-term borrowing costs up on its own." },
      ],
    },

    // ── 34 LIGHTER SIDE ──────────────────────────────────────────────────
    {
      section: "The Lighter Side", toc: "The Lighter Side",
      kicker: "Because economics can be fun",
      title: "The Lighter Side",
      deck: "A little play before you go — every puzzle drawn from this month's real stories.",
      full: [
        { t: "g2", left: [
          { t: "puzzle", icon: "🎯", title: "Guess the Company", dot: "gold", paras: ["Three clues, one July headline-maker:"], list: ["Its cloud arm grew 37% — the fastest in 18 quarters.", "It plans to spend about $220 billion this year.", "Its shares jumped while Apple's fell on the same night."], answer: "Amazon" },
          { t: "puzzle", icon: "🧠", title: "Trivia: true or false?", dot: "blue", paras: ["\"US unemployment fell in July, so the job market got stronger.\""], answer: "False — the rate fell because people left the labour force; payrolls actually shrank by 23,000." },
          { t: "puzzle", icon: "💡", title: "Scale check", dot: "green", paras: ["The chip sell-off erased about **$1 trillion** in a month. Spread over July's 22 trading days, that's roughly **$45 billion a day** — more than the entire annual output of many countries, vanishing every session."] },
        ], right: [
          { t: "meme", head: "Fed voter, July 2026:", a: "Inflation is cooling, let's wait…", b: "…oil is up 24%, let's hike", emoji: "🔄", caption: "the July data starter pack" },
          { t: "puzzle", icon: "🔢", title: "By the numbers", dot: "violet", paras: ["Match the number to the story:"], rows: [["$90.12", "Brent, 31 July"], ["9–3", "Fed vote"], ["163.99", "Yen low per dollar"], ["$42.2bn", "AWS quarterly revenue"]] },
          { t: "puzzle", icon: "🃏", title: "Cryptic clue", dot: "gold", paras: ["\"I'm signed in June and broken in July; oil traders price me by the strait I keep. What am I?\""], answer: "A ceasefire" },
        ] },
        { t: "callout", icon: "😅", title: "The groan zone · three jokes we're not sorry for", text: "• Why did the semiconductor stock break up with the market? It needed more *space* — about $1 trillion of it.  • The yen walked into the bar at 164 and the bouncer said, \"Sorry, we only let in currencies with *support*.\"  • Three Fed officials walked into a meeting and asked for a hike. The other nine said they'd *rather sit this one out*." },
        { t: "note", text: "All puzzles use figures reported for July 2026. Sources on p.36." },
      ],
    },

    // ── 35 TO CLOSE ──────────────────────────────────────────────────────
    {
      section: "History · Culture · Ahead", toc: "History · Picks · The Month Ahead",
      kicker: "To close",
      title: "This month in history · What to read · The month ahead",
      full: [
        { t: "cards", cols: 3, items: [
          { title: "⏳ This month in history", dot: "gold", paras: ["In July 1944, delegates from 44 nations met at Bretton Woods, New Hampshire, and created the International Monetary Fund and the World Bank — the institutions whose forecasts open this issue.", "They also fixed exchange rates to the dollar, a system that lasted until 1971. July's yen intervention is a small echo of that era's managed currencies."], source: "Historical context." },
          { title: "📚 Frontier picks", dot: "blue", paras: ["**Read:** the IMF's July 2026 WEO Update — short, and the clearest map of the year's risks.", "**Listen:** any explainer on the Plaza Accord, for context on coordinated intervention.", "**Watch:** a documentary on the 1970s oil shocks — history as preview."], source: "Recommendations, not endorsements." },
          { title: "📅 The month ahead", dot: "violet", paras: ["**Watch for:** the July CPI on 12 August; RBI (3–5 Aug) and Brazil (5 Aug) decisions; the Fed's Jackson Hole symposium; any reopening of Hormuz; and whether September Fed-hike odds hold."], source: "Forward-looking; not investment advice." },
        ] },
        { t: "table", title: "The July diary — key dates", dot: "gold", head: ["Date", "Event", "Page"], rows: [
          ["5 Jul", "Seven OPEC+ members add 188,000 b/d for August", "15"],
          ["~7 Jul", "Tanker attacks and US strikes on Iran end the June truce", "15"],
          ["8 Jul", "IMF WEO Update: world growth 3.0%, inflation 4.7%", "04"],
          ["13 Jul", "Ghana settles its Saderea bond exchange", "29"],
          ["14 Jul", "US CPI for June: 3.5%, gasoline –9.7% m/m", "07"],
          ["15 Jul", "China Q2 GDP: 4.3%, slowest since 2022", "11"],
          ["16 Jul", "Bank of Korea hikes to 2.75%", "18"],
          ["22–23 Jul", "UK CPI 2.6%; ECB holds at 2.25%", "13–14"],
          ["29 Jul", "Fed holds 9–3, three votes to hike", "08"],
          ["30 Jul", "US Q2 GDP 1.5%; BoE holds 6–3; yen intervention; Amazon results", "06–28"],
          ["31 Jul", "BoJ holds 8–1; euro-area flash CPI 2.9%; Brent settles $90.12", "12–22"] ],
          source: "Compiled from the sources on p.36." },
        { t: "quote", text: "In July the market learned that a ceasefire is a price, not a promise — and it repriced accordingly.", by: "The Financial Frontier" },
      ],
    },

    // ── 36 SOURCES ───────────────────────────────────────────────────────
    {
      section: "Sources & Method", toc: "Sources & Method",
      kicker: "Sources & method",
      title: "Where every number came from",
      full: [
        { t: "sources", items: [
          "IMF — World Economic Outlook Update, July 2026, *Global Economy in Crosscurrents of War and Technology* (8 Jul); press briefing transcript.",
          "Federal Reserve — FOMC statement, 29 Jul 2026; coverage by Schwab, KPMG, Investing.com, Fox Business, Trading Economics.",
          "BEA — GDP advance estimate, Q2 2026 (30 Jul); second (26 Aug) and third (30 Sep) estimates.",
          "BLS — Consumer Price Index, June 2026 (14 Jul); Employment Situation, July 2026 (7 Aug); St. Louis Fed flash report.",
          "Al Jazeera, CBS News, Business Today, BNN Bloomberg — US–Iran strikes and Hormuz, 7–13 Jul 2026.",
          "S&P Global Commodity Insights — Hormuz shipping insurance (22 Jul); Lloyd's List; ICIS; Anadolu Agency on container rates.",
          "OPEC — press release, 5 Jul 2026; Gulf News; Al-Ahram; Saudi Gazette.",
          "Reuters via The Peninsula, QNA, Euronext — oil settlement prices, 31 Jul 2026; Barchart.",
          "Cetera, Tapeboard, YCharts, Nasdaq, LPL Financial — July 2026 equity recaps.",
          "Advisor Perspectives, CME Group, FXEmpire, Mortgage News Daily — Treasury yields.",
          "Trading Economics, Xinhua via The Star, RTT News — dollar index, yen and euro moves; Japan confirmation, 3 Aug.",
          "World Gold Council, Perth Mint, Kitco, Gulf News — gold; Binance, Galaxy Research, CryptoRank, K33, Bitvavo, The Block — crypto.",
          "Bloomberg via Fortune; Morningstar; Axios; Nasdaq/Motley Fool — semiconductor sell-off.",
          "Amazon and Apple Q2 results via Stocktwits, 24/7 Wall St, Zacks, SiliconANGLE, Quartz.",
          "ECB — monetary policy decision, 23 Jul 2026; account of the meeting; Euronews; BBVA Research. Eurostat flash HICP, 31 Jul 2026.",
          "Bank of Japan — statement and Outlook Report, 31 Jul 2026; Nippon.com; Oxford Economics.",
          "ONS — Consumer price inflation, June 2026 (22 Jul); Bank of England — Monetary Policy Summary, 30 Jul 2026; AJ Bell; ICAEW.",
          "National Bureau of Statistics of China — Q2 2026 GDP (15 Jul); ING; China Briefing.",
          "Reserve Bank of India — Monetary Policy Statement (June) and RBI Bulletin (July 2026).",
          "Bank of Korea; Korea Times; Asia Economy. Reserve Bank of Australia media releases.",
          "Banco Central do Brasil (via Itaú, Bloomberg Línea, O Povo); Banxico minutes (via Itaú, Monex); Buenos Aires Times; MercoPress.",
          "French Treasury (DG Trésor) weekly briefs on Nigeria and Ghana; Semafor Africa; Serrari Group.",
          "Ghana Ministry of Finance — Saderea exchange (Jul 2026); Cleary Gottlieb; Graphic Online; Zawya.",
        ] },
        { t: "callout", title: "Method", text: "We separate fact (sourced figures), analysis (our reading) and opinion (labelled). Where sources disagreed — on index returns, gold's monthly move or a stock's closing price — we give the range or the primary release. Some charts are conceptual and are labelled as such. Data released in early August about July (jobs, Ghana's reserves) is included and dated. The Financial Frontier is an educational publication. Nothing herein is investment advice." },
      ],
    },
  ],
};
