import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFavorites } from "@/hooks/useFavorites";

// Mock fetch
global.fetch = jest.fn();

describe("useFavorites", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
					staleTime: 0,
				},
			},
		});
		jest.clearAllMocks();
	});

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it("initializes with empty favorites", () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });
		expect(result.current.favorites).toEqual([]);
		expect(result.current.isLoading).toBe(true);
	});

	it("fetches favorites successfully", async () => {
		const mockFavorites = [
			{
				_id: "1",
				movieId: "tt1",
				title: "Movie 1",
				year: "2021",
				poster: "url1",
			},
			{
				_id: "2",
				movieId: "tt2",
				title: "Movie 2",
				year: "2022",
				poster: "url2",
			},
		];

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockFavorites }),
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await waitFor(() => {
			expect(result.current.favorites).toEqual(mockFavorites);
		});
	});

	it("handles adding favorite", async () => {
		const mockMovie = {
			userId: "user1",
			Title: "New Movie",
			imdbID: "tt1",
			Year: "2024",
			Type: "movie",
			Poster: "poster.jpg",
		};

		const mockResponse = {
			_id: "1",
			movieId: "tt1",
			title: "New Movie",
			year: "2024",
			poster: "poster.jpg",
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockResponse }),
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await result.current.addFavorite(mockMovie);
			await queryClient.setQueryData(["favorites"], [mockResponse]);
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"/proxy/favorites",
			expect.objectContaining({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: mockMovie.userId,
					movieId: mockMovie.imdbID,
					title: mockMovie.Title,
					poster: mockMovie.Poster,
					year: mockMovie.Year,
				}),
			})
		);
	});

	it("handles removing favorite", async () => {
		const mockFavorites = [
			{
				_id: "1",
				movieId: "tt1",
				title: "Movie 1",
				year: "2021",
				poster: "url1",
			},
		];

		await queryClient.setQueryData(["favorites"], mockFavorites);

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await result.current.removeFavorite("1");
			// Actualizar el caché después de eliminar
			await queryClient.setQueryData(["favorites"], []);
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"/proxy/favorites/1",
			expect.objectContaining({
				method: "DELETE",
			})
		);
	});

	it("checks if movie is favorite correctly", async () => {
		const mockFavorites = [
			{
				_id: "1",
				movieId: "tt1",
				title: "Movie 1",
				year: "2021",
				poster: "url1",
			},
		];

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await queryClient.setQueryData(["favorites"], mockFavorites);
		});

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		expect(result.current.favorites).toEqual(mockFavorites);
		expect(result.current.isFavorite("tt1")).toBe(true);
		expect(result.current.isFavorite("tt999")).toBe(false);
	});

	it("handles updating favorite notes", async () => {
		const mockUpdatedFavorite = {
			_id: "1",
			movieId: "tt1",
			title: "Movie 1",
			year: "2021",
			poster: "url1",
			personalNotes: "Great movie!",
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockUpdatedFavorite }),
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await result.current.updateFavorite({ id: "1", notes: "Nice Movie" });
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"/proxy/favorites/1",
			expect.objectContaining({
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ personalNotes: "Nice Movie" }),
			})
		);
	});

	it("handles errors when fetching favorites", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Failed to fetch")
		);

		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.isLoading).toBe(true);
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});
		expect(result.current.favorites).toEqual([]);
	});
});
