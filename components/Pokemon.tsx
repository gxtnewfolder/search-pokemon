"use client";
import { IPokemon } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
	pokemon: IPokemon;
};

export const Pokemon = ({ pokemon }: Props) => {
	return (
		<article className="flex flex-col p-4 bg-white-200 hover:scale-100 shadow-sm hover:shadow-lg hover:bg-while-300 text-black rounded-lg">
			{/* Image */}
			{pokemon.image && (
				<div className="relative w-full h-52">
					<Image
						src={pokemon.image}
						alt={pokemon.name}
						layout="fill"
						objectFit="contain"
						className="rounded-t-lg p-2"
						priority
					/>
				</div>
			)}

			{/* Pokémon Number */}
			<p className="text-sm text-center mt-2">
				<strong>#{pokemon.number}</strong>
			</p>

			{/* Pokémon Name */}
			<h1 className="font-bold text-l my-2 text-center">{pokemon.name}</h1>

			{/* Pokémon Type(s) */}
			{pokemon.types && (
				<p className="text-sm text-center my-2">
					<strong>Type:</strong> {pokemon.types.join(", ")}
				</p>
			)}

			{/* Read More Link */}
			<Link
				href={`/pokemon/${pokemon.name}`}
				className="bg-orange-500 mt-5 p-2 rounded-lg text-center text-white"
			>
				View Details
			</Link>
		</article>
	);
};