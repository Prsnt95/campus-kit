import { React, useState } from "react";
import Fcard from "./FCard";
import "./Flashcard.css";
import AddCard from "./AddCard";

const Flashcard = () => {
  const [cards, setCards] = useState([]);
  const [nextId, setNextId] = useState(1); // Initialize the next ID as 1

  const handleCardAdd = () => {
    const newCard = {
      id: nextId,
      name: "Name",
      description: "Add Description",
    };
    setCards([...cards, newCard]);
    setNextId(nextId + 1);
  };

  const handleCardDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleCardEdit = (id, newName, newDescription) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, name: "newName", description: "newDescription" }
          : card
      )
    );
  };

  return (
    <div className="flashCard--wrapper">
      <div className="flashcard--title">
        <p> Flashcards</p>
      </div>
      <div className="cardCollection">
        {cards.map((card) => (
          <Fcard
            key={card.id}
            card={card}
            onDelete={handleCardDelete}
            onEdit={handleCardEdit}
          />
        ))}
        <AddCard handleCardClick={handleCardAdd} />
      </div>
    </div>
  );
};

export default Flashcard;
