import { MovieDetails } from "@/types/movies";
import { LucideIcon } from "lucide-react";

export interface MovieDetailsPresentationProps {
	movie: MovieDetails;
}

export interface MovieDetailsProps {
	movie: MovieDetails;
}

export interface MovieMetadataProps {
	items: Array<{
		icon: LucideIcon;
		label: string;
	}>;
}
