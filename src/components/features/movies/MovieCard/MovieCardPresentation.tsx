import React from "react";

import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "@/features/movies/FavoriteButton";

import placeholderImage from "@/assets/placeholder.webp";

interface MovieCardPresentationProps {
	title: string;
	year: string;
	poster: string;
	imdbID: string;
	isFavorite: boolean;
	onToggleFavorite: () => Promise<void>;
}

export default function MovieCardPresentation({
	title,
	year,
	poster,
	imdbID,
	isFavorite,
	onToggleFavorite,
}: MovieCardPresentationProps) {
	return (
		<div className="movie-card relative p-4 bg-dark-gray rounded-md group">
			<div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<FavoriteButton isFavorite={isFavorite} onAdd={onToggleFavorite} />
			</div>

			<div className="relative w-full h-96 mb-2 flex justify-center items-center">
				<Image
					src={poster !== "N/A" ? poster : placeholderImage}
					alt={title}
					sizes="(max-width: 640px) 100vw, 640px"
					fill
					className="object-cover object-center rounded-md"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<h3 className="text-white text-xl text-center">{title}</h3>
				<p className="text-gray-400 text-sm text-center">{year}</p>
				<Link
					href={`/movie/${imdbID}`}
					className="btn-primary w-full text-center"
				>
					More Info
				</Link>
			</div>
		</div>
	);
}
