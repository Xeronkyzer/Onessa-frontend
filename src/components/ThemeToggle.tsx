"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-secondary/20 border border-white/5" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="magnetic group relative w-12 h-12 rounded-full bg-secondary/20 border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Sun Icon (Light Mode) */}
      <Sun
        className={`absolute w-5 h-5 text-foreground transition-all duration-500 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />

      {/* Moon Icon (Dark Mode) */}
      <Moon
        className={`absolute w-5 h-5 text-foreground transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
