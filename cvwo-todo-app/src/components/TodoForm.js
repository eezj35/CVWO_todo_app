import React, {useState} from 'react'
import { Button, TextField } from '@material-ui/core';

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
        <form className='todo-form' onSubmit={handleSubmit}>
            <TextField
                label="Input task here"
                InputLabelProps={{
                    className: 'text-label'
                }}
                InputProps={{
                    className: 'text-input'
                }}
                type='text' 
                placeholder='Add a todo' 
                value={todo.task}
                name='task'
                color='white'
                onChange={handleChange}
                
            />
            <Button 
                style={{backgroundColor: 'aqua'}}
                type='add-todo'>Add todo</Button>
        </form>
    )
}

export default TodoForm
