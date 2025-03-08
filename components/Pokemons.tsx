"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { Pokemon } from "./Pokemon";

export const Pokemons = () => {

  // Fetch initial Pokémon (first 20)
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 20 },
  });

  // Initial Pokémon list
  const allPokemons: IPokemon[] = data?.pokemons || [];

  if (loading)
    return <p className="text-white flex items-center justify-center">Loading...</p>;

  if (error)
    return <p className="text-white flex items-center justify-center">Oops! Something went wrong...</p>;

  return (
    <div className="mt-5">
      {/* Pokémon Grid (Shows first 20 Pokémon) */}
      <div className="grid grid-cols-4 gap-2">
        {allPokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};
