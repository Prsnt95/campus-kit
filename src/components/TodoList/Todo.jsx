import React from "react";
import "./Todo.css";
import { Checkbox, Card, ListItemButton, ListItemText } from "@mui/material";

export default function Todo({ task, deadline }) {
  const overdue = new Date(deadline) < new Date();
  let color = overdue ? "brown" : "antiquewhite";
  return (
    <div>
      <Card className="todoCard" style={{ marginTop: 10, background: color }}>
        <ListItemButton>
          <Checkbox className="todo--checkbox" />
          <ListItemText primary={task} secondary={deadline} />
        </ListItemButton>
      </Card>
    </div>
  );
}
