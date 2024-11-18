"use client";
import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import { Heart, Loader2 } from "lucide-react";

import { FavoriteButtonProps } from "./FavoriteButton.types";

export default function FavoriteButton({
	onAdd,
	isFavorite = false,
	className = "",
}: FavoriteButtonProps) {
	const { user } = useUser();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			await onAdd();
		} finally {
			setTimeout(() => setIsLoading(false), 200);
		}
	};

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
			onClick={handleClick}
			disabled={isLoading}
			className={`p-2 rounded-full transition-all duration-300
		  ${isLoading ? "scale-125" : "scale-100"} 
		  ${
				isFavorite
					? "bg-red-600 hover:bg-red-700"
					: "bg-gray-800/50 hover:bg-gray-700/50"
			} 
		  ${className}
		  relative
		  overflow-hidden
		`}
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
					<Heart
						className={`w-5 h-5 transition-all duration-300
				${isFavorite ? "text-white fill-current" : "text-white"}
				${isLoading ? "scale-110" : "scale-100"}
			  `}
					/>
				)}
			</div>
		</button>
	);
}
