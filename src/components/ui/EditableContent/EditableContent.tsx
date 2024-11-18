import { useState } from "react";

import { EditableForm } from "./EditableForm";
import { ExpandableNotes } from "./EditableNotes";
import { ActionButtons } from "./ActionButtons";

import { EditableContentProps } from "./EditableContent.types";

export default function EditableFavoriteSection({
	initialTitle,
	initialNotes,
	year,
	onUpdate,
	onRemove,
	isUpdating,
	isRemoving,
}: EditableContentProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [editData, setEditData] = useState({
		title: initialTitle,
		notes: initialNotes,
	});

	const handleSave = () => {
		onUpdate({
			title: editData.title,
			personalNotes: editData.notes,
		});
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditData({
			title: initialTitle,
			notes: initialNotes,
		});
		setIsEditing(false);
	};

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
				<div className="text-gray-400">
					<ExpandableNotes
						notes={initialNotes}
						isExpanded={isExpanded}
						onToggle={() => setIsExpanded(!isExpanded)}
					/>
				</div>
				<ActionButtons
					onEdit={() => setIsEditing(true)}
					onRemove={onRemove}
					isUpdating={isUpdating}
					isRemoving={isRemoving}
				/>
			</div>
		</div>
	);
}
