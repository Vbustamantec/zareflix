import { BasicMovie } from "@/types/movies";

export interface MovieCardProps {
	movie: BasicMovie;
	isFavorite?: boolean;
	onToggleFavorite?: (movie: BasicMovie) => void;
}
