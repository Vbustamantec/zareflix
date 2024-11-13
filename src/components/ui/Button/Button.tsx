"use client";
import React from "react";

import { ButtonProps } from "./Button.types";

export default function Button({
	handleSearch,
	ariaLabel = "Seach Movies",
	className,
	...props
}: ButtonProps) {
	return (
		<button
			onClick={handleSearch}
			className={`btn-primary ${className}`}
			aria-label={ariaLabel}
			{...props}
		>
			Search
		</button>
	);
}
