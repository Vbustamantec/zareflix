export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	ariaLabel?: string;
	handleSearch: () => void;
}
