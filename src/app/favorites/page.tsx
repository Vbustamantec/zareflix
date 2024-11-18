"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { SkeletonList } from "@/components/ui/Skeleton";
import FavoriteCard from "@/components/features/favorites/FavoriteCard/FavoriteCard";

export default function FavoritesPage() {
	const {
		favorites,
		isLoading,
		removeFavorite,
		updateFavorite,
		isRemoving,
		isUpdating,
	} = useFavorites();

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-white mb-6">My Favorites</h1>
				<SkeletonList />
			</div>
		);
	}

	if (!favorites.length) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-white mb-6">My Favorites</h1>
				<p className="text-gray-400 text-center text-xl">
					You havent added any favorites yet.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-white mb-6">My Favorites</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{favorites.map((favorite) => (
					<FavoriteCard
						key={favorite._id}
						favorite={favorite}
						onRemove={() => removeFavorite(favorite._id)}
						onUpdate={(data) =>
							updateFavorite({
								id: favorite._id,
								title: data.title,
								notes: data.personalNotes,
							})
						}
						isRemoving={isRemoving}
						isUpdating={isUpdating}
					/>
				))}
			</div>
		</div>
	);
}
