import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteCard from "@/features/favorites/FavoriteCard";

describe("FavoriteCard", () => {
	const mockFavorite = {
		_id: "1",
		movieId: "tt1234567",
		title: "Test Movie",
		year: "2024",
		poster: "test-poster.jpg",
		personalNotes: "Great movie!",
	};

	const mockProps = {
		favorite: mockFavorite,
		onRemove: jest.fn(),
		onUpdate: jest.fn(),
		isRemoving: false,
		isUpdating: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders favorite movie details correctly", () => {
		render(<FavoriteCard {...mockProps} />);

		expect(screen.getByText(mockFavorite.title)).toBeInTheDocument();
		expect(screen.getByText(mockFavorite.year)).toBeInTheDocument();
		expect(screen.getByText(mockFavorite.personalNotes)).toBeInTheDocument();
	});

	it("handles remove favorite", async () => {
		render(<FavoriteCard {...mockProps} />);

		const removeButton = screen.getByRole("button", {
			name: /remove/i,
		});
		fireEvent.click(removeButton);

		expect(mockProps.onRemove).toHaveBeenCalled();
	});

	it("handles edit mode", async () => {
		render(<FavoriteCard {...mockProps} />);

		const editButton = screen.getByRole("button", { name: /edit/i });
		fireEvent.click(editButton);

		const titleInput = screen.getByDisplayValue(mockFavorite.title);
		const notesInput = screen.getByDisplayValue(mockFavorite.personalNotes);

		fireEvent.change(titleInput, { target: { value: "Updated Title" } });
		fireEvent.change(notesInput, {
			target: { value: "Updated personal notes" },
		});

		const saveButton = screen.getByRole("button", { name: /save/i });
		fireEvent.click(saveButton);

		expect(mockProps.onUpdate).toHaveBeenCalledWith({
			title: "Updated Title",
			personalNotes: "Updated personal notes",
		});
	});

	it("disables buttons when updating or removing", () => {
		render(<FavoriteCard {...mockProps} isUpdating={true} isRemoving={true} />);

		const editButton = screen.getByRole("button", { name: /edit/i });
		const removeButton = screen.getByRole("button", { name: /remove/i });

		expect(editButton).toBeDisabled();
		expect(removeButton).toBeDisabled();
	});

	it("shows view details link", () => {
		render(<FavoriteCard {...mockProps} />);

		const detailsLink = screen.getByRole("link", { name: /view details/i });
		expect(detailsLink).toHaveAttribute(
			"href",
			`/movie/${mockFavorite.movieId}`
		);
	});
});
