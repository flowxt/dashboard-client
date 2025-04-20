import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Liste simulée des utilisateurs (à remplacer par une base de données)
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "admin123", // Dans une application réelle, utilisez des mots de passe hachés!
    role: "admin",
  },
  {
    id: "2",
    name: "Client Test",
    email: "client@example.com",
    password: "client123",
    role: "client",
    projects: ["projectId1", "projectId2"], // IDs des projets associés
  },
];

// Configuration de l'authentification
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Rechercher l'utilisateur par email
        const user = users.find(
          (user) => user.email.toLowerCase() === credentials.email.toLowerCase()
        );

        // Vérifier le mot de passe
        if (user && user.password === credentials.password) {
          // Ne jamais retourner le mot de passe au client
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Ajouter des données supplémentaires au JWT token
      if (user) {
        token.role = user.role;
        token.projects = user.projects || [];
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Ajouter des données supplémentaires à la session
      if (token) {
        session.user.role = token.role;
        session.user.projects = token.projects;
        session.user.id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
