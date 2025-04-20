import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware qui vérifie l'authentification via withAuth
export default withAuth(
  // Fonction qui s'exécute seulement si l'utilisateur est authentifié
  function middleware(request) {
    // Vérifier si l'utilisateur est sur une page d'authentification
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

    // Si l'utilisateur est connecté et tente d'accéder à une page d'authentification
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Vérifier les autorisations d'accès basées sur les rôles
    const token = request.nextauth.token;

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      token?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Retourne vrai si l'utilisateur est autorisé à accéder à cette route
      authorized: ({ token }) => !!token,
    },
  }
);

// Configurer les chemins sur lesquels le middleware sera exécuté
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/error).*)",
    "/admin/:path*",
  ],
};
