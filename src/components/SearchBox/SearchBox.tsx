"use client";
import React from "react";
import useSearch from "@/hooks/useSearch";
import SearchInput from "@/components/ui/Input/Input";
import SearchButton from "@/components/ui/Button/Button";

export function SearchBox() {
	const { searchQuery, handleInputChange, handleKeyPress, handleSearch } =
		useSearch();

	return (
		<div className="search-box">
			<div className="flex flex-col md:flex-row items-center gap-2">
				<SearchInput
					searchQuery={searchQuery}
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
				/>
				<SearchButton handleSearch={handleSearch} />
			</div>
		</div>
	);
}
