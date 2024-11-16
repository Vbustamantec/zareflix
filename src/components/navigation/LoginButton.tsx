import React from "react";
import Link from "next/link";

export default function LoginButton() {
	return (
		<Link href="/api/auth/login" className="btn-primary">
			Login
		</Link>
	);
}
