"use client";
import React from "react";
import { ButtonProps } from "./Button.types";

export default function Button({
	onClick,
	ariaLabel,
	className = "",
	children,
	type = "button",
	disabled = false,
	...props
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={`btn-primary ${className}`}
			aria-label={ariaLabel}
			{...props}
		>
			{children}
		</button>
	);
}
