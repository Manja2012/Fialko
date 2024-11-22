import mongoose from "mongoose";
import { env } from "./config.js";

let isConnected = false; 

export const dbConnect = async () => {
  if (!isConnected) {
    try {
      const db = await mongoose.connect(env.mongoURI, { dbName: "Fialko" });
      isConnected = true;
      console.log("Connexion à Mongoose réussie !");
      return db;
    } catch (error) {
      console.error("Erreur de connexion à Mongoose :", error);
      throw error;
    }
  } else {
    console.log("Connexion déjà établie !");
  }
};
