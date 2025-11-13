// components/Brouchers/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  buttonLabel?: string;
  initialSearch?: string;
}

export default function SearchBar({
  placeholder = "Search brochures...",
  buttonLabel = "Search",
  initialSearch = "",
}: SearchBarProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="w-full max-w-217 mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary" />
        <Input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full d-block bg-primary/4 rounded-4xl pl-13 pr-18"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-5 text-xl font-medium -translate-y-1/2 capitalize text-tealgreen hover:text-tealgreen/80 transition-colors"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
