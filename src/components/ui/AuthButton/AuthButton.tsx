"use client";

import React from "react";
import Link from "next/link";

import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthButtonPlaceholder({ user }: UserProfile | any) {
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
				Logged in as: {user?.nickname || user?.email}
			</span>
			<Link href="/favorites" className="text-white">
				Favorites
			</Link>
			<Link href="/api/auth/logout" className="btn-primary">
				Logout
			</Link>
		</div>
	) : (
		<Link href="/api/auth/login" className="btn-primary">
			Login
		</Link>
	);
}

export default AuthButton;
