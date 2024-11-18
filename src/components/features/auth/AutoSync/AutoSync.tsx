"use client";
import { useEffect } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function AutoSync() {
	const { user, isLoading } = useUser();

	useEffect(() => {
		const syncUser = async () => {
			if (!user) return;

			try {
				const userData = {
					email: user.email,
					nickname: user.nickname || user.name || user.email?.split("@")[0],
				};

				const response = await fetch(`/proxy/user/sync`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				});

				if (!response.ok) {
					console.error("Failed to sync user:", await response.text());
				}
			} catch (error) {
				console.error("Error syncing user:", error);
			}
		};

		if (!isLoading && user) {
			syncUser();
		}
	}, [user, isLoading]);

	return null;
}
