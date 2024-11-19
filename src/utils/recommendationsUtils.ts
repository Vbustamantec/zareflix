import { searchMovies } from "@/services/api";

import { MovieRecommendation } from "@/types/movies";

const DEFAULT_MOVIES = [
	"The Godfather",
	"Pulp Fiction",
	"The Dark Knight",
	"Fight Club",
	"Inception",
];

export const extractTitlesFromRecommendations = (
	recommendations: string[]
): string[] => {
	return recommendations
		.map((recommendation) => {
			const match = recommendation.match(/^\d+\.\s+(.*?)\s+\(/);
			return match ? match[1].trim() : "";
		})
		.filter(Boolean);
};

export const padRecommendations = async (
	titles: string[]
): Promise<MovieRecommendation[]> => {
	const neededExtra = Math.max(0, 5 - titles.length);
	const paddingTitles = DEFAULT_MOVIES.slice(0, neededExtra);
	const allTitles = [...new Set([...titles, ...paddingTitles])];

	const moviePromises = allTitles.map((title) =>
		searchMovies(title)
			.then((res) => res.Search?.[0])
			.catch(() => null)
	);

	const results = await Promise.all(moviePromises);
	return results.filter((movie) => movie !== null).slice(0, 5);
};
