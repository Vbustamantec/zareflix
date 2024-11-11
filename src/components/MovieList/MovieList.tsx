"use client";
import React from "react";
import { useMovies } from "@/context/MoviesContext";
import MovieCard from "@/components/MovieCard/MovieCard";
import Loader from "@/components/Loader";

function MovieList() {
	const { movies, isLoading, error } = useMovies();

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <p className="text-red-500 mt-2">{error}</p>;
	}

	if (movies.length === 0) {
		return <p>No hay películas para mostrar. Realiza una búsqueda.</p>;
	}

	return (
		<div className="mx-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4 mt-4">
			{movies.map((movie) => (
				<MovieCard key={movie.imdbID} movie={movie} />
			))}
		</div>
	);
}

export default MovieList;
