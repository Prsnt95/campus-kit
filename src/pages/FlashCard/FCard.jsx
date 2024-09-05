import { React, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Edit,
  Grade,
  StarOutline,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditPopup from "./EditPopup";

const Fcard = ({ card, onDelete, onEdit, section }) => {
  const [isFav, setIsFav] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const favoriteToggle = () => {
    setIsFav(!isFav);
  };

  const handleDelete = () => {
    onDelete(card.id); // Pass the card id to the onDelete function
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleChange = (newName, newDescription) => {
    onEdit(card.id, newName, newDescription);
    setShowEdit(!showEdit);
  };

  return (
    <div className="fcard--wrapper">
      <div className="fcard--title">
        <h3 className="fcard--name">{card.name}</h3>
        <div className="fcard--actions">
          <IconButton aria-label="edit card" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete card" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {showEdit ? (
        <EditPopup card={card} handleChange={handleChange} />
      ) : (
        <div>
          <div className="fcard--description">
            <p>{card.description}</p>
          </div>

          <Link to={`/flashcard/${section}/${card.id}`}>
            <Button variant="contained" className="fcard--custom-button">
              <p>
                Learn
                <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
              </p>
            </Button>
          </Link>
        </div>
      )}

      <div onClick={favoriteToggle} className="fav-btn">
        {isFav ? (
          <Grade style={{ color: "gold" }}></Grade>
        ) : (
          <StarOutline style={{ color: "black" }}></StarOutline>
        )}
      </div>
    </div>
  );
};

export default Fcard;
