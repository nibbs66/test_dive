import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(function middleware(req){
    console.log('token at middleware', req.nextauth.token.isAdmin)
    if(req.nextUrl.pathname.startsWith('/admin')){
        if (req.nextauth.token?.isAdmin || req.nextauth.token?.isEmployee){
            return NextResponse.next();
        }
    }
    if(req.nextUrl.pathname.startsWith('/admin/users')){
        if (!req.nextauth.token?.isAdmin){
            return NextResponse.rewrite(new URL("/", req.url));
        }
    }



})
export const config = { matcher: ["/admin/:path*"] }
/*export default withAuth({
        callbacks: {
            authorized: ({req, token })=>{
                if(req.nextUrl.pathname === '/admin'){
                    return token?.isAdmin === true || token?.isEmployee === true
                }
                if(req.nextUrl.pathname === '/admin/users/employee'){
                    return token?.isAdmin === true
                }
                if(req.nextUrl.pathname === '/admin/users/customer'){
                    return token?.isAdmin === true
                }
            },
        },
    }
)

export const config = { matcher: ["/admin", "/admin/users/employee", "/admin/users/customer"] }*/
