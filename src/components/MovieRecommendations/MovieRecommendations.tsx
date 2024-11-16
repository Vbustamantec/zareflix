"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/api";
import { SkeletonList } from "@/components/ui/Skeleton";
import placeholderImage from "@/assets/placeholder.webp";

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

	// Buscar detalles de las películas en OMDB
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
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{moviesDetails.map((movie) => {
						if (!movie) return null;

						return (
							<Link
								href={`/movie/${movie.imdbID}`}
								key={movie.imdbID}
								className="bg-dark-gray p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
							>
								<div className="relative aspect-[2/3] mb-3">
									<Image
										src={
											movie.Poster !== "N/A" ? movie.Poster : placeholderImage
										}
										alt={movie.Title}
										fill
										className="object-cover rounded-md"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
								<h3 className="text-white font-medium text-lg line-clamp-2">
									{movie.Title}
								</h3>
								<p className="text-gray-400 text-sm mt-1">{movie.Year}</p>
							</Link>
						);
					})}
				</div>
			) : (
				<div className="text-white">No recommendations available</div>
			)}
		</div>
	);
}
