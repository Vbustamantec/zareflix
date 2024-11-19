"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Heart, Loader2 } from "lucide-react";
import { useFavoriteButton } from "@/hooks/useFavoriteButton";
import { getButtonStyles, getHeartStyles } from "@/utils/favoriteButtonUtils";
import { FavoriteButtonProps } from "./FavoriteButton.types";

export default function FavoriteButton({
	onAdd,
	isFavorite = false,
	className = "",
}: FavoriteButtonProps) {
	const { user } = useUser();
	const { isLoading, handleClick } = useFavoriteButton(onAdd);

	if (!user) {
		return (
			<div className="relative isolate">
				<button
					disabled
					aria-label="Login to add favorites"
					className="p-2 rounded-full bg-gray-800/50 cursor-not-allowed z-[9999] hover:before:content-['Login_to_add_favorites'] hover:before:absolute hover:before:top-[-60px] hover:before:left-[40] hover:before:transform hover:before:-translate-x-1/2 hover:before:bg-black hover:before:text-white hover:before:py-2 hover:before:px-4 hover:before:rounded hover:before:text-sm hover:before:whitespace-nowrap"
				>
					<Heart className="w-5 h-5 text-gray-400" />
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={handleClick}
			disabled={isLoading}
			className={getButtonStyles(isLoading, isFavorite, className)}
			aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
		>
			<div
				className={`transition-transform duration-300 ${
					isLoading ? "scale-110" : "scale-100"
				}`}
			>
				{isLoading ? (
					<Loader2 className="w-5 h-5 text-white animate-spin" />
				) : (
					<Heart className={getHeartStyles(isLoading, isFavorite)} />
				)}
			</div>
		</button>
	);
}
