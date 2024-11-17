export const useMovieSearch = jest.fn(() => ({
    searchInput: '',
    handleInputChange: jest.fn(),
    handleKeyPress: jest.fn(),
    handleSearch: jest.fn(),
    currentQuery: '',
    isLoading: false,
    movies: [],
    error: null,
    totalPages: 0,
    currentPage: 1,
    handlePageChange: jest.fn(),
  }));