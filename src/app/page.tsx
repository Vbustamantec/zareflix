import MovieList from "@/components/MovieList/MovieList";
import { SearchHero } from "@/components/SearchHero";
import { MoviesProvider } from "@/context/MoviesContext";

export default function App() {
	return (
		<main className="font-sans">
			<MoviesProvider>
				<SearchHero />
				<MovieList />
			</MoviesProvider>
		</main>
	);
}
