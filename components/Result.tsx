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
      <p className="text-black text-center">
        No Pokémon found. Try another name.
      </p>
    );
  }

  return (
    <div className="text-black border p-5 rounded-lg max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-bold text-center">{pokemon.name}</h2>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-40 h-40 my-3"
        width={160}
        height={160}
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

      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl">Evolutions</h2>
          <div className="flex gap-2">
            {pokemon.evolutions.map((evo) => (
              <button
                key={evo.name}
                onClick={() => router.push(`/pokemon/${evo.name}`)}
                className="bg-white-700 p-2 rounded border hover:bg-blue-100"
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
