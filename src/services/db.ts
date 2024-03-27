const { Level } = require("level");

// Create a database
// const db = new Level<string, any>("./level-db", { valueEncoding: "json" });

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

// All asynchronous methods also support callbacks.

// Add an entry with key 'a' and value 1
// db.put("a", { x: 123 }, function (err: any) {
//   if (err) throw err;

//   db.get("a", function (err: any, value: any) {
//     console.log(value); // { x: 123 }
//   });
// });

// Delete the entry with key 'a'
// db.del("a", { x: 123 }, function (err: any) {
//   if (err) throw err;

//   db.get("a", function (err: any, value: any) {
//     console.log(value); // { x: 123 }
//   });
// });

// const value = await db.get<string, string>("a", { valueEncoding: "utf8" });

// console.log(value);

module.exports = db;
