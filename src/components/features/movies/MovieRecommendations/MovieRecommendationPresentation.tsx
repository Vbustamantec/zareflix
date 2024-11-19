import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BasicMovie } from "@/types/movies";

import placeholderImage from "@/assets/placeholder.webp";

export default function MovieRecommendationPresentation({
	imdbID,
	Poster,
	Title,
	Year,
}: BasicMovie) {
	return (
		<>
			<Link
				href={`/movie/${imdbID}`}
				key={imdbID}
				className="bg-dark-gray p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
			>
				<div className="relative aspect-[2/3] mb-3">
					<Image
						src={Poster !== "N/A" ? Poster : placeholderImage}
						alt={Title}
						fill
						className="object-cover rounded-md"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<h3 className="text-white font-medium text-lg line-clamp-2">{Title}</h3>
				<p className="text-gray-400 text-sm mt-1">{Year}</p>
			</Link>
		</>
	);
}
