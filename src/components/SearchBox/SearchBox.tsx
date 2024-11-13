"use client";
import React from "react";
import useSearch from "@/hooks/useSearch";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export function SearchBox() {
	const { searchQuery, handleInputChange, handleKeyPress, handleSearch } =
		useSearch();

	return (
		<div className="search-box">
			<div className="flex flex-col md:flex-row items-center gap-2">
				<Input
					searchQuery={searchQuery}
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
				/>
				<Button handleSearch={handleSearch} />
			</div>
		</div>
	);
}
