import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import {
	extractTitlesFromRecommendations,
	padRecommendations,
} from "@/utils/recommendationsUtils";

import { MovieRecommendation } from "@/types/movies";

export function useRecommendations(movieId: string) {
	const { data: aiRecommendations, isLoading: isLoadingAI } = useQuery({
		queryKey: ["aiRecommendations", movieId],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations/${movieId}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch recommendations");
			}
			const data = await response.json();
			return data.data;
		},
		enabled: Boolean(movieId),
		staleTime: 1000 * 60 * 5,
	});

	const titles = useMemo(() => {
		if (!aiRecommendations?.recommendations) return [];
		return extractTitlesFromRecommendations(aiRecommendations.recommendations);
	}, [aiRecommendations?.recommendations]);

	const { data: movieDetails, isLoading: isLoadingDetails } = useQuery<
		MovieRecommendation[]
	>({
		queryKey: ["recommendedMoviesDetails", titles],
		queryFn: () => padRecommendations(titles),
		enabled: true,
	});

	return {
		movies: movieDetails || [],
		isLoading: isLoadingAI || isLoadingDetails,
		error: null,
	};
}
