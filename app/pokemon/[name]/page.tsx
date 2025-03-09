"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { useRouter, useParams } from "next/navigation";
import { Result } from "@/components/Result";

const PokemonPage = () => {
  const { name } = useParams() as { name: string }; // Get Pokémon name from URL
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading) return <p className="text-black">Loading...</p>;
  if (error) return <p className="text-black">Oops! Pokémon not found.</p>;

  const pokemon: IPokemon = data?.pokemon;

  return (
    <div className="text-black border p-5 rounded-lg max-w-5xl mx-auto h-2/3 bg-gray-100 mt-22">
      <button
        className="bg-white-600 text-black px-2 rounded-lg mb-3 hover:bg-white-500"
        onClick={() => router.back()} // Navigate to the previous page
      >
        ← Back
      </button>
      <Result pokemon={pokemon} />
    </div>
  );
};

export default PokemonPage;
