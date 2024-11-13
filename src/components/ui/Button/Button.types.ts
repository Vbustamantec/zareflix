export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	ariaLabel?: string;
	className?: string;
	handleSearch: () => void;
}
