import { renderHook, act } from "@testing-library/react";
import { useEditable } from "@/hooks/useEditable";

describe("useEditable", () => {
	const mockOnUpdate = jest.fn();
	const initialTitle = "Initial Title";
	const initialNotes = "Initial Notes";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with correct default values", () => {
		const { result } = renderHook(() =>
			useEditable(initialTitle, initialNotes, mockOnUpdate)
		);

		expect(result.current.isEditing).toBe(false);
		expect(result.current.isExpanded).toBe(false);
		expect(result.current.editData).toEqual({
			title: initialTitle,
			notes: initialNotes,
		});
	});

	it("should toggle editing mode", () => {
		const { result } = renderHook(() =>
			useEditable(initialTitle, initialNotes, mockOnUpdate)
		);

		act(() => {
			result.current.startEditing();
		});

		expect(result.current.isEditing).toBe(true);
	});

	it("should update edit data and save changes", () => {
		const { result } = renderHook(() =>
			useEditable(initialTitle, initialNotes, mockOnUpdate)
		);

		act(() => {
			result.current.startEditing();
		});

		act(() => {
			result.current.setEditData({
				title: "New Title",
				notes: "New Notes",
			});
		});

		act(() => {
			result.current.handleSave();
		});

		expect(mockOnUpdate).toHaveBeenCalledWith({
			title: "New Title",
			personalNotes: "New Notes",
		});
		expect(result.current.isEditing).toBe(false);
	});

	it("should cancel editing and restore initial values", () => {
		const { result } = renderHook(() =>
			useEditable(initialTitle, initialNotes, mockOnUpdate)
		);

		act(() => {
			result.current.startEditing();
		});

		act(() => {
			result.current.setEditData({
				title: "New Title",
				notes: "New Notes",
			});
		});

		act(() => {
			result.current.handleCancel();
		});

		expect(result.current.editData).toEqual({
			title: initialTitle,
			notes: initialNotes,
		});
		expect(result.current.isEditing).toBe(false);
	});

	it("should toggle expand state", () => {
		const { result } = renderHook(() =>
			useEditable(initialTitle, initialNotes, mockOnUpdate)
		);

		act(() => {
			result.current.toggleExpand();
		});

		expect(result.current.isExpanded).toBe(true);

		act(() => {
			result.current.toggleExpand();
		});

		expect(result.current.isExpanded).toBe(false);
	});
});
