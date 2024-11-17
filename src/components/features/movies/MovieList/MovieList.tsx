"use client";
import React from "react";

import { useMovieSearch } from "@/hooks/useMoviesSearch";

import MovieCard from "@/features/movies/MovieCard";
import { SkeletonList } from "@/ui/Skeleton";
import Pagination from "@/ui/Pagination";

export default function MovieList() {
	const {
		movies,
		isLoading,
		error,
		currentPage,
		totalPages,
		handlePageChange,
	} = useMovieSearch();

	if (isLoading) {
		return <SkeletonList className="mx-10 mt-4" />;
	}

	if (error instanceof Error) {
		return (
			<p className="text-red-500 mt-2 lg:mt-12 text-center text-3xl font-bold">
				{error.message}
			</p>
		);
	}

	if (!movies.length) {
		return (
			<p className="text-white lg:mt-12 text-center text-3xl font-bold">
				There are no movies to show yet 😢
			</p>
		);
	}

	return (
		<>
			<div className="mx-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4 mt-4">
				{movies.map((movie) => (
					<MovieCard key={movie.imdbID} movie={movie} />
				))}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);
}
