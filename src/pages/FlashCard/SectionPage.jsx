import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import axios from "axios";

const SectionPage = () => {
  const { section, id } = useParams();
  const [flashcards, setFlashCards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, [section]);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/flashcards/${section}`
      );
      setFlashCards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFlashcard = {
      front: formData.get("front"),
      back: formData.get("back"),
      section: section,
    };

    try {
      await axios.post("http://localhost:5001/api/flashcards", newFlashcard);
      fetchFlashcards();
      e.target.reset();
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <div className="sectionPage--wrapper">
      <div className="sectionPage--header">
        <Link to={`/Flashcard`}>
          <ReplyRoundedIcon></ReplyRoundedIcon>
        </Link>
        Flashcards
        <h1>{section}</h1>
        <p>Card ID: {id}</p>
      </div>
      <div className="sectionPage--flashcardWrapper">
        <div className="sectionPage--flashcard"></div>
      </div>
      <form onSubmit={handleSubmit} className="sectionPage--addCards">
        <TextField name="front" placeholder="Front" required={true} />
        <TextField name="back" placeholder="Back" required={true} />
        <button type="submit">Add Card</button>
      </form>
      {flashcards.map((flashcard, index) => (
        <div key={flashcard._id || index}>
          <Card>
            <strong>Front: </strong> {flashcard.front}" "<strong>Back: </strong>{" "}
            {flashcard.back}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SectionPage;
