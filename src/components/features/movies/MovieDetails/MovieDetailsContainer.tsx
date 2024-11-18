"use client";

import { motion } from "framer-motion";
import MovieRecommendations from "@/features/movies/MovieRecommendations";
import { MovieDetailsProps } from "./MovieDetails.types";
import MovieDetailsPresentation from "./MovieDetailsPresentation";
import { useFavorites } from "@/hooks/useFavorites";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function MovieDetailsContainer({ movie }: MovieDetailsProps) {
	const { user } = useUser();
	const {
		isFavorite,
		addFavorite,
		removeFavorite,
		getFavoriteById,
	} = useFavorites();

	const favorite = getFavoriteById(movie.imdbID);
	const isMovieFavorite = isFavorite(movie.imdbID);

	const handleToggleFavorite = async () => {
		if (!user?.sub) return;

		try {
			if (isMovieFavorite && favorite) {
				await removeFavorite(favorite._id);
			} else {
				const movieToAdd = {
					Title: movie.Title,
					Year: movie.Year,
					imdbID: movie.imdbID,
					Type: movie.Type,
					Poster: movie.Poster,
					userId: user.sub,
				};
				await addFavorite(movieToAdd);
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

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
					<MovieDetailsPresentation
						movie={movie}
						isMovieFavorite={isMovieFavorite}
						onToggleFavorite={handleToggleFavorite}
					/>

					<div className="mt-16">
						<MovieRecommendations movieId={movie.imdbID} />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
