"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : undefined;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
    >
      <Sun className="h-5 w-5 block dark:hidden" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
