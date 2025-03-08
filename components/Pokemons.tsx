"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { Pokemon } from "./Pokemon";

export const Pokemons = () => {
	const [search, setSearch] = useState("");
	const { data, loading, error } = useQuery(GET_POKEMON, {
		variables: { name: search },
		skip: !search, // Skip query if no search input
	});

	const pokemons: IPokemon[] = data?.pokemon ? [data.pokemon] : [];

	if (loading)
		return (
			<p className="text-white flex items-center justify-center">
				Loading...
			</p>
		);
	if (error)
		return (
			<p className="text-white flex items-center justify-center">
				Oops! Something went wrong...
			</p>
		);

	return (
		<div className="mt-5">
			{/* Search Input */}
			<div className="flex my-5 space-x-3">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					type="text"
					placeholder="Search Pokémon"
					className="bg-transparent border text-white p-2 rounded-lg"
				/>
			</div>

			{/* Pokémon Grid */}
			<div className="grid grid-cols-4 gap-2">
				{pokemons.length > 0 ? (
					pokemons.map((pokemon) => (
						<Pokemon key={pokemon.name} pokemon={pokemon} />
					))
				) : (
					<p className="text-white">No Pokémon found</p>
				)}
			</div>
		</div>
	);
};