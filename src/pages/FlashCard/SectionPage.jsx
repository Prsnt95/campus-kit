import { Link, useParams } from "react-router-dom";
import { TextField, Card, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ReplyRounded,
  Loop,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";

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
      <div className="sectionPage--nav">
        <Link to={`/Flashcard`} className="backLink">
          <ReplyRounded className="backIcon" />
          <p>Back</p>
        </Link>
        <h1 className="sectionTitle">{section}</h1>
      </div>
      <div className="sectionPage--rest">
        <div className="sectionPage--flashcardWrapper">
          <div className="sectionPage--flashcard">
            <IconButton className="flipIcon">
              <Loop className="loopIcon" />
            </IconButton>
          </div>
          <div className="sectionPage--flashcardControl">
            <IconButton>
              <ArrowBack />
            </IconButton>
            <span>
              <IconButton className="thumbUpIcon">
                <ThumbUpOutlined />
              </IconButton>
              <IconButton className="thumbDownIcon">
                <ThumbDownOutlined />
              </IconButton>
            </span>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </div>
          <p>1 of 10</p>
        </div>
        <form onSubmit={handleSubmit} className="sectionPage--addCards">
          <TextField name="front" placeholder="Front" required />
          <TextField name="back" placeholder="Back" required />
          <button type="submit">Add Card</button>
        </form>
        {flashcards.map((flashcard, index) => (
          <div key={index}>
            <Card>
              <strong>Front: </strong> {flashcard.front}" "
              <strong>Back: </strong> {flashcard.back}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionPage;
