import SkeletonCard from "./SkeletonCard";

export default function SkeletonList({ count = 5 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4">
			{[...Array(count)].map((_, index) => (
				<SkeletonCard key={index} />
			))}
		</div>
	);
}
