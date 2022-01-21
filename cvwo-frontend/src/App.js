import { Typography } from '@material-ui/core';
import TodoList from './components/TodoList';
import "./App.css";

function App() {

  return (
    <div className="todo-app">
      <Typography 
        style={{
          padding: 50
        }}
        variant='h3'
        >
        TooDoo
      </Typography>
      
      <TodoList/>
    </div>
  );
}

export default App;
