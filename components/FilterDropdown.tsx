"use client";
import React from "react";

const pokemonTypes = [
  "All", "Grass", "Fire", "Water", "Electric", "Bug", "Poison", "Normal", "Flying",
  "Ground", "Rock", "Psychic", "Ice", "Dragon", "Dark", "Steel", "Fairy"
];

interface FilterDropdownProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedType, setSelectedType }) => {
  return (
    <div className="relative w-64">
      <label className="block text-gray-700 font-semibold mb-2">Filter by Type</label>
      <select
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={selectedType || "All"}
        onChange={(e) => setSelectedType(e.target.value === "All" ? null : e.target.value)}
      >
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;