import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(function middleware(req){
    if(req.nextUrl.pathname.startsWith('/admin') &&
    (!req.nextauth.token?.isAdmin || !req.nextauth.token?.isEmployee)
    ){
        return NextResponse.redirect(new URL("/", req.url));
    }
    if(req.nextUrl.pathname.startsWith('/admin/users') &&
        !req.nextauth.token?.isAdmin
    ){
        return NextResponse.redirect(new URL("/", req.url));
    }
})
export const config = { matcher: ["/admin/:path*"] }
