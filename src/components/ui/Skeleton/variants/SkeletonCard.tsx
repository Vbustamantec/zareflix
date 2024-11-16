import React from "react";

interface SkeletonCardProps {
	variant?: "favorite" | "normal";
}

export default function SkeletonCard({
	variant = "normal",
}: SkeletonCardProps) {
	if (variant === "favorite") {
		return (
			<div className="bg-dark-gray p-4 rounded-lg shadow-lg animate-pulse">
				<div className="aspect-[2/3] bg-gray-800 rounded-md mb-3"></div>
				<div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
				<div className="h-4 bg-gray-800 rounded w-1/2"></div>
			</div>
		);
	}

	return (
		<div className="p-4 bg-dark-gray rounded-md">
			<div className="relative w-full h-96 mb-2">
				<div className="w-full h-full bg-gray-800 rounded-md animate-pulse"></div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse"></div>
				<div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse"></div>
				<div className="h-10 bg-gray-800 rounded w-full animate-pulse"></div>
			</div>
		</div>
	);
}
