"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

export default function Loading() {
	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="bg-dark-gray p-8 rounded-lg shadow-2xl flex flex-col items-center space-y-4"
			>
				<motion.div
					animate={{
						rotate: 360,
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}
					className="relative"
				>
					<div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl" />
					<Film className="w-12 h-12 text-red-600" />
				</motion.div>

				<motion.div
					initial={{ width: 0 }}
					animate={{ width: 150 }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
					className="h-1 bg-red-600 rounded-full"
				/>

				<p className="text-gray-400 text-sm">Loading amazing content...</p>
			</motion.div>
		</div>
	);
}
