import React from "react";
import { SkeletonList } from "@/ui/Skeleton";
import MovieRecommendationPresentation from "./MovieRecommendationPresentation";
import { useRecommendations } from "@/hooks/useRecommendations";

interface MovieRecommendationsProps {
	movieId: string;
}

export default function MovieRecommendationsContainer({
	movieId,
}: MovieRecommendationsProps) {
	const { movies, isLoading } = useRecommendations(movieId);

	if (isLoading) {
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
			{movies && movies.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-md:gap-6">
					{movies.map((movie) => (
						<MovieRecommendationPresentation
							key={movie.imdbID}
							imdbID={movie.imdbID}
							Poster={movie.Poster}
							Title={movie.Title}
							Year={movie.Year}
						/>
					))}
				</div>
			) : (
				<div className="text-white">No recommendations available</div>
			)}
		</div>
	);
}
