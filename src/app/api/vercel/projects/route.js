import { VercelService } from "@/lib/vercel";
import { NextResponse } from "next/server";

/**
 * Route API pour récupérer tous les projets Vercel
 */
export async function GET(request) {
  try {
    // Vérification d'authentification si nécessaire
    // (À implémenter pour la production)

    const vercelService = new VercelService();
    const projects = await vercelService.getProjects();

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Erreur API projets Vercel:", error);
    return NextResponse.json(
      { success: false, error: "Impossible de récupérer les projets" },
      { status: 500 }
    );
  }
}
