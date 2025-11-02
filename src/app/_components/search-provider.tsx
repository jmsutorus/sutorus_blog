"use client"

import * as React from "react"
import { SearchCommand } from "./search-command"
import { SearchItem } from "@/lib/search/getSearchIndex"
import { usePageTracking } from "@/hooks/usePageTracking"

interface SearchContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const SearchContext = React.createContext<SearchContextValue | undefined>(undefined)

export function useSearch() {
  const context = React.useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider")
  }
  return context
}

interface SearchProviderProps {
  children: React.ReactNode
  searchIndex: SearchItem[]
}

export function SearchProvider({ children, searchIndex }: SearchProviderProps) {
  const [open, setOpen] = React.useState(false)

  // Track page visits for recent pages
  usePageTracking(searchIndex)

  // Handle keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <SearchCommand open={open} onOpenChange={setOpen} searchIndex={searchIndex} />
    </SearchContext.Provider>
  )
}
