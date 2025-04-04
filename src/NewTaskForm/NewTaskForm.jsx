import React from "react";
import { Component } from "react";

import "./NewTaskForm.css";

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
    };
  }

  onValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.description);
    this.setState({
      description: "",
    });
  };

  render() {
    const { description } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onValue}
            name="description"
            value={description}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
          />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
