"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  filterUserProjects,
  hasPermission,
  PERMISSIONS,
} from "@/lib/permissions";

/**
 * Hook personnalisé pour interagir avec l'API Vercel
 */
export function useVercel() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Récupère tous les projets Vercel en tenant compte des permissions
   */
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vercel/projects");

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || "Erreur lors de la récupération des projets"
        );
      }

      // Filtrer les projets selon les droits de l'utilisateur
      const filteredProjects = session?.user
        ? filterUserProjects(session.user, data.projects)
        : [];

      setProjects(filteredProjects);
    } catch (err) {
      console.error("Erreur lors de la récupération des projets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  /**
   * Récupère les détails d'un projet spécifique
   */
  const fetchProjectDetails = useCallback(
    async (projectId) => {
      if (!projectId) return;

      // Vérification des permissions
      if (
        session?.user &&
        !hasPermission(session.user, PERMISSIONS.VIEW_OWN_PROJECTS)
      ) {
        setError(
          "Vous n&apos;avez pas l&apos;autorisation de voir les détails de ce projet"
        );
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/vercel/projects/${projectId}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.error || "Erreur lors de la récupération des détails du projet"
          );
        }

        setSelectedProject(data.project);
      } catch (err) {
        console.error(
          `Erreur lors de la récupération des détails du projet ${projectId}:`,
          err
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [session]
  );

  // Charge les projets au montage du composant
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    selectedProject,
    loading,
    error,
    fetchProjects,
    fetchProjectDetails,
    // Utilitaires de permissions
    canViewDeployments: session?.user
      ? hasPermission(session.user, PERMISSIONS.VIEW_DEPLOYMENTS)
      : false,
    canViewAnalytics: session?.user
      ? hasPermission(session.user, PERMISSIONS.VIEW_ANALYTICS)
      : false,
    canViewDomains: session?.user
      ? hasPermission(session.user, PERMISSIONS.VIEW_DOMAINS)
      : false,
  };
}
