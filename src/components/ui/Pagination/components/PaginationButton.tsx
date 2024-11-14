import Button from "@/components/ui/Button";

import { PaginationButtonProps } from "./PaginationButton.types";

export default function PaginationButton({
	onClick,
	disabled,
	active,
	children,
}: PaginationButtonProps) {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			className={`
          btn-primary 
          !w-auto 
          px-4 
          ${active ? "bg-red-700" : ""} 
          ${
						disabled
							? "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-800 disabled:hover:transition-none disabled:hover:shadow-none"
							: ""
					}
        `}
		>
			{children}
		</Button>
	);
}
