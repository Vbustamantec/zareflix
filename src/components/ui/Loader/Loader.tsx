import React from "react";

export default function Loader() {
	return (
		<div className="flex justify-center mt-4">
			<div className="w-8 h-8 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}
