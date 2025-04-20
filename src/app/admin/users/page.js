"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Utilisateurs simulés (à remplacer par des appels API)
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00.000Z",
    projects: [],
  },
  {
    id: "2",
    name: "Jean Dupont",
    email: "jean@example.com",
    role: "client",
    createdAt: "2023-02-15T00:00:00.000Z",
    projects: ["project1", "project2"],
  },
  {
    id: "3",
    name: "Marie Martin",
    email: "marie@example.com",
    role: "client",
    createdAt: "2023-03-20T00:00:00.000Z",
    projects: ["project3"],
  },
];

export default function UsersAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  // Vérifier si l'utilisateur est un admin
  if (status === "loading") {
    return (
      <DashboardLayout title="Chargement...">
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    // Redirection si pas admin
    router.push("/");
    return null;
  }

  const handleAddUser = () => {
    // Simuler l'ajout d'un utilisateur (à remplacer par un appel API)
    const id = Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();

    setUsers([
      ...users,
      {
        id,
        ...newUser,
        createdAt,
        projects: [],
      },
    ]);

    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "client",
    });

    setShowAddModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout title="Gestion des utilisateurs">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Utilisateurs
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Ajouter un utilisateur
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Projets
                  </th>
                  <th className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {user.role === "admin" ? "Administrateur" : "Client"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      {user.projects.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                          Éditer
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'ajout d'utilisateur */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowAddModal(false)}
            >
              <div className="absolute inset-0 bg-zinc-500 dark:bg-zinc-900 opacity-75"></div>
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white dark:bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white dark:bg-zinc-900 rounded-md text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 focus:outline-none"
                  onClick={() => setShowAddModal(false)}
                >
                  <span className="sr-only">Fermer</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-white">
                      Ajouter un utilisateur
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              password: e.target.value,
                            })
                          }
                          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          Rôle
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={newUser.role}
                          onChange={(e) =>
                            setNewUser({ ...newUser, role: e.target.value })
                          }
                          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        >
                          <option value="client">Client</option>
                          <option value="admin">Administrateur</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 dark:border-zinc-700 shadow-sm px-4 py-2 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
