const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/placement_cell_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to the Database::MongoDB");
});

module.exports = db;
