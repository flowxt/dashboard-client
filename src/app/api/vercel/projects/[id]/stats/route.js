import { VercelService } from "@/lib/vercel";
import { NextResponse } from "next/server";

/**
 * Route API pour récupérer les statistiques d'un projet Vercel
 */
export async function GET(request, { params }) {
  try {
    // Utilisation correcte des paramètres dans Next.js 15
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de projet requis" },
        { status: 400 }
      );
    }

    const vercelService = new VercelService();
    const stats = await vercelService.getProjectStats(id);

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error(`Erreur API stats du projet Vercel ${params?.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "Impossible de récupérer les statistiques du projet",
      },
      { status: 500 }
    );
  }
}
