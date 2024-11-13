import { useState, useCallback, useRef } from "react";
import { useMovies } from "@/context/MoviesContext";
import { searchMovies } from "services/api";

export default function useSearch() {
	const [searchQuery, setSearchQuery] = useState("");
	const { setMovies, setIsLoading, setError } = useMovies();
	const lastSearchRef = useRef("");

	const handleSearch = useCallback(async () => {
		const trimmedQuery = searchQuery.trim();

		if (!trimmedQuery) {
			setError("Please enter a movie title to search.");
			return;
		}

		if (trimmedQuery === lastSearchRef.current) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const data = await searchMovies(trimmedQuery);
			setMovies(data.Search);
			lastSearchRef.current = trimmedQuery;
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to fetch movies"
			);
			setMovies([]);
		} finally {
			setIsLoading(false);
		}
	}, [searchQuery, setMovies, setIsLoading, setError]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return {
		searchQuery,
		handleInputChange,
		handleKeyPress,
		handleSearch,
	};
}
