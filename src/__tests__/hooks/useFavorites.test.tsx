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

	it("initializes with empty favorites", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: [] }),
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.favorites).toEqual([]);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
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
			expect(result.current.isLoading).toBe(false);
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

		(global.fetch as jest.Mock).mockImplementation(async (url) => {
			if (url === "proxy/favorites") {
				return {
					ok: true,
					json: async () => ({ data: mockResponse }),
				};
			}
			return {
				ok: true,
				json: async () => ({ data: [] }),
			};
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await result.current.addFavorite(mockMovie);
		});

		expect(global.fetch).toHaveBeenCalledWith("proxy/favorites", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				userId: mockMovie.userId,
				movieId: mockMovie.imdbID,
				title: mockMovie.Title,
				poster: mockMovie.Poster,
				year: mockMovie.Year,
			}),
		});
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

		(global.fetch as jest.Mock).mockImplementation(async (url) => {
			if (url === "proxy/favorites/1") {
				return { ok: true };
			}
			return {
				ok: true,
				json: async () => ({ data: mockFavorites }),
			};
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await waitFor(() => {
			expect(result.current.favorites).toEqual(mockFavorites);
		});

		await act(async () => {
			await result.current.removeFavorite("1");
		});

		expect(global.fetch).toHaveBeenCalledWith("proxy/favorites/1", {
			method: "DELETE",
			credentials: "include",
		});
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

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockFavorites }),
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await waitFor(() => {
			expect(result.current.favorites).toEqual(mockFavorites);
		});

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

		(global.fetch as jest.Mock).mockImplementation(async (url) => {
			if (url === "/proxy/favorites/1") {
				return {
					ok: true,
					json: async () => ({ data: mockUpdatedFavorite }),
				};
			}
			return {
				ok: true,
				json: async () => ({ data: [] }),
			};
		});

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await act(async () => {
			await result.current.updateFavorite({ id: "1", notes: "Nice Movie" });
		});

		expect(global.fetch).toHaveBeenCalledWith("/proxy/favorites/1", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ personalNotes: "Nice Movie", title: undefined }),
		});
	});

	it("handles errors when fetching favorites", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Failed to fetch")
		);

		const { result } = renderHook(() => useFavorites(), { wrapper });

		await waitFor(() => {
			expect(result.current.favorites).toEqual([]);
			expect(result.current.isLoading).toBe(false);
		});
	});
});
