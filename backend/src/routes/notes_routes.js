// require express
const express = require("express");
// create a new router instance
const router = express.Router();

// import the note controller
const {
  getAllNotes,
  getSingleNote,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/note_controller");

// get all notes route
router.get("/", getAllNotes);

// get a single note route
router.get("/:id", getSingleNote);

// create a new note route
router.post("/", createNewNote);

// update a note route
router.put("/:id", updateNote);

// delete a note route
router.delete("/:id", deleteNote);

// export the router
module.exports = router;
