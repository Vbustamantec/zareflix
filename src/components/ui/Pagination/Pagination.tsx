// src/components/ui/Pagination/Pagination.tsx
import React from "react";

import { PaginationProps } from "./Pagination.types";

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
		if (totalPages <= 5) return i + 1;
		if (currentPage <= 3) return i + 1;
		if (currentPage >= totalPages - 2) return totalPages - 4 + i;
		return currentPage - 2 + i;
	});

	return (
		<div className="flex justify-center gap-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="btn-primary !w-auto px-4 disabled:opacity-50"
			>
				Previous
			</button>

			{pages[0] > 1 && (
				<>
					<button
						onClick={() => onPageChange(1)}
						className={`btn-primary !w-auto px-4 ${
							currentPage === 1 ? "bg-red-700" : ""
						}`}
					>
						1
					</button>
					{pages[0] > 2 && <span className="text-white self-center">...</span>}
				</>
			)}

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`btn-primary !w-auto px-4 ${
						currentPage === page ? "bg-red-700" : ""
					}`}
				>
					{page}
				</button>
			))}

			{pages[pages.length - 1] < totalPages && (
				<>
					{pages[pages.length - 1] < totalPages - 1 && (
						<span className="text-white self-center">...</span>
					)}
					<button
						onClick={() => onPageChange(totalPages)}
						className={`btn-primary !w-auto px-4 ${
							currentPage === totalPages ? "bg-red-700" : ""
						}`}
					>
						{totalPages}
					</button>
				</>
			)}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="btn-primary !w-auto px-4 disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
}
