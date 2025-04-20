import DashboardLayout from "../components/DashboardLayout";
import { DotsHorizontalIcon } from "../components/icons";

export default function Analytics() {
  // Mock data
  const stats = {
    visiteurs: {
      total: 4857,
      evolution: "+12.5%",
      positive: true,
    },
    sessions: {
      total: 6213,
      evolution: "+8.3%",
      positive: true,
    },
    taux_rebond: {
      total: "28.4%",
      evolution: "-3.1%",
      positive: true,
    },
    duree_session: {
      total: "2m 48s",
      evolution: "+15.2%",
      positive: true,
    },
  };

  const sources = [
    { source: "Google", visites: 2341, pourcentage: 48.2 },
    { source: "Réseaux sociaux", visites: 1026, pourcentage: 21.1 },
    { source: "Direct", visites: 865, pourcentage: 17.8 },
    { source: "Référencement", visites: 493, pourcentage: 10.2 },
    { source: "Autres", visites: 132, pourcentage: 2.7 },
  ];

  const pages = [
    { url: "/accueil", vues: 3245, temps_moyen: "1m 45s" },
    { url: "/produits", vues: 2198, temps_moyen: "2m 32s" },
    { url: "/contact", vues: 1876, temps_moyen: "1m 12s" },
    { url: "/blog", vues: 1543, temps_moyen: "3m 08s" },
    { url: "/a-propos", vues: 987, temps_moyen: "1m 54s" },
  ];

  return (
    <DashboardLayout title="Analytics">
      {/* Période selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            7 jours
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-blue-50 dark:bg-blue-900/30 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-500 dark:ring-blue-700"
          >
            30 jours
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            12 mois
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Visiteurs uniques"
          value={stats.visiteurs.total}
          evolution={stats.visiteurs.evolution}
          positive={stats.visiteurs.positive}
        />

        <StatCard
          title="Sessions"
          value={stats.sessions.total}
          evolution={stats.sessions.evolution}
          positive={stats.sessions.positive}
        />

        <StatCard
          title="Taux de rebond"
          value={stats.taux_rebond.total}
          evolution={stats.taux_rebond.evolution}
          positive={stats.taux_rebond.positive}
        />

        <StatCard
          title="Durée moyenne de session"
          value={stats.duree_session.total}
          evolution={stats.duree_session.evolution}
          positive={stats.duree_session.positive}
        />
      </div>

      {/* Graph */}
      <div className="mb-8">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">
              Visiteurs sur les 30 derniers jours
            </h3>
            <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
              <DotsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Mock Graph */}
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md p-4 h-64 flex items-center justify-center">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Graphique des visiteurs (Données mock - intégration future avec
                plausible.io)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sources de trafic */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">Sources de trafic</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {sources.map((source) => (
                  <li key={source.source} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {source.source}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center space-x-4">
                        <span className="flex flex-col items-end">
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {source.visites}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {source.pourcentage}%
                          </span>
                        </span>
                        <div className="w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${source.pourcentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pages populaires */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">Pages les plus consultées</h3>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead>
                <tr>
                  <th className="px-4 py-3.5 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    URL
                  </th>
                  <th className="px-4 py-3.5 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Vues
                  </th>
                  <th className="px-4 py-3.5 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Temps moyen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {pages.map((page) => (
                  <tr
                    key={page.url}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                      {page.url}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-zinc-600 dark:text-zinc-300">
                      {page.vues}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-right text-zinc-600 dark:text-zinc-300">
                      {page.temps_moyen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, evolution, positive }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            positive
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}
        >
          {evolution}
        </span>
      </div>
      <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
