import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Email from "../../models/Email";
import nodemailer from "nodemailer";

const SITE_URL = "https://ton-site.com"; // Remplace par ton vrai domaine
const DEFAULT_TITLE = "Bienvenue sur notre newsletter !";
const DEFAULT_MESSAGE =
  "Merci de vous être abonné à notre newsletter. Nous sommes ravis de vous compter parmi nous !";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function getWelcomeHtml(email: string) {
  const unsubscribeLink = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(
    email
  )}`;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;">
      <h1 style="color:#2563eb;">${DEFAULT_TITLE}</h1>
      <p>${DEFAULT_MESSAGE}</p>
      <a href="${SITE_URL}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;">Visiter notre site</a>
      <br/>
      <a href="${unsubscribeLink}" style="display:inline-block;padding:8px 16px;background:#e53e3e;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;font-size:14px;">Se désabonner</a>
      <p style="font-size:12px;color:#888;margin-top:40px;">
        Si vous ne souhaitez plus recevoir nos emails, cliquez sur le bouton "Se désabonner" ci-dessus.
      </p>
    </div>
  `;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email } = req.body;

      // Vérifie si l'email existe déjà
      const exists = await Email.findOne({ email });
      if (exists) {
        return res.status(409).json({ message: "Cet email est déjà abonné." });
      }

      const newEmail = new Email({ email });
      try {
        await newEmail.save();
      } catch (err: any) {
        // Gestion du cas où deux requêtes arrivent en même temps
        if (err.code === 11000) {
          return res
            .status(409)
            .json({ message: "Cet email est déjà abonné." });
        }
        throw err;
      }

      // Envoi automatique du mail de bienvenue (HTML)
      await transporter.sendMail({
        from: '"Newsletter AS ELEKTRIKA & TEK" <noreply@example.com>',
        to: email,
        subject: DEFAULT_TITLE,
        html: getWelcomeHtml(email),
      });

      return res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  // GET: retourne la liste des emails abonnés
  const emails = await Email.find();
  res.status(200).json(emails);
};

export default handler;
