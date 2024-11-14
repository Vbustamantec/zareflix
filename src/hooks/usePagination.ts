import { PaginationProps } from "@/components/ui/Pagination/Pagination.types";

type PaginationItem = {
	type: "button" | "ellipsis";
	page?: number;
	label: string;
	isActive?: boolean;
	isDisabled?: boolean;
};

export function usePagination({
	currentPage,
	totalPages,
}: Omit<PaginationProps, "onPageChange">) {
	function getPageNumbers(current: number, total: number): number[] {
		const maxPagesToShow = 5;

		if (total <= maxPagesToShow) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		let startPage = Math.max(1, current - 2);
		const endPage = Math.min(total, startPage + maxPagesToShow - 1);

		if (endPage - startPage < maxPagesToShow - 1) {
			startPage = Math.max(1, endPage - maxPagesToShow + 1);
		}

		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	}

	function getPaginationItems(): PaginationItem[] {
		const items: PaginationItem[] = [
			{
				type: "button",
				page: currentPage - 1,
				label: "Previous",
				isDisabled: currentPage === 1,
			},
		];

		if (currentPage > 3 && totalPages > 5) {
			items.push({ type: "button", page: 1, label: "1" });
			if (currentPage > 4) {
				items.push({ type: "ellipsis", label: "..." });
			}
		}

		getPageNumbers(currentPage, totalPages).forEach((page) => {
			items.push({
				type: "button",
				page,
				label: String(page),
				isActive: currentPage === page,
			});
		});

		if (currentPage < totalPages - 2 && totalPages > 5) {
			if (currentPage < totalPages - 3) {
				items.push({ type: "ellipsis", label: "..." });
			}
			items.push({
				type: "button",
				page: totalPages,
				label: String(totalPages),
			});
		}

		items.push({
			type: "button",
			page: currentPage + 1,
			label: "Next",
			isDisabled: currentPage === totalPages,
		});

		return items;
	}

	return {
		paginationItems: getPaginationItems(),
	};
}
