import Link from "next/link";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

import { ErrorStateProps } from "./ErrorState.types";

export default function ErrorState({
	title = "Something went wrong",
	message = "An unexpected error occurred",
	showHomeButton = true,
	showRetryButton = true,
	onRetry,
	className = "",
}: ErrorStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className={`flex items-center justify-center p-6 ${className}`}
		>
			<div className="text-center space-y-6 max-w-md">
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl" />
						<AlertTriangle className="w-16 h-16 text-red-600" />
					</div>
				</div>

				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-white">{title}</h2>
					<p className="text-gray-400">{message}</p>
				</div>

				<div className="flex justify-center gap-4">
					{showRetryButton && onRetry && (
						<button
							onClick={onRetry}
							className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							<RotateCcw className="w-5 h-5" />
							<span>Try Again</span>
						</button>
					)}

					{showHomeButton && (
						<Link
							href="/"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
						>
							<Home className="w-5 h-5" />
							<span>Go Home</span>
						</Link>
					)}
				</div>
			</div>
		</motion.div>
	);
}
