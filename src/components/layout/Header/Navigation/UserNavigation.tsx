"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default function UserNavigation() {
	const { user, isLoading } = useUser();

	if (isLoading) {
		return <Skeleton className="md:w-[150px] w-full" variant="button" />;
	}

	if (!user) {
		return (
			<Link href="/api/auth/login" className="btn-primary">
				Login
			</Link>
		);
	}

	return (
		<div className="flex gap-5 justify-center items-center">
			<Link
				href="/favorites"
				className="text-white hover:text-red-500 transition-colors"
			>
				Favorites
			</Link>
			{process.env.API_PANEL_TEST && (
				<Link
					href="/test-page"
					className="text-white hover:text-red-500 transition-colors"
				>
					API Panel
				</Link>
			)}
			<UserMenu user={user} />
		</div>
	);
}
