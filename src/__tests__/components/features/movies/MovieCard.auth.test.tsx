/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFavorites } from "@/hooks/useFavorites";
import MovieCard from "@/features/movies/MovieCard";
import { useRecommendations } from "@/hooks/useRecommendations";

jest.mock("@auth0/nextjs-auth0/client");
jest.mock("@/hooks/useFavorites");
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, className, ...props }: any) => (
			<div className={className} {...props}>
				{children}
			</div>
		),
	},
}));

jest.mock("@/hooks/useRecommendations", () => ({
	useRecommendations: jest.fn(),
}));
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt, className }: any) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={src} alt={alt} className={className} data-testid="movie-poster" />
	),
}));

describe("MovieCard Auth Integration", () => {
	const mockMovie = {
		Title: "Test Movie",
		Year: "2024",
		imdbID: "tt1234",
		Type: "movie",
		Poster: "test.jpg",
	};

	const mockFavoritesHook = {
		isFavorite: jest.fn(() => false),
		addFavorite: jest.fn(),
		removeFavorite: jest.fn(),
		getFavoriteById: jest.fn(() => null),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useUser as jest.Mock).mockReturnValue({
			user: null,
			isLoading: false,
		});
		(useFavorites as jest.Mock).mockReturnValue(mockFavoritesHook);
	});

	it("shows login prompt for unauthenticated users", () => {
		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button");
		expect(favoriteButton).toBeDisabled();
		expect(favoriteButton).toHaveClass("cursor-not-allowed");
		expect(favoriteButton).toHaveClass("bg-gray-800/50");
		expect(
			screen.getByRole("button", { name: /login to add favorites/i })
		).toBeInTheDocument();
	});

	it("allows favorite toggling for authenticated users", () => {
		(useUser as jest.Mock).mockReturnValue({
			user: { sub: "auth0|123" },
			isLoading: false,
		});

		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button", {
			name: /add to favorites/i,
		});
		expect(favoriteButton).toBeEnabled();
		expect(favoriteButton).not.toHaveClass("cursor-not-allowed");
	});

	it("handles favorite state correctly", () => {
		(useUser as jest.Mock).mockReturnValue({
			user: { sub: "auth0|123" },
			isLoading: false,
		});

		mockFavoritesHook.isFavorite.mockReturnValue(true);
		(useRecommendations as jest.Mock).mockReturnValue({
			data: null,

			isLoading: true,

			movieId: "tt1234567",
		});

		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button", {
			name: /remove from favorites/i,
		});
		expect(favoriteButton).toHaveClass("bg-red-600");
	});

	it("renders movie details correctly", () => {
		render(<MovieCard movie={mockMovie} />);

		expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
		expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
		expect(screen.getByTestId("movie-poster")).toHaveAttribute(
			"src",
			mockMovie.Poster
		);
		expect(screen.getByRole("link", { name: /more info/i })).toHaveAttribute(
			"href",
			`/movie/${mockMovie.imdbID}`
		);
	});

	it("shows loading state during authentication check", () => {
		(useUser as jest.Mock).mockReturnValue({
			user: null,
			isLoading: true,
		});

		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button");
		expect(favoriteButton).toBeDisabled();
	});
});
