import { Suspense } from "react";
import SearchBox from "@/features/movies/SearchBox";
import Loader from "@/ui/Loader";
import { AnimatedBackground } from "./AnimatedBackground";
import { HeroContent } from "./HeroContent";

export default function SearchHero() {
	return (
		<section className="relative min-h-[60vh] flex items-center justify-center px-10">
			<span suppressHydrationWarning>
				<AnimatedBackground />
			</span>

			<div className="relative w-full max-w-6xl mx-auto z-10">
				<HeroContent />

				<div className="relative max-w-3xl mx-auto">
					<div className="relative bg-transparent rounded-lg">
						<Suspense fallback={<Loader />}>
							<SearchBox />
						</Suspense>
					</div>
				</div>
			</div>
		</section>
	);
}
