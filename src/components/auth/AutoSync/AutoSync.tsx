"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function AutoSync() {
	const { user, isLoading } = useUser();

	useEffect(() => {
		const syncUser = async () => {
			if (!user) return;

			try {
				const response = await fetch("/services/user/sync", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
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
