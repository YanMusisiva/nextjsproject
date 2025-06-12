import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI as string;

let client: MongoClient;
let db: any;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db("newsletter");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Adresse email invalide." });
    }

    try {
      const collection = db.collection("subscribers");
      const existingSubscriber = await collection.findOne({ email });

      if (existingSubscriber) {
        return res.status(409).json({ message: "Email déjà abonné." });
      }

      await collection.insertOne({ email, subscribedAt: new Date() });

      return res.status(201).json({ message: "Inscription réussie !" });
    } catch (error) {
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
  } else {
    return res.status(405).json({ message: "Méthode non autorisée." });
  }
}
