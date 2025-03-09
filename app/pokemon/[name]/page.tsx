"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { useRouter, useParams } from "next/navigation";
import { Result } from "@/components/Result";
import Image from "next/image";
import sadPikachu from "@/public/pikachu-sad.gif";

const PokemonPage = () => {
  const { name } = useParams() as { name: string };
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name: name.toLowerCase() },
  });

  if (loading) return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (error || !data?.pokemon) return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mb-6">
            <Image
              src={sadPikachu}
              alt="Not Found"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pokémon Not Found</h2>
          <p className="text-gray-600 mb-6">
            Oops! We couldn&apos;t find a Pokémon named &quot;{name}&quot;. 
            <br />
            Please check the spelling or try searching for a different Pokémon.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const pokemon: IPokemon = data.pokemon;

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-4 inline-flex items-center text-gray-600 hover:text-blue-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to List
        </button>
        <Result pokemon={pokemon} attacks={pokemon.attacks} />
      </div>
    </div>
  );
};

export default PokemonPage;
