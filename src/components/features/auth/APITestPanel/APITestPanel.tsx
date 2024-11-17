"use client";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

export function APITestPanel() {
	const { user, isLoading } = useUser();
	const [apiResponse, setApiResponse] = useState(null);
	const [dbUser, setDbUser] = useState(null);
	const [error, setError] = useState<string>("");

	const handlePrivateRoute = async () => {
		try {
			const response = await fetch("/proxy/private");
			const data = await response.json();
			setApiResponse(data);
			setError("");
		} catch (error) {
			setError("Error accessing private route");
			console.error("Error private route:", error);
		}
	};

	const handleSyncUser = async () => {
		try {
			const response = await fetch("/proxy/sync", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${user?.sub}`,
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			setApiResponse(data);
			setError("");
		} catch (error) {
			setError("Error syncing user");
			console.error("Error syncing:", error);
		}
	};

	const checkUserSync = async () => {
		try {
			const response = await fetch("/proxy/user/me");
			const data = await response.json();

			if (data.success) {
				setDbUser(data.data);
				setError("");
			} else {
				setError(data.message || "Failed to fetch user data");
			}
		} catch (err) {
			setError("Error fetching user data");
			console.error(err);
		}
	};

	if (isLoading) return <div className="text-white">Loading...</div>;

	return (
		<div className="p-6 bg-dark-gray rounded-lg space-y-8">
			<h1 className="text-2xl text-white font-bold">API Testing Panel</h1>

			<section className="space-y-4">
				<h2 className="text-xl text-white">Auth0 User Data</h2>
				<pre className="bg-black p-4 rounded text-green-400 overflow-auto">
					{JSON.stringify(user, null, 2)}
				</pre>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl text-white">API Tests</h2>
				<div className="flex flex-wrap gap-4">
					<button
						className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded"
						onClick={handlePrivateRoute}
					>
						Test Private Route
					</button>

					<button
						className="bg-green-500 hover:bg-green-600 p-3 text-white rounded"
						onClick={handleSyncUser}
						disabled={!user}
					>
						Sync User
					</button>

					<button
						className="bg-purple-500 hover:bg-purple-600 p-3 text-white rounded"
						onClick={checkUserSync}
						disabled={!user}
					>
						Check DB User
					</button>
				</div>
			</section>

			{error && (
				<div className="text-red-500 bg-red-100 p-4 rounded">
					Error: {error}
				</div>
			)}

			{apiResponse && (
				<section className="space-y-4">
					<h2 className="text-xl text-white">API Response</h2>
					<pre className="bg-black p-4 rounded text-green-400 overflow-auto">
						{JSON.stringify(apiResponse, null, 2)}
					</pre>
				</section>
			)}

			{dbUser && (
				<section className="space-y-4">
					<h2 className="text-xl text-white">Database User</h2>
					<pre className="bg-black p-4 rounded text-green-400 overflow-auto">
						{JSON.stringify(dbUser, null, 2)}
					</pre>
				</section>
			)}
		</div>
	);
}
