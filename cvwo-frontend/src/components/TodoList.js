import React, {Component} from 'react'
import axios from 'axios';
import {Card, Header, Form, Input, Icon} from "semantic-ui-react";
import { Button, TextField, Checkbox } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

let endpoint = "http://localhost:9000";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task:'',
      isChecked:false,
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
            let color = 'yellow';
            let style = {
              wordWrap: 'break-word',
            };

            if (item.iscompleted) {
              color='green';
              style['textDecorationLine'] = 'line-through';
            }

            return (
              <Card key={item._id}
                    color={color} 
                    width='100px' 
                    className='todo-task'
                    fluid
                    >
                <Card.Content>
                  <Card.Header textAlign='left'>
                    <div style={style}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign='right'>
            
                    <Checkbox
                      color='black'
                      onClick={() => {
                          if (item.iscompleted) {
                            this.undoTask(item._id)
                          } else {
                            this.updateTask(item._id)
                          }
                        }
                      }/>  
                    
                    <Icon
                      name='delete'
                      color='red'
                      onClick={() => this.deleteTask(item._id)}
                    />
                    <span style={{paddingRight: 10}}>Delete</span>
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
          <Form className='todo-form' onSubmit={this.onSubmit}>
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
                value={this.state.task}
                name='task'
                onChange={this.onChange}
                
            />
            <Button 
                style={{backgroundColor: 'aqua'}}
                type='add-todo'>Add todo
            </Button>
          </Form>
        </div>

        <div className='row'>
          <Card.Group>
            {this.state.items}
          </Card.Group>
        </div>

      </div>
    )
  }
}

export default TodoList
