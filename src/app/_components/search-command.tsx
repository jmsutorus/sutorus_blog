"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { SearchItem } from "@/lib/search/getSearchIndex"
import { getRecentPages, RecentPage } from "@/lib/search/recentPages"
import { BookOpen, Mountain, Heart, FileText, Clock } from "lucide-react"

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchIndex: SearchItem[]
}

// Icon mapping for content types
const typeIcons = {
  review: BookOpen,
  trip: Mountain,
  wedding: Heart,
  page: FileText,
}

// Label mapping for content types
const typeLabels = {
  review: 'Reviews',
  trip: 'Trips',
  wedding: 'Wedding',
  page: 'Pages',
}

export function SearchCommand({ open, onOpenChange, searchIndex }: SearchCommandProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchItem[]>([])
  const [recentPages, setRecentPages] = React.useState<RecentPage[]>([])

  // Initialize Fuse.js
  const fuse = React.useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 2 },
          { name: "description", weight: 1.5 },
          { name: "content", weight: 1 },
          { name: "metadata.category", weight: 1.2 },
          { name: "metadata.tags", weight: 1.2 },
          { name: "metadata.location", weight: 1.2 },
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [searchIndex]
  )

  // Load recent pages when modal opens
  React.useEffect(() => {
    if (open) {
      const recent = getRecentPages()
      setRecentPages(recent)
    }
  }, [open])

  // Perform search when query changes
  React.useEffect(() => {
    if (query.length === 0) {
      setResults([])
      return
    }

    if (query.length < 2) {
      setResults([])
      return
    }

    const searchResults = fuse.search(query)
    setResults(searchResults.map((result) => result.item))
  }, [query, fuse])

  // Group results by type
  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {
      review: [],
      trip: [],
      wedding: [],
      page: [],
    }

    results.forEach((item) => {
      groups[item.type].push(item)
    })

    return groups
  }, [results])

  const handleSelect = (url: string) => {
    onOpenChange(false)
    setQuery("")
    router.push(url)
  }

  const handleClose = () => {
    onOpenChange(false)
    setQuery("")
  }

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <CommandInput
        placeholder="Search reviews, trips, and pages..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Recent Pages - Show when no query */}
        {query.length === 0 && recentPages.length > 0 && (
          <CommandGroup heading="Recent Pages">
            {recentPages.map((page) => {
              const Icon = typeIcons[page.type] || Clock
              return (
                <CommandItem
                  key={page.url}
                  value={page.url}
                  onSelect={() => handleSelect(page.url)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(page.url)
                  }}
                  className="flex items-start gap-3"
                >
                  <Clock className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium truncate">{page.title}</div>
                    {page.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {page.description}
                      </div>
                    )}
                  </div>
                  {page.type === 'review' && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {typeLabels[page.type]}
                    </Badge>
                  )}
                  {page.type === 'trip' && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {typeLabels[page.type]}
                    </Badge>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        {/* Empty state when no recent pages and no query */}
        {query.length === 0 && recentPages.length === 0 && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Start browsing to see recent pages
          </div>
        )}

        {/* Reviews Group */}
        {query.length > 0 && groupedResults.review.length > 0 && (
          <CommandGroup heading={`${typeLabels.review} (${groupedResults.review.length})`}>
            {groupedResults.review.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.url)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(item.url)
                  }}
                  className="flex items-start gap-3"
                >
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium truncate">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {item.metadata?.category && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {item.metadata.category}
                    </Badge>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        {/* Trips Group */}
        {query.length > 0 && groupedResults.trip.length > 0 && (
          <CommandGroup heading={`${typeLabels.trip} (${groupedResults.trip.length})`}>
            {groupedResults.trip.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.url)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(item.url)
                  }}
                  className="flex items-start gap-3"
                >
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium truncate">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {item.metadata?.location && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {item.metadata.location}
                    </Badge>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        {/* Wedding Group */}
        {query.length > 0 && groupedResults.wedding.length > 0 && (
          <CommandGroup heading={typeLabels.wedding}>
            {groupedResults.wedding.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.url)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(item.url)
                  }}
                  className="flex items-start gap-3"
                >
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium truncate">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        {/* Pages Group */}
        {query.length > 0 && groupedResults.page.length > 0 && (
          <CommandGroup heading={`${typeLabels.page} (${groupedResults.page.length})`}>
            {groupedResults.page.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.url)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(item.url)
                  }}
                  className="flex items-start gap-3"
                >
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium truncate">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
