"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

import { Movie } from "@/types/movies";
import { OmdbData } from "@/types/omdbData";

interface MoviesContextType {
	movies: Movie[];
	setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	omdbData: OmdbData[];
	setOmdbData: React.Dispatch<React.SetStateAction<OmdbData[]>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	error: string | null;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

const MoviesProvider = ({ children }: { children: ReactNode }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [omdbData, setOmdbData] = useState<OmdbData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<MoviesContext.Provider
			value={{
				movies,
				setMovies,
				omdbData,
				setOmdbData,
				isLoading,
				setIsLoading,
				error,
				setError,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

const useMovies = (): MoviesContextType => {
	const context = useContext(MoviesContext);
	if (context === undefined) {
		throw new Error("useMovies debe usarse dentro de un MoviesProvider");
	}
	return context;
};

export { MoviesProvider, useMovies };
