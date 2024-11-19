import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecommendations } from "@/hooks/useRecommendations";
import { searchMovies } from "@/services/api";

jest.mock("@/services/api", () => ({
	searchMovies: jest.fn(),
}));

global.fetch = jest.fn();

describe("useRecommendations", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
			},
		});
		jest.clearAllMocks();
	});

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it("fetches and processes recommendations successfully", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				data: {
					recommendations: [
						"1. The Dark Knight (2008)",
						"2. Batman Begins (2005)",
					],
				},
			}),
		});

		(searchMovies as jest.Mock).mockImplementation(async (title) => ({
			Search: [
				{
					Title: title,
					Year: "2024",
					imdbID: `tt${Math.random()}`,
					Poster: "poster.jpg",
					Type: "movie",
				},
			],
		}));

		const { result } = renderHook(() => useRecommendations("tt1234567"), {
			wrapper,
		});

		await waitFor(
			() => {
				expect(result.current.isLoading).toBe(false);
				expect(result.current.movies.length).toBeGreaterThan(0);
			},
			{ timeout: 3000 }
		);
	});

	it("handles error in AI recommendations", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Failed to fetch")
		);

		(searchMovies as jest.Mock).mockImplementation(async (title) => ({
			Search: [
				{
					Title: title,
					Year: "2024",
					imdbID: `tt${Math.random()}`,
					Poster: "poster.jpg",
					Type: "movie",
				},
			],
		}));

		const { result } = renderHook(() => useRecommendations("tt1234567"), {
			wrapper,
		});

		await waitFor(
			() => {
				expect(result.current.isLoading).toBe(false);
				expect(result.current.movies).toHaveLength(5);
			},
			{ timeout: 3000 }
		);
	});

	it("doesn't fetch without movieId", () => {
		const { result } = renderHook(() => useRecommendations(""), {
			wrapper,
		});

		expect(result.current.movies).toHaveLength(0);
		expect(result.current.isLoading).toBe(true);
	});
});
