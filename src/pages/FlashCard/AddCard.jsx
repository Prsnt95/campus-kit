import { React } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
function AddCard({ handleCardClick }) {
  return (
    <div className="addcard--wrapper">
      <div className="addPrompt" onClick={handleCardClick}>
        <AddBoxIcon className="addIcon"></AddBoxIcon>
        <h5> Add</h5>
      </div>
    </div>
  );
}

export default AddCard;
