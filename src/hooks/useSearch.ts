import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";
import { useMovies } from "@/context/MoviesContext";
import { Movie } from "@/types/movies";

function useSearch() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [apiUrl, setApiUrl] = useState<string | null>(null);

	const { setMovies, setOmdbData, setError, setIsLoading } = useMovies();

	const { data, isLoading, error } = useFetch<{
		Response: string;
		Search: Movie[];
		Error?: string;
	}>(apiUrl);

	useEffect(() => {
		setIsLoading(isLoading);
		setError(error);

		if (data?.Response === "True") {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setOmdbData(data as any);
			setMovies(data.Search);
		} else if (data) {
			setError(
				data.Error || "Movie not found, try searching for another movie."
			);
			setMovies([]);
			setOmdbData([]);
		}
	}, [data, isLoading, error, setError, setIsLoading, setMovies, setOmdbData]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(e.target.value);
		},
		[]
	);

	const handleSearch = useCallback(() => {
		if (searchQuery.trim() === "") {
			setError("Please enter a movie title to search.");
			return;
		}

		const API_URL = `https://www.omdbapi.com/?apikey=${
			process.env.NEXT_PUBLIC_OMDB_API_KEY
		}&s=${encodeURIComponent(searchQuery)}`;
		setApiUrl(API_URL);
		setError(null);
	}, [searchQuery, setError]);

	const handleKeyPress = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleSearch();
			}
		},
		[handleSearch]
	);

	return {
		searchQuery,
		handleInputChange,
		handleKeyPress,
		handleSearch,
	};
}

export default useSearch;
