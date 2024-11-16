import SkeletonCard from "./SkeletonCard";

interface SkeletonListProps {
	count?: number;
	className?: string;
	variant?: "favorite" | "normal";
}

export default function SkeletonList({
	count = 5,
	className = "",
	variant = "normal",
}: SkeletonListProps) {
	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4 ${className}`}
		>
			{[...Array(count)].map((_, index) => (
				<SkeletonCard key={index} variant={variant} />
			))}
		</div>
	);
}
