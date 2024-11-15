import React from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/ui/FavoriteButton";
import placeholderImage from "@/assets/placeholder.webp";
import { MovieCardProps } from "./MovieCard.types";

export default function MovieCard({
	movie,
	isFavorite,
	onToggleFavorite,
}: MovieCardProps) {
	return (
		<div className="movie-card relative p-4 bg-dark-gray rounded-md group">
			<div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<FavoriteButton
					isFavorite={isFavorite}
					onAdd={() => onToggleFavorite?.(movie)}
				/>
			</div>

			<div className="relative w-full h-96 mb-2 flex justify-center items-center">
				<Image
					src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
					alt={movie.Title}
					fill
					className="object-cover object-center rounded-md"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<h3 className="text-white text-xl text-center">{movie.Title}</h3>
				<p className="text-gray-400 text-sm text-center">{movie.Year}</p>
				<Link
					href={`/movie/${movie.imdbID}`}
					className="btn-primary w-full text-center"
				>
					More Info
				</Link>
			</div>
		</div>
	);
}
