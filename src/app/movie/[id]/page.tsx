import React from "react";

interface PageProps {
	params: {
		id: string;
	};
}

const Page = ({ params }: PageProps) => {
	const { id } = params;

	return <main className="text-white">El ID de la película es: {id}</main>;
};

export default Page;
