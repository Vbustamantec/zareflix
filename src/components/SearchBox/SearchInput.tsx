// components/SearchInput.tsx
"use client";
import React from "react";

interface SearchInputProps {
	searchQuery: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchInput({
	searchQuery,
	handleInputChange,
	handleKeyPress,
}: SearchInputProps) {
	return (
		<input
			type="text"
			value={searchQuery}
			onChange={handleInputChange}
			onKeyDown={handleKeyPress}
			className="p-3 rounded-md text-black w-full"
			placeholder="Buscar una película..."
			aria-label="Buscar una película"
			id="search-input"
		/>
	);
}

export default SearchInput;
