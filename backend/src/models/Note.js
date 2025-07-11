// require mongoose
const mongoose = require("mongoose");
// use the schema to define the structure of the note document
const Schema = mongoose.Schema;

// define the note schema with title, content, and dateCreated fields
const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

// export the Note model using the note schema
module.exports = mongoose.model("Note", noteSchema);
