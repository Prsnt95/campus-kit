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
  const [filter, setFilter] = React.useState("current");

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
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed; // Toggle the completed status
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "current" ? !todo.completed : todo.completed
  );

  const displayMessage = () => {
    if (filter === "current") {
      return "You don't have any uncompleted todos.";
    } else {
      return "You don't have any completed todos.";
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
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
      <div className="todoList--buttonWrapper">
        <Button
          onClick={() => setFilter("current")}
          className={filter === "current" ? "active-filter" : ""}
        >
          Current
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </Button>
      </div>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo, filteredIndex) => {
          const originalIndex = todos.findIndex(
            (t) => t.task === todo.task && t.deadline === todo.deadline
          );
          return (
            <Todo
              key={originalIndex} // Use the original index as the key
              task={todo.task}
              deadline={todo.deadline ? todo.deadline.format("YYYY-MM-DD") : ""}
              complete={todo.completed}
              check={() => toggleComplete(originalIndex)} // Pass the original index here
              deleted={todo.deleted}
              onDelete={() => handleDelete(originalIndex)}
            />
          );
        })
      ) : (
        <p>{displayMessage()}</p>
      )}
    </div>
  );
};
export default TodoList;
