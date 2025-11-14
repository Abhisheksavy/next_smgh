"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import { Search } from "lucide-react";

interface NewsSearchBarProps {
  placeholder?: string;
  initialSearch?: string;
}

export default function NewsSearchBar({
  placeholder = "News Search",
  initialSearch = "",
}: NewsSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    // Reset to page 1 when searching
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary text-white"
      />
      <button type="submit" className="absolute right-0 top-0 bottom-0 pr-5">
        <Search className="text-secondary w-4 h-4" />
      </button>
    </form>
  );
}
