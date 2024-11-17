import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useUser } from "@auth0/nextjs-auth0/client";

import { useFavorites } from "@/hooks/useFavorites";

import MovieCard from "@/components/features/movies/MovieCard";

jest.mock("@auth0/nextjs-auth0/client");
jest.mock("@/hooks/useFavorites");

describe("MovieCard", () => {
	const mockMovie = {
		Title: "Test Movie",
		Year: "2024",
		imdbID: "tt1234567",
		Type: "movie",
		Poster: "https://example.com/poster.jpg",
	};

	const mockUseFavorites = {
		isFavorite: jest.fn(),
		addFavorite: jest.fn(),
		removeFavorite: jest.fn(),
		getFavoriteById: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();

		(useUser as jest.Mock).mockReturnValue({
			user: { sub: "user123" },
			isLoading: false,
		});

		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);
		mockUseFavorites.isFavorite.mockReturnValue(false);
	});

	it("renders movie information correctly", () => {
		render(<MovieCard movie={mockMovie} />);

		expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
		expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /more info/i })).toHaveAttribute(
			"href",
			`/movie/${mockMovie.imdbID}`
		);
	});

	it("handles favorite toggle for authenticated user", async () => {
		mockUseFavorites.isFavorite.mockReturnValue(false);

		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button", {
			name: /add to favorites/i,
		});
		fireEvent.click(favoriteButton);

		await waitFor(() => {
			expect(mockUseFavorites.addFavorite).toHaveBeenCalledWith({
				...mockMovie,
				userId: "user123",
			});
		});
	});

	it("hides favorite button for unauthenticated user", () => {
		(useUser as jest.Mock).mockReturnValue({
			user: null,
			isLoading: false,
		});

		render(<MovieCard movie={mockMovie} />);

		expect(
			screen.queryByRole("button", { name: /add to favorites/i })
		).not.toBeInTheDocument();
	});

	it("shows loading state while authentication is being checked", () => {
		(useUser as jest.Mock).mockReturnValue({
			user: null,
			isLoading: true,
		});

		render(<MovieCard movie={mockMovie} />);

		expect(
			screen.queryByRole("button", { name: /add to favorites/i })
		).not.toBeInTheDocument();
	});

	it("removes movie from favorites when already favorited", async () => {
		const mockFavorite = {
			_id: "fav123",
			movieId: mockMovie.imdbID,
		};

		mockUseFavorites.isFavorite.mockReturnValue(true);
		mockUseFavorites.getFavoriteById.mockReturnValue(mockFavorite);

		render(<MovieCard movie={mockMovie} />);

		const favoriteButton = screen.getByRole("button", {
			name: /remove from favorites/i,
		});
		fireEvent.click(favoriteButton);

		await waitFor(() => {
			expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith("fav123");
		});
	});
});
