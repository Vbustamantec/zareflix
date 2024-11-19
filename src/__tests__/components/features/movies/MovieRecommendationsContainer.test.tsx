import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieRecommendationsContainer from "@/features/movies/MovieRecommendations/MovieRecommendationsContainer";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useQuery } from "@tanstack/react-query";

// Mocks
jest.mock("@/hooks/useRecommendations");
jest.mock("@tanstack/react-query", () => ({
	...jest.requireActual("@tanstack/react-query"),
	useQuery: jest.fn(),
}));

jest.mock("next/image", () => ({
	__esModule: true,
	default: function Image({
		src,
		alt,
		fill,
		className,
	}: {
		src: string;
		alt: string;
		fill?: boolean;
		sizes?: string;
		className?: string;
	}) {
		return (
			<img
				src={src}
				alt={alt}
				className={className}
				data-testid="mock-image"
				style={fill ? { width: "100%", height: "100%" } : undefined}
			/>
		);
	},
}));

describe("MovieRecommendationsContainer", () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	it("renders loading state initially", () => {
		(useRecommendations as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
		});

		(useQuery as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });

		expect(screen.getByText("Movies You Might Like")).toBeInTheDocument();
		expect(screen.getAllByText(/Movies You Might Like/i)).toBeTruthy();
	});

	it("renders recommendations successfully", async () => {
		(useRecommendations as jest.Mock).mockReturnValue({
			data: {
				recommendations: [
					"1. The Dark Knight (2008)",
					"2. Batman Begins (2005)",
				],
			},
			isLoading: false,
		});

		(useQuery as jest.Mock).mockReturnValue({
			data: [
				{
					Title: "The Dark Knight",
					Year: "2008",
					imdbID: "tt0468569",
					Poster: "dark-knight.jpg",
					Type: "movie",
				},
				{
					Title: "Batman Begins",
					Year: "2005",
					imdbID: "tt0372784",
					Poster: "batman-begins.jpg",
					Type: "movie",
				},
			],
			isLoading: false,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
			expect(screen.getByText("Batman Begins")).toBeInTheDocument();
		});
	});

	it("handles no recommendations", async () => {
		(useRecommendations as jest.Mock).mockReturnValue({
			data: {
				recommendations: [],
			},
			isLoading: false,
		});

		(useQuery as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });

		await waitFor(() => {
			const noRecsElement = screen.getByText("No recommendations available");
			expect(noRecsElement).toBeInTheDocument();
			expect(noRecsElement).toHaveClass("text-white");
		});
	});

	it("handles error state", async () => {
		(useRecommendations as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			isError: true,
			error: new Error("Failed to fetch recommendations"),
		});

		(useQuery as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
		});

		render(<MovieRecommendationsContainer movieId="tt1234567" />, { wrapper });

		await waitFor(() => {
			const errorElement = screen.getByText("No recommendations available");
			expect(errorElement).toBeInTheDocument();
			expect(errorElement).toHaveClass("text-white");
		});
	});
});
