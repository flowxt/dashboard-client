import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

/**
 * Vérifie si l'ID MongoDB est valide
 */
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Route GET pour récupérer un utilisateur spécifique
 * Les administrateurs peuvent voir tous les utilisateurs
 * Les utilisateurs peuvent uniquement voir leur propre profil
 */
export async function GET(request, { params }) {
  try {
    const { userId } = params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, error: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Vérifier l'authentification et les autorisations
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier si l'utilisateur est admin ou s'il demande son propre profil
    if (session.user.role !== "admin" && session.user.id !== userId) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Établir la connexion à la base de données
    await connectToDatabase();

    // Récupérer l'utilisateur
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * Route PUT pour mettre à jour un utilisateur spécifique
 * Les administrateurs peuvent mettre à jour tous les utilisateurs
 * Les utilisateurs peuvent uniquement mettre à jour leur propre profil
 */
export async function PUT(request, { params }) {
  try {
    const { userId } = params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, error: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Vérifier l'authentification et les autorisations
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier si l'utilisateur est admin ou s'il met à jour son propre profil
    if (session.user.role !== "admin" && session.user.id !== userId) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer les données du corps de la requête
    const data = await request.json();

    // Établir la connexion à la base de données
    await connectToDatabase();

    // Récupérer l'utilisateur existant
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Pour les non-admins, limiter les champs qui peuvent être mis à jour
    if (session.user.role !== "admin") {
      // Les utilisateurs normaux peuvent uniquement mettre à jour leur nom et leur mot de passe
      if (data.name) user.name = data.name;
      if (data.password) user.password = data.password;
    } else {
      // Les admins peuvent mettre à jour tous les champs
      if (data.name) user.name = data.name;
      if (data.email) user.email = data.email;
      if (data.password) user.password = data.password;
      if (data.role) user.role = data.role;
      if (data.projects) user.projects = data.projects;
      if (data.active !== undefined) user.active = data.active;
    }

    // Enregistrer les modifications
    await user.save();

    // Exclure le mot de passe de la réponse
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * Route DELETE pour supprimer un utilisateur spécifique
 * Uniquement accessible par les administrateurs
 */
export async function DELETE(request, { params }) {
  try {
    const { userId } = params;

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, error: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

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

    // Supprimer l'utilisateur
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
