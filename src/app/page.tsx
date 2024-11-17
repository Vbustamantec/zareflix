import { Suspense } from "react";

import MovieList from "@/features/movies/MovieList";
import SearchHero from "@/features/movies/SearchHero";
import { SkeletonList } from "@/ui/Skeleton";

export default function Page() {
	return (
		<>
			<SearchHero />
			<Suspense fallback={<SkeletonList className="mx-10" />}>
				<MovieList />
			</Suspense>
		</>
	);
}
