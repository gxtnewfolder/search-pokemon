"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/pokemon/${search.trim()}`); // Navigate to Pokémon page
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-3 my-5">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search Pokémon"
        className="bg-transparent border text-white p-2 rounded-lg"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-black p-2 rounded-lg"
        disabled={!search}
      >
        Search
      </button>
    </form>
  );
};
