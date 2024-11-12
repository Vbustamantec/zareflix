// utils/api.ts
interface FetchOptions {
	searchParams?: Record<string, string>;
	cache?: RequestCache;
}

export async function fetchOMDB({
	searchParams = {},
	cache = "no-store",
}: FetchOptions = {}) {
	try {
		const baseUrl = "https://www.omdbapi.com/";
		const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

		const queryParams = new URLSearchParams({
			apikey: apiKey!,
			...searchParams,
		});

		const response = await fetch(`${baseUrl}?${queryParams}`, { cache });
		const data = await response.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "Failed to fetch data");
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error("An unexpected error occurred");
	}
}

export async function searchMovies(query: string, page: number = 1) {
	return fetchOMDB({
		searchParams: {
			s: query,
			page: page.toString(),
		},
	});
}

export async function getMovieById(id: string) {
	return fetchOMDB({
		searchParams: {
			i: id,
			plot: "full",
		},
		cache: "force-cache",
	});
}
