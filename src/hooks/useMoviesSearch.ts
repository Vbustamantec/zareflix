import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/api";
import { MovieSearchResponse } from "@/types/movies";

export function useMovieSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentQuery = searchParams.get("q") || "";
	const currentPage = Number(searchParams.get("page")) || 1;

	const [searchInput, setSearchInput] = useState(currentQuery);

	const { data, isLoading, error, isFetching } = useQuery<MovieSearchResponse>({
		queryKey: ["movies", currentQuery, currentPage],
		queryFn: () => searchMovies(currentQuery, currentPage),
		enabled: Boolean(currentQuery),
		staleTime: 1000 * 60 * 5,
		placeholderData: (previousData) => previousData,
		gcTime: 1000 * 60 * 5,
	});

	const totalPages = data?.totalResults
		? Math.ceil(Number(data.totalResults) / 10)
		: 0;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleSearch = () => {
		if (searchInput.trim()) {
			const params = new URLSearchParams(searchParams.toString());
			params.set("q", searchInput.trim());
			params.set("page", "1");
			router.push(`/?${params.toString()}`);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`/?${params.toString()}`);
	};

	return {
		searchInput,
		currentQuery,
		currentPage,

		movies: data?.Search || [],
		isLoading,
		isFetching,
		error,
		totalPages,

		handleInputChange,
		handleSearch,
		handleKeyPress,
		handlePageChange,
	};
}
