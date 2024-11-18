export interface EditableContentProps {
	initialTitle: string;
	initialNotes: string;
	year: string;
	onUpdate: (data: { title: string; personalNotes: string }) => void;
	onRemove: () => void;
	isUpdating: boolean;
	isRemoving: boolean;
}

export interface EditableFormProps {
	editData: {
		title: string;
		notes: string;
	};
	setEditData: (data: { title: string; notes: string }) => void;
	onSave: () => void;
	onCancel: () => void;
	isUpdating: boolean;
}

export interface ExpandableNotesProps {
	notes: string;
	isExpanded: boolean;
	onToggle: () => void;
}

export interface ActionButtonsProps {
	onEdit: () => void;
	onRemove: () => void;
	isUpdating: boolean;
	isRemoving: boolean;
}
