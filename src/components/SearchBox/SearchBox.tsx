// src/components/SearchBox/SearchBox.tsx
"use client";
import React from "react";
import { useMovieSearch } from "@/hooks/useMoviesSearch";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SearchBox() {
	const { searchInput, handleInputChange, handleKeyPress, handleSearch } =
		useMovieSearch();

	return (
		<div>
			<div className="flex flex-col md:flex-row items-center gap-2">
				<Input
					value={searchInput}
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
					placeholder="Search for a movie..."
					aria-label="Search for a movie"
				/>
				<Button handleSearch={handleSearch} />
			</div>
		</div>
	);
}
