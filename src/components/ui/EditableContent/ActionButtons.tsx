import { Pencil, Trash2 } from "lucide-react";

import { ActionButtonsProps } from "./EditableContent.types";

export function ActionButtons({
	onEdit,
	onRemove,
	isUpdating,
	isRemoving,
}: ActionButtonsProps) {
	return (
		<div className="flex justify-end gap-2 mt-2">
			<button
				onClick={onEdit}
				className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
				disabled={isUpdating}
				aria-label="Edit"
			>
				<Pencil size={20} />
			</button>
			<button
				onClick={onRemove}
				className="p-2 text-red-500 hover:text-red-400 transition-colors"
				disabled={isRemoving}
				aria-label="Remove"
			>
				<Trash2 size={20} />
			</button>
		</div>
	);
}
