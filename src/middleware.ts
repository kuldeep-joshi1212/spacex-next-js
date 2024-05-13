import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {cookies} from "next/headers";

const [AUTH_USER, AUTH_PASS] = (process.env.credentials || ':').split(':');

export function middleware(req: NextRequest) {
    if (!isAuthenticated(req)) {
        let url = `${req.nextUrl.protocol}//${req.nextUrl.hostname}${req.nextUrl.basePath}:3000/login`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

function isAuthenticated(req: NextRequest) {


    if (cookies().has('auth')){
        return true;
    } else {
        return false;
    }
}

export const config = {
    matcher: '/rockets/:path*',
};
