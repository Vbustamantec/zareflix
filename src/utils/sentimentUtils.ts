import { Smile, Meh, Frown } from "lucide-react";

export const SENTIMENT_CONFIG = {
	positive: {
		icon: Smile,
		colorClass: "text-green-500",
		bgClass: "bg-green-500/15",
		progressClass: "#22c15e",
		description: "Shows enthusiasm and satisfaction",
	},
	neutral: {
		icon: Meh,
		colorClass: "text-yellow-500",
		bgClass: "bg-yellow-500/15",
		progressClass: "#eab30e",
		description: "Balanced or objective perspective",
	},
	negative: {
		icon: Frown,
		colorClass: "text-red-500",
		bgClass: "bg-red-500/15",
		progressClass: "#ef4444",
		description: "Indicates areas for improvement",
	},
} as const;

export type SentimentType = keyof typeof SENTIMENT_CONFIG;

interface SentimentSummary {
	config: (typeof SENTIMENT_CONFIG)[SentimentType];
	title: string;
	description: string;
}

export function getSentimentSummary(score: number): SentimentSummary {
	if (score > 0.7) {
		return {
			config: SENTIMENT_CONFIG.positive,
			title: "Very Positive Outlook",
			description:
				"Your notes reflect high satisfaction and enthusiasm for your favorites",
		};
	}
	if (score >= 0.4 && score <= 0.6) {
		return {
			config: SENTIMENT_CONFIG.neutral,
			title: "Balanced Perspective",
			description: "You feel neutral about your favorites",
		};
	}
	if (score >= 0.3) {
		return {
			config: SENTIMENT_CONFIG.negative,
			title: "Mixed Feelings",
			description:
				"Your notes indicate some areas of concern in your favorites",
		};
	}

	return {
		config: SENTIMENT_CONFIG.negative,
		title: "Areas for Improvement",
		description: "Your notes suggest you don't really like these movies",
	};
}

export const calculateEmotionDataSingle = (
	sentiment: SentimentType,
	score: number
) => [
	{
		name: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
		value: Math.round(score * 100),
		fill: SENTIMENT_CONFIG[sentiment].progressClass,
	},
];
