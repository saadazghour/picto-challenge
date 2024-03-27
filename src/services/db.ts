const { Level } = require("level");

let db;

try {
  db = new Level("./level-db", {
    db: require("level-js"),
    valueEncoding: "json",
  });

  console.log("Database opened successfully");
} catch (error) {
  console.error("Failed to open database", error);
}

module.exports = db;
