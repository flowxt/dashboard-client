/**
 * Service pour interagir avec l'API Vercel
 */
export class VercelService {
  constructor() {
    this.apiToken = process.env.VERCEL_API_TOKEN;
    this.teamId = process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;
    this.baseUrl = "https://api.vercel.com";
  }

  /**
   * Construit les en-têtes pour les requêtes à l'API Vercel
   */
  getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Construit les paramètres d'URL pour les requêtes
   */
  getUrlParams() {
    const params = new URLSearchParams();
    if (this.teamId) {
      params.append("teamId", this.teamId);
    }
    return params.toString();
  }

  /**
   * Récupère tous les projets Vercel
   */
  async getProjects() {
    try {
      const params = this.getUrlParams();
      const url = `${this.baseUrl}/v9/projects${params ? `?${params}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur API Vercel: ${response.statusText}`);
      }

      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des projets Vercel:",
        error
      );
      throw error;
    }
  }

  /**
   * Récupère les détails d'un projet spécifique
   */
  async getProjectDetails(projectId) {
    try {
      const params = this.getUrlParams();
      const url = `${this.baseUrl}/v9/projects/${projectId}${
        params ? `?${params}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur API Vercel: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des détails du projet ${projectId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Récupère les déploiements d'un projet
   */
  async getDeployments(projectId, limit = 5) {
    try {
      const params = new URLSearchParams(this.getUrlParams());
      params.append("limit", limit.toString());

      const url = `${this.baseUrl}/v6/deployments${
        projectId ? `?projectId=${projectId}&${params}` : `?${params}`
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur API Vercel: ${response.statusText}`);
      }

      const data = await response.json();
      return data.deployments;
    } catch (error) {
      console.error("Erreur lors de la récupération des déploiements:", error);
      throw error;
    }
  }

  /**
   * Récupère les domaines liés à un projet
   */
  async getProjectDomains(projectId) {
    try {
      const params = this.getUrlParams();
      const url = `${this.baseUrl}/v9/projects/${projectId}/domains${
        params ? `?${params}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur API Vercel: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des domaines du projet ${projectId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Récupère les statistiques de base d'un projet
   * Disponible dans le plan gratuit
   */
  async getProjectStats(projectId) {
    try {
      // D'abord, récupérons les déploiements (disponible en gratuit)
      const deployments = await this.getDeployments(projectId, 10);

      // Récupérons aussi les informations du projet
      const projectDetails = await this.getProjectDetails(projectId);

      // Récupérer les domaines associés
      const domainsData = await this.getProjectDomains(projectId);

      // Calculer des statistiques de base à partir des données disponibles
      const stats = {
        // Informations générales
        name: projectDetails.name,
        framework: projectDetails.framework || "Non spécifié",

        // Statistiques des déploiements
        totalDeployments: deployments.length,
        recentDeployments: deployments.slice(0, 5).map((d) => ({
          id: d.uid,
          status: d.state,
          createdAt: d.createdAt,
          url: d.url,
          branch: d.meta?.githubCommitRef || "unknown",
        })),

        // Statut de santé basique
        isHealthy: projectDetails.status === "READY",

        // Domaines
        domains:
          domainsData.domains?.map((d) => ({
            name: d.name,
            verified: d.verified,
            type: d.type,
          })) || [],

        // Date de création/mise à jour
        createdAt: projectDetails.createdAt,
        updatedAt: projectDetails.updatedAt,
      };

      return stats;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des statistiques du projet ${projectId}:`,
        error
      );
      throw error;
    }
  }
}
