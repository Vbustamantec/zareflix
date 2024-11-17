import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import Input from "@/components/ui/Input";

describe("Input", () => {
	const mockOnChange = jest.fn();
	const mockOnKeyDown = jest.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
		mockOnKeyDown.mockClear();
	});

	it("renders input correctly", () => {
		render(<Input />);
		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
	});

	it("handles value change", () => {
		render(<Input value="test" onChange={mockOnChange} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "new value" } });
		expect(mockOnChange).toHaveBeenCalled();
	});

	it("handles keyDown event", () => {
		render(<Input onKeyDown={mockOnKeyDown} />);
		const input = screen.getByRole("textbox");
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(mockOnKeyDown).toHaveBeenCalled();
	});

	it("applies placeholder correctly", () => {
		const placeholder = "Type something...";
		render(<Input placeholder={placeholder} />);
		const input = screen.getByPlaceholderText(placeholder);
		expect(input).toBeInTheDocument();
	});

	it("uses correct aria-label", () => {
		const ariaLabel = "Search input";
		render(<Input ariaLabel={ariaLabel} />);
		const input = screen.getByLabelText(ariaLabel);
		expect(input).toBeInTheDocument();
	});
});
