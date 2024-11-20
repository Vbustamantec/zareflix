"use client";
import React from "react";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types";

export class APIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "APIError";
	}
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		if (error instanceof APIError) {
			return { hasError: false };
		}
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		if (!(error instanceof APIError)) {
			console.error("ErrorBoundary caught an error:", error, errorInfo);
		}
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			return (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="min-h-[400px] flex items-center justify-center p-6"
				>
					<div className="text-center space-y-6 max-w-md">
						<div className="flex justify-center">
							<div className="relative">
								<div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl" />
								<AlertTriangle className="w-16 h-16 text-red-600" />
							</div>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-bold text-white">
								Something went wrong
							</h2>
							<p className="text-gray-400">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
						</div>

						<button
							onClick={this.handleRetry}
							className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							<RotateCcw className="w-5 h-5" />
							<span>Try Again</span>
						</button>
					</div>
				</motion.div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
