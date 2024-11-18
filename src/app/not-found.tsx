import NotFoundContent from "@/components/layout/NotFoundContent/NotFoundContent";

export default function NotFound() {
	return (
		<div className="min-h-[80vh] flex items-center justify-center p-4">
			<div className="text-center max-w-2xl mx-auto">
				<h1 className="text-[150px] md:text-[200px] font-bold leading-tight">
					<span className="text-red-600">4</span>
					<span className="text-white">0</span>
					<span className="text-red-600">4</span>
				</h1>

				<div className="space-y-4">
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
						Oops! This scene didn&apos;t make the final cut
					</h2>
					<p className="text-gray-400 text-lg mb-8">
						The page you&apos;re looking for has been moved, deleted, or never
						existed - just like many director&apos;s cuts.
					</p>
				</div>

				<NotFoundContent />
			</div>
		</div>
	);
}
