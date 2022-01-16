import { Typography } from '@material-ui/core';
import TodoList from './components/TodoList';
import "./App.css";

function App() {

  return (
    <div className="todo-app">
      <Typography 
        style={{
          padding: 80
        }}
        variant='h2'

        >
        Task Manager
      </Typography>
      
      <TodoList/>
    </div>
  );
}

export default App;
