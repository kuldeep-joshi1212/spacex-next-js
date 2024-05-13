import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(){
    if(cookies().has('auth')){
        return new NextResponse('success')
    }
    return new Response('failed', { status: 401 });
}