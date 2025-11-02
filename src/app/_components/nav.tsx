"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useSearch } from "./search-provider";

export function Nav() {
  const { setOpen } = useSearch();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-0 sm:px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Name */}
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200">
            Joseph Sutorus
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="ghost" size="sm">
                Reviews
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm">
                About
              </Button>
            </Link>
            <Link href="/wedding">
              <Button variant="ghost" size="sm">
                Wedding
              </Button>
            </Link>
            <Link href="/backpacking">
              <Button variant="ghost" size="sm">
                Backpacking
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </Link>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(true)}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            <Separator orientation="vertical" className="h-6 mx-2" />

            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
