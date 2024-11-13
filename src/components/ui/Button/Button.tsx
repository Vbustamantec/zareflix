"use client";
import React from "react";

import { ButtonProps } from "./Button.types";

export function Button({
	handleSearch,
	ariaLabel = "Seach Movies",
	...props
}: ButtonProps) {
	return (
		<button
			onClick={handleSearch}
			className="md:w-[150px] w-full bg-red-800 text-white px-5 py-3 rounded-md hover:bg-red-700 transition-all duration-200"
			aria-label={ariaLabel}
			{...props}
		>
			Search
		</button>
	);
}
