import { BasicMovie } from "@/types/movies";

export interface MovieCardProps {
	movie: BasicMovie;
}
export interface MovieCardPresentationProps {
	title: string;
	year: string;
	poster: string;
	imdbID: string;
	isFavorite: boolean;
	onToggleFavorite: () => Promise<void>;
}
