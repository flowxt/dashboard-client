import Link from "next/link";
import DashboardLayout from "../components/DashboardLayout";

export default function Settings() {
  // Mock data
  const clientData = {
    profileInfo: {
      name: "Entreprise ABC",
      email: "contact@entreprise-abc.com",
      phone: "+33 1 23 45 67 89",
      website: "entreprise-abc.com",
      logo: "/placeholder-logo.png",
    },
    siteInfo: {
      domain: "entreprise-abc.com",
      plan: "Premium",
      lastDeployment: "10 septembre 2024 à 14:32",
      status: "En ligne",
    },
  };

  // Mock integrations data
  const integrations = [
    {
      id: "google-analytics",
      name: "Google Analytics",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 20L4 12L12 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 20L12 12L20 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      connected: true,
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 10H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      connected: true,
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 6L12 13L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      connected: false,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 13.5C12 12.5 13 12 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      connected: false,
    },
  ];

  // Mock notifications settings
  const notificationSettings = [
    { id: "site-updates", label: "Mises à jour du site", enabled: true },
    {
      id: "performance-alerts",
      label: "Alertes de performance",
      enabled: true,
    },
    { id: "visitor-milestones", label: "Jalons de visiteurs", enabled: false },
    { id: "security-alerts", label: "Alertes de sécurité", enabled: true },
    { id: "weekly-reports", label: "Rapports hebdomadaires", enabled: true },
  ];

  return (
    <DashboardLayout title="Paramètres">
      <div className="space-y-6">
        {/* Profil */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">Profil</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Informations de votre compte et préférences
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Photo de profil"
                  />
                  <span
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Jean Dupont
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  jean@example.com
                </p>
              </div>
              <button className="ml-auto rounded-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                Modifier le profil
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Nom complet
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                    defaultValue="Jean Dupont"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                    defaultValue="jean@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Entreprise
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                    defaultValue="Entreprise ABC"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Langue
                </label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                >
                  <option>Français</option>
                  <option>Anglais</option>
                  <option>Espagnol</option>
                  <option>Allemand</option>
                  <option>Italien</option>
                  <option>Portugais</option>
                  <option>Français</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="rounded-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-200 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
              >
                Annuler
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md bg-blue-600 dark:bg-blue-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>

        {/* Préférences de notification */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">
              Préférences de notification
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Gérez comment et quand vous souhaitez être notifié
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="emailNotif"
                    name="emailNotif"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 dark:bg-zinc-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="emailNotif"
                    className="font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Notifications par email
                  </label>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Recevez des mises à jour par email sur les événements
                    importants
                  </p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="maintenanceNotif"
                    name="maintenanceNotif"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 dark:bg-zinc-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="maintenanceNotif"
                    className="font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Alertes de maintenance
                  </label>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Soyez informé des périodes de maintenance planifiées
                  </p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="analyticsNotif"
                    name="analyticsNotif"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 dark:bg-zinc-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="analyticsNotif"
                    className="font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Rapports d&apos;analytics
                  </label>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Recevez des rapports hebdomadaires sur les performances de
                    votre site
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-medium">Sécurité</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Gérez votre mot de passe et la sécurité du compte
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                Changer de mot de passe
              </h4>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Mot de passe actuel
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Nouveau mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-blue-600 dark:bg-blue-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Mettre à jour
                </button>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                Sessions actives
              </h4>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Appareils actuellement connectés à votre compte
              </p>
              <ul className="mt-3 divide-y divide-zinc-200 dark:divide-zinc-800">
                <li className="py-4 flex justify-between">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-zinc-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2h10a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        MacBook Pro
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Paris, France · Dernière activité il y a 2 minutes
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
                    Actif
                  </span>
                </li>
                <li className="py-4 flex justify-between">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-zinc-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        iPhone 13
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Lyon, France · Dernière activité hier
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-red-600 dark:text-red-400">
                    Déconnecter
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
