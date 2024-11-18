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
	onUpdate: (data: { title: string; personalNotes: string }) => void;
	isRemoving: boolean;
	isUpdating: boolean;
}
