"use client";
import { motion } from "framer-motion";
import { Film, Star, Tv } from "lucide-react";

export function HeroContent() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="text-center mb-12"
			
		>
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="text-4xl md:text-6xl font-bold mb-6"
			>
				<span className="text-red-600 mr-2">ZareFlix</span>
				<span className="text-white">Movie Searcher</span>
			</motion.h1>

			<motion.div
				className="flex justify-center gap-8 mb-12"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				{[
					{ Icon: Film, text: "Movies" },
					{ Icon: Star, text: "Favorites" },
					{ Icon: Tv, text: "Series" },
				].map((item, index) => (
					<motion.div
						key={index}
						className="flex flex-col items-center gap-2"
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					>
						<div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-red-500/20">
							<item.Icon className="w-6 h-6 text-red-500" />
						</div>
						<span className="text-gray-300 text-sm">{item.text}</span>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}
