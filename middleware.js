import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    // Handle CORS for API requests
    if (url.startsWith("/api")) {
      const res = NextResponse.next();
      res.headers.append("Access-Control-Allow-Origin", "*");
      res.headers.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.headers.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      return res;
    }

    // Restrict access to admin routes
    if (url.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure user is authenticated
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/shipping"],
};
