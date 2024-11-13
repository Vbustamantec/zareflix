"use client";

import React from "react";

import { useMovies } from "@/context/MoviesContext";

import MovieCard from "@/components/MovieCard/MovieCard";
import { SkeletonList } from "../ui/Skeleton";

export default function MovieList() {
	const { movies, isLoading, error } = useMovies();

	if (isLoading) {
		return <SkeletonList />;
	}

	if (error) {
		return (
			<p className="text-red-500 mt-2 lg:mt-12 text-center text-3xl font-bold">
				{error}
			</p>
		);
	}

	if (movies.length === 0) {
		return (
			<p className="text-white lg:mt-12 text-center text-3xl font-bold">
				There are no movies to show yet 😢
			</p>
		);
	}

	return (
		<div className="mx-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4 mt-4">
			{movies.map((movie) => (
				<MovieCard key={movie.imdbID} movie={movie} />
			))}
		</div>
	);
}
