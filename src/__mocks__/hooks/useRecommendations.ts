/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockUseRecommendations = {
	mockReturnValue: (value: {
		movies: any[];
		isLoading: boolean;
		error: null | Error;
	}) => {
		return jest.fn().mockReturnValue(value);
	},
};
