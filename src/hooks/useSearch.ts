import { useState, useCallback, useRef } from "react";
import { useMovies } from "@/context/MoviesContext";
import { searchMovies } from "services/api";

export default function useSearch() {
	const [searchQuery, setSearchQuery] = useState("");
	const { setMovies, setIsLoading, setError } = useMovies();
	const lastSearchRef = useRef("");

	const handleSearch = useCallback(async () => {
		const trimmedQuery = searchQuery.trim();

		if (trimmedQuery === "") {
			setError("Please enter a movie title to search.");
			return;
		}

		// Evitar búsquedas duplicadas consecutivas
		if (trimmedQuery === lastSearchRef.current) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const data = await searchMovies(searchQuery);
			setMovies(data.Search);
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to fetch movies"
			);
			setMovies([]);
		} finally {
			setIsLoading(false);
		}
	}, [searchQuery, setMovies, setIsLoading, setError]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(e.target.value);
		},
		[]
	);

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
