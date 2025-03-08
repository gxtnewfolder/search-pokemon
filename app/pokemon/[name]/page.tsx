"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const PokemonPage = () => {
  const { name } = useParams() as { name: string }; // Get Pokémon name from URL
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Oops! Pokémon not found.</p>;

  const pokemon: IPokemon = data?.pokemon;

  return (
    <div className="max-w-2xl mx-auto text-white">
      <button onClick={() => router.back()} className="text-yellow-500">
        ← Back
      </button>

      <h1 className="text-4xl">{pokemon.name}</h1>
      <Image src={pokemon.image} alt={pokemon.name} className="w-48 h-48" width={200} height={200} />

      <p>Classification: {pokemon.classification}</p>
      <p>Max HP: {pokemon.maxHP}</p>
      <p>Max CP: {pokemon.maxCP}</p>

      {/* Evolution Section */}
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl">Evolutions</h2>
          <div className="flex gap-2">
            {pokemon.evolutions.map((evo) => (
              <button
                key={evo.name}
                onClick={() => router.push(`/pokemon/${evo.name}`)}
                className="bg-gray-700 p-2 rounded"
              >
                {evo.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
