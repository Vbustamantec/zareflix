import { useQuery } from "@tanstack/react-query";
import { RecommendationResponse } from "@/types/movies";

export function useRecommendations(movieId: string) {
	const { data, isLoading, error } = useQuery<RecommendationResponse>({
		queryKey: ["recommendations", movieId],
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

	return {
		movies: data?.recommendations || [],
		isLoading,
		error,
	};
}
