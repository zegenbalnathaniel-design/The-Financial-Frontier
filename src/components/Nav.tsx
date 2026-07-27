"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/reports", label: "Reports" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/network", label: "Network" },
  { href: "/data", label: "Explore" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/[0.06] bg-midnight/70 backdrop-blur-xl">
        <nav className="shell flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative grid h-7 w-7 place-items-center rounded-lg border border-emerald/50 bg-emerald/5">
              <span className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_12px_#00D084]" />
            </span>
            <span className="font-display text-[15px] font-semibold text-ink">The Financial Frontier</span>
          </Link>
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link href={l.href} className={`text-sm transition-colors hover:text-ink ${active ? "text-emerald" : "text-muted"}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="text-muted lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>
      <div className="gradient-rule" />
      {open && (
        <ul className="shell space-y-1 border-b border-white/[0.06] bg-midnight/95 py-4 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
