import { useMemo } from "react";

import { calculateEmotionData } from "@/utils/sentimentUtils";

import SentimentAnalysisPresentation from "./SentimentAnalysisPresentation";

import { SentimentAnalysisProps } from "./SentimentAnalysis.types";

export default function SentimentAnalysis({
	sentiment,
	score,
	className = "",
}: SentimentAnalysisProps) {
	const emotionData = useMemo(() => calculateEmotionData(score), [score]);

	return (
		<SentimentAnalysisPresentation
			sentiment={sentiment}
			score={score}
			className={className}
			emotionData={emotionData}
		/>
	);
}
