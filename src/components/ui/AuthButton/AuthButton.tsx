"use client";

import React from "react";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthButtonPlaceholder({ user }: any) {
	return (
		<div className="flex items-center gap-4">
			{user && (
				<div className="h-6 w-[150px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
			)}
			<div className="md:w-[150px] w-full h-12 bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-md animate-shimmer bg-[length:200%_100%]" />
		</div>
	);
}

function AuthButton() {
	const { user, isLoading } = useUser();

	if (isLoading) return <AuthButtonPlaceholder />;

	return user ? (
		<div className="flex items-center gap-4">
			<span className="text-white truncate max-w-[200px]">
				{user?.nickname || user?.email}
			</span>
			<Link href="/favorites" className="text-white">
				Favorites
			</Link>
			<Link
				href="/api/auth/logout"
				className="md:w-[150px] w-full bg-red-800 text-white px-5 py-3 rounded-md hover:bg-red-700 
                   transition-all duration-300 ease-in-out 
                   hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] 
                   active:transform active:scale-95
                   text-center whitespace-nowrap"
			>
				Logout
			</Link>
		</div>
	) : (
		<Link
			href="/api/auth/login"
			className="md:w-[150px] w-full bg-red-800 text-white px-5 py-3 rounded-md hover:bg-red-700 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] 
                 active:transform active:scale-95
                 text-center whitespace-nowrap"
		>
			Login
		</Link>
	);
}

export default AuthButton;
