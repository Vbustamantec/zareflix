"use client";

import React, { useState } from "react";

export function TestClient2() {
	const [data, setData] = useState(null);
	console.log("🚀 ~ TestClient2 ~ data:", data);

	const handleFetch = async () => {
		const response = await fetch("services/");
		const data = await response.json();
		setData(data);
	};

	const handleFetch2 = async () => {
		const response = await fetch("services/private-route");
		const data = await response.json();
		setData(data);
	};

	const handleFetch3 = async () => {
		const response = await fetch("services/protected");
		const data = await response.json();
		setData(data);
	};

	return (
		<div className="p-4">
			<h1 className="text-lg text-white font-bold mb-4">PRIVATE TEST</h1>
			<button className="bg-red-500 p-3" onClick={handleFetch}>
				Private
			</button>
			<button className="bg-red-500 p-3" onClick={handleFetch2}>
				Private 2
			</button>

			<button className="bg-red-500 p-3" onClick={handleFetch3}>
				Private 3
			</button>
		</div>
	);
}
