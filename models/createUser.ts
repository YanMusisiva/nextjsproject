import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./User";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/newsletter";

// Données de l'utilisateur à créer
const name = "Admin";
const email = "rockfordjohn317@gmail.com";
const password = "john097966";

async function createUser() {
  await mongoose.connect(MONGODB_URI);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Cet utilisateur existe déjà.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log("Utilisateur créé :", user);
  process.exit(0);
}

createUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
