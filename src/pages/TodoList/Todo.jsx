import React from "react";
import { Checkbox, Card, ListItemButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Todo({ task, deadline, complete, check, onDelete }) {
  const overdue = new Date(deadline) < new Date();
  let background_color = overdue ? "pink" : "white";
  return (
    <div>
      <Card
        className="todoCard"
        style={{ marginTop: 10, background: background_color }}
      >
        <ListItemButton>
          <Checkbox
            className="todo--checkbox"
            checked={complete}
            onChange={check}
          />

          <ListItemText primary={task} secondary={deadline} />
          <IconButton className="testbtn" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      </Card>
    </div>
  );
}
