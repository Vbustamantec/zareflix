"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className=" flex flex-col group bg-dark-gray rounded-lg overflow-hidden shadow-lg hover:shadow-red-900/20 hover:shadow-xl transition-all duration-300"
		>
			<div className="relative p-4 ">
				<motion.div
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
					className="relative w-full h-96 overflow-hidden rounded-lg"
				>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

					<Image
						src={favorite.poster !== "N/A" ? favorite.poster : placeholderImage}
						alt={favorite.title}
						sizes="(max-width: 640px) 100vw, 640px"
						fill
						className="md:object-cover object-center rounded-lg transform group-hover:scale-105 transition-transform duration-500"
					/>
				</motion.div>
			</div>

			<div className="p-4 min-h-[200px] flex flex-col justify-between flex-grow">
				<div className=" overflow-y-auto ">
					<EditableContent
						initialTitle={favorite.title}
						initialNotes={favorite.personalNotes || ""}
						year={favorite.year}
						onUpdate={onUpdate}
						onRemove={onRemove}
						isUpdating={isUpdating}
						isRemoving={isRemoving}
					/>
				</div>

				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="mt-4 "
				>
					<Link
						href={`/movie/${favorite.movieId}`}
						className="block text-center bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
					>
						View Details
					</Link>
				</motion.div>
			</div>
		</motion.div>
	);
}
