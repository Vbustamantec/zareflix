export interface FavoriteButtonProps {
	onAdd: () => Promise<void>;
	isFavorite?: boolean;
	className?: string;
  }