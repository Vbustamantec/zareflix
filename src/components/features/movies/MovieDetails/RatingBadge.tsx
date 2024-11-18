import { Star } from "lucide-react";

export default function RatingBadge({ rating }: { rating: string }) {
	const ratingNum = parseFloat(rating);
	let bgColor = "bg-red-600";

	if (ratingNum >= 8) bgColor = "bg-green-600";
	else if (ratingNum >= 6) bgColor = "bg-yellow-600";

	return (
		<div
			className={`${bgColor} px-3 py-1 rounded-full flex items-center gap-1`}
		>
			<Star className="w-4 h-4 text-white" />
			<span className="text-white font-semibold">{rating}/10</span>
		</div>
	);
}
