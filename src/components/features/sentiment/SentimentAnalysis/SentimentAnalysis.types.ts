export type SentimentType = "positive" | "negative" | "neutral";

export interface SentimentAnalysisProps {
	sentiment: SentimentType;
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
