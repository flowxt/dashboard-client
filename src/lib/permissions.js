/**
 * Système de permissions pour contrôler l'accès aux fonctionnalités
 * selon le rôle de l'utilisateur
 */

// Ensemble de permissions possibles
export const PERMISSIONS = {
  // Administration
  MANAGE_USERS: "manage_users",

  // Projets
  VIEW_ALL_PROJECTS: "view_all_projects",
  VIEW_OWN_PROJECTS: "view_own_projects",

  // Déploiements
  VIEW_DEPLOYMENTS: "view_deployments",
  TRIGGER_DEPLOYMENT: "trigger_deployment",

  // Statistiques
  VIEW_ANALYTICS: "view_analytics",

  // Domaines
  MANAGE_DOMAINS: "manage_domains",
  VIEW_DOMAINS: "view_domains",
};

// Configuration des rôles avec leurs permissions associées
const ROLES = {
  admin: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ALL_PROJECTS,
    PERMISSIONS.VIEW_OWN_PROJECTS,
    PERMISSIONS.VIEW_DEPLOYMENTS,
    PERMISSIONS.TRIGGER_DEPLOYMENT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_DOMAINS,
    PERMISSIONS.VIEW_DOMAINS,
  ],
  client: [
    PERMISSIONS.VIEW_OWN_PROJECTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_DOMAINS,
  ],
  viewer: [PERMISSIONS.VIEW_OWN_PROJECTS],
};

/**
 * Vérifie si un utilisateur a une permission spécifique
 * @param {Object} user - L'utilisateur à vérifier
 * @param {string} permission - La permission à contrôler
 * @returns {boolean} - Vrai si l'utilisateur a la permission
 */
export function hasPermission(user, permission) {
  if (!user || !user.role) return false;

  const role = user.role;
  const permissions = ROLES[role] || [];

  return permissions.includes(permission);
}

/**
 * Vérifie si un projet est associé à un utilisateur
 * @param {Object} user - L'utilisateur
 * @param {string} projectId - L'ID du projet à vérifier
 * @returns {boolean} - Vrai si l'utilisateur a accès au projet
 */
export function canAccessProject(user, projectId) {
  if (!user) return false;

  // Les admins ont accès à tous les projets
  if (user.role === "admin") return true;

  // Pour les autres rôles, vérifier si le projet est dans leur liste
  return user.projects?.includes(projectId) || false;
}

/**
 * Fonction pour filtrer les projets selon les droits d'un utilisateur
 * @param {Object} user - L'utilisateur
 * @param {Array} projects - La liste complète des projets
 * @returns {Array} - Les projets filtrés auxquels l'utilisateur a accès
 */
export function filterUserProjects(user, projects) {
  if (!user || !projects) return [];

  // Les admins voient tous les projets
  if (hasPermission(user, PERMISSIONS.VIEW_ALL_PROJECTS)) {
    return projects;
  }

  // Les autres rôles ne voient que leurs projets
  if (hasPermission(user, PERMISSIONS.VIEW_OWN_PROJECTS)) {
    return projects.filter((project) => user.projects?.includes(project.id));
  }

  return [];
}
