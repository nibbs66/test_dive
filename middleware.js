import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth({
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

export const config = { matcher: ["/admin", "/admin/users/employee", "/admin/users/customer"] }

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
