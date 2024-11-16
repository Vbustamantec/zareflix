import { useQuery } from "@tanstack/react-query";

interface MovieRecommendation {
	movie: {
		title: string;
		genre: string;
		year: string;
	};
	recommendations: string[];
}

const getRecommendations = async (
	movieId: string
): Promise<MovieRecommendation> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations/${movieId}`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch recommendations");
	}
	const data = await response.json();
	return data.data;
};

export const useRecommendations = (movieId: string) => {
	return useQuery({
		queryKey: ["recommendations", movieId],
		queryFn: () => getRecommendations(movieId),
		enabled: Boolean(movieId),
		staleTime: 1000 * 60 * 5,
	});
};
