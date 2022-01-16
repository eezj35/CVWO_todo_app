import React, {Component} from 'react'
import axios from 'axios';
import {Card, Header, Form, Input, Icon} from "semantic-ui-react";
import { Button, TextField } from '@material-ui/core';

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

    if (task) {
      axios.post(endpoint + "/api/task",
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
    }
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then((res) => { // read documentation for axios
      if (res.data) {
        this.SetState({
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
              <Card key={item._id} color={color} fluid className='todo-task'>
                <Card.Content>
                  <Card.Header textAlign='left'>
                    <div style={style}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign='right'>
                    <Icon
                      name='check-circle'
                      color='blue'
                      onClick={() => this.updateTask(item._id)}>  
                    </Icon>
                    <span style={{paddingRight: 10}}>Undo</span>
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
        this.SetState({
          items:[],
        });
      }
    });
  };

  updateTask = (id) => {
    axios.put(endpoint + "/api/task" + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  }


  undoTask = (id) => {
    axios.put(endpoint + '/api/undoTask' + id, {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  deleteTask = (id) => {
    axios.delete(endpoint + '/api/deleteTask' + id, {
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
                color='white'
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
