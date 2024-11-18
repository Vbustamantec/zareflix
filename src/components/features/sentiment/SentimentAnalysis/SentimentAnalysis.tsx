import { useMemo } from "react";

import SentimentAnalysisPresentation from "./SentimentAnalysisPresentation";

import { SentimentAnalysisProps } from "./SentimentAnalysis.types";

export default function SentimentAnalysis({
	sentiment,
	score,
	className = "",
}: SentimentAnalysisProps) {
	const emotionData = useMemo(
		() => [
			{
				name: "Joy",
				value: Math.round(score * 100),
				fill: "#22c55e",
			},
			{
				name: "Neutral",
				value: Math.round((1 - Math.abs(score - 0.5)) * 100),
				fill: "#eab308",
			},
			{
				name: "Critical",
				value: Math.round((1 - score) * 100),
				fill: "#ef4444",
			},
		],
		[score]
	);

	return (
		<SentimentAnalysisPresentation
			sentiment={sentiment}
			score={score}
			className={className}
			emotionData={emotionData}
		/>
	);
}
