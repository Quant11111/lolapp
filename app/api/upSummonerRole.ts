import { NextApiRequest, NextApiResponse } from "next";

// Mock database or data store
const summonersDB: { [key: string]: { id: string; role: string } } = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { summonerId, role } = req.body;

    if (!summonerId || !role) {
      return res.status(400).json({ error: "Missing summonerId or role" });
    }

    // Update or create summoner in the mock database
    summonersDB[summonerId] = { id: summonerId, role };

    // Return the updated summoner
    return res.status(200).json({ summoner: summonersDB[summonerId] });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
