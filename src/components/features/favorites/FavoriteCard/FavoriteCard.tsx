"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Pencil, Trash2, X, Check } from "lucide-react";

import placeholderImage from "@/assets/placeholder.webp";

import { FavoriteCardProps } from "./FavoriteCard.types";

export default function FavoriteCard({
	favorite,
	onRemove,
	onUpdateNotes,
	isRemoving,
	isUpdating,
}: FavoriteCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [notes, setNotes] = useState(favorite.personalNotes || "");

	const handleSave = () => {
		onUpdateNotes(notes);
		setIsEditing(false);
	};

	return (
		<div className="bg-dark-gray rounded-lg overflow-hidden shadow-lg">
			<div className="relative aspect-[2/3]">
				<Image
					src={favorite.poster !== "N/A" ? favorite.poster : placeholderImage}
					alt={favorite.title || "Movie Poster"}
					fill
					className="object-cover"
				/>
			</div>

			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-white text-xl font-semibold">{favorite.title}</h3>
					<span className="text-gray-400">{favorite.year}</span>
				</div>

				<div className="mt-4">
					{isEditing ? (
						<div className="space-y-2">
							<textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								className="w-full p-2 bg-gray-800 text-white rounded-md"
								placeholder="Add personal notes..."
								rows={3}
							/>
							<div className="flex justify-end gap-2">
								<button
									onClick={() => setIsEditing(false)}
									className="p-2 text-gray-400 hover:text-white"
									disabled={isUpdating}
								>
									<X size={20} />
								</button>
								<button
									onClick={handleSave}
									className="p-2 text-green-500 hover:text-green-400"
									disabled={isUpdating}
								>
									<Check size={20} />
								</button>
							</div>
						</div>
					) : (
						<div className="space-y-2">
							<p className="text-gray-400">
								{favorite.personalNotes || "No personal notes added"}
							</p>
							<div className="flex justify-end gap-2">
								<button
									onClick={() => setIsEditing(true)}
									className="p-2 text-blue-500 hover:text-blue-400"
									disabled={isUpdating}
								>
									<Pencil size={20} />
								</button>
								<button
									onClick={onRemove}
									className="p-2 text-red-500 hover:text-red-400"
									disabled={isRemoving}
								>
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					)}
				</div>

				<Link
					href={`/movie/${favorite.movieId}`}
					className="mt-4 block text-center bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
				>
					View Details
				</Link>
			</div>
		</div>
	);
}
