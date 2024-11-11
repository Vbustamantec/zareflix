import { useState } from "react";
import { useMovies } from "@/context/MoviesContext";

function useSearch() {
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { setMovies, setOmdbData, setError, setIsLoading } = useMovies();

	const handleSearch = async () => {
		if (searchQuery.trim() === "") {
			setError("Por favor, ingresa un término de búsqueda.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const API_URL = `https://www.omdbapi.com/?apikey=${
				process.env.NEXT_PUBLIC_OMDB_API_KEY
			}&s=${encodeURIComponent(searchQuery)}`;

			const response = await fetch(API_URL);
			const data = await response.json();
			if (data.Response === "True") {
				setOmdbData(data);
				setMovies(data.Search);
			} else {
				setError("No se encontraron películas con ese término de búsqueda.");
				setMovies([]);
			}
		} catch (error) {
			console.error("Error al obtener las películas:", error);
			setError(
				"Ocurrió un error al realizar la búsqueda. Por favor, intenta nuevamente."
			);
		} finally {
			setIsLoading(false);
		}
	};

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

export default useSearch;
