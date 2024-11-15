import MovieList from "@/components/MovieList/MovieList";
import SearchHero from "@/components/SearchHero";
import TestServer from "@/components/TestComponents/test";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Suspense } from "react";

export default function Page() {
	return (
		<>
			<SearchHero />
			<Suspense fallback={<SkeletonList className="mx-10" />}>
				<MovieList />
			</Suspense>
			<TestServer />
		</>
	);
}
