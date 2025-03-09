import React from "react";
import { IPokemon } from "@/typings";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define type colors for consistency with the Pokémon list
const typeColors: Record<string, string> = {
  Grass: "bg-green-500",
  Poison: "bg-purple-500",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
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

interface ResultProps {
  pokemon: IPokemon | null;
}

export const Result: React.FC<ResultProps> = ({ pokemon }) => {
  const router = useRouter();

  if (!pokemon) {
    return (
      <p className="text-black text-center">
        No Pokémon found. Try another name.
      </p>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      {/* Pokémon Name */}
      <h2 className="text-3xl font-bold text-center mb-3">{pokemon.name}</h2>

      {/* Pokémon Image */}
      <div className="w-full h-48 object-contain relative">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>

      {/* Pokémon Types */}
      <div className="flex gap-2 mt-3">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-3 py-1 text-black text-sm font-semibold rounded-lg ${typeColors[type] || "bg-gray-600"}`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Pokémon Details */}
      <div className="w-full mt-4 text-gray-700 text-lg space-y-2">
        <p>
          <strong>Classification:</strong> {pokemon.classification}
        </p>
        <p>
          <strong>Max CP:</strong> {pokemon.maxCP}
        </p>
        <p>
          <strong>Max HP:</strong> {pokemon.maxHP}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.height.minimum} - {pokemon.height.maximum}
        </p>
      </div>

      {/* Pokémon Resistances & Weaknesses */}
      <div className="w-full flex flex-col md:flex-row justify-between mt-4">
        <div className="w-full md:w-1/2 px-2">
          <h3 className="font-semibold text-lg mb-1">Resistant</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.resistant.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 text-black text-sm rounded-lg ${typeColors[type] || "bg-gray-600"}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <h3 className="font-semibold text-lg mb-1">Weaknesses</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.weaknesses.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 text-black text-sm rounded-lg ${typeColors[type] || "bg-gray-600"}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Evolutions */}
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div className="w-full mt-6">
          <h3 className="text-xl font-bold text-center">Evolutions</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {pokemon.evolutions.map((evo) => (
              <button
                key={evo.name}
                onClick={() => router.push(`/pokemon/${evo.name}`)}
                className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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