import { useState } from "react";

export const useFavoriteButton = (onAdd: () => Promise<void>) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		if (isLoading) return;
		setIsLoading(true);

		try {
			await onAdd();
		} finally {
			setTimeout(() => setIsLoading(false), 200);
		}
	};

	return { isLoading, handleClick };
};
