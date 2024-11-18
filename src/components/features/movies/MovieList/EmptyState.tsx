import { motion } from "framer-motion";
import { Search, Film } from "lucide-react";

export function EmptyState() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center p-12 mt-8"
		>
			<motion.div
				className="relative w-32 h-32 mb-8"
				animate={{
					scale: [1, 1.05, 1],
					rotate: [0, 5, -5, 0],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<div className="absolute inset-0 bg-red-600/10 rounded-full" />
				<div className="absolute inset-2 bg-red-600/20 rounded-full" />
				<div className="absolute inset-0 flex items-center justify-center">
					<Film className="w-16 h-16 text-red-600/60" />
				</div>
			</motion.div>

			<motion.h2
				className="text-3xl font-bold text-white mb-4 text-center"
				animate={{
					opacity: [0.8, 1, 0.8],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				No movies to show yet
			</motion.h2>

			<motion.div className="flex items-center gap-2 text-gray-400 text-lg">
				<span>Start by searching for a movie</span>
				<Search className="w-5 h-5 text-red-500" />
			</motion.div>

			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<motion.div
					className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full"
					animate={{
						scale: [1, 1.5, 1],
						opacity: [0.5, 1, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-500 rounded-full"
					animate={{
						scale: [1.5, 1, 1.5],
						opacity: [1, 0.5, 1],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>
		</motion.div>
	);
}
