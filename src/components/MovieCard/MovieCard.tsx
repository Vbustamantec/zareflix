"use client";
import React from "react";
import { Movie } from "@/types/movies";
import Image from "next/image";

interface MovieCardProps {
	movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
	console.log("🚀 ~ MovieCard ~ movie:", movie);
	return (
		<div className="movie-card p-4 bg-gray-800 rounded-md">
			<div className="relative w-full h-64 mb-2">
				<Image
					src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
					alt={movie.Title}
					fill
					className="object-cover rounded-md"
				/>
			</div>
			<h3 className="text-white text-lg">{movie.Title}</h3>
		</div>
	);
}

export default MovieCard;
