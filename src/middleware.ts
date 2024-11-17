import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith("/services")) {
		const res = NextResponse.next();
		const session = await getSession(req, res);

		if (session?.accessToken) {
			res.headers.set("Authorization", `Bearer ${session.accessToken}`);
		}

		return res;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/services/:path*"],
};
