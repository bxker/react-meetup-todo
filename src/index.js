import React from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

import "./styles.css";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      todos: [
        {
          id: 1,
          text: "Todo 1"
        },
        {
          id: 2,
          text: "Todo 2"
        },
        {
          id: 3,
          text: "Todo 3"
        }
      ]
    };
  }

  showAddForm = () => {
    this.setState({
      ...this.state,
      showAddForm: true
    })
  }

  addTodoItem = (event) => {
    event.preventDefault();
    let todos = this.state.todos;
    let formData = new FormData(event.target);
    let text = formData.get("text");
    let nextId = 1;
    
    if(this.state.todos.length !== 0){
      nextId = this.state.todos[this.state.todos.length -1].id + 1;
    }
    todos.push({
      id: nextId,
      text: text
    });
    this.setState({
      todos: todos,
      showAddForm: false
    });
  }

  deleteTodoItem = (id) => {
    let todos = this.state.todos;
    todos = todos.filter(item => item.id !== id);
    this.setState({
      ...this.state,
      todos: todos
    });
  }


  render() {
    return (
      <div>
        <Button onClick={this.showAddForm}>Add</Button>
          {this.state.showAddForm === true ?
          <div class="row">
          <Form className="login-form" onSubmit={this.addTodoItem}>
            <Form.Group controlId="formBasic">
              <Form.Label>Text</Form.Label>
              <Form.Control type="text" placeholder="Enter your description" name="text"></Form.Control>
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
          </div> : <div></div>

        }
        
        
        <div>
          {this.state.todos.map(todo => (
            <div key={todo.id}>
              {todo.text}
              <Button onClick={() => this.deleteTodoItem(todo.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoList />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
