"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      aria-label="Toggle dark or light mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-slate/30 hover:border-teal transition-colors"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-gold" />
      ) : (
        <Moon size={16} className="text-navy" />
      )}
    </button>
  );
}
