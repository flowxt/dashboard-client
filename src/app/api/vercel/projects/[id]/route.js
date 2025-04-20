import { VercelService } from "@/lib/vercel";
import { NextResponse } from "next/server";

/**
 * Route API pour récupérer les détails d'un projet spécifique
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de projet requis" },
        { status: 400 }
      );
    }

    const vercelService = new VercelService();

    // Récupérer les informations en parallèle pour plus d'efficacité
    const [projectDetails, deployments, domains] = await Promise.all([
      vercelService.getProjectDetails(id),
      vercelService.getDeployments(id, 5),
      vercelService.getProjectDomains(id),
    ]);

    return NextResponse.json({
      success: true,
      project: {
        ...projectDetails,
        deployments,
        domains: domains.domains || [],
      },
    });
  } catch (error) {
    console.error(`Erreur API détails projet Vercel ${params.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "Impossible de récupérer les détails du projet",
      },
      { status: 500 }
    );
  }
}
