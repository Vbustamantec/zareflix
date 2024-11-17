import React from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useFavorites } from "@/hooks/useFavorites";

import { MovieCardProps } from "./MovieCard.types";
import MovieCardPresentation from "./MovieCardPresentation";

export default function MovieCard({ movie }: MovieCardProps) {
	const { isFavorite, addFavorite, removeFavorite, getFavoriteById } =
		useFavorites();
	const { user } = useUser();
	const favorite = getFavoriteById(movie.imdbID);
	const isMovieFavorite = isFavorite(movie.imdbID);

	const handleToggleFavorite = async () => {
		if (!user?.sub) return;

		try {
			if (isMovieFavorite && favorite) {
				await removeFavorite(favorite._id);
			} else {
				const movieWithId = { ...movie, userId: user.sub };
				await addFavorite(movieWithId);
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	return (
		<MovieCardPresentation
			title={movie.Title}
			year={movie.Year}
			poster={movie.Poster}
			imdbID={movie.imdbID}
			isFavorite={isMovieFavorite}
			onToggleFavorite={handleToggleFavorite}
		/>
	);
}
