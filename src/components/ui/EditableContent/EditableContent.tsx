import { useEditable } from "@/hooks/useEditable";

import { EditableForm } from "./EditableForm";
import { ActionButtons } from "./ActionButtons";
import { ExpandableNotes } from "./EditableNotes";

import { EditableContentProps } from "./EditableContent.types";

export default function EditableContent({
	initialTitle,
	initialNotes,
	year,
	onUpdate,
	onRemove,
	isUpdating,
	isRemoving,
}: EditableContentProps) {
	const {
		isEditing,
		isExpanded,
		editData,
		setEditData,
		handleSave,
		handleCancel,
		toggleExpand,
		startEditing,
	} = useEditable(initialTitle, initialNotes, onUpdate);

	if (isEditing) {
		return (
			<EditableForm
				editData={editData}
				setEditData={setEditData}
				onSave={handleSave}
				onCancel={handleCancel}
				isUpdating={isUpdating}
			/>
		);
	}

	return (
		<div>
			<div className="flex justify-between items-start mb-2">
				<h3 className="text-white text-xl font-semibold">{initialTitle}</h3>
				<span className="text-gray-400">{year}</span>
			</div>

			<div className="mt-4">
				<ExpandableNotes
					notes={initialNotes}
					isExpanded={isExpanded}
					onToggle={toggleExpand}
				/>
				<ActionButtons
					onEdit={startEditing}
					onRemove={onRemove}
					isUpdating={isUpdating}
					isRemoving={isRemoving}
				/>
			</div>
		</div>
	);
}
