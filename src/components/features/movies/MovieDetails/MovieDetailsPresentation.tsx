import Image from "next/image";

import { motion } from "framer-motion";
import { Clock, Calendar, Award } from "lucide-react";

import { MovieMetadata } from "./MovieMetadata";
import RatingBadge from "./RatingBadge";
import { MovieDetailsPresentationProps } from "./MovieDetails.types";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default function MovieDetailsPresentation({
	movie,
	isMovieFavorite,
	onToggleFavorite,
}: MovieDetailsPresentationProps) {
	const metadata = [
		{ icon: Calendar, label: movie.Year },
		{ icon: Clock, label: movie.Runtime },
		{ icon: Award, label: movie.Rated },
	];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl"
			>
				<Image
					src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
					alt={movie.Title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="space-y-6"
			>
				<div className="space-y-4">
					<div className="flex items-start justify-between gap-4">
						<h1 className="text-4xl md:text-5xl font-bold text-white">
							{movie.Title}
						</h1>
						<div className="relative z-50 shrink-0">
							<FavoriteButton
								onAdd={onToggleFavorite}
								isFavorite={isMovieFavorite}
								className="shadow-lg"
							/>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-4">
						<RatingBadge rating={movie.imdbRating} />
						<div className="h-6 w-px bg-gray-700" />
						<span className="text-gray-400">{movie.Genre}</span>
					</div>
				</div>

				<MovieMetadata items={metadata} />

				<div className="space-y-3">
					<h2 className="text-xl font-semibold text-white">Plot</h2>
					<p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
				</div>

				<div className="space-y-4">
					<div>
						<h3 className="text-gray-400 mb-1">Director</h3>
						<p className="text-white">{movie.Director}</p>
					</div>
					<div>
						<h3 className="text-gray-400 mb-1">Cast</h3>
						<p className="text-white">{movie.Actors}</p>
					</div>
				</div>

				{movie.Awards !== "N/A" && (
					<div className="bg-red-900/20 p-4 rounded-lg border border-red-900/30">
						<h3 className="text-red-500 font-semibold mb-2">Awards</h3>
						<p className="text-gray-300">{movie.Awards}</p>
					</div>
				)}
			</motion.div>
		</div>
	);
}
