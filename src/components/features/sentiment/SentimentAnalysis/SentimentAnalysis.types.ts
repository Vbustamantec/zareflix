export interface SentimentAnalysisProps {
	sentiment: "positive" | "negative" | "neutral";
	score: number;
	className?: string;
}

export interface EmotionData {
	name: string;
	value: number;
	fill: string;
}

export interface SentimentAnalysisPresentationProps
	extends SentimentAnalysisProps {
	emotionData: EmotionData[];
}
