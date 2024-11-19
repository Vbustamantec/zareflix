/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieRecommendationsContainer from "@/features/movies/MovieRecommendations/MovieRecommendationsContainer";
import { useRecommendations } from "@/hooks/useRecommendations";

jest.mock("@/hooks/useRecommendations");
const mockUseRecommendations = useRecommendations as jest.MockedFunction<
	typeof useRecommendations
>;

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt, fill, className }: any) => (
		<img
			src={src}
			alt={alt}
			className={className}
			data-testid="mock-image"
			style={fill ? { width: "100%", height: "100%" } : undefined}
		/>
	),
}));

describe("MovieRecommendations", () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it("renders loading state", () => {
		mockUseRecommendations.mockReturnValue({
			movies: [],
			isLoading: true,
			error: null,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });
		expect(screen.getByText("Movies You Might Like")).toBeInTheDocument();
	});

	it("renders recommendations successfully", async () => {
		const mockMovies = [
			{
				Title: "Test Movie",
				Year: "2021",
				imdbID: "tt1234567",
				Poster: "poster.jpg",
			},
		];

		mockUseRecommendations.mockReturnValue({
			movies: mockMovies,
			isLoading: false,
			error: null,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });
		expect(screen.getByText("Test Movie")).toBeInTheDocument();
	});

	it("handles no recommendations", async () => {
		mockUseRecommendations.mockReturnValue({
			movies: [],
			isLoading: false,
			error: null,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });
		expect(
			screen.getByText("No recommendations available")
		).toBeInTheDocument();
	});
});
