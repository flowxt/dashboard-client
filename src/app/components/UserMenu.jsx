"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Gère la fermeture du menu quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Affiche un placeholder pendant le chargement
  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher un bouton de connexion
  if (status !== "authenticated" || !session) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Se connecter
      </Link>
    );
  }

  // Déterminer l'avatar (initiales ou image)
  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="flex items-center">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Utilisateur"}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {initials}
            </div>
          )}
          <span className="ml-2 text-sm font-medium hidden md:block">
            {session.user.name || session.user.email}
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {session.user.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {session.user.email}
              </p>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                  {session.user.role === "admin" ? "Administrateur" : "Client"}
                </span>
              </div>
            </div>

            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setIsOpen(false)}
            >
              Profil
            </Link>

            {session.user.role === "admin" && (
              <Link
                href="/admin/users"
                className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                Gestion des utilisateurs
              </Link>
            )}

            <button
              onClick={() => signOut()}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 