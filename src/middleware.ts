// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login", // Redirige a la página de login si no está autenticado
  },
});

export const config = {
  matcher: ["/home/:path*", "/", "/login"], // Protege las rutas y verifica la autenticación
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");

  // Redirige la raíz "/" a "/login"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirige si el usuario autenticado intenta acceder a "/login"
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Verifica si el usuario está autenticado para rutas bajo "/home"
  if (request.nextUrl.pathname.startsWith("/home")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
