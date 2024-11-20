import { useMemo } from "react";

import SentimentAnalysisPresentation from "./SentimentAnalysisPresentation";

import { SentimentAnalysisProps } from "./SentimentAnalysis.types";
import { calculateEmotionDataSingle } from "@/utils/sentimentUtils";

export default function SentimentAnalysis({
	sentiment,
	score,
	className = "",
}: SentimentAnalysisProps) {
	const emotionData = useMemo(
		() => calculateEmotionDataSingle(sentiment, score),
		[sentiment, score]
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
