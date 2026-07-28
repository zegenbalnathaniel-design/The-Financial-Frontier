import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { LiveDataProvider } from "@/components/live/LiveDataProvider";
import { getLiveSnapshot } from "@/lib/live/snapshot";

// Refresh the live dataset daily (ISR). A Vercel Cron also pings /api/refresh to keep
// the cache warm. Each source additionally caches its own fetch for a day.
export const revalidate = 86400;

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "The Financial Frontier — Financial Intelligence, Reimagined",
  description:
    "A premium financial-intelligence platform: an interactive 3D globe, a live economic network, a macro dashboard, and a deep report every month.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fail-safe: if every source is down/unconfigured this resolves to an empty snapshot
  // and the app renders exactly as before, with sample-data labels intact.
  const snapshot = await getLiveSnapshot().catch(() => undefined);
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans text-body antialiased">
        <LiveDataProvider snapshot={snapshot ?? { values: {}, sources: [], generatedAt: "" }}>
          <ScrollProgress />
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LiveDataProvider>
      </body>
    </html>
  );
}
