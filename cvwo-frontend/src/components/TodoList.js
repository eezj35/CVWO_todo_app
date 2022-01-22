import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Card, Icon} from "semantic-ui-react";
import {TextField, Button} from '@material-ui/core';

let endpoint = "http://localhost:9000";

// colors
const orange = 'rgb(214, 170, 133)';
const green = 'rgb(143, 189, 159)';

function TodoList() {
  const [task, setTask] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTask();
  });

  const getTask = () => {
    axios.get(endpoint + "/api/task").then(res => { // read documentation for axios
      if (res.data) {
        const itemsSize = res.data.length;
        res.data.reverse();
        setItems(
          res.data.map((item, index) => {
            let style = {
              wordWrap: 'break-word',   
              backgroundColor: orange,
              width: 550
            };

            if (item.iscompleted) {
              style['textDecorationLine'] = 'line-through';
              style['color'] = 'black'
              style['backgroundColor'] = green
            }

            return (
              <Card key={item._id}
                    className='todo-task'
                    style={style}>
                
                <Card.Content> 
                  <Card.Header className='task-text' textAlign='left'>
                      <div>{(itemsSize - index) + '. ' + item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign='right'>
                  <Icon
                      color='blue'
                      className = 'check-button'
                      name='check circle outline'
                      onClick={() => {
                          if (item.iscompleted) {
                            uncompleteTask(item._id)
                          } else {
                            completeTask(item._id)
                          }
                        }
                      }
                    /> 
                    <Icon
                      className='delete-button'
                      name='delete'
                      color='red'
                      onClick={() => deleteTask(item._id)}
                    />
                  </Card.Meta>
                </Card.Content>                  
              </Card>
            );
          }),
        );  
      } else {
        setItems([]);
      }
    });
  };

  // helper functions
  const onChange = e => {
    setTask(e.target.value);
  };

  const onSubmit = () => { // create task api called

    axios.post(endpoint + "/api/tasks",
      {task, items},
      {headers:{
          'Content-Type':'application/x-www-form-urlencoded',  
        },
      }).then((res) => {
        getTask();
        setTask('');
        console.log(res);
      });  
  };

  const completeTask = id => {
    axios.put(endpoint + "/api/completeTask/" + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',        
      },
    }).then((res) => {
      console.log(res);
      getTask();
    });
  }

  const uncompleteTask = id => {
    axios.put(endpoint + '/api/uncompleteTask/' + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',        
      },
    }).then((res) => {
      console.log(res);
      getTask();
    });
  };

  const deleteTask = id => {
    axios.delete(endpoint + '/api/deleteTask/' + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',       
      },
    }).then((res) => {
      console.log(res);
      getTask();
    });
  };

  return(
    <div>
      <div>
        <form className='todo-form' 
              onSubmit={onSubmit}>
          <div>
          <TextField
              className='input-textfield'
              style = {{width: 400}}  
              label="Input task here"
              variant='outlined'
              InputLabelProps={{
                  className: 'text-label'
              }}
              InputProps={{
                className: 'text-input'
              }}
          
              type='text' 
              placeholder='Add a todo' 
              value={task}
              name='task'
              onChange={onChange}             
          />
          <Button 
              style={{backgroundColor: orange, padding: '15px'}}
              type='add-todo'>Add todo</Button>
          </div>           
        </form>
        
      </div>

      <div className='todo-list' style={{padding: '10px', marginBottom: '50px'}}>
          {items}
      </div>

    </div>
  )

}

export default TodoList