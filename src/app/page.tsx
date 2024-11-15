import MovieList from "@/components/MovieList/MovieList";
import SearchHero from "@/components/SearchHero";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Suspense } from "react";

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
