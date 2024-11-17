import { render, screen, fireEvent } from "@testing-library/react";
import { useMovieSearch } from "@/hooks/useMoviesSearch";
import SearchBox from "@/components/features/movies/SearchBox";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
	})),
	useSearchParams: jest.fn(() => ({
		get: jest.fn(),
		toString: () => "",
	})),
}));

jest.mock("@/hooks/useMoviesSearch");

describe("SearchBox", () => {
	const mockHandleSearch = jest.fn();
	const mockHandleInputChange = jest.fn();
	const mockHandleKeyPress = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useMovieSearch as jest.Mock).mockReturnValue({
			searchInput: "",
			handleInputChange: mockHandleInputChange,
			handleKeyPress: mockHandleKeyPress,
			handleSearch: mockHandleSearch,
			currentQuery: "",
			isLoading: false,
		});
	});

	it("renders search input and button", () => {
		render(<SearchBox />);

		expect(
			screen.getByPlaceholderText(/search for a movie/i)
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
	});

	it("handles input change correctly", () => {
		render(<SearchBox />);

		const input = screen.getByPlaceholderText(/search for a movie/i);
		fireEvent.change(input, { target: { value: "Batman" } });

		expect(mockHandleInputChange).toHaveBeenCalled();
	});

	it("triggers search on button click", () => {
		render(<SearchBox />);

		const searchButton = screen.getByRole("button", { name: /search/i });
		fireEvent.click(searchButton);

		expect(mockHandleSearch).toHaveBeenCalled();
	});

	it("triggers search on Enter key press", () => {
		render(<SearchBox />);

		const input = screen.getByPlaceholderText(/search for a movie/i);
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

		expect(mockHandleKeyPress).toHaveBeenCalled();
	});

	it("shows loading state when search is in progress", () => {
		(useMovieSearch as jest.Mock).mockReturnValue({
			searchInput: "Batman",
			handleInputChange: mockHandleInputChange,
			handleKeyPress: mockHandleKeyPress,
			handleSearch: mockHandleSearch,
			currentQuery: "Batman",
			isLoading: true,
		});

		render(<SearchBox />);

		const searchButton = screen.getByRole("button", { name: /search/i });
		expect(searchButton).toBeDisabled();
	});
});
