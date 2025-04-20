import DashboardLayout from "../components/DashboardLayout";
import { PlusIcon, DotsHorizontalIcon } from "../components/icons";

export default function Events() {
  // Mock data
  const events = [
    {
      id: 1,
      title: "Maintenance planifiée",
      description: "Mise à jour du système et maintenance régulière.",
      date: "15 oct. 2024",
      time: "22:00 - 23:00",
      type: "maintenance",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Lancement nouveau produit",
      description:
        "Présentation du nouveau produit et publication sur le site.",
      date: "20 oct. 2024",
      time: "09:00 - 11:00",
      type: "marketing",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Promotion Black Friday",
      description: "Début de la promotion spéciale Black Friday sur le site.",
      date: "29 nov. 2024",
      time: "00:00 - 23:59",
      type: "marketing",
      status: "planned",
    },
    {
      id: 4,
      title: "Réunion bilan Q4",
      description: "Bilan du quatrième trimestre et planification 2025.",
      date: "15 déc. 2024",
      time: "14:00 - 16:00",
      type: "meeting",
      status: "planned",
    },
    {
      id: 5,
      title: "Mise à jour contenu blog",
      description: "Publication des nouveaux articles de blog.",
      date: "05 oct. 2024",
      time: "10:00 - 11:30",
      type: "content",
      status: "completed",
    },
  ];

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const month = event.date.split(" ")[1];
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});

  // Sort months
  const months = Object.keys(groupedEvents).sort((a, b) => {
    const monthOrder = {
      "jan.": 1,
      "fév.": 2,
      mars: 3,
      "avr.": 4,
      mai: 5,
      juin: 6,
      "juil.": 7,
      août: 8,
      "sept.": 9,
      "oct.": 10,
      "nov.": 11,
      "déc.": 12,
    };
    return monthOrder[a] - monthOrder[b];
  });

  return (
    <DashboardLayout title="Calendrier des événements">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="inline-flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700">
            <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
            <span>Tous</span>
          </button>
          <button className="inline-flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700">
            <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"></span>
            <span>Maintenance</span>
          </button>
          <button className="inline-flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            <span>Marketing</span>
          </button>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 dark:bg-blue-500 px-3 py-2 text-sm font-medium text-white dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600">
          <PlusIcon className="h-4 w-4" />
          <span>Nouvel événement</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-base font-medium">Événements à venir</h3>

          <button className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <span>Synchroniser avec Google Calendar</span>
          </button>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {months.map((month) => (
            <div key={month} className="mb-8 last:mb-0">
              <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                {month} 2024
              </h4>
              <div className="space-y-4">
                {groupedEvents[month].map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`
                            w-12 h-12 rounded-lg flex flex-col items-center justify-center
                            ${
                              event.type === "maintenance"
                                ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : ""
                            }
                            ${
                              event.type === "marketing"
                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : ""
                            }
                            ${
                              event.type === "meeting"
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                : ""
                            }
                            ${
                              event.type === "content"
                                ? "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400"
                                : ""
                            }
                          `}
                          >
                            <span className="text-xs font-medium">
                              {event.date.split(" ")[0]}
                            </span>
                            <span className="text-lg font-bold">
                              {event.date.split(" ")[1].replace(".", "")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-zinc-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {event.time}
                            </span>
                            <span
                              className={`
                              inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                              ${
                                event.status === "upcoming"
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                  : ""
                              }
                              ${
                                event.status === "planned"
                                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                  : ""
                              }
                              ${
                                event.status === "completed"
                                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                  : ""
                              }
                            `}
                            >
                              {event.status === "upcoming" ? "À venir" : ""}
                              {event.status === "planned" ? "Planifié" : ""}
                              {event.status === "completed" ? "Terminé" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="text-center py-6">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
            Connectez votre compte Google Calendar
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-4">
            Synchronisez vos événements avec Google Calendar pour une gestion
            plus efficace de votre planning.
          </p>
          <button className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            <span>Connecter avec Google</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
