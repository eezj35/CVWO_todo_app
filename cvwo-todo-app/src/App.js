import Header from './components/Header'
import Tasks from './components/Task'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Groceries',
        day: 'Feb 15',
        reminder: false
    },
    {
        id: 2,
        text: 'Shoe shopping',
        day: 'Feb 15',
        reminder: false
    }
])
  return (
    <div className="todo-app">
      <Header/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
