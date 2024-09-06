require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const flashcardRoutes = require("./routes/flashcardRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/flashcards", flashcardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
