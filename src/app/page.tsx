import MovieList from "@/components/MovieList/MovieList";
import SearchHero from "@/components/SearchHero";
import { Suspense } from "react";

export default function Page() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<SearchHero />
				<MovieList />
			</Suspense>
		</>
	);
}
