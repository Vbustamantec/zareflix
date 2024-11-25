import { Check, X } from "lucide-react";

import { EditableFormProps } from "./EditableContent.types";

export function EditableForm({
	editData,
	setEditData,
	onSave,
	onCancel,
	isUpdating,
}: EditableFormProps) {
	const MAX_CHARS = 150;

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		if (value.length <= MAX_CHARS) {
			setEditData({ ...editData, notes: value });
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<label className="text-white text-sm mb-1 block">Title</label>
				<input
					type="text"
					value={editData.title}
					onChange={(e) => setEditData({ ...editData, title: e.target.value })}
					className="w-full p-2 bg-gray-800 text-white rounded-md"
				/>
			</div>
			<div>
				<label className="text-white text-sm mb-1 block">Personal Notes</label>
				<textarea
					value={editData.notes}
					onChange={handleNotesChange}
					className="w-full p-2 bg-gray-800 text-white rounded-md"
					placeholder="Add personal notes..."
					rows={3}
					maxLength={MAX_CHARS}
				/>
				<p className="text-gray-400 text-sm mt-1">
					{editData.notes.length}/{MAX_CHARS} characters
				</p>
			</div>
			<div className="flex justify-end gap-2">
				<button
					onClick={onCancel}
					className="p-2 text-gray-400 hover:text-white transition-colors"
					disabled={isUpdating}
					aria-label="Cancel"
				>
					<X size={20} />
				</button>
				<button
					onClick={onSave}
					className="p-2 text-green-500 hover:text-green-400 transition-colors"
					disabled={isUpdating}
					aria-label="Save"
				>
					<Check size={20} />
				</button>
			</div>
		</div>
	);
}
