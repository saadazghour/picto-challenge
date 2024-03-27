import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../services/db";

// Extending the Error object for LevelDB's specific error properties
interface LevelError extends Error {
  type?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Handle GET request - retrieve like status
  if (req.method === "GET") {
    try {
      const liked = await db.get(`likes-${id}`);
      console.log(`Retrieved liked status for photo ${id}: ${liked}`);
      res.status(200).json({ id, liked });
    } catch (error) {
      const levelError = error as LevelError;

      if (levelError?.type === "NotFoundError") {
        console.log(
          `Like status not found for photo ${id}, returning default.`
        );
        res.status(200).json({ id, liked: false });
      } else {
        console.error(`Error retrieving liked status for photo ${id}:`, error);
        res
          .status(500)
          .json({ error: "Error retrieving like status", details: error });
      }
    }
  }

  // Handle POST request - update like status
  else if (req.method === "POST") {
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
}
