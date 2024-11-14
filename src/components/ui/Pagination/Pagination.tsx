import React from "react";

import { usePagination } from "@/hooks/usePagination";

import Button from "@/components/ui/Button";

import { PaginationProps } from "./Pagination.types";

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const { paginationItems } = usePagination({
		currentPage,
		totalPages,
	});

	return (
		<div className="flex justify-center gap-2 mt-8">
			{paginationItems.map((item, index) => {
				if (item.type === "ellipsis") {
					return (
						<span key={`ellipsis-${index}`} className="text-white self-center">
							{item.label}
						</span>
					);
				}

				return (
					<Button
						key={`button-${index}-${item.page}`}
						onClick={() => item.page && onPageChange(item.page)}
						disabled={item.isDisabled}
						className={`
              btn-primary 
              !w-auto 
              px-4 
              ${item.isActive ? "bg-red-700" : ""} 
              ${
								item.isDisabled
									? "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-800 disabled:hover:transition-none disabled:hover:shadow-none"
									: ""
							}
            `}
					>
						{item.label}
					</Button>
				);
			})}
		</div>
	);
}
