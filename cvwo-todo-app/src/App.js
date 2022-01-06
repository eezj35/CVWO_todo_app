import Header from './components/Header'
import { useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    // if (!todo.text || /^\s*$/.test(todo.text)) { // code from stackoverflow
    //   return;
    // }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  return (
    <div className="todo-app">
      <Header className="App-header"/>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
