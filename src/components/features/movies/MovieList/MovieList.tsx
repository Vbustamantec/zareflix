"use client";
import React from "react";

import { useMovieSearch } from "@/hooks/useMoviesSearch";

import MovieCard from "@/features/movies/MovieCard";
import { SkeletonList } from "@/ui/Skeleton";
import Pagination from "@/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState/ErrorState";

import { EmptyState } from "./EmptyState";

export default function MovieList() {
	const {
		movies,
		isLoading,
		error,
		currentPage,
		totalPages,
		handlePageChange,
		retry: handleRetry
	} = useMovieSearch();

	if (isLoading) {
		return <SkeletonList className="mx-10 mt-4" />;
	}

	if (error instanceof Error) {
		return (
			<ErrorState
				title="Error Loading Movies"
				message={error.message}
				onRetry={handleRetry}
				className="mt-8"
			/>
		);
	}

	if (!movies.length) {
		return <EmptyState />;
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
