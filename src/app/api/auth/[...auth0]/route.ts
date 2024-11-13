import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
	login: handleLogin({
		returnTo: "/",
	}),
	onError(req: Request, error: Error) {
		console.error(error);
		return Response.redirect(new URL("/?error=login_error", req.url));
	},
});
