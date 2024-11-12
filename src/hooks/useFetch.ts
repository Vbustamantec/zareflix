// hooks/useFetch.ts
import { useState, useEffect } from "react";

function useFetch<T>(url: string | null, options?: RequestInit) {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(url, options);
				if (!response.ok) {
					throw new Error(`Error HTTP: ${response.status}`);
				}
				const data = await response.json();
				setData(data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.message || "Error al obtener los datos.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, options]);

	return { data, isLoading, error };
}

export default useFetch;
