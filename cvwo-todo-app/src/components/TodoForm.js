import React, {useState} from 'react'

function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    const handleChange = e => {
        setTodo( {...todo, task: e.target.value});
    }

    // preventDefault() to prevent refreshing everytime add button is clicked
    const handleSubmit = e => {
        e.preventDefault();

        if (todo.task.trim()) {
            addTodo({ ...todo, id: Math.floor(Math.random() * 10000)});
            setTodo({ ...todo, task: "" });
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text' 
                placeholder='Add a todo' 
                value={todo.task}
                name='task'
                onChange={handleChange}
            />
            <button className='add-todo-button'>Add todo</button>
        </form>
    )
}

export default TodoForm
