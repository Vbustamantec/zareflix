export interface FavoriteCardProps {
	favorite: {
		_id: string;
		movieId: string;
		title: string;
		poster: string;
		year: string;
		personalNotes?: string;
	};
	onRemove: () => void;
	onUpdateNotes: (notes: string) => void;
	isRemoving: boolean;
	isUpdating: boolean;
}
