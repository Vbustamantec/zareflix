import { getSentimentSummary } from "@/utils/sentimentUtils";

const SentimentSummary = ({ score }: { score: number }) => {
	const summary = getSentimentSummary(score);
	const Icon = summary.config.icon;

	return (
		<div className="bg-gray-800/30 rounded-lg p-6">
			<div className="flex items-center gap-4">
				<div className={`p-3 rounded-lg ${summary.config.bgClass}`}>
					<Icon className={`w-6 h-6 ${summary.config.colorClass}`} />
				</div>
				<div>
					<h3 className="text-white font-medium mb-1">{summary.title}</h3>
					<p className="text-gray-400 text-sm">{summary.description}</p>
				</div>
			</div>

			<div className="mt-4 w-full bg-gray-800/50 rounded-full h-2">
				<div
					className={`h-full rounded-full transition-all duration-500 ${summary.config.progressClass}`}
					style={{ width: `${score * 100}%` }}
				/>
			</div>
		</div>
	);
};

export default SentimentSummary;
