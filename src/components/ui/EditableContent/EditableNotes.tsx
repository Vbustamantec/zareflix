import { ChevronDown, ChevronUp } from "lucide-react";
import { ExpandableNotesProps } from "./EditableContent.types";

const MAX_LENGTH = 100;

export function ExpandableNotes({
	notes,
	isExpanded,
	onToggle,
}: ExpandableNotesProps) {
	if (!notes) {
		return <span className="text-gray-400">No personal notes added</span>;
	}

	if (notes.length <= MAX_LENGTH) {
		return <span className="text-gray-400 break-words">{notes}</span>;
	}

	return (
		<div className="space-y-2">
			<span className="text-gray-400 block break-words">
				{isExpanded ? notes : `${notes.slice(0, MAX_LENGTH)}...`}
			</span>
			<div>
				<button
					onClick={onToggle}
					className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors"
				>
					{isExpanded ? (
						<>
							Show less
							<ChevronUp size={16} />
						</>
					) : (
						<>
							Show more
							<ChevronDown size={16} />
						</>
					)}
				</button>
			</div>
		</div>
	);
}
