"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserTest() {
	const { user, isLoading } = useUser();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [dbUser, setDbUser] = React.useState<any>(null);
	const [error, setError] = React.useState<string>("");

	const checkUserSync = async () => {
		try {
			const response = await fetch("/services/user/me");
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
		<div className="p-4 bg-dark-gray rounded-lg mt-4">
			<h2 className="text-xl text-white mb-4">User Sync Test</h2>

			<div className="space-y-4">
				<div className="text-white">
					<h3 className="font-bold">Auth0 User:</h3>
					<pre className="bg-black p-2 rounded mt-2">
						{JSON.stringify(user, null, 2)}
					</pre>
				</div>

				<button onClick={checkUserSync} className="btn-primary">
					Check Database Sync
				</button>

				{error && <div className="text-red-500">Error: {error}</div>}

				{dbUser && (
					<div className="text-white">
						<h3 className="font-bold">Database User:</h3>
						<pre className="bg-black p-2 rounded mt-2">
							{JSON.stringify(dbUser, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}
