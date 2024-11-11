"use client";
import React from "react";
import { Movie } from "@/types/movies";
import Image from "next/image";

interface MovieCardProps {
	movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
	return (
		<div className="movie-card p-4 bg-dark-gray rounded-md">
			<div className="relative w-full h-96 mb-2 flex justify-center items-center">
				<Image
					src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
					alt={movie.Title}
					fill
					className="object-cover object-center rounded-md"
				/>
			</div>
			<h3 className="text-white text-xl text-center">{movie.Title}</h3>
			<p className="text-gray-400 text-sm text-center">{movie.Year}</p>
		</div>
	);
}

export default MovieCard;
