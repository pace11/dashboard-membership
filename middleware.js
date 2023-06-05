/* eslint-disable no-mixed-spaces-and-tabs */
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {

	const { pathname } = request.nextUrl;

	if (
		pathname.startsWith("/_next") // exclude Next.js internals
		|| pathname.startsWith("/api") //  exclude all API routes
		|| pathname.startsWith("/static") // exclude static files
		|| pathname.startsWith("/forgot-password")
		|| pathname.startsWith("/change-password")
		|| PUBLIC_FILE.test(pathname) // exclude all files in the public folder
	  ) {

		return NextResponse.next();

	}

	if (!!request.cookies.get("tknMembership") === false && !pathname.startsWith("/login")) {

		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`);

	} else {

		return NextResponse.next();

	}

}
