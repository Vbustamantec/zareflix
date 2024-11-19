import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFavorites } from "./useFavorites";
import { BasicMovie } from "@/types/movies";

export const useFavoriteButton = (movie: BasicMovie) => {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUser();
	const { isFavorite, addFavorite, removeFavorite, getFavoriteById } =
		useFavorites();

	const favorite = getFavoriteById(movie.imdbID);
	const isMovieFavorite = isFavorite(movie.imdbID);

	const handleToggle = async () => {
		if (!user?.sub) return;
		setIsLoading(true);

		try {
			if (isMovieFavorite && favorite) {
				await removeFavorite(favorite._id);
			} else {
				const movieWithId = { ...movie, userId: user.sub };
				await addFavorite(movieWithId);
			}
			await new Promise((resolve) => setTimeout(resolve, 200));
		} catch (error) {
			console.error("Error toggling favorite:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		handleToggle,
		isLoading,
		isMovieFavorite,
		user,
	};
};
