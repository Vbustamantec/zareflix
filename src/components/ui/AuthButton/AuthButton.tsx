"use client";

import React from "react";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

import Skeleton from "../Skeleton/Skeleton";

export default function AuthButton() {
	const { user, isLoading } = useUser();

	if (isLoading)
		return <Skeleton className="md:w-[150px] w-full" variant="button" />;

	return user ? (
		<div className="flex items-center gap-4">
			<span className="text-white truncate max-w-[200px]">
				Logged in as: {user?.nickname || user?.email}
			</span>
			<Link href="/favorites" className="text-white">
				Favorites
			</Link>
			<Link href="/test-page" className="text-white">
				Test
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
