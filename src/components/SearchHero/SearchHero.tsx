import React from "react";
import SearchBox from "@/components/SearchBox";

function SearchHero() {
	return (
		<section className="mx-10 bg-dark-gray just mt-28 p-8 md:py-12 shadow-lg rounded-lg">
			<h1 className="text-3xl md:text-5xl text-white mb-6 text-center font-bold">
				ZareFlix Movie Searcher
			</h1>
			<SearchBox />
		</section>
	);
}

export default SearchHero;
