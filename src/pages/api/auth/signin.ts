import type { NextApiRequest, NextApiResponse } from "next";
import { dbPromise } from "../../../services/db";

interface User {
  password: string;
  blocked: boolean;
}

interface SignInResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, password } = req.body;

  try {
    const db = await dbPromise;
    const user: User = await db.get(username);

    if (!user) {
      console.log(`User not found with username: ${username}`);
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid login information" });
    }

    // Check if user is blocked
    if (user.blocked) {
      console.log(`User ${username} is blocked.`);
      return res
        .status(403)
        .json({ message: "This account has been blocked." });
    }

    // If user is not blocked and password matches
    console.log(`User ${username} authenticated successfully.`);
    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error(`Error retrieving user ${username} from DB:`, error);
    return res.status(500).json({
      message: "An error occurred during the authentication process.",
    });
  }
}
