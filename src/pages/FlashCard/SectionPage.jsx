import { Link, useParams } from "react-router-dom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { TextField, Card } from "@mui/material";
import { useEffect, useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";
const SectionPage = () => {
  const { section, id } = useParams();

  const [flashcards, setFlashCards] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFlashcard = {
      front: formData.get("front"),
      back: formData.get("back"),
    };
    setFlashCards((prev) => [...prev, newFlashcard]);
    e.target.reset(); // Clear form after submission
  };

  useEffect(() => {
    const savedFlashcards = localStorage.getItem(`FlashCards_${id}`);
    if (savedFlashcards) {
      const parsedFlashcards = JSON.parse(savedFlashcards);
      if (parsedFlashcards.length > 0) {
        setFlashCards(parsedFlashcards);
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`FlashCards_${id}`, JSON.stringify(flashcards));
  }, [flashcards, id]);

  return (
    <div className="sectionPage--wrapper">
      <div className="sectionPage--header">
        <Link to={`/Flashcard`}>
          <ReplyRoundedIcon />
        </Link>
        Flashcards
        <h1>{section}</h1>
        <p>Card ID: {id}</p>
      </div>
      <div className="sectionPage--flashcardWrapper">
        <div className="sectionPage--flashcard">
          <LoopIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="sectionPage--addCards">
        <TextField name="front" placeholder="Front" required />
        <TextField name="back" placeholder="Back" required />
        <button type="submit">Add Card</button>
      </form>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
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
