# Dashboard Client pour Sites Vercel

Un tableau de bord moderne permettant à vos clients de visualiser et gérer leurs sites web hébergés sur Vercel.

## Fonctionnalités

- **Intégration Vercel** : Visualisation des projets, déploiements et domaines
- **Interface moderne** : Design responsive avec thème clair/sombre
- **Analytics** : Affichage des statistiques de trafic (préparé pour Plausible.io)
- **Calendrier** : Gestion des événements avec intégration Google Calendar
- **Multilingue** : Support pour plusieurs langues

## Configuration

### Prérequis

- Node.js 18+ et npm/yarn
- Un compte Vercel avec des projets existants
- (Optionnel) Un compte Plausible.io pour les analytics

### Étape 1 : Création du token Vercel

1. Connectez-vous à votre [Dashboard Vercel](https://vercel.com/dashboard)
2. Accédez à **Settings > Tokens**
3. Cliquez sur **Create** pour générer un nouveau token
4. Donnez-lui un nom comme "Dashboard Client"
5. Sélectionnez les permissions **Read** (ou plus si nécessaire)
6. Copiez le token généré

### Étape 2 : Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
# Vercel API
VERCEL_API_TOKEN=votre_token_ici
NEXT_PUBLIC_VERCEL_TEAM_ID=votre_team_id_si_applicable

# API Routes Auth
API_SECRET_KEY=une_cle_secrete_aleatoire
```

### Étape 3 : Installation des dépendances

```bash
npm install
# ou
yarn install
```

### Étape 4 : Lancement en développement

```bash
npm run dev
# ou
yarn dev
```

Votre tableau de bord sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Déploiement

### Sur Vercel

La façon la plus simple de déployer le tableau de bord :

1. Importez votre projet dans Vercel
2. Configurez les variables d'environnement
3. Déployez

```bash
vercel
```

### Sur un autre hébergeur

Construisez le projet pour la production :

```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## Prochaines étapes

- [ ] Authentification des utilisateurs
- [ ] Intégration avec Plausible.io pour les analytics
- [ ] Intégration plus poussée avec Google Calendar
- [ ] Support pour d'autres plateformes d'hébergement

## Licence

Ce projet est sous licence MIT.
