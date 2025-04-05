import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      editedDescription: props.description,
      isRunning: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ isRunning: !this.props.status });
    }
  }

  editClick = () => {
    this.setState({
      isEdit: true,
      editedDescription: this.props.description,
    });
  };

  handleEditChange = (e) => {
    this.setState({ editedDescription: e.target.value });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { editedDescription } = this.state;
    const { id, onEditItem } = this.props;

    if (editedDescription.trim()) {
      onEditItem(id, editedDescription);
      this.setState({ isEdit: false });
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.setState({
        isEdit: false,
        editedDescription: this.props.description,
      });
    } else if (e.key === "Enter") {
      this.handleEditSubmit(e);
    }
  };

  formatTime = (minutes, seconds) => {
    return `${String(minutes).padStart(2, "0")}
    :${String(seconds).padStart(2, "0")}`;
  };

  handlePlay = () => {
    const { id, onToggleTimer } = this.props;
    this.setState({ isRunning: true });
    if (onToggleTimer) {
      onToggleTimer(id, true);
    }
  };

  handlePause = () => {
    const { id, onToggleTimer } = this.props;
    this.setState({ isRunning: false });
    if (onToggleTimer) {
      onToggleTimer(id, false);
    }
  };

  render() {
    const { description, created, onDelete, onToggleChecked, status, timer } =
      this.props;

    const { editedDescription, isEdit, isRunning } = this.state;

    const distance = formatDistanceToNow(created, {
      addSuffix: true,
      locale: ru,
    });

    let classNames = "";
    let dn = "icon icon-edit";
    if (status) {
      classNames = "completed";
      dn = "hidden";
    }

    const timerDisplay = this.formatTime(timer.minutes, timer.seconds);

    return (
      <>
        <div>
          {isEdit ? (
            <span>
              <form onSubmit={this.handleEditSubmit}>
                <input
                  type="text"
                  className="editToDo"
                  value={editedDescription}
                  onChange={this.handleEditChange}
                  onKeyDown={this.handleKeyDown}
                  onBlur={this.handleEditSubmit}
                  autoFocus
                />
              </form>
            </span>
          ) : (
            <>
              <span className={classNames}>
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={onToggleChecked}
                  checked={status}
                />
                <label>
                  <span onClick={onToggleChecked} className="title">
                    {description}
                  </span>
                  <span className="description">
                    <button
                      className="icon icon-play"
                      onClick={this.handlePlay}
                      disabled={isRunning || status}
                    />
                    <button
                      className="icon icon-pause"
                      onClick={this.handlePause}
                      disabled={!isRunning || status}
                    />
                    <span className="timer">{timerDisplay}</span>
                  </span>
                  <span className="description">{distance}</span>
                </label>
                <button className={dn} onClick={this.editClick}></button>
                <button
                  className="icon icon-destroy"
                  onClick={onDelete}
                ></button>
              </span>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Task;
