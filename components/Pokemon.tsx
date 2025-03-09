"use client";
import { IPokemon } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  pokemon: IPokemon;
};

// Define colors for each type
const typeColors: Record<string, string> = {
  Poison: "bg-purple-500",
  Fire: "bg-gradient-to-r from-red-500 to-orange-400",
  Water: "bg-gradient-to-r from-blue-500 to-cyan-400",
  Grass: "bg-gradient-to-r from-green-500 to-lime-400",
  Electric: "bg-yellow-500",
  Psychic: "bg-pink-500",
  Ice: "bg-cyan-500",
  Bug: "bg-lime-500",
  Rock: "bg-gray-500",
  Ghost: "bg-indigo-500",
  Dragon: "bg-purple-700",
  Dark: "bg-gray-800",
  Steel: "bg-gray-400",
  Fairy: "bg-pink-300",
  Fighting: "bg-orange-500",
  Flying: "bg-blue-300",
  Ground: "bg-yellow-700",
  Normal: "bg-gray-300",
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
