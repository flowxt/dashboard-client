import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Veuillez définir la variable d'environnement MONGODB_URI");
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Variable globale pour maintenir la connexion à la base de données
 * entre les rechargements d'API en mode développement
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Établir une connexion à la base de données MongoDB
 * @returns La connexion mongoose
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
