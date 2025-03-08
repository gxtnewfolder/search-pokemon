"use client";
import { GET_POKEMON } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  params: {
    name: string;
  };
};

const PokemonPage = ({ params: { name } }: Props) => {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );

  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  const pokemon: IPokemon = data?.pokemon;

  return (
    <article className="max-w-4xl mx-auto text-white p-4">
      <h1 className="text-4xl font-bold text-center">{pokemon.name}</h1>
      <section className="flex flex-col items-center mt-4">
        {pokemon.image && (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            width={250}
            height={250}
            className="rounded-lg shadow-lg"
          />
        )}

        <div className="mt-4">
          <p>
            <strong>Number:</strong> {pokemon.number}
          </p>
          <p>
            <strong>Classification:</strong> {pokemon.classification}
          </p>
          <p>
            <strong>Types:</strong> {pokemon.types?.join(", ")}
          </p>
          <p>
            <strong>Resistant:</strong> {pokemon.resistant?.join(", ")}
          </p>
          <p>
            <strong>Weaknesses:</strong> {pokemon.weaknesses?.join(", ")}
          </p>
          <p>
            <strong>Flee Rate:</strong> {pokemon.fleeRate}
          </p>
          <p>
            <strong>Max CP:</strong> {pokemon.maxCP}
          </p>
          <p>
            <strong>Max HP:</strong> {pokemon.maxHP}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height.minimum} -{" "}
            {pokemon.height.maximum}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight.minimum} -{" "}
            {pokemon.weight.maximum}
          </p>
        </div>
      </section>
    </article>
  );
};

export default PokemonPage;