import React from "react";
import { TestClient2 } from "./testclient";

export default async function TestServer() {
	return (
		<div className="p-4">
			<h1 className="text-xl text-white font-bold mb-4">Server Test</h1>
			<TestClient2 />
		</div>
	);
}
