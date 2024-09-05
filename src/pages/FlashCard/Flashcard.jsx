import { useState, useEffect } from "react";
import Fcard from "./FCard";
import "../../styles/Flashcard.css";
import AddCard from "./AddCard";

const Flashcard = () => {
  const [cards, setCards] = useState([]);
  const [nextId, setNextId] = useState(1); // Initialize the next ID as 1

  const handleCardAdd = () => {
    const newCard = {
      id: nextId,
      name: "Title",
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
          ? { ...card, name: newName, description: newDescription }
          : card
      )
    );
  };
  useEffect(() => {
    const storedCards = localStorage.getItem("LISTS_OF_Cards");
    console.log("Stored cards:", storedCards);
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);
      if (parsedCards.length > 0) {
        // Only set cards if there are stored cards
        setCards(parsedCards);
        setNextId(Math.max(...parsedCards.map((card) => card.id)) + 1);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Saving cards:", cards);
    localStorage.setItem("LISTS_OF_Cards", JSON.stringify(cards));
  }, [cards]);

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
            section={card.name}
          />
        ))}
        <AddCard handleCardClick={handleCardAdd} />
      </div>
    </div>
  );
};

export default Flashcard;
