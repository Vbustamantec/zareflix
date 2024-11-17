"use client";
import React from "react";

import { useMovieSearch } from "@/hooks/useMoviesSearch";

import Input from "@/ui/Input";
import Button from "@/ui/Button";

export default function SearchBox() {
	const {
		searchInput,
		handleInputChange,
		handleKeyPress,
		handleSearch,
		isLoading,
	} = useMovieSearch();

	return (
		<div>
			<div className="flex flex-col md:flex-row items-center gap-2">
				<Input
					value={searchInput}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					placeholder="Search for a movie..."
					aria-label="Search for a movie"
					disabled={isLoading}
				/>
				<Button onClick={handleSearch} disabled={isLoading} aria-label="Search">
					{isLoading ? "Searching..." : "Search"}
				</Button>
			</div>
		</div>
	);
}
