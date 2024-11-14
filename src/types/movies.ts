export interface BasicMovie {
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
