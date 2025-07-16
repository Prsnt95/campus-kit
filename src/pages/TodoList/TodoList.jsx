import React from 'react';

import { Button, TextField } from '@mui/material';
import { DateCalendar, DatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import '../../styles/TodoList.css';
import Todo from './Todo';

const TodoList = () => {
  const [task, setTask] = React.useState('');
  const [deadline, setDeadline] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [filter, setFilter] = React.useState('current');

  // Retrieve todos from localStorage and parse deadlines
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('LISTS_OF_TODOS'));
    if (items) {
      const parsedTodos = items.map((todo) => {
        const parsedDeadline = todo.deadline ? dayjs(todo.deadline) : null;
        return {
          ...todo,
          deadline:
            parsedDeadline && parsedDeadline.isValid() ? parsedDeadline : null,
        };
      });
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage when the todos array changes
  React.useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('LISTS_OF_TODOS', JSON.stringify(todos));
    } else {
      localStorage.removeItem('LISTS_OF_TODOS'); // Clear localStorage if todos is empty
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
      setTask('');
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
    localStorage.setItem('LISTS_OF_TODOS', JSON.stringify(updatedTodos)); // Save immediately after deleting
  };

  const filteredTodos = todos.filter((todo) =>
    filter === 'current' ? !todo.completed : todo.completed
  );

  const displayMessage = () => {
    return filter === 'current'
      ? "You don't have any uncompleted todos."
      : "You don't have any completed todos.";
  };

  // Helper to get all todo dates as strings (YYYY-MM-DD)
  const todoDates = todos
    .map((todo) =>
      todo.deadline && todo.deadline.isValid()
        ? todo.deadline.format('YYYY-MM-DD')
        : null
    )
    .filter(Boolean);

  // Helper to get a map of date strings to task names for quick lookup
  const todoMap = todos.reduce((acc, todo) => {
    if (todo.deadline && todo.deadline.isValid()) {
      acc[todo.deadline.format('YYYY-MM-DD')] = todo.task;
    }
    return acc;
  }, {});

  return (
    <div className='Todo-wrapper'>
      <h1 className='todo-title'>TODO List</h1>
      <div className='inputContainer'>
        <TextField
          label='Add a New Task'
          className='custom-textfield'
          value={task}
          onChange={handleTaskChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={deadline}
            onChange={handleDeadlineChange}
            label='Select Date'
            className='custom-datepicker'
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button className='add-btn' onClick={handleClick}>
          Add
        </Button>
      </div>
      <div className='todoList--buttonWrapper'>
        <Button
          onClick={() => setFilter('current')}
          className={filter === 'current' ? 'active-filter' : ''}
        >
          Current
        </Button>
        <Button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active-filter' : ''}
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
              deadline={todo.deadline ? todo.deadline.format('YYYY-MM-DD') : ''}
              complete={todo.completed}
              check={() => toggleComplete(originalIndex)} // Pass the original index here
              onDelete={() => handleDelete(originalIndex)}
            />
          );
        })
      ) : (
        <p>{displayMessage()}</p>
      )}
      {/* Calendar below the todos */}
      <div
        className='todo-calendar-wrapper'
        style={{
          marginTop: 32,
          width: '50%', // Reduced width
          marginLeft: 'auto', // Center horizontally
          marginRight: 'auto',
          padding: '24px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #f8fafc 60%, #e3e9f3 100%)',
          boxShadow: '0 4px 24px 0 rgba(60, 72, 88, 0.12)',
          overflow: 'hidden',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              width: '100%',
              minWidth: 'unset',
              maxWidth: 'unset',
              minHeight: 'unset',
              height: 'auto',
              margin: 0,
              padding: 0,
              boxSizing: 'border-box',
              '& .MuiDateCalendar-root': {
                width: '100%',
                height: '100%',
                maxWidth: 'none',
                maxHeight: 'none',
              },
              '& .MuiPickersCalendarHeader-root': {
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '1.1rem',
              },
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#1a237e',
              },
              '& .MuiPickersArrowSwitcher-button': {
                width: '36px',
                height: '36px',
                fontSize: '1.1rem',
                color: '#1976d2',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                fontSize: '1rem',
                fontWeight: 'bold',
                width: '38px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2px',
                color: '#546e7a',
              },
              '& .MuiPickersDay-root': {
                fontSize: '1.1rem',
                fontWeight: '500',
                width: '38px',
                height: '38px',
                margin: '2px',
                borderRadius: '8px',
                transition: 'background 0.2s',
              },
              '& .MuiDayCalendar-weekContainer': {
                justifyContent: 'space-around',
                margin: '2px 0',
              },
              '& .MuiDayCalendar-header': {
                display: 'flex',
                justifyContent: 'space-around',
                paddingLeft: 0,
                paddingRight: 0,
              },
              '& .MuiDayCalendar-slideTransition': {
                minHeight: '260px',
              },
              '& .MuiDayCalendar-monthContainer': {
                width: '100%',
              },
            }}
            slotProps={{
              day: (ownerState) => {
                const dateString = dayjs(ownerState.day).format('YYYY-MM-DD');
                const hasTodo = Object.prototype.hasOwnProperty.call(
                  todoMap,
                  dateString
                );
                return {
                  sx: hasTodo
                    ? {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '8px',
                        position: 'relative',
                        boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                      }
                    : {},
                  children: (
                    <>
                      {ownerState.day.date()}
                      {hasTodo && (
                        <div
                          style={{
                            fontSize: '0.65rem',
                            position: 'absolute',
                            left: 2,
                            right: 2,
                            bottom: 2,
                            color: '#1976d2',
                            background: '#fff',
                            borderRadius: 3,
                            padding: '0 2px',
                            zIndex: 2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.1',
                            fontWeight: 600,
                          }}
                        >
                          {todoMap[dateString]}
                        </div>
                      )}
                    </>
                  ),
                };
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default TodoList;
