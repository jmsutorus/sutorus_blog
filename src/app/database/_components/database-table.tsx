"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/pagination";
import { Button } from "@/app/_components/button";
import { Badge } from "@/app/_components/badge";
import type { Post } from "@/interfaces/post";

const ITEMS_PER_PAGE = 10;

type DatabaseTableProps = {
  posts: Post[];
};

// Remove brackets and clean up text
const cleanText = (text: string): string => {
  return text
    .replace(/\[\[/g, "")
    .replace(/\]\]/g, "")
    .replace(/,(?!\s)/g, ", "); // Add space after comma if not present
};

// Format category for display
const formatCategory = (category: string): string => {
  return cleanText(category);
};

// Format genre for display - handle both string and array types
const formatGenre = (genre: string | string[]): string => {
  if (Array.isArray(genre)) {
    return genre.map((g) => cleanText(g)).join(", ");
  }
  return cleanText(genre);
};

// Format date for display
const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function DatabaseTable({ posts }: DatabaseTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Handle row click
  const handleRowClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  // Handle tag click
  const handleTagClick = useCallback((tag: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent row click when clicking tag
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags;
      }
      return [...prevTags, tag];
    });
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  // Handle tag removal
  const handleRemoveTag = useCallback((tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter(t => t !== tag));
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  // Clear all tag filters
  const handleClearAllTags = useCallback(() => {
    setSelectedTags([]);
    setCurrentPage(1);
  }, []);

  // Column definitions with sorting
  const columns: ColumnDef<Post>[] = useMemo(() => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          Title
          {isSorted === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          Category
          {isSorted === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => formatCategory(row.getValue("category")),
  },
  {
    accessorKey: "genre",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          Genre
          {isSorted === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => formatGenre(row.getValue("genre")),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags && tags.length > 0 ? (
            tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className="text-xs cursor-pointer hover:opacity-80 transition-opacity"
                onClick={(e) => handleTagClick(tag, e)}
              >
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "completed",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent"
          >
            Completed
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="text-right">{formatDate(row.getValue("completed"))}</div>,
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
], [selectedTags]);

  // Filter posts by selected tags (posts must have ALL selected tags)
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter(post =>
      selectedTags.every(selectedTag => post.tags.includes(selectedTag))
    );
  }, [posts, selectedTags]);

  // Create table instance
  const table = useReactTable({
    data: filteredPosts,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  // Calculate pagination on sorted data
  const sortedRows = table.getRowModel().rows;
  const totalPages = Math.ceil(sortedRows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRows = sortedRows.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">
          All posts are currently displayed on the landing page.
        </p>
      </div>
    );
  }

  return (
    <>
      {selectedTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Filtering by:</span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="text-xs cursor-pointer hover:opacity-80 transition-opacity"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllTags}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
      <div className="mb-8 overflow-hidden rounded-md border">
        <Table>
          <TableCaption>
            Posts archived from the landing page (Page {currentPage} of {totalPages})
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.id === "title" ? "w-[300px]" : ""}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original.slug)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mb-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {typeof page === "number" ? (
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
