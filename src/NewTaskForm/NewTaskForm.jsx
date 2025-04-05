import React, { Component } from "react";
import "./NewTaskForm.css";

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      minutes: "",
      seconds: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description, minutes, seconds } = this.state;
    if (!description.trim()) return;
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    this.props.onAdd(description, mins, secs);
    this.setState({
      description: "",
      minutes: "",
      seconds: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            name="minutes"
            value={this.state.minutes}
            onChange={this.handleInputChange}
            min="0"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            name="seconds"
            value={this.state.seconds}
            onChange={this.handleInputChange}
            min="0"
            max="59"
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
