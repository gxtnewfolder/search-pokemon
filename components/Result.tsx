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
      <div className="text-center p-8">
        <p className="text-gray-600 text-lg">No Pokémon found. Try another name.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header with Image and Basic Info */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="relative p-8 flex flex-col items-center">
          <div className="w-36 h-36 relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              layout="fill"
              objectFit="contain"
              priority
              className="mix-blend-multiply hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">{pokemon.name}</h1>
              <p className="text-lg text-gray-500">#{pokemon.number}</p>
            </div>
            <div className="flex gap-2 justify-center">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-4 py-1 text-white text-sm font-medium rounded-full shadow-sm ${
                    typeColors[type] || "bg-gray-600"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Base Stats</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Max CP</span>
                  <span className="font-medium text-gray-800">{pokemon.maxCP}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: `${(pokemon.maxCP / 4000) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Max HP</span>
                  <span className="font-medium text-gray-800">{pokemon.maxHP}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: `${(pokemon.maxHP / 4000) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Physical</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Height</p>
                  <p className="font-medium">{pokemon.height.minimum} - {pokemon.height.maximum}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Weight</p>
                  <p className="font-medium">{pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Attacks Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Attacks</h2>
            
            {/* Fast Attacks */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Fast Attacks</h3>
              <div className="space-y-2">
                {pokemon.attacks.fast.map((attack) => (
                  <div key={attack.name} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[attack.type]}`}>
                      {attack.name}
                    </span>
                    <span className="text-gray-600">{attack.damage} DMG</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Attacks */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Special Attacks</h3>
              <div className="space-y-2">
                {pokemon.attacks.special.map((attack) => (
                  <div key={attack.name} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[attack.type]}`}>
                      {attack.name}
                    </span>
                    <span className="text-gray-600">{attack.damage} DMG</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resistances & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Resistances</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.resistant.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1 text-white text-sm font-medium rounded-full ${
                    typeColors[type] || "bg-gray-600"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Weaknesses</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.weaknesses.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1 text-white text-sm font-medium rounded-full ${
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
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Evolution Chain</h3>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Current Pokemon */}
              <div className="flex flex-col items-center group">
                <div className="w-32 h-32 relative bg-white rounded-xl p-3 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"></div>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    layout="fill"
                    objectFit="contain"
                    className="mix-blend-multiply transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-500">Current</span>
                  <p className="font-medium text-gray-800">{pokemon.name}</p>
                </div>
              </div>

              {pokemon.evolutions.map((evo) => (
                <React.Fragment key={evo.name}>
                  {/* Arrow */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-0.5 bg-blue-200"></div>
                    <div className="text-xs text-gray-400 mt-1">Evolves into</div>
                  </div>

                  {/* Evolution Pokemon */}
                  <button
                    onClick={() => router.push(`/pokemon/${evo.name.toLowerCase()}`)}
                    className="group flex flex-col items-center"
                  >
                    <div className="w-32 h-32 relative bg-white rounded-xl p-3 shadow-sm 
                      ring-2 ring-transparent hover:ring-blue-400 transition-all duration-300 
                      transform group-hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"></div>
                      <Image
                        src={evo.image}
                        alt={evo.name}
                        layout="fill"
                        objectFit="contain"
                        className="mix-blend-multiply"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-sm text-gray-500">Evolution</span>
                      <p className="font-medium text-gray-800 group-hover:text-blue-500 transition-colors">
                        {evo.name}
                      </p>
                    </div>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
