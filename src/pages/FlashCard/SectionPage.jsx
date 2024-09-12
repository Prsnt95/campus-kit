import { Link, useParams } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { Edit, Delete } from "@mui/icons-material";
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
  const [formValues, setFormValues] = useState({ front: "", back: "" }); // Form values
  const [currentIndex, setCurrentIndex] = useState(0);
  const [side, setSide] = useState("front");
  const [showList, setShowList] = useState(true);

  const handleShowList = () => {
    setShowList(!showList);
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSide("front");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFlashcard = {
      id: uuidv4(),
      front: formData.get("front"),
      back: formData.get("back"),
    };

    setFlashCards((prev) => [...prev, newFlashcard]); // Add new flashcard

    setFormValues({ front: "", back: "" }); // Reset form values
    e.target.reset(); // Clear form after submission
  };

  const handleFlip = () => {
    setSide((prevSide) => (prevSide === "front" ? "back" : "front"));
  };

  const handleDelete = (id) => {
    const updatedFlashcards = flashcards.filter((flashcard) => {
      return flashcard.id !== id;
    });
    setFlashCards(updatedFlashcards);
    if (currentIndex >= updatedFlashcards.length) {
      setCurrentIndex(Math.max(0, flashcards.length - 2));
    }
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
          <div
            className={`sectionPage--flashcard ${
              side === "back" ? "is-flipped" : ""
            }`}
            onClick={handleFlip}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>
                  {flashcards.length > 0
                    ? flashcards[currentIndex].front
                    : "Add Cards To Begin"}
                </h3>
              </div>
              <div className="flashcard-back">
                <p>
                  {flashcards.length > 0
                    ? flashcards[currentIndex].back
                    : "Add content for front and back of the card."}
                </p>
              </div>
            </div>

            <IconButton className="flipIcon">
              <Loop className="loopIcon" />
            </IconButton>
          </div>
          <div className="sectionPage--flashcardControl">
            <IconButton onClick={handlePrev}>
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
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          </div>
          <p>
            {flashcards.length > 0
              ? `${currentIndex + 1} of ${flashcards.length}`
              : "No cards"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="sectionPage--addCards">
          <TextField
            name="front"
            placeholder="Front"
            value={formValues.front}
            onChange={(e) =>
              setFormValues({ ...formValues, front: e.target.value })
            }
            required
          />
          <TextField
            name="back"
            placeholder="Back"
            value={formValues.back}
            onChange={(e) =>
              setFormValues({ ...formValues, back: e.target.value })
            }
            required
          />
          <button type="submit">Add</button>
        </form>
        <button onClick={handleShowList}>
          {showList ? "Hide List" : "Show List"}
        </button>
        {showList ? (
          <table>
            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flashcards.map((flashcard) => (
                <tr key={flashcard.id}>
                  <td>{flashcard.front}</td>
                  <td>{flashcard.back}</td>
                  <td>
                    <Edit className="sectionPage--editIcon" />
                    <Delete
                      className="sectionPage--deleteIcon"
                      onClick={() => handleDelete(flashcard.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
