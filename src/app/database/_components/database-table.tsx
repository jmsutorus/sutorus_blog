"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Post } from "@/interfaces/post";

const ITEMS_PER_PAGE = 10;

type DatabaseTableProps = {
  posts: Post[];
};

export function DatabaseTable({ posts }: DatabaseTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

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

  // Handle row click
  const handleRowClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

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
      <div className="mb-8 overflow-hidden rounded-md border">
        <Table>
          <TableCaption>
            Posts archived from the landing page (Page {currentPage} of {totalPages})
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.slug}
                onClick={() => handleRowClick(post.slug)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{formatCategory(post.category)}</TableCell>
                <TableCell>{formatGenre(post.genre)}</TableCell>
                <TableCell className="text-right">
                  {formatDate(post.completed)}
                </TableCell>
              </TableRow>
            ))}
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
