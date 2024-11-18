import React from "react";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import FavoriteButton from "@/ui/FavoriteButton";

import placeholderImage from "@/assets/placeholder.webp";

interface MovieCardPresentationProps {
	title: string;
	year: string;
	poster: string;
	imdbID: string;
	isFavorite: boolean;
	onToggleFavorite: () => Promise<void>;
}

export default function MovieCardPresentation({
	title,
	year,
	poster,
	imdbID,
	isFavorite,
	onToggleFavorite,
}: MovieCardPresentationProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -5 }}
			transition={{ duration: 0.3 }}
			className="movie-card relative p-4 bg-dark-gray rounded-md group flex flex-col justify-between flex-grow"
		>
			<div className="flex-grow">
				<div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 max-lg:opacity-100 transition-opacity duration-300">
					<FavoriteButton
						isFavorite={isFavorite}
						onAdd={onToggleFavorite}
						className="shadow-lg"
					/>
				</div>

				<div className="relative w-full h-96 mb-2 rounded-md overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					<Image
						src={poster !== "N/A" ? poster : placeholderImage}
						alt={title}
						fill
						sizes="(max-width: 640px) 100vw, 640px"
						className="object-cover object-center rounded-md transform group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-white text-xl text-center font-semibold line-clamp-2 group-hover:text-red-500 transition-colors">
					{title}
				</h3>
				<p className="text-gray-400 text-sm text-center">{year}</p>
				<Link
					href={`/movie/${imdbID}`}
					className="btn-primary w-full text-center block transform group-hover:scale-105 transition-transform duration-300"
				>
					More Info
				</Link>
			</div>
		</motion.div>
	);
}
