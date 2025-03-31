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
    };
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

  render() {
    const { description, created, onDelete, onToggleChecked, status } =
      this.props;

    const { editedDescription, isEdit } = this.state;

    const { handleEditChange, handleKeyDown, handleEditSubmit } = this;

    const distance = formatDistanceToNow(created, {
      addSuffix: true, // Добавляем "назад" или "через"
      locale: ru, // Используем русскую локаль
    });

    let classNames = "";
    let dn = "icon icon-edit";
    if (status) {
      classNames = "completed";
      dn = "hidden";
    } else if (status === false) {
      classNames = "view";
    }

    return (
      <>
        <div>
          {isEdit ? (
            <form onSubmit={this.handleEditSubmit}>
              <input
                type="text"
                className="editToDo"
                value={editedDescription}
                onChange={handleEditChange}
                onKeyDown={handleKeyDown}
                onBlur={handleEditSubmit}
                autoFocus
              />
            </form>
          ) : (
            <>
              <span className={classNames}>
                <div>
                  <input
                    className="toggle"
                    type="checkbox"
                    onChange={onToggleChecked}
                    checked={status}
                  />

                  <label onClick={onToggleChecked}>
                    <span className="description">{description}</span>
                    <span className="created">{distance}</span>
                  </label>
                  <button className={dn} onClick={this.editClick}></button>
                  <button
                    className="icon icon-destroy"
                    onClick={onDelete}
                  ></button>
                </div>
              </span>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Task;
