"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardLayout from "../../components/DashboardLayout";
import { hasPermission, PERMISSIONS } from "@/lib/permissions";

export default function ProjectPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier les permissions de l'utilisateur
  const canViewDeployments = session?.user
    ? hasPermission(session.user, PERMISSIONS.VIEW_DEPLOYMENTS)
    : false;
  const canViewAnalytics = session?.user
    ? hasPermission(session.user, PERMISSIONS.VIEW_ANALYTICS)
    : false;
  const canViewDomains = session?.user
    ? hasPermission(session.user, PERMISSIONS.VIEW_DOMAINS)
    : false;

  useEffect(() => {
    async function fetchProjectStats() {
      try {
        setLoading(true);
        const response = await fetch(`/api/vercel/projects/${params.id}/stats`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.error || "Erreur lors de la récupération des statistiques"
          );
        }

        setStats(data.stats);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProjectStats();
    }
  }, [params.id]);

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Fonction pour générer un lien externe vers le site
  function renderSiteLink(domain) {
    if (!domain) return null;

    // Déterminer le protocole
    const protocol = domain.includes("localhost") ? "http://" : "https://";
    const fullUrl = domain.startsWith("http") ? domain : `${protocol}${domain}`;

    return (
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40"
      >
        <svg
          className="w-4 h-4 mr-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Visiter le site
      </a>
    );
  }

  return (
    <DashboardLayout title={stats?.name || "Détails du projet"}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="ml-2">Chargement des statistiques...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Informations générales */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Informations générales
              </h2>
              {stats.domains &&
                stats.domains.length > 0 &&
                renderSiteLink(stats.domains[0].name)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Nom du projet
                </p>
                <p className="font-medium">{stats.name}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Framework
                </p>
                <p className="font-medium">{stats.framework}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Statut
                </p>
                <p className="font-medium">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      stats.isHealthy
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {stats.isHealthy ? "En ligne" : "Problème détecté"}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Créé le
                </p>
                <p className="font-medium">{formatDate(stats.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Section Analytics (uniquement pour les rôles avec accès) */}
          {canViewAnalytics && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                Statistiques d'utilisation
              </h2>
              {/* Placeholder pour statistiques */}
              <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-800 rounded-md">
                <div className="text-zinc-400 dark:text-zinc-500 text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-sm">
                    Les statistiques détaillées seront disponibles avec Vercel
                    Pro
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Déploiements récents (uniquement pour les rôles avec accès) */}
          {canViewDeployments && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="font-medium">
                  Déploiements récents ({stats.totalDeployments} total)
                </h2>
              </div>
              <div className="p-0">
                {stats.recentDeployments?.length > 0 ? (
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                    <thead>
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">
                          Branche
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {stats.recentDeployments.map((deployment) => (
                        <tr key={deployment.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-white">
                            {formatDate(deployment.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300 hidden sm:table-cell">
                            {deployment.branch}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                deployment.status === "READY"
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              }`}
                            >
                              {deployment.status === "READY"
                                ? "Réussi"
                                : deployment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                    Aucun déploiement récent.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Domaines (uniquement pour les rôles avec accès) */}
          {canViewDomains && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="font-medium">Domaines</h2>
              </div>
              <div className="p-0">
                {stats.domains?.length > 0 ? (
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                    <thead>
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Nom de domaine
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Type
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {stats.domains.map((domain, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-white">
                            <a
                              href={`https://${domain.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {domain.name}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                            {domain.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                domain.verified
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              }`}
                            >
                              {domain.verified ? "Vérifié" : "Non vérifié"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                    Aucun domaine configuré.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
