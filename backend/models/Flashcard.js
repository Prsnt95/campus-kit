const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  front: String,
  back: String,
  section: String,
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
