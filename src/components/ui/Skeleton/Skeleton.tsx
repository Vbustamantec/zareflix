import React from "react";
import { SkeletonProps } from "./Skeleton.types";

export default function Skeleton({
	className,
	variant = "text",
}: SkeletonProps) {
	const baseStyles = "bg-gradient-to-r animate-shimmer bg-[length:200%_100%]";

	const variantsStyles = {
		text: "from-gray-700 via-gray-600 to-gray-700 h-6 rounded",
		button: "from-red-800 via-red-700 to-red-800 h-12 rounded-md",
		card: "from-gray-700 via-gray-600 to-gray-700 h-full rounded-md",
		list: "from-gray-700 via-gray-600 to-gray-700 h-20 rounded-md",
	};

	return (
		<div className={`${baseStyles} ${variantsStyles[variant]} ${className}`} />
	);
}
