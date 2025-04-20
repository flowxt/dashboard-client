"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages = {
    Configuration: "Un problème de configuration du serveur est survenu.",
    AccessDenied:
      "Accès refusé. Vous n&apos;avez pas les permissions nécessaires.",
    Verification: "Le lien de vérification a expiré ou a déjà été utilisé.",
    Default: "Une erreur d&apos;authentification s&apos;est produite.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
              <svg
                className="h-10 w-10 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-white">
            Erreur d&apos;authentification
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {errorMessage}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
