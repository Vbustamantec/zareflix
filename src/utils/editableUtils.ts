export const MAX_CHARS = 150;
export const MAX_PREVIEW_LENGTH = 100;

export const validateNotes = (notes: string): boolean => {
	return notes.length <= MAX_CHARS;
};

export const shouldTruncate = (text: string): boolean => {
	return text.length > MAX_PREVIEW_LENGTH;
};

export const truncateText = (text: string): string => {
	return text.length > MAX_PREVIEW_LENGTH
		? `${text.slice(0, MAX_PREVIEW_LENGTH)}...`
		: text;
};
