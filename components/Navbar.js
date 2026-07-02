"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/certificates", label: "Certificates" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-navy/70 dark:bg-navy/70 border-b border-white/5">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display font-bold text-lg text-offwhite tracking-tight">
          Faris<span className="text-teal">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-mono text-slate hover:text-teal transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-offwhite">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-white/5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-mono text-slate hover:text-teal"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
