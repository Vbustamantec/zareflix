"use client";

import { motion } from "framer-motion";

import MovieRecommendationsContainer from "@/features/movies/MovieRecommendations";
import MovieDetailsPresentation from "./MovieDetailsPresentation";

import { MovieDetailsProps } from "./MovieDetails.types";

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
						<MovieRecommendationsContainer movieId={movie.imdbID} />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
