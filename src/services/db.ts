const { Level } = require("level");

interface User {
  password: string;
  blocked: boolean;
}

const users: Record<string, User> = {
  muser1: { password: "mpassword1", blocked: false },
  muser2: { password: "mpassword2", blocked: false },
  muser3: { password: "mpassword3", blocked: true },
};

// Initialize the database instance to null
// let dbInstance: Level<string, User> | null = null;
export let dbInstance: any = null;

async function initializeDB() {
  if (!dbInstance) {
    try {
      // Define the database path
      const dbPath = "./level-db";

      // Initialize the database with JSON encoding for values
      dbInstance = new Level(dbPath, { valueEncoding: "json" });
      console.log("Initializing database...");

      // When we call Object.entries(users), it converts the users object into an array where each element is itself an array of two elements.

      for (const [username, userInfo] of Object.entries(users)) {
        // So, for the first iteration, the call would effectively be:
        // await db.put("muser1", { password: "mpassword1", blocked: false });

        await dbInstance?.put(username, userInfo);
        console.log(`Inserted user: ${username}`, userInfo);
      }

      console.log("Database initialized successfully.");
    } catch (error) {
      console.error("Failed to initialize database:", error);
      if (error) {
        dbInstance = new Level("./level-db", { valueEncoding: "json" });
        console.log("Reopening database...");
        await dbInstance.open();
      }
    }
  }

  return dbInstance;
}

export const dbPromise = initializeDB();

// After initializing the database and inserting the users...
export async function checkUser(username: string) {
  const db = await dbPromise;

  try {
    const user = await db?.get(username);
    console.log(`User ${username} exists with data:`, user);
  } catch (error) {
    console.error(`User ${username} not found:`, error);
  }
}
