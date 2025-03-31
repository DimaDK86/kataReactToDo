import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

function Footer({ itemsLeft, deleteTodoCompleted, filter, onFilterSelect }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button className="clear-completed" onClick={deleteTodoCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
