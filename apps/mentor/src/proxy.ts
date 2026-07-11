import { config as appConfig } from "@repo/config";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authClient } from "./libs/auth-client";

export async function proxy(request: NextRequest) {
	let sessionToken = request.cookies.get("better-auth.session_token");
	if (process.env.NODE_ENV === "production") {
		sessionToken = request.cookies.get("__Secure-better-auth.session_token");
	}

	console.log("env : ", process.env.NODE_ENV);
	console.log("session : ", sessionToken);

	// const { data: sessionToken } = await authClient.getSession({
	// 	fetchOptions: { headers: await headers() },
	// });

	const isLoginPage = request.nextUrl.pathname.startsWith("/login");

	if (!sessionToken && !isLoginPage) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (sessionToken && isLoginPage) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
