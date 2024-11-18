"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import { Home, Film, RotateCcw } from "lucide-react";

export default function NotFoundContent() {
	return (
		<>
			<motion.div
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				animate={{
					rotate: 360,
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "linear",
				}}
			>
				<Film className="w-32 h-32 text-red-600/10" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="flex flex-col sm:flex-row gap-4 justify-center items-center"
			>
				<Link
					href="/"
					className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors group"
				>
					<Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
					<span>Back to Home</span>
				</Link>
				<button
					onClick={() => window.history.back()}
					className="flex items-center gap-2 px-6 py-3 bg-dark-gray text-white rounded-lg hover:bg-gray-800 transition-colors group"
				>
					<RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
					<span>Go Back</span>
				</button>
			</motion.div>

			<motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(5)].map((_, i) => (
					<motion.div
						suppressHydrationWarning
						key={i}
						className="absolute w-2 h-2 bg-red-600/20 rounded-full"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
						}}
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 2 + i,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}
			</motion.div>
		</>
	);
}
