import React from "react";
import { IPokemon } from "@/typings";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ResultProps {
  pokemon: IPokemon | null;
}

export const Result: React.FC<ResultProps> = ({ pokemon }) => {
  const router = useRouter();

  if (!pokemon) {
    return (
      <p className="text-white text-center">
        No Pokémon found. Try another name.
      </p>
    );
  }

  return (
    <div className="text-white border p-5 rounded-lg max-w-md mx-auto bg-gray-800">
      <button
        className="bg-gray-600 text-white px-3 py-2 rounded-lg mb-3 hover:bg-gray-500"
        onClick={() => router.back()} // Navigate to the previous page
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold text-center">{pokemon.name}</h2>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-40 h-40 my-3"
      />
      <p>
        <strong>Classification:</strong> {pokemon.classification}
      </p>
      <p>
        <strong>Types:</strong> {pokemon.types.join(", ")}
      </p>
      <p>
        <strong>Resistant:</strong> {pokemon.resistant.join(", ")}
      </p>
      <p>
        <strong>Weaknesses:</strong> {pokemon.weaknesses.join(", ")}
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

      Evolutions (Click to navigate)
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mt-4">Evolutions</h3>
          <ul>
            {pokemon.evolutions.map((evo) => (
              <li
                key={evo.name}
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => router.push(`/pokemon/${evo.name}`)}
              >
                {evo.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
