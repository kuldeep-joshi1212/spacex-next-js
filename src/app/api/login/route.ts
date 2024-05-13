import {cookies} from "next/headers";

export async function GET(req: Request, res: Response) {
    const [AUTH_USER, AUTH_PASS] = (process.env.credentials || ':').split(':');
    const { username, password } = Object.fromEntries(new URL(req.url).searchParams);
    if (username === AUTH_USER && password === AUTH_PASS) {
    cookies().set('auth','VALID');
    return new Response('Logged in');
    }
    return new Response('Invalid credentials', { status: 401 });
}