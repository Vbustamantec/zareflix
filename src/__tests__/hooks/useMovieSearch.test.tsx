import { renderHook, act } from "@testing-library/react";
import { useMovieSearch } from "@/hooks/useMoviesSearch";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	useSearchParams: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn().mockReturnValue({
		data: null,
		isLoading: false,
		error: null,
		isFetching: false,
	}),
}));

describe("useMovieSearch", () => {
	const mockRouter = {
		push: jest.fn(),
	};

	const mockSearchParams = {
		get: jest.fn(),
		toString: jest.fn().mockReturnValue(""),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue(mockRouter);
		(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

		mockSearchParams.get.mockImplementation((key) => {
			if (key === "q") return "Batman"; //
			if (key === "page") return "1";
			return null;
		});

		mockSearchParams.toString.mockReturnValue("q=Batman&page=1");
	});

	it("handles search input change", () => {
		const { result } = renderHook(() => useMovieSearch());

		act(() => {
			result.current.handleInputChange({
				target: { value: "Batman" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.searchInput).toBe("Batman");
	});

	it("handles search on enter key press", async () => {
		const { result } = renderHook(() => useMovieSearch());

		act(() => {
			result.current.handleInputChange({
				target: { value: "Batman" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		act(() => {
			result.current.handleKeyPress({
				key: "Enter",
			} as React.KeyboardEvent<HTMLInputElement>);
		});

		expect(mockRouter.push).toHaveBeenCalledWith(
			expect.stringContaining("q=Batman")
		);
	});

	it("handles page change", () => {
		(mockSearchParams.toString as jest.Mock).mockReturnValue("q=test");

		const { result } = renderHook(() => useMovieSearch());

		act(() => {
			result.current.handlePageChange(2);
		});

		expect(mockRouter.push).toHaveBeenCalledWith(
			expect.stringContaining("page=2")
		);
	});

	it("maintains current page when searching", () => {
		(mockSearchParams.get as jest.Mock).mockImplementation((key) => {
			if (key === "q") return "test";
			if (key === "page") return "2";
			return null;
		});
		(mockSearchParams.toString as jest.Mock).mockReturnValue("q=test&page=2");

		const { result } = renderHook(() => useMovieSearch());

		act(() => {
			result.current.handleInputChange({
				target: { value: "Superman" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleSearch();
		});

		expect(mockRouter.push).toHaveBeenCalledWith(
			expect.stringContaining("page=1")
		);
	});

	it("preserves existing search params when changing page", () => {
		mockSearchParams.get.mockImplementation((key) => {
			if (key === "q") return "Batman";
			if (key === "page") return "2";
			return null;
		});

		mockSearchParams.toString.mockReturnValue("q=Batman&page=2");

		const { result } = renderHook(() => useMovieSearch());

		act(() => {
			result.current.handlePageChange(3);
		});

		expect(mockRouter.push).toHaveBeenCalledWith(
			expect.stringContaining("q=Batman")
		);

		expect(mockRouter.push).toHaveBeenCalledWith(
			expect.stringContaining("page=3")
		);
	});

	it("initializes with current query from URL", () => {
		(mockSearchParams.get as jest.Mock).mockImplementation((key) => {
			if (key === "q") return "Batman";
			if (key === "page") return "1";
			return null;
		});

		const { result } = renderHook(() => useMovieSearch());

		expect(result.current.currentQuery).toBe("Batman");
		expect(result.current.searchInput).toBe("Batman");
		expect(result.current.currentPage).toBe(1);
	});
});
