"use client";
import { BASE_URL } from "@/config";
import { IPokemon } from "@/typings";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
	pokemon: IPokemon;
};

export const Pokemon = ({ pokemon }: Props) => {
	return (
		<article className="flex flex-col p-4 bg-slate-200 dark:bg-zinc-800 hover:scale-110 shadow-sm hover:shadow-lg hover:bg-slate-300 transition duration-300 ease-out text-white rounded-lg">
			{/* Image */}
			{pokemon.image && (
				<div className="relative w-full h-56">
					<Image
						src={pokemon.image}
						alt={pokemon.name}
						layout="fill"
						objectFit="contain"
						className="rounded-t-lg shadow-md"
						priority
					/>
				</div>
			)}

			{/* Pokémon Name */}
			<h1 className="font-bold text-2xl my-2 text-center">{pokemon.name}</h1>

			{/* Pokémon Type(s) */}
			{pokemon.types && (
				<p className="text-sm text-center my-2">
					<strong>Type:</strong> {pokemon.types.join(", ")}
				</p>
			)}

			{/* Base Experience */}
			{/* <p className="text-sm text-center">
				<strong>Base Experience:</strong> {pokemon.base_experience}
			</p> */}

			{/* Height & Weight */}
			<p className="text-sm text-center">
				<strong>Height:</strong> {pokemon.height.maximum} | <strong>Weight:</strong> {pokemon.weight.maximum}
			</p>

			{/* Abilities */}
			{/* {pokemon.abilities && (
				<p className="text-sm text-center mt-2">
					<strong>Abilities:</strong> {pokemon.abilities.join(", ")}
				</p>
			)} */}

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