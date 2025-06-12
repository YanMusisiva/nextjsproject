import type { NextApiRequest, NextApiResponse } from "next";
const images = [
  "https://via.placeholder.com/300x200?text=Image+1",
  "https://via.placeholder.com/300x200?text=Image+2",
  "https://via.placeholder.com/300x200?text=Image+3",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json(images);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
};

export default handler;
