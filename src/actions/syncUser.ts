"use server";
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function syncUser() {
	try {
		const { accessToken } = await getAccessToken();

		if (!accessToken) {
			return null;
		}

		const response = await fetch("/services/sync", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to sync user");
		}

		return response.json();
	} catch (error) {
		console.error("Error syncing user:", error);
		return null;
	}
}
