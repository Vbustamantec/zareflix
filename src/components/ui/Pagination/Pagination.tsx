import { Pagination as NextUIPagination } from "@nextui-org/pagination";
import { PaginationProps } from "./Pagination.types";

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	return (
		<div className="flex justify-center mt-8">
			<NextUIPagination
				total={totalPages}
				page={currentPage}
				onChange={onPageChange}
				className="gap-2"
				radius="md"
				showControls
				classNames={{
					wrapper: "gap-2",
					item: "btn-primary px-0 py-0 bg-red-800 h-[40px] w-[40px]",
					chevronNext: "hidden",
				}}
			/>
		</div>
	);
}
