// The board's constituents. Kept separate from markets.ts (server-only) so the
// search index and UI can import the list without pulling in fetch code.

export interface StockMeta { symbol: string; name: string; sector: string }

// The major US large caps people actually ask about — the "Mag 7" plus the biggest
// names in finance, health, energy and consumer. Edit freely; order doesn't matter.
export const MAJOR_STOCKS: StockMeta[] = [
  { symbol: "AAPL", name: "Apple", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", sector: "Technology" },
  { symbol: "NVDA", name: "Nvidia", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet", sector: "Communication" },
  { symbol: "AMZN", name: "Amazon", sector: "Consumer" },
  { symbol: "META", name: "Meta", sector: "Communication" },
  { symbol: "TSLA", name: "Tesla", sector: "Consumer" },
  { symbol: "AVGO", name: "Broadcom", sector: "Technology" },
  { symbol: "BRK.B", name: "Berkshire Hathaway", sector: "Financials" },
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financials" },
  { symbol: "LLY", name: "Eli Lilly", sector: "Health" },
  { symbol: "V", name: "Visa", sector: "Financials" },
  { symbol: "MA", name: "Mastercard", sector: "Financials" },
  { symbol: "XOM", name: "ExxonMobil", sector: "Energy" },
  { symbol: "CVX", name: "Chevron", sector: "Energy" },
  { symbol: "WMT", name: "Walmart", sector: "Consumer" },
  { symbol: "COST", name: "Costco", sector: "Consumer" },
  { symbol: "UNH", name: "UnitedHealth", sector: "Health" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Health" },
  { symbol: "ORCL", name: "Oracle", sector: "Technology" },
  { symbol: "NFLX", name: "Netflix", sector: "Communication" },
  { symbol: "AMD", name: "AMD", sector: "Technology" },
  { symbol: "BAC", name: "Bank of America", sector: "Financials" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer" },
  { symbol: "HD", name: "Home Depot", sector: "Consumer" },
  { symbol: "KO", name: "Coca-Cola", sector: "Consumer" },
  { symbol: "CRM", name: "Salesforce", sector: "Technology" },
  { symbol: "PLTR", name: "Palantir", sector: "Technology" },
];

