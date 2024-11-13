import Skeleton from "../Skeleton";

export default function SkeletonCard() {
	return (
		<div className="p-4 bg-dark-gray rounded-md">
			<div className="relative w-full h-96 mb-2">
				<Skeleton variant="card" className="w-full h-full" />
			</div>
			<div className="flex flex-col gap-2">
				<Skeleton variant="text" className="w-3/4 mx-auto" />
				<Skeleton variant="text" className="w-1/4 mx-auto" />
				<Skeleton variant="button" className="w-full" />
			</div>
		</div>
	);
}
