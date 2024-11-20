export interface ErrorStateProps {
	title?: string;
	message?: string;
	showHomeButton?: boolean;
	showRetryButton?: boolean;
	onRetry?: () => void;
	className?: string;
}