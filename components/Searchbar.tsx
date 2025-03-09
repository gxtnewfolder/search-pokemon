"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "@/graphql/queries";
import { IPokemon } from "@/typings";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Reset search state when route changes
  useEffect(() => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, [pathname]);

  const { data } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 151 },
  });

  const allPokemons: IPokemon[] = data?.pokemons || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/pokemon/${search.trim().toLowerCase()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      const filtered = allPokemons
        .filter(pokemon => 
          pokemon.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .map(pokemon => pokemon.name);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName.toLowerCase()}`);
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-1">
          <input
            value={search}
            onChange={handleInputChange}
            type="text"
            placeholder="Search Pokémon..."
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 300)
            }}
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors"
            disabled={!search}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <div className="text-gray-500 mb-1">No Pokémon Found</div>
              <div className="text-sm text-gray-400">Try another name or check the spelling</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
