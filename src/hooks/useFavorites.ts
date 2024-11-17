import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BasicMovie, FavoriteMovie } from "@/types/movies";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getFavorites(): Promise<FavoriteMovie[]> {
	const response = await fetch(`${API_BASE_URL}/api/favorites`, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch favorites");
	}
	const data = await response.json();
	return data.data;
}

async function addFavorite(movie: BasicMovie): Promise<FavoriteMovie> {
	const response = await fetch(`${API_BASE_URL}/api/favorites`, {
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
	const response = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to remove favorite");
	}
}

async function updateFavorite(
	id: string,
	notes: string
): Promise<FavoriteMovie> {
	const response = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ personalNotes: notes }),
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
	});

	const addMutation = useMutation({
		mutationFn: addFavorite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeFavorite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favorites"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, notes }: { id: string; notes: string }) =>
			updateFavorite(id, notes),
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
