import { NextApiRequest, NextApiResponse } from "next";
import { useAuth } from "@/context/AuthContext";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = useAuth()
  if (req.method === "POST") {
    const { post_id, likes_count } = req.body;

    console.log(`Post ${post_id} has been liked. Total likes: ${likes_count}`);

    res.status(200).json({ message: "Like update received" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
