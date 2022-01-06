import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./App.css";

const LOCAL_STORAGE_KEY = "react-todo-list";
function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    );
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="todo-app">
      <Typography 
        style={{padding: 16}}
        variant='h1'>
        Task Manager
      </Typography>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
