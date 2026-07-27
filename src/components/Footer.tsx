import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-white/[0.06] bg-midnight/60">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-lg font-semibold text-ink">Economics Explained. Markets Decoded.</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            A premium financial-intelligence publication — immersive data, a new report every month.
          </p>
        </div>
        <div>
          <p className="kicker">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/reports" className="hover:text-ink">Reports</Link></li>
            <li><Link href="/dashboard" className="hover:text-ink">Dashboard</Link></li>
            <li><Link href="/network" className="hover:text-ink">Economic network</Link></li>
            <li><Link href="/learn" className="hover:text-ink">Glossary</Link></li>
          </ul>
        </div>
        <div>
          <p className="kicker">Publication</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-white/[0.06] py-6 text-xs text-muted2 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} The Financial Frontier. Educational use only — not investment advice.</p>
        <p className="font-mono tracking-widest">thefinancialfrontier.com</p>
      </div>
    </footer>
  );
}
