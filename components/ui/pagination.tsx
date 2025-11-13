// components/ui/Pagination.tsx
"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  prevLabel = "Previous Page",
  nextLabel = "Next Page",
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full py-4 text-sm text-gray-500">
      {/* Previous */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-teal-600 hover:text-teal-700"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        {prevLabel}
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-3 font-medium">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${
              currentPage === page
                ? "text-teal-700 font-semibold"
                : "text-gray-600 hover:text-teal-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-teal-600 hover:text-teal-700"
        }`}
      >
        {nextLabel}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
