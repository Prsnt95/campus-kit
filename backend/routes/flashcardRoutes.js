const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");

router.post("/", async (req, res) => {
  try {
    const flashcard = new Flashcard(req.body);
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:section", async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ section: req.params.section });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
