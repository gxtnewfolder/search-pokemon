import React from "react";
import { IPokemon, Attack } from "@/typings";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define type colors for consistency with the Pokémon list
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

interface ResultProps {
  pokemon: IPokemon | null;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Pokémon Types */}
      <div className="flex gap-2 mt-3">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-3 py-1 text-black text-sm font-semibold rounded-lg ${
              typeColors[type] || "bg-gray-600"
            }`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Pokémon Details */}
      <div className="w-full mt-4 text-gray-700 text-lg grid grid-cols-2 gap-4">
        {/* Left Column - Basic Stats */}
        <div className="space-y-2">
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
            <strong>Weight:</strong> {pokemon.weight.minimum} -{" "}
            {pokemon.weight.maximum}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height.minimum} -{" "}
            {pokemon.height.maximum}
          </p>
        </div>

        {/* Right Column - Attacks */}
        <div className="space-y-4">
          {/* Fast Attacks */}
          <div>
            <h3 className="font-semibold text-lg">Fast Attacks</h3>
            <ul>
              {pokemon.attacks.fast.map((attack) => (
                <li key={attack.name} className={`px-3 py-1 rounded-lg`}>
                  <strong className={`px-3 py-1 rounded-lg ${typeColors[attack.type] || "bg-gray-600"}`}>{attack.name}</strong> - {attack.damage} DMG
                </li>
              ))}
            </ul>
          </div>
          {/* Special Attacks */}
          <div>
            <h3 className="font-semibold text-lg">Special Attacks</h3>
            <ul>
              {pokemon.attacks.special.map((attack) => (
                <li key={attack.name} className={`px-3 py-1 rounded-lg`}>
                  <strong className={`px-3 py-1 rounded-lg ${typeColors[attack.type] || "bg-gray-600"}`}>{attack.name}</strong> - {attack.damage} DMG
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pokémon Resistances & Weaknesses */}
      <div className="w-full flex flex-col md:flex-row justify-between mt-4">
        <div className="w-full md:w-1/2 px-2">
          <h3 className="font-semibold text-lg mb-1">Resistant</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.resistant.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 text-black text-sm rounded-lg ${
                  typeColors[type] || "bg-gray-600"
                }`}
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
                className={`px-3 py-1 text-black text-sm rounded-lg ${
                  typeColors[type] || "bg-gray-600"
                }`}
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
