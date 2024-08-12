import React from "react";
import Todo from "./Todo";

import "./TodoList.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@mui/material";
// import dayjs from "dayjs";

const TodoList = () => {
  const [task, setTask] = React.useState("");
  const [deadline, setDeadline] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [completedTask, setCompletedTask] = React.useState(false);
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDeadlineChange = (newDeadline) => {
    if (newDeadline && !newDeadline.isValid()) {
      setDeadline(null);
    } else {
      setDeadline(newDeadline);
    }
  };
  const handleClick = (event) => {
    if (task && deadline && deadline.isValid()) {
      setTodos([...todos, { task, deadline }]);
      setDeadline(null);
      setTask("");
    }
  };
  const toggleComplete = (index) => {
    setCompletedTask((prevValue) => !prevValue);
  };

  return (
    <div className="Todo-wrapper">
      <h1 className="todo-title">TODO's</h1>
      <div className="inputContainer">
        <TextField
          label="Add a New Task"
          className="custom-textfield"
          value={task}
          onChange={handleTaskChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={deadline}
            onChange={handleDeadlineChange}
            label="Select Date"
            className="custom-datepicker"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button className="add-btn" onClick={handleClick}>
          Add
        </Button>
      </div>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <Todo
            key={index}
            task={todo.task}
            deadline={todo.deadline ? todo.deadline.format("YYYY-MM-DD") : ""}
            complete={completedTask}
            check={() => toggleComplete(index)}
          />
        ))
      ) : (
        <p>You don't have todos</p>
      )}
    </div>
  );
};
export default TodoList;
