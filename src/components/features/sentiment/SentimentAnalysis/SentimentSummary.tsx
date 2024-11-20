import { Smile, Meh, Frown } from "lucide-react";

const SentimentSummary = ({ score }: { score: number }) => {
	const getSentimentSummary = () => {
		if (score > 0.7) {
			return {
				Icon: Smile,
				color: "#22c55e",
				title: "Very Positive Outlook",
				description:
					"Your notes reflect high satisfaction and enthusiasm for your favorites",
			};
		}
		if (score >= 0.4 && score <= 0.6) {
			return {
				Icon: Meh,
				color: "#eab308",
				title: "Balanced Perspective",
				description: "You feel neutral about your favorites",
			};
		}

		if (score >= 0.3) {
			return {
				Icon: Meh,
				color: "#ef4444",
				title: "Mixed Feelings",
				description:
					"Your notes indicate some areas of concern in your favorites",
			};
		}

		return {
			Icon: Frown,
			color: "#ef4444",
			title: "Areas for Improvement",
			description: "Your notes suggest you don't really like these movies",
		};
	};

	const summary = getSentimentSummary();

	return (
		<div className="bg-gray-800/30 rounded-lg p-6">
			<div className="flex items-center gap-4">
				<div
					className="p-3 rounded-lg"
					style={{
						backgroundColor: `${summary.color}15`,
					}}
				>
					<summary.Icon
						style={{
							color: summary.color,
							width: "24px",
							height: "24px",
						}}
					/>
				</div>
				<div>
					<h3 className="text-white font-medium mb-1">{summary.title}</h3>
					<p className="text-gray-400 text-sm">{summary.description}</p>
				</div>
			</div>

			<div className="mt-4 w-full bg-gray-800/50 rounded-full h-2">
				<div
					className="h-full rounded-full transition-all duration-500"
					style={{
						width: `${score * 100}%`,
						backgroundColor: summary.color,
					}}
				/>
			</div>
		</div>
	);
};

export default SentimentSummary;
