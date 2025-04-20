import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Route GET pour récupérer tous les utilisateurs
 * Uniquement accessible par les administrateurs
 */
export async function GET(request) {
  try {
    // Vérifier l'authentification et les autorisations
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Établir la connexion à la base de données
    await connectToDatabase();

    // Récupérer tous les utilisateurs
    const users = await User.find().select("-password");

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * Route POST pour créer un nouvel utilisateur
 * Uniquement accessible par les administrateurs
 */
export async function POST(request) {
  try {
    // Vérifier l'authentification et les autorisations
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer les données du corps de la requête
    const data = await request.json();

    // Valider les données requises
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Établir la connexion à la base de données
    await connectToDatabase();

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Créer un nouvel utilisateur
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "client",
      projects: data.projects || [],
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    // Exclure le mot de passe de la réponse
    const { password, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { success: true, user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
