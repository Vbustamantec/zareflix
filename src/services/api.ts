import { APIError } from "@/components/ui/ErrorBoundary/ErrorBoundary";
import { MovieDetails, MovieSearchResponse } from "@/types/movies";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

export async function searchMovies(
	query: string,
	page: number = 1
): Promise<MovieSearchResponse> {
	const response = await fetch(
		`${BASE_URL}/?apikey=${API_KEY}&s=${query}&page=${page}`
	);
	const data = await response.json();

	if (data.Response === "False") {
		throw new APIError(data.Error || "Failed to fetch movies");
	}

	return data;
}

export async function getMovieById(id: string): Promise<MovieDetails> {
	const response = await fetch(
		`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
	);
	const data = await response.json();

	if (data.Response === "False") {
		throw new APIError(data.Error || "Movie not found");
	}

	return data;
}
