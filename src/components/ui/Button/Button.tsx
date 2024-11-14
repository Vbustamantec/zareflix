"use client";
import React from "react";

import { ButtonProps } from "./Button.types";

export default function Button({
	onClick,
	ariaLabel = "Seach Movies",
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`btn-primary ${className}`}
			aria-label={ariaLabel}
			{...props}
		>
			{children}
		</button>
	);
}
