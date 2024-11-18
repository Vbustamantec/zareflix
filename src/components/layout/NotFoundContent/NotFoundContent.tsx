"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";

export default function NotFoundContent() {
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4"
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
		</>
	);
}
