import { useQuery } from "@tanstack/react-query";
import { FavoriteMovie } from "@/types/movies";

interface SentimentAnalysis {
	sentiment: "positive" | "negative" | "neutral";
	score: number;
}

async function analyzeSentiment(text: string): Promise<SentimentAnalysis> {
	const response = await fetch(`/proxy/sentiment/analyze`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text }),
	});

	if (!response.ok) {
		throw new Error("Failed to analyze sentiment");
	}

	const data = await response.json();
	return data.data;
}

export function useSentimentAnalysis(favorites: FavoriteMovie[]) {
	const notesText = favorites
		.map((fav) => fav.personalNotes)
		.filter(Boolean)
		.join(" ");

	return useQuery({
		queryKey: ["sentiment", notesText],
		queryFn: () => analyzeSentiment(notesText),
		enabled: notesText.length > 0,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
