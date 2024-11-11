"use client";
import React from "react";

interface SearchButtonProps {
	handleSearch: () => void;
}

function SearchButton({ handleSearch }: SearchButtonProps) {
	return (
		<button
			onClick={handleSearch}
			className="md:w-[150px] w-full bg-red-800 text-white px-5 py-3 rounded-md hover:bg-red-700 transition-all duration-200"
			aria-label="Buscar películas"
		>
			Buscar
		</button>
	);
}

export default SearchButton;
