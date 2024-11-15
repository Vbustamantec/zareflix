"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Heart } from "lucide-react";
import { FavoriteButtonProps } from "./FavoriteButton.types";

export default function FavoriteButton({
	onAdd,
	isFavorite = false,
	className = "",
}: FavoriteButtonProps) {
	const { user } = useUser();

	if (!user) {
		return (
			<div className="relative">
				<button
					disabled
					className="p-2 rounded-full bg-gray-800/50 cursor-not-allowed hover:before:content-['Login_to_add_favorites'] hover:before:absolute hover:before:top-[-40px] hover:before:left-1/2 hover:before:transform hover:before:-translate-x-1/2 hover:before:bg-black hover:before:text-white hover:before:py-2 hover:before:px-4 hover:before:rounded hover:before:text-sm hover:before:whitespace-nowrap"
				>
					<Heart className="w-5 h-5 text-gray-400" />
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={onAdd}
			className={`p-2 rounded-full transition-all duration-300 
        ${
					isFavorite
						? "bg-red-600 hover:bg-red-700"
						: "bg-gray-800/50 hover:bg-gray-700/50"
				} 
        ${className}`}
			aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
		>
			<Heart
				className={`w-5 h-5 ${
					isFavorite ? "text-white fill-current" : "text-white"
				}`}
			/>
		</button>
	);
}
