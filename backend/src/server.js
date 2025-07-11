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
const port = process.env.PORT || 3000;

// enable CORS for your API (replace with your actual CORS configuration) npm install cors
// cors comes before rateLimiters middleware
app.use(cors({ origin: "http://localhost:5173" })); // replace with your actual CORS configuration
// parse incoming JSON request bodies as middleware
app.use(express.json());
// apply rate limiting middleware to the "/notes" route
app.use(rateLimiters);

// use the router middleware for notes routing requests
app.use("/notes", notesRoutes);

// start the server on port 3000 and log a message to the console when it's running
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
