"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "@/graphql/queries";
import { IPokemon } from "@/typings";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const { data } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 151 },
  });

  const allPokemons: IPokemon[] = data?.pokemons || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/pokemon/${search.trim()}`);
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

  const handleSuggestionClick = async (pokemonName: string) => {
    setSearch(pokemonName);
    setSuggestions([]);
    setShowSuggestions(false);
    await router.push(`/pokemon/${pokemonName}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex space-x-2 my-5">
        <input
          value={search}
          onChange={handleInputChange}
          type="text"
          placeholder="Search Pokémon"
          className="bg-transparent border text-white p-2 rounded-lg w-full"
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 300)
          }}
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black p-2 rounded-lg"
          disabled={!search}
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-700 cursor-pointer text-white"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
