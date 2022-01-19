import React, {Component} from 'react'
import axios from 'axios';
import {Card, Form, Icon} from "semantic-ui-react";
import {TextField, Checkbox, Button} from '@material-ui/core';

let endpoint = "http://localhost:9000";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task:'',
      items:[],
    }
  }

  componentDidMount() {
    this.getTask();
  }

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  };

  onSubmit = () => { // create task api called
    let {task} = this.state;

    axios.post(endpoint + "/api/tasks",
      {task, },
      {headers:{
          'Content-Type':'application/x-www-form-urlencoded',  
        },
      }).then((res) => {
        this.getTask();
        this.setState({
          task:'',
          
        });
        console.log(res);
      });  
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then((res) => { // read documentation for axios
      if (res.data) {
        this.setState({
          items: res.data.map((item)=>{
            
            let color = 'white';
            let style = {
              wordWrap: 'break-word',
              
            };

            if (item.iscompleted) {
              color='green';
              style['textDecorationLine'] = 'line-through';
            }

            return (
              <Card key={item._id}
                    className='todo-task'
                    style = {{width: 600, }}  
                    >
                
                <Card.Content>
                  <Card.Meta className='todo-content'>
                    <Icon
                      color='green'
                      className = 'check-button'
                      name='check circle outline'
                      onClick={() => {
                          if (item.iscompleted) {
                            this.undoTask(item._id)
                          } else {
                            this.updateTask(item._id)
                          }
                        }
                      }
                    />  
                    <Card.Header className='task-text'>
                      <div style={style}>{item.task}</div>
                    </Card.Header>
                  </Card.Meta>
                  
                  

                  <Card.Meta textAlign='right'>
                    <Icon
                      className='edit-button'
                      name='edit'
                      color='yellow'
                      onClick={() => {}}
                    />
                    <Icon
                      className='delete-button'
                      name='delete'
                      color='red'
                      onClick={() => this.deleteTask(item._id)}
                    />
                  </Card.Meta>
                </Card.Content>
                  
              </Card>
            );
          }),
        });
      } else {
        this.setState({
          items:[],
        });
      }
    });
  };

  updateTask = (id) => {
    axios.put(endpoint + "/api/tasks/" + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  }

  undoTask = (id) => {
    axios.put(endpoint + '/api/undoTask/' + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  deleteTask = (id) => {
    axios.delete(endpoint + '/api/deleteTask/' + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  render() {
    return(
      <div>

        <div>
          <form className='todo-form' 
                onSubmit={this.onSubmit}
                >
            <div>
            <TextField
                className='input'
                style = {{width: 400, color: 'yellow'}}  
                label="Input task here"
                InputLabelProps={{
                    className: 'text-label'
                }}
                InputProps={{
                  className: 'text-input'
                }}
            
                type='text' 
                placeholder='Add a todo' 
                value={this.state.task}
                name='task'
                onChange={this.onChange}
                
            />

            <Button 
                
                style={{backgroundColor: 'yellow'}}
                type='add-todo'>Add todo</Button>
            </div>
            
            
          </form>
          
        </div>

        <div className='todo-list' style={{padding: '10px'}}>
            {this.state.items}
        </div>

      </div>
    )
  }
}

export default TodoList
