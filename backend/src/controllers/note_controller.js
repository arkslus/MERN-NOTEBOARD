// require the note model
const Note = require("../models/Note");

// get all route as a function controller
const getAllNotes = async (_, res) => {
  try {
    // get all notes from the database and sort in descending order by creation date
    const notes = await Note.find().sort({ createdAt: -1 });
    // if there are no notes, return an empty array
    if (notes.length === 0) return res.status(200).json([]);
    // otherwise, send the sorted notes back to the client as a response
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get a single note route as a function controller
const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params; // get the note ID from the request parameters
    // find the note by ID
    const note = await Note.findById(id);
    // if there is no note with the given ID
    if (!note) return res.status(404).json({ message: "Note not found" });
    // otherwise, send the note back to the client as a response
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// create a new note route as a function controller
const createNewNote = async (req, res) => {
  try {
    // extract the title and content from the request body
    const { title, content } = req.body;
    // create a new note instance with the extracted title and content
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save(); // save the new note to the database
    // otherwise, send the saved note back to the client as a response
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
};

// update a note route as a function controller
const updateNote = async (req, res) => {
  try {
    const { id } = req.params; // get the note ID from the request parameters
    const { title, content } = req.body; // extract the title and content from the request body
    // find the note by ID and update its title and content
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    // if there is no note with the given ID
    if (!savedNote) return res.status(404).json({ message: "Note not found" });
    // otherwise, send the updated note back to the client as a response
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(404).json({ message: "Note not found" });
  }
};

// delete a note route as a function controller
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params; // get the note ID from the request parameters
    // find the note by ID and delete it
    const deletedNote = await Note.findByIdAndDelete(id);
    // if there is no note with the given ID
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    // otherwise, send a success message back to the client
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// export the function controller
module.exports = {
  getAllNotes,
  getSingleNote,
  createNewNote,
  updateNote,
  deleteNote,
};
