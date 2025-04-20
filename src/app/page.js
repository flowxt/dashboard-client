"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import { PlusIcon, DotsHorizontalIcon } from "./components/icons";
import { useVercel } from "../hooks/useVercel";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { projects, loading, error } = useVercel();
  const [sites, setSites] = useState([]);

  // Convertir les projets Vercel en format pour l'UI
  useEffect(() => {
    if (projects?.length > 0) {
      const formattedSites = projects.map((project) => ({
        id: project.id,
        name: project.name,
        url:
          project.alias?.length > 0
            ? project.alias[0]
            : `${project.name}.vercel.app`,
        status: project.status === "READY" ? "En ligne" : "En attente",
        lastDeploy: formatDate(project.updatedAt),
      }));
      setSites(formattedSites);
    }
  }, [projects]);

  // Mock data pour les autres sections (à remplacer par de vraies données ultérieurement)
  const clientData = {
    name: "Florian",
    website: "www.atypikcode.fr",
    lastUpdate: "20 avril 2025",
    stats: {
      visiteurs: 1245,
      pages: 4238,
      tempsSession: "2m 18s",
      tauxRebond: "28%",
    },
    events: [
      {
        id: 1,
        title: "Maintenance planifiée",
        date: "15 oct. 2024",
        time: "22:00 - 23:00",
      },
      {
        id: 2,
        title: "Lancement nouveau produit",
        date: "20 oct. 2024",
        time: "09:00 - 11:00",
      },
    ],
  };

  // Fonction pour formater la date
  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    // Moins d'une journée
    if (diff < 24 * 60 * 60 * 1000) {
      return "Aujourd'hui";
    }
    // Moins d'une semaine
    else if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
    }
    // Moins d'un mois
    else if (diff < 30 * 24 * 60 * 60 * 1000) {
      const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
      return `Il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
    }
    // Format standard
    else {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  // Fonction pour naviguer vers la page de détails du projet
  const navigateToProjectDetails = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <DashboardLayout title="Tableau de bord">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Bienvenue, {clientData.name} 👋
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Vos sites sont en ligne et fonctionnent parfaitement.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Aperçu rapide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Visiteurs uniques"
            value={clientData.stats.visiteurs}
            icon={<UserIcon />}
            color="blue"
          />

          <StatCard
            title="Pages vues"
            value={clientData.stats.pages}
            icon={<PageIcon />}
            color="emerald"
          />

          <StatCard
            title="Temps moyen de session"
            value={clientData.stats.tempsSession}
            icon={<ClockIcon />}
            color="amber"
          />

          <StatCard
            title="Taux de rebond"
            value={clientData.stats.tauxRebond}
            icon={<ArrowIcon />}
            color="rose"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sites Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-medium">Vos sites</h2>
              <button className="inline-flex items-center gap-1 rounded-md bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">
                <PlusIcon className="h-4 w-4" />
                <span>Ajouter</span>
              </button>
            </div>
            <div className="p-0">
              {loading ? (
                <div className="py-10 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Chargement des sites...
                  </p>
                </div>
              ) : error ? (
                <div className="py-10 text-center">
                  <p className="text-red-500">
                    Une erreur est survenue: {error}
                  </p>
                </div>
              ) : sites.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Aucun site trouvé
                  </p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden sm:table-cell"
                      >
                        URL
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell"
                      >
                        Dernier déploiement
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {sites.map((site) => (
                      <tr
                        key={site.id}
                        onClick={() => navigateToProjectDetails(site.id)}
                        className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-white">
                          {site.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300 hidden sm:table-cell">
                          {site.url}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                            {site.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300 hidden md:table-cell">
                          {site.lastDeploy}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Actions spécifiques pour ce bouton
                            }}
                          >
                            <DotsHorizontalIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-medium">Événements à venir</h2>
            </div>
            <div className="p-4">
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {clientData.events.map((event) => (
                  <div key={event.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 text-center">
                        <div className="rounded-md bg-red-50 dark:bg-red-900/30 px-2 py-1">
                          <div className="text-xs font-medium text-red-700 dark:text-red-400">
                            {event.date.split(" ")[0]}
                          </div>
                          <div className="text-xl font-semibold text-red-700 dark:text-red-400">
                            {event.date.split(" ")[1].replace(".", "")}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="w-full flex justify-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  Voir le calendrier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    amber:
      "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    rose: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
  };

  return (
    <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 rounded-md p-3 ${colorClasses[color]}`}
          >
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-zinc-900 dark:text-white">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function UserIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function PageIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 17l-4 4m0 0l-4-4m4 4V7"
      />
    </svg>
  );
}
