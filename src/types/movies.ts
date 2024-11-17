export interface BasicMovie {
	userId?: string;
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface MovieDetails extends BasicMovie {
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Ratings: Array<{ Source: string; Value: string }>;
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	DVD?: string;
	BoxOffice?: string;
	Production?: string;
	Website?: string;
}

export interface MovieSearchResponse {
	Search: BasicMovie[];
	totalResults: string;
	Response: string;
	Error?: string;
}

export interface FavoriteMovie {
	_id: string;
	userId: string;
	movieId: string;
	title: string;
	poster: string;
	year: string;
	personalNotes?: string;
}

export interface MovieRecommendation {
	Title: string;
	Year: string;
	imdbID: string;
	Poster: string;
}
