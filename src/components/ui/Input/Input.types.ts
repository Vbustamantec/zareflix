export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	ariaLabel?: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
