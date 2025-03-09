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
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group relative p-4 border rounded-lg shadow-md bg-white flex flex-col items-center transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
    >
      {/* Pokemon Image with Hover Effect */}
      <div className="w-full h-40 object-contain relative transition-transform duration-300 group-hover:-translate-y-2">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Pokemon Info */}
      <div className="w-full text-center">
        <p className="text-gray-500 text-sm font-medium">#{pokemon.number}</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {pokemon.name}
        </h2>

        {/* Types */}
        <div className="flex gap-2 justify-center mb-3">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-3 py-1 text-white text-sm rounded-full font-medium ${
                typeColors[type] || "bg-gray-600"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="text-center">
            <p className="font-semibold">Max CP</p>
            <p>{pokemon.maxCP}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Max HP</p>
            <p>{pokemon.maxHP}</p>
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      <div className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};
