import { React, useState } from "react";

export default function EditPopup({ card, handleChange }) {
  const [cardTitle, setCardTitle] = useState(card.name);
  const [cardDes, setCardDes] = useState(card.description);

  const handleDesChange = (e) => {
    setCardDes(e.target.value);
  };
  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleSubmit = () => {
    handleChange(cardTitle, cardDes);
  };

  return (
    <div>
      <input
        placeholder="Card Title"
        value={cardTitle}
        onChange={handleTitleChange}
      ></input>
      <input
        placeholder="Card Description"
        value={cardDes}
        onChange={handleDesChange}
      ></input>
      <div>
        <button onClick={handleSubmit}>Submit Edit</button>
      </div>
    </div>
  );
}
