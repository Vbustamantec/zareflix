"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import NavLinks from "./NavLinks";

export default function UserNavigation() {
	const { user, isLoading } = useUser();

	if (isLoading) {
		return <Skeleton className="md:w-[150px] w-full" variant="button" />;
	}

	if (!user) {
		return <LoginButton />;
	}

	return (
		<div className="flex gap-5 justify-center items-center">
			<NavLinks />
			<UserMenu user={user} />
		</div>
	);
}
