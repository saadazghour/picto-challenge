import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../services/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { liked } = req.body;

  try {
    // Save the updated like status to the database
    await db.put(`likes-${id}`, liked);

    // Log and return the updated like status
    console.log(`Updated liked status for photo ${id} to ${liked}`);
    res.status(200).json({ id, liked });
  } catch (error) {
    console.error(`Error updating liked status for photo ${id}:`, error);
    res
      .status(500)
      .json({ error: "Error updating like status", details: error });
  }
}
