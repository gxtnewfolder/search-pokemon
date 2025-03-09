"use client";
import React from "react";

const pokemonTypes = [
  {
    name: "All",
    color: "bg-gradient-to-r from-gray-500 to-gray-400"
  },
  {
    name: "Fire",
    color: "bg-gradient-to-r from-red-500 to-orange-400"
  },
  {
    name: "Water",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  },
  {
    name: "Grass",
    color: "bg-gradient-to-r from-green-500 to-lime-400"
  },
  {
    name: "Electric",
    color: "bg-gradient-to-r from-yellow-500 to-orange-400"
  },
  {
    name: "Psychic",
    color: "bg-gradient-to-r from-pink-500 to-purple-400"
  },
  {
    name: "Ice",
    color: "bg-gradient-to-r from-cyan-500 to-blue-400"
  },
  {
    name: "Dragon",
    color: "bg-gradient-to-r from-purple-700 to-pink-400"
  },
  {
    name: "Dark",
    color: "bg-gradient-to-r from-gray-800 to-gray-600"
  },
  {
    name: "Fairy",
    color: "bg-gradient-to-r from-pink-300 to-pink-200"
  },
  {
    name: "Fighting",
    color: "bg-gradient-to-r from-orange-500 to-orange-400"
  },
  {
    name: "Flying",
    color: "bg-gradient-to-r from-blue-300 to-blue-200"
  },
  {
    name: "Poison",
    color: "bg-gradient-to-r from-purple-500 to-pink-400"
  },
  {
    name: "Ground",
    color: "bg-gradient-to-r from-yellow-700 to-yellow-600"
  },
  {
    name: "Rock",
    color: "bg-gradient-to-r from-gray-500 to-gray-400"
  },
  {
    name: "Bug",
    color: "bg-gradient-to-r from-lime-500 to-green-400"
  },
  {
    name: "Ghost",
    color: "bg-gradient-to-r from-indigo-500 to-purple-400"
  },
  {
    name: "Steel",
    color: "bg-gradient-to-r from-gray-400 to-gray-300"
  },
  {
    name: "Normal",
    color: "bg-gradient-to-r from-gray-300 to-gray-200"
  }
];

interface FilterDropdownProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedType, setSelectedType }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-gray-800 font-bold mb-4 text-lg">Pokémon Types</h3>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
        {pokemonTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelectedType(type.name === "All" ? null : type.name)}
            className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
              (type.name === "All" && !selectedType) || type.name === selectedType
                ? `${type.color} text-white font-medium shadow-sm`
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${type.color} mr-2`}></span>
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;