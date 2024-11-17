"use client";

import React, { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRecommendations } from "@/hooks/useRecommendations";

import { searchMovies } from "@/services/api";
import { SkeletonList } from "@/ui/Skeleton";
import MovieRecommendationCard from "@/features/movies/MovieRecommendationCard";

interface MovieRecommendationsProps {
	movieId: string;
}

const extractTitlesFromRecommendations = (
	recommendations: string[]
): string[] => {
	return recommendations
		.map((recommendation) => {
			const match = recommendation.match(/^\d+\.\s+(.*?)\s+\(/);
			return match ? match[1].trim() : "";
		})
		.filter(Boolean);
};

export default function MovieRecommendations({
	movieId,
}: MovieRecommendationsProps) {
	const { data: recommendationsData, isLoading: isLoadingRecs } =
		useRecommendations(movieId);

	const titles = useMemo(() => {
		if (!recommendationsData?.recommendations) return [];
		return extractTitlesFromRecommendations(
			recommendationsData.recommendations
		);
	}, [recommendationsData?.recommendations]);

	const { data: moviesDetails, isLoading: isLoadingDetails } = useQuery({
		queryKey: ["recommendedMoviesDetails", titles],
		queryFn: async () => {
			if (!titles.length) return [];
			const moviePromises = titles.map((title) =>
				searchMovies(title).then((res) => res.Search?.[0])
			);
			return Promise.all(moviePromises);
		},
		enabled: titles.length > 0,
	});

	if (isLoadingRecs || isLoadingDetails) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-white mb-4">
					Movies You Might Like
				</h2>
				<SkeletonList variant="favorite" />
			</div>
		);
	}

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold text-white mb-4">
				Movies You Might Like
			</h2>
			{moviesDetails && moviesDetails.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-md:gap-6">
					{moviesDetails.map((movie) => {
						if (!movie) return null;

						return (
							<MovieRecommendationCard
								key={movie.imdbID}
								imdbID={movie.imdbID}
								Poster={movie.Poster}
								Title={movie.Title}
								Year={movie.Year}
							/>
						);
					})}
				</div>
			) : (
				<div className="text-white">No recommendations available</div>
			)}
		</div>
	);
}
