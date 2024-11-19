export const getButtonStyles = (
	isLoading: boolean,
	isFavorite: boolean,
	className = ""
) => {
	return `p-2 rounded-full transition-all duration-300
	  ${isLoading ? "scale-125" : "scale-100"} 
	  ${
			isFavorite
				? "bg-red-600 hover:bg-red-700"
				: "bg-gray-800/50 hover:bg-gray-700/50"
		} 
	  ${className}
	  relative
	  overflow-hidden`;
};

export const getHeartStyles = (isLoading: boolean, isFavorite: boolean) => {
	return `w-5 h-5 transition-all duration-300
	  ${isFavorite ? "text-white fill-current" : "text-white"}
	  ${isLoading ? "scale-110" : "scale-100"}`;
};
