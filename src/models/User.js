import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Schéma Mongoose pour les utilisateurs
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez fournir un nom"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Veuillez fournir un email"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Veuillez fournir un email valide"],
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir un mot de passe"],
    minlength: 6,
    select: false, // Ne pas inclure par défaut dans les requêtes
  },
  role: {
    type: String,
    enum: ["admin", "client", "viewer"],
    default: "client",
  },
  projects: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

/**
 * Middleware pour hacher le mot de passe avant l'enregistrement
 */
UserSchema.pre("save", async function (next) {
  // Vérifier si le mot de passe a été modifié
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Générer un sel
    const salt = await bcrypt.genSalt(10);
    // Hacher le mot de passe
    this.password = await bcrypt.hash(this.password, salt);
    // Mettre à jour la date de mise à jour
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Méthode pour comparer les mots de passe
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
