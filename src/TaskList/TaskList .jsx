import React from "react";
import Task from "../Task/Task";
import Footer from "../Footer/Footer";

function TaskList({
  data,
  onDelete,
  onToggleChecked,
  itemsLeft,
  deleteTodoCompleted,
  filter,
  onFilterSelect,
  onEditItem,
}) {
  const elements = data.map((item) => {
    return (
      <li key={item.id}>
        <Task
          {...item}
          onDelete={() => onDelete(item.id)}
          onEditItem={onEditItem}
          onToggleChecked={() => {
            onToggleChecked(item.id);
          }}
        />
      </li>
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">
        {elements}
        <Footer
          itemsLeft={itemsLeft}
          deleteTodoCompleted={deleteTodoCompleted}
          filter={filter}
          onFilterSelect={onFilterSelect}
        />
      </ul>
    </section>
  );
}

export default TaskList;
