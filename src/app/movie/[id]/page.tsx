import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ params }: any) => {
	const { id } = params;

	return <main className="text-white">El ID de la película es: {id}</main>;
};

export default Page;
