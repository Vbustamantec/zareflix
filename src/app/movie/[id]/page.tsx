import Image from "next/image";
import { notFound } from "next/navigation";

import { getMovieById } from "services/api";
import { Movie } from "@/types/movies";

async function getMovie(id: string) {
	try {
		const movie = await getMovieById(id);
		return movie as Movie;
	} catch (error) {
		console.error(error);
		return null;
	}
}

interface PageProps {
	params: Promise<{ id: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function MoviePage({ params }: PageProps) {
	const { id } = await params;
	const movie = await getMovie(id);

	if (!movie) {
		notFound();
	}

	return (
		<main className="text-white min-h-screen p-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
					<div className="relative aspect-[2/3] w-full">
						<Image
							src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
							alt={movie.Title}
							fill
							className="rounded-lg object-cover w-full h-full"
						/>
					</div>

					<div className="space-y-4">
						<h1 className="text-4xl font-bold">{movie.Title}</h1>

						<div className="flex gap-4 text-gray-400">
							<span>{movie.Year}</span>
							<span>•</span>
							<span>{movie.Runtime}</span>
							<span>•</span>
							<span>{movie.Rated}</span>
						</div>

						<div className="space-y-2">
							<p className="text-lg text-gray-300">
								<span className="font-semibold">Director:</span>{" "}
								{movie.Director}
							</p>
							<p className="text-lg text-gray-300">
								<span className="font-semibold">Genre:</span> {movie.Genre}
							</p>
							<p className="text-lg text-gray-300">
								<span className="font-semibold">Rating:</span>{" "}
								{movie.imdbRating}/10
							</p>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-semibold mb-2">Plot</h2>
							<p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
