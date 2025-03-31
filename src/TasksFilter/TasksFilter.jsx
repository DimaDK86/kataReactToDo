import React from "react";
import "./TasksFilter.css";

function TasksFilter({ filter, onFilterSelect }) {
  // console.log(props);
  const btnData = [
    { name: "all", label: "All" },
    { name: false, label: "Active" },
    { name: true, label: "Completed" },
  ];

  const buttons = btnData.map(({ name, label }) => {
    const active = filter === label;
    const clazz = active ? "selected" : "";

    return (
      <li key={name}>
        <button
          type="button"
          className={clazz}
          onClick={() => onFilterSelect(label)}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

export default TasksFilter;
