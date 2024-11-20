import { motion } from "framer-motion";
import { Scan, ChartBar, Loader2 } from "lucide-react";

export default function SentimentAnalysisEmpty() {
	return (
		<div className="bg-dark-gray rounded-lg p-6 mt-8">
			<div className="flex items-center justify-between mb-6">
				<div className="space-y-2">
					<h2 className="text-xl font-bold text-white">Emotional Analysis</h2>
					<p className="text-sm text-gray-400">
						Analyzing your personal notes and comments
					</p>
				</div>
				<div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
					<Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
					<div className="text-right">
						<div className="text-white font-medium">Processing</div>
						<div className="text-sm text-gray-400">Sentiment Data</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<motion.div
					className="h-64 bg-gray-800/30 rounded-lg p-4 flex flex-col items-center justify-center"
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<ChartBar className="w-12 h-12 text-gray-600 mb-4" />
					<p className="text-gray-500 text-center">
						Preparing emotional distribution chart
					</p>
				</motion.div>

				<motion.div
					className="bg-gray-800/30 rounded-lg p-6 flex flex-col items-center justify-center"
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
				>
					<Scan className="w-12 h-12 text-gray-600 mb-4" />
					<p className="text-gray-500 text-center">
						Analyzing sentiment patterns
					</p>
				</motion.div>
			</div>

			<div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
				<div className="flex items-center justify-center gap-2">
					<Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
					<p className="text-sm text-gray-400 text-center">
						Processing your notes to generate insights...
					</p>
				</div>
			</div>
		</div>
	);
}
