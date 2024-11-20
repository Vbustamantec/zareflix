import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { SENTIMENT_CONFIG } from "@/utils/sentimentUtils";

import SentimentSummary from "./SentimentSummary";

import { SentimentAnalysisPresentationProps } from "./SentimentAnalysis.types";

export default function SentimentAnalysisPresentation({
	sentiment,
	score,
	className = "",
	emotionData,
}: SentimentAnalysisPresentationProps) {
	const SentimentIcon = SENTIMENT_CONFIG[sentiment].icon;

	return (
		<div
			className={`bg-dark-gray rounded-lg p-6 ${className}`}
			data-testid="sentiment-container"
		>
			<div className="flex items-center justify-between mb-6">
				<div className="space-y-2">
					<h2 className="text-xl font-bold text-white">Emotional Analysis</h2>
					<p className="text-sm text-gray-400">
						Based on your personal notes and comments
					</p>
				</div>
				<div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
					<SentimentIcon
						className={`w-6 h-6 ${SENTIMENT_CONFIG[sentiment].colorClass}`}
						data-testid="sentiment-icon"
					/>
					<div className="text-right">
						<div className="text-white capitalize font-medium">{sentiment}</div>
						<div className="text-sm text-gray-400">Overall Mood</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="h-64 bg-gray-800/30 rounded-lg p-4">
					<h3 className="text-sm font-medium text-gray-400 mb-2">
						Emotional Distribution
					</h3>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={emotionData} layout="vertical">
							<XAxis type="number" domain={[0, 100]} />
							<YAxis dataKey="name" type="category" />
							<Bar dataKey="value" radius={[0, 4, 4, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<SentimentSummary score={score} />
			</div>
		</div>
	);
}
