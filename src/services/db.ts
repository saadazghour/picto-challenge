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

// Define the database path
const dbPath = "./level-db";

// Initialize the database instance to null
export const dbInstance = new Level(dbPath, { valueEncoding: "json" });

async function initializeDB() {
  try {
    console.log("Initializing database...");

    // When we call Object.entries(users), it converts the users object into an array where each element is itself an array of two elements.

    // Using 'batch' to insert multiple users at once
    const ops = Object.entries(users).map(([username, userInfo]) => ({
      type: "put",
      key: username,
      value: userInfo,
    }));

    await dbInstance.batch(ops);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

// Call to initialize the database
initializeDB();

export async function openDB() {
  if (dbInstance.status === "closed") {
    await dbInstance.open();
  }
}

export async function closeDB() {
  if (dbInstance.status === "open") {
    await dbInstance.close();
  }
}

// After initializing the database and inserting the users...
export async function checkUser(username: string) {
  try {
    const user = await dbInstance.get(username);
    console.log(`User ${username} exists with data:`, user);
  } catch (error) {
    console.error(`User ${username} not found:`, error);
  }
}
