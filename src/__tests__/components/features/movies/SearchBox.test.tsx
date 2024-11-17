import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "@/components/features/movies/SearchBox";

let mockIsFetching = false;
let mockSearchInput = "";
const mockHandleSearch = jest.fn();
const mockHandleInputChange = jest.fn();
const mockHandleKeyPress = jest.fn();

jest.mock("@/hooks/useMoviesSearch", () => ({
	useMovieSearch: () => ({
		searchInput: mockSearchInput,
		handleInputChange: mockHandleInputChange,
		handleKeyPress: mockHandleKeyPress,
		handleSearch: mockHandleSearch,
		isFetching: mockIsFetching,
	}),
}));

describe("SearchBox", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockIsFetching = false;
		mockSearchInput = "";
	});

	it("renders search input and button", () => {
		render(<SearchBox />);
		expect(
			screen.getByPlaceholderText(/search for a movie/i)
		).toBeInTheDocument();
		const searchButton = screen.getByRole("button", { name: /search/i });
		expect(searchButton).toBeInTheDocument();
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
		mockIsFetching = true;

		const { rerender } = render(<SearchBox />);
		rerender(<SearchBox />);

		const searchButton = screen.getByRole("button", { name: /search/i });
		const input = screen.getByPlaceholderText(/search for a movie/i);

		expect(searchButton).toHaveAttribute("disabled");
		expect(input).toHaveAttribute("disabled");
		expect(searchButton).toHaveTextContent("Searching...");
	});

	it("enables interaction when not loading", () => {
		mockIsFetching = false;

		render(<SearchBox />);

		const searchButton = screen.getByRole("button", { name: /search/i });
		const input = screen.getByPlaceholderText(/search for a movie/i);

		expect(searchButton).not.toHaveAttribute("disabled");
		expect(input).not.toHaveAttribute("disabled");
		expect(searchButton).toHaveTextContent("Search");
	});
});
