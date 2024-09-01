import React from "react";
import Todo from "./Todo";
import "./TodoList.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";

const TodoList = () => {
  const [task, setTask] = React.useState("");
  const [deadline, setDeadline] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [filter, setFilter] = React.useState("current");

  // Retrieve todos from localStorage and parse deadlines
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem("LISTS_OF_TODOS"));
    if (items) {
      const parsedTodos = items.map((todo) => {
        const parsedDeadline = todo.deadline ? dayjs(todo.deadline) : null;
        console.log(
          "Parsed deadline:",
          parsedDeadline,
          parsedDeadline ? parsedDeadline.isValid() : false
        );
        return {
          ...todo,
          deadline:
            parsedDeadline && parsedDeadline.isValid() ? parsedDeadline : null,
        };
      });
      console.log("Parsed todos:", parsedTodos);
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage when the todos array changes
  React.useEffect(() => {
    if (todos.length > 0) {
      console.log("Saving todos to localStorage:", todos);
      localStorage.setItem("LISTS_OF_TODOS", JSON.stringify(todos));
    } else {
      localStorage.removeItem("LISTS_OF_TODOS"); // Clear localStorage if todos is empty
    }
  }, [todos]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDeadlineChange = (newDeadline) => {
    setDeadline(newDeadline && newDeadline.isValid() ? newDeadline : null);
  };

  const handleClick = () => {
    if (task && deadline && deadline.isValid()) {
      setTodos([...todos, { task, deadline, completed: false }]);
      setTask("");
      setDeadline(null);
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("LISTS_OF_TODOS", JSON.stringify(updatedTodos)); // Save immediately after deleting
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "current" ? !todo.completed : todo.completed
  );

  const displayMessage = () => {
    return filter === "current"
      ? "You don't have any uncompleted todos."
      : "You don't have any completed todos.";
  };

  return (
    <div className="Todo-wrapper">
      <h1 className="todo-title">TODO List</h1>
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
