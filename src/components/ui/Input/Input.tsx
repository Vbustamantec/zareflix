"use client";
import React from "react";

import { InputProps } from "./Input.types";

export default function Input({
	value,
	handleInputChange,
	handleKeyPress,
	type = `text`,
	placeholder = `Search for a movie...`,
	ariaLabel = `Search for a movie`,
	id = `search-input`,
	...props
}: InputProps) {
	return (
		<input
			type={type}
			value={value}
			onChange={handleInputChange}
			onKeyDown={handleKeyPress}
			className="p-3 rounded-md text-black w-full"
			placeholder={placeholder}
			aria-label={ariaLabel}
			id={id}
			{...props}
		/>
	);
}
