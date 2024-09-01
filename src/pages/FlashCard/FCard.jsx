import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Edit,
  Grade,
  StarOutline,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const Fcard = ({ card, onDelete, onEdit }) => {
  const [isFav, setIsFav] = React.useState(false);
  const favoriteToggle = () => {
    setIsFav(!isFav);
  };

  const handleDelete = () => {
    onDelete(card.id); // Pass the card id to the onDelete function
  };

  const handleEdit = () => {
    onEdit(card.id);
  };

  return (
    <div className="fcard--wrapper">
      <div className="fcard--title">
        <h3 className="fcard--name">{card.name}</h3>
        <div className="fcard--actions">
          <IconButton aria-label="edit card">
            <Edit onClick={handleEdit} />
          </IconButton>
          <IconButton aria-label="delete card" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="fcard--description">
        <p>{card.description}</p>
      </div>

      <Button variant="ringHover" className="fcard--custom-button">
        <p>
          Learn
          <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
        </p>
      </Button>

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
