import React, { useState } from 'react'
import { Checkbox, IconButton, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


function Todo({ todo, toggleComplete, removeTodo}) {

  const handleCheckboxClick = () => {
    toggleComplete(todo.id);
  }

  const handleRemoveClick = () => {
    removeTodo(todo.id);
  }

  return (
    <div className='todo-item' >
      <div className='checkbox-and-text'>
        <Checkbox 
          className='checkbox'
          checked={todo.completed}
          onClick={handleCheckboxClick}>

        
        </Checkbox>

        <Typography 
          variant='body1'
          style={{
            textDecoration: todo.completed ? "line-through" : null
          }}
        >
          <section className='todo-text'>
            {todo.task}
          </section>
        </Typography>

      </div>
      

    
      <IconButton 
        onClick={handleRemoveClick}
        align>
        <CloseIcon className='delete-button'/>
      </IconButton>

    </div>
  )
    
}

export default Todo
