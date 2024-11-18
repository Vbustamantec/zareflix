"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Pencil, Trash2, X, Check } from "lucide-react";

import placeholderImage from "@/assets/placeholder.webp";

import { FavoriteCardProps } from "./FavoriteCard.types";
import EditableContent from "@/components/ui/EditableContent";

export default function FavoriteCard({
	favorite,
	onRemove,
	onUpdate,
	isRemoving,
	isUpdating,
}: FavoriteCardProps) {
	return (
		<div className="bg-dark-gray rounded-lg overflow-hidden shadow-lg p-4">
			<div className="relative w-full h-96 mb-2 flex justify-center items-center ">
				<Image
					src={favorite.poster !== "N/A" ? favorite.poster : placeholderImage}
					alt={favorite.title}
					sizes="(max-width: 640px) 100vw, 640px"
					fill
					className="md:object-cover object-center rounded-md"
				/>
			</div>

			<div className="p-4">
				<EditableContent
					initialTitle={favorite.title}
					initialNotes={favorite.personalNotes || ""}
					year={favorite.year}
					onUpdate={onUpdate}
					onRemove={onRemove}
					isUpdating={isUpdating}
					isRemoving={isRemoving}
				/>

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
