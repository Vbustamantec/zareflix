import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const session = await getSession(req, res);

	if (!session) {
		const loginUrl = new URL("/api/auth/login", req.url);
		loginUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (req.nextUrl.pathname.startsWith("/proxy") && session?.accessToken) {
		res.headers.set("Authorization", `Bearer ${session.accessToken}`);
	}

	return res;
}

export const config = {
	matcher: ["/proxy/:path*", "/:path*"],
};
