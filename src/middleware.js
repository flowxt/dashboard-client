import { NextResponse } from "next/server";

/**
 * Middleware pour sécuriser les routes d'API et vérifier les autorisations
 *
 * À développer davantage avec système d'authentification
 */
export function middleware(request) {
  // Vérifier si la route concerne l'API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Ici, vous pourriez vérifier un token JWT, un cookie, etc.
    // Pour l'instant, nous n'appliquons pas de sécurité rigoureuse

    // En production, vous devriez implémenter une vraie vérification ici
    // par exemple avec Next-Auth ou une solution similaire

    // Exemple de vérification simple (à remplacer par une vraie sécurité):
    const apiKey = request.headers.get("x-api-key");
    if (
      process.env.NODE_ENV === "production" &&
      apiKey !== process.env.API_SECRET_KEY
    ) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Non autorisé" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

// Configurer les chemins pour lesquels ce middleware s'appliquera
export const config = {
  matcher: [
    // Appliquer aux routes d'API - à ajuster selon vos besoins
    "/api/:path*",
  ],
};
