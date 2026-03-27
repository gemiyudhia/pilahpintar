"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <Input
        placeholder="Cari material atau kategori..."
        className="pl-10"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          const value = e.target.value;
          handleSearch(value);
        }}
      />
    </div>
  );
}
