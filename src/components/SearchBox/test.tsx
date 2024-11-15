import React from "react";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { TestClient2 } from "./testclient";

// Componente del servidor
export default async function TestServer() {
	const session = await getAccessToken().catch(() => null);
	const accessToken = session?.accessToken;

	return (
		<div className="p-4">
			<h1 className="text-xl text-white font-bold mb-4">Server Test</h1>
			<TestClient2 accessToken={accessToken ? accessToken : "nothing"} />
		</div>
	);
}
