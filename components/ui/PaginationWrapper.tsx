// components/News/PaginationWrapper.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";

interface PaginationWrapperProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationWrapper({
  totalPages,
  currentPage,
}: PaginationWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
