import { notFound } from "next/navigation";

import { getMovieById } from "@/services/api";
import MovieDetailsContainer from "@/components/features/movies/MovieDetails/MovieDetailsContainer";
import { MovieDetails } from "@/types/movies";

async function getMovie(id: string) {
	try {
		const movie = await getMovieById(id);
		return movie as MovieDetails;
	} catch (error) {
		console.error(error);
		return null;
	}
}

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: PageProps) {
	const { id } = await params;
	const movie = await getMovie(id);

	if (!movie) {
		notFound();
	}

	return <MovieDetailsContainer movie={movie} />;
}
