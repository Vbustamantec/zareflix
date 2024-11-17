import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button", () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		mockOnClick.mockClear();
	});

	it("renders button with children correctly", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("handles onClick event", () => {
		render(<Button onClick={mockOnClick}>Click me</Button>);
		const button = screen.getByText("Click me");
		fireEvent.click(button);
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it("applies custom className correctly", () => {
		render(<Button className="custom-class">Click me</Button>);
		const button = screen.getByText("Click me");
		expect(button).toHaveClass("custom-class");
		expect(button).toHaveClass("btn-primary");
	});

	it("renders with correct aria-label", () => {
		render(<Button ariaLabel="Custom Label">Click me</Button>);
		const button = screen.getByLabelText("Custom Label");
		expect(button).toBeInTheDocument();
	});
});
