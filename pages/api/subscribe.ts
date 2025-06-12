import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Email from "../../models/Email";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    const { email } = req.body;
    const newEmail = new Email({ email });
    await newEmail.save();
    return res.status(201).json({ message: "Subscription successful" });
  }

  const emails = await Email.find();
  res.status(200).json(emails);
};

export default handler;
