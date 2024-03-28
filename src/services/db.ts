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

// Initialize the database with JSON encoding for values
const db = new Level(dbPath, { valueEncoding: "json" });

async function initializeDB() {
  try {
    console.log("Initializing database...");
    // When we call Object.entries(users), it converts the users object into an array where each element is itself an array of two elements.

    for (const [username, userInfo] of Object.entries(users)) {
      // So, for the first iteration, the call would effectively be:
      // await db.put("muser1", { password: "mpassword1", blocked: false });

      await db.put(username, userInfo);
      console.log(`Inserted user: ${username}`, userInfo);
    }

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1); // Exit if cannot initialize DB properly
  }
}

// Main function to execute DB operations
async function main() {
  await initializeDB();
}

// After initializing the database and inserting the users...
async function checkUser(username: string) {
  try {
    const user = await db.get(username);
    console.log(`User ${username} exists with data:`, user);
  } catch (error) {
    console.error(`User ${username} not found:`, error);
  }
}

// Use this function to check Users exists after initializing the DB.
main().then(() => {
  checkUser("muser1");
  checkUser("muser2");
  checkUser("muser3");
});

export default db;
