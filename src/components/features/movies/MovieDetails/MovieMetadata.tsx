import { MovieMetadataProps } from "./MovieDetails.types";

export function MovieMetadata({ items }: MovieMetadataProps) {
	return (
		<div className="flex flex-wrap gap-4">
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2 text-gray-400">
					<item.icon className="w-5 h-5" />
					<span>{item.label}</span>
				</div>
			))}
		</div>
	);
}
