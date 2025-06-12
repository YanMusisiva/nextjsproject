import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Email from "../../models/Email";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    const { email } = req.body;
    const newEmail = new Email({ email });
    await newEmail.save();

    // Envoi automatique du mail de bienvenue
    await transporter.sendMail({
      from: '"Newsletter AS ELEKTRIKA & TEK" <noreply@example.com>',
      to: email,
      subject: "Welcome!",
      text: "Thank you for subscribing!",
    });

    return res.status(201).json({ message: "Subscription successful" });
  }

  const emails = await Email.find();
  res.status(200).json(emails);
};

export default handler;
