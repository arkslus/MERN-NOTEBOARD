// require express
const express = require("express");
// create an instance of express
const app = express();
// replace with your actual route file
const notesRoutes = require("./routes/notes_routes");
// import the rate limiter middleware file
const rateLimiters = require("./middleware/rate_limiter");
// require cors to enable cross-origin resource sharing (CORS) for your API
const cors = require("cors");

// set up the static folder for the frontend
const path = require("path");

// require and connect mongoose
const mongoose = require("mongoose");
// check if the database connection was successful and log a message if it was
// check if there is an error in creating the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected!");
});

// require dotenv
require("dotenv").config();
// connect to the MongoDB database using the environment variable
mongoose.connect(process.env.MONGO_URI);
// add the port from environment variable
const port = process.env.PORT || 5001;

// set up the static folder for the frontend
const rootDir = path.resolve();

// enable CORS for your API (replace with your actual CORS configuration) npm install cors
// cors comes before rateLimiters middleware
// replace with your actual CORS configuration
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" })); // replace with your actual CORS configuration
}

// parse incoming JSON request bodies as middleware
app.use(express.json());
// apply rate limiting middleware to the "/notes" route
app.use(rateLimiters);

// use the router middleware for notes routing requests
app.use("/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  // serve the static files from the frontend build folder (replace with your actual build folder path)
  app.use(express.static(path.join(rootDir, "../frontend/dist")));

  // handle any other requests by serving the index.html file from the frontend build folder
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(rootDir, "../frontend", "dist", "index.html")); // replace with your actual build folder path and index.html file name
  });
}

// start the server on port 3000 and log a message to the console when it's running
app.listen(port, () => {
  console.log("Server is running on port 5001");
});
