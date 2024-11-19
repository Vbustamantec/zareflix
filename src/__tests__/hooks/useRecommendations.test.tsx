import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecommendations } from "@/hooks/useRecommendations";

global.fetch = jest.fn();

describe("useRecommendations", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});
		jest.clearAllMocks();
	});

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it("fetches recommendations successfully", async () => {
		const mockRecommendations = {
			movie: {
				title: "Test Movie",
				genre: "Action",
				year: "2024",
			},
			recommendations: [
				"1. The Dark Knight (2008)",
				"2. Batman Begins (2005)",
				"3. Superman (1978)",
				"4. Spider-Man (2002)",
				"5. Iron Man (2008)",
			],
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockRecommendations }),
		});

		const { result } = renderHook(() => useRecommendations("tt1234567"), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data).toEqual(mockRecommendations);
			expect(result.current.isLoading).toBe(false);
		});
	});

	it("handles error when fetching recommendations", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Failed to fetch")
		);

		const { result } = renderHook(() => useRecommendations("tt1234567"), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
			expect(result.current.error).toBeDefined();
		});
	});

	it("doesn't fetch without movieId", () => {
		const { result } = renderHook(() => useRecommendations(""), { wrapper });

		expect(result.current.isLoading).toBe(false);
		expect(result.current.data).toBeUndefined();
	});

	it("handles empty recommendations", async () => {
		const mockResponse = {
			movie: {
				title: "Test Movie",
				genre: "Action",
				year: "2024",
			},
			recommendations: [],
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ data: mockResponse }),
		});

		const { result } = renderHook(() => useRecommendations("tt1234567"), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data?.recommendations).toEqual([]);
		});
	});
});
