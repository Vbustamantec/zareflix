import { Movie } from "./movies";

export interface OmdbData {
	Response: string;
	Search: Movie[];
	totalResults: string;
}
