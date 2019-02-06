/**
 * The primary file
 */
// Importing modules
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const { getIndex, getKey, postNew } = require("./controllers/url");

// Get env Variables
require("dotenv").config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// Connecting with the database
mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);
  console.log("MongoDB connected correctly...");
});

// Creating the App.
const app = express();

// Set views
app.set("view engine", "pug");
app.set("views", "views");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routing
app.post("/new", postNew);

app.get("/:key", getKey);

app.get("/", getIndex);

// Start the server
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
