import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Card } from "@mui/material";

const SectionPage = () => {
  const { section, id } = useParams();

  const [flashcards, setFlashCards] = useState([{ front: "", back: "" }]);

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
        <TextField name="front" placeholder="Front" required="true" />
        <TextField name="back" placeholder="Back" />
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
