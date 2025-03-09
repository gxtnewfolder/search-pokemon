"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { Pokemon } from "./Pokemon";
import FilterDropdown from "./FilterDropdown";

export const Pokemons = () => {
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 151 },
  });

  // Pokémon List
  const allPokemons: IPokemon[] = data?.pokemons || [];

  // Selected Type for Filtering
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Function to filter Pokémon based on selected type
  const filteredPokemons = selectedType
    ? allPokemons.filter((pokemon) => pokemon.types.includes(selectedType))
    : allPokemons;

  if (loading)
    return <p className="text-black flex items-center justify-center">Loading...</p>;

  if (error)
    return <p className="text-black flex items-center justify-center">Oops! Something went wrong...</p>;

  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar Filter on Left */}
      <div className="w-1/4 min-w-[200px]">
        <FilterDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {/* Pokémon List on Right */}
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4">
          {filteredPokemons.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};