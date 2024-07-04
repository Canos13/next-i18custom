import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/signUp'];

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (!token) {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    // Aquí podrías agregar lógica adicional para verificar el token
    // como la expiración o la verificación con una función que tengas.

    return NextResponse.next();

} 
    
export const config = {
    // Rutas privadas
    matcher: [
        '/dashboard',
        '/profile'
    ],
};
