"use client";

import { motion } from "framer-motion";

const MovieRecommendationsContainer = lazy(
	() => import("@/features/movies/MovieRecommendations")
);

import MovieDetailsPresentation from "./MovieDetailsPresentation";

import { MovieDetailsProps } from "./MovieDetails.types";
import { lazy, Suspense } from "react";
import { SkeletonList } from "@/components/ui/Skeleton";

export default function MovieDetailsContainer({ movie }: MovieDetailsProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-black"
		>
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none" />

				<div
					className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat blur-md"
					style={{
						backgroundImage: `url(${
							movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
						})`,
					}}
				/>

				<div className="relative container mx-auto px-4 py-12">
					<MovieDetailsPresentation movie={movie} />

					<div className="mt-16">
						<Suspense
							fallback={
								<div className="mt-8">
									<h2 className="text-2xl font-bold text-white mb-4">
										Loading Recommendations...
									</h2>
									<SkeletonList variant="favorite" />
								</div>
							}
						>
							<MovieRecommendationsContainer movieId={movie.imdbID} />
						</Suspense>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
