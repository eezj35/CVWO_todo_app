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
    <ListItem style={{ display: "flex" }}>
      <Checkbox 
        className='checkbox'
        checked={todo.completed}
        onClick={handleCheckboxClick}/>

      <Typography 
        variant='body1'
        style={{
          textDecoration: todo.completed ? "line-through" : null
      }}
      >
        {todo.task}
      </Typography>

      <IconButton 
        
        onClick={handleRemoveClick}>
        <CloseIcon className='icon-button'/>
      </IconButton>

    </ListItem>
  )
    
}

export default Todo
