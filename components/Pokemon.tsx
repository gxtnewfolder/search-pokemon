"use client";
import { IPokemon, Attack } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
	pokemon: IPokemon;
	attacks: {
	  fast: Attack[];
	  special: Attack[];
	};
  };

// Define colors for each type
const typeColors: Record<string, string> = {
  Poison: "bg-gradient-to-r from-purple-500 to-pink-400",
  Fire: "bg-gradient-to-r from-red-500 to-orange-400",
  Water: "bg-gradient-to-r from-blue-500 to-cyan-400",
  Grass: "bg-gradient-to-r from-green-500 to-lime-400",
  Electric: "bg-gradient-to-r from-yellow-500 to-orange-400",
  Psychic: "bg-gradient-to-r from-pink-500 to-purple-400",
  Ice: "bg-gradient-to-r from-cyan-500 to-blue-400",
  Bug: "bg-gradient-to-r from-lime-500 to-green-400",
  Rock: "bg-gradient-to-r from-gray-500 to-gray-400",
  Ghost: "bg-gradient-to-r from-indigo-500 to-purple-400",
  Dragon: "bg-gradient-to-r from-purple-700 to-pink-400",
  Dark: "bg-gradient-to-r from-gray-800 to-gray-600",
  Steel: "bg-gradient-to-r from-gray-400 to-gray-300",
  Fairy: "bg-gradient-to-r from-pink-300 to-pink-200",
  Fighting: "bg-gradient-to-r from-orange-500 to-orange-400",
  Flying: "bg-gradient-to-r from-blue-300 to-blue-200",
  Ground: "bg-gradient-to-r from-yellow-700 to-yellow-600",
  Normal: "bg-gradient-to-r from-gray-300 to-gray-200",
};

export const Pokemon = ({ pokemon }: Props) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center">
      {/* Use Next.js Image for better performance */}
      <div className="w-full h-40 object-contain relative">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

	  <p className="text-gray-600 mt-2">#{pokemon.number}</p>
      <h2 className="text-xl font-bold">{pokemon.name}</h2>

      {/* Display Pokémon Types with Colors */}
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 text-white text-sm rounded-lg ${
              typeColors[type] || "bg-gray-600"
            }`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* View Pokémon Details */}
      <Link
        href={`/pokemon/${pokemon.name}`}
        className="bg-orange-500 mt-5 p-2 rounded-lg text-center text-white"
      >
        View Details
      </Link>
    </div>
  );
};
