"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "@/components/ui/separator";
import { Search, Menu } from "lucide-react";
import { useSearch } from "./search-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/wedding", label: "Wedding" },
  { href: "/backpacking", label: "Backpacking" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const { setOpen } = useSearch();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSheetOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base"
                  size="lg"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Search and Theme Controls */}
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                setOpen(true);
                setSheetOpen(false);
              }}
              className="w-full justify-start gap-2 text-base"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="ml-auto pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 inline-flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
