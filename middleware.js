import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(function middleware(req){
    console.log('token at middleware', req.nextauth.token)
    if(req.nextUrl.pathname.startsWith('/admin') &&
    (req.nextauth.token?.isEmployee)
    ){
        return NextResponse.redirect(new URL("/", req.url));
    }
    if(req.nextUrl.pathname.startsWith('/admin/users') &&
        req.nextauth.token?.isAdmin
    ){
        return NextResponse.redirect(new URL("/", req.url));
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
