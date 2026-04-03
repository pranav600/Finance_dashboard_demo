"use client";

import { Menu, Search, Sun, Moon } from "lucide-react";
import { RoleSwitcher } from "../shared/RoleSwitcher";
import { useTheme } from "@/components/providers/theme-provider";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 w-full sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 rounded-md focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground/60 hover:text-foreground">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-64 rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Toggle Dark Mode">
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <div className="h-8 w-8 ml-2 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-background">
          PR
        </div>
      </div>
    </header>
  );
}
