import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './i18n';

export function middleware(request: NextRequest) {
    const publicPaths = ['/', '/signUp'];
    const allPublicPaths = locales.flatMap(locale => 
        publicPaths.map(path => `/${locale}${path}`)
    );
    const { pathname } = request.nextUrl;

    console.log(allPublicPaths)

    if (allPublicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (!token) {
        const url = new URL('/es', request.url);
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



/* 
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
    locales,
    defaultLocale: 'es'
}); */



/* import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rutas públicas
const publicRoutes = ['/signUp'];

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const path = url.pathname;
    const locale = path.split('/')[1]; // Obtener el idioma de la ruta
    const isLoginPath = path === `/${locale}` || path === `/${locale}/`; 

    // Si la ruta es pública, permítela
    if (publicRoutes.some((route) => path.includes(route)) || isLoginPath) {
        return NextResponse.next();
    }

    // Si no está autenticado y la ruta no es pública, redirige a la página de inicio de sesión
    const isAuthenticated = false; // Aquí debes verificar si el usuario está autenticado
    if (!isAuthenticated) {
        const loginUrl = new URL(`/${locale}`, request.url); // Usar el idioma de la ruta actual
        return NextResponse.redirect(loginUrl);
    }

    // Si está autenticado, permite la solicitud
    return NextResponse.next();
}

export const config = {
    matcher: ['/(id|en|es)/:path*'],
}; */


