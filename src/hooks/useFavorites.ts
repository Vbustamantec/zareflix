import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BasicMovie, FavoriteMovie } from "@/types/movies";

async function getFavorites(): Promise<FavoriteMovie[]> {
	const response = await fetch(`/proxy/favorites`, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch favorites");
	}
	const data = await response.json();
	return data.data;
}

async function addFavorite(movie: BasicMovie): Promise<FavoriteMovie> {
	const response = await fetch(`proxy/favorites`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			userId: movie.userId,
			movieId: movie.imdbID,
			title: movie.Title,
			poster: movie.Poster,
			year: movie.Year,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to add favorite");
	}

	const data = await response.json();
	return data.data;
}

async function removeFavorite(id: string): Promise<void> {
	const response = await fetch(`proxy/favorites/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to remove favorite");
	}
}

async function updateFavorite({
	id,
	notes,
	title,
}: {
	id: string;
	notes?: string;
	title?: string;
}): Promise<FavoriteMovie> {
	const response = await fetch(`/proxy/favorites/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			personalNotes: notes,
			title: title,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to update favorite");
	}

	const data = await response.json();
	return data.data;
}

export function useFavorites() {
	const queryClient = useQueryClient();

	const { data: favorites = [], isLoading } = useQuery({
		queryKey: ["favorites"],
		queryFn: getFavorites,
		staleTime: 1000 * 60 * 5,
	});

	const addMutation = useMutation({
		mutationFn: addFavorite,
		onMutate: async (newMovie) => {
			await queryClient.cancelQueries({ queryKey: ["favorites"] });

			const previousFavorites =
				queryClient.getQueryData<FavoriteMovie[]>(["favorites"]) || [];

			const optimisticFavorite: FavoriteMovie = {
				_id: `temp-${newMovie.imdbID}`,
				movieId: newMovie.imdbID,
				userId: newMovie.userId || "",
				title: newMovie.Title,
				poster: newMovie.Poster,
				year: newMovie.Year,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			queryClient.setQueryData<FavoriteMovie[]>(["favorites"], (old = []) => [
				...old,
				optimisticFavorite,
			]);

			return { previousFavorites };
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(["favorites"], context.previousFavorites);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeFavorite,
		onMutate: async (favoriteId) => {
			await queryClient.cancelQueries({ queryKey: ["favorites"] });

			const previousFavorites =
				queryClient.getQueryData<FavoriteMovie[]>(["favorites"]) || [];

			queryClient.setQueryData<FavoriteMovie[]>(["favorites"], (old = []) =>
				old.filter((fav) => fav._id !== favoriteId)
			);

			return { previousFavorites };
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(["favorites"], context.previousFavorites);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({
			id,
			notes,
			title,
		}: {
			id: string;
			notes?: string;
			title?: string;
		}) => updateFavorite({ id, notes, title }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const isFavorite = (movieId: string) =>
		favorites.some((fav) => fav.movieId === movieId);

	const getFavoriteById = (movieId: string) =>
		favorites.find((fav) => fav.movieId === movieId);

	return {
		favorites,
		isLoading,
		isFavorite,
		getFavoriteById,
		addFavorite: addMutation.mutate,
		removeFavorite: removeMutation.mutate,
		updateFavorite: updateMutation.mutate,
		isAdding: addMutation.isPending,
		isRemoving: removeMutation.isPending,
		isUpdating: updateMutation.isPending,
	};
}
