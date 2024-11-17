import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith("/services")) {
		const res = NextResponse.next();
		const session = await getSession(req, res);

		if (session?.accessToken) {
			res.headers.set("Authorization", `Bearer ${session.accessToken}`);
		}

		res.headers.set("Access-Control-Allow-Credentials", "true");
		res.headers.set(
			"Access-Control-Allow-Origin",
			process.env.NEXT_PUBLIC_BACKEND_URL || ""
		);
		res.headers.set(
			"Access-Control-Allow-Methods",
			"GET,DELETE,PATCH,POST,PUT"
		);
		res.headers.set(
			"Access-Control-Allow-Headers",
			"Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
		);

		return res;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/services/:path*"],
};
