import { Component } from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList ";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          description: "Completed task",
          created: new Date(2025, 1, 1),
          status: false,
          id: 1,
          timer: { minutes: 5, seconds: 0 },
        },
        {
          description: "Editing task",
          created: new Date(2024, 6, 11),
          status: true,
          id: 2,
          timer: { minutes: 0, seconds: 30 },
        },
        {
          description: "Active task",
          created: new Date(2024, 9, 11),
          status: true,
          id: 3,
          timer: { minutes: 10, seconds: 0 },
        },
        {
          description: "Trarata",
          created: new Date(),
          status: false,
          id: 4,
          timer: { minutes: 0, seconds: 0 },
        },
      ],
      filter: "all",
    };
    this.maxId = 5;
    this.timerIntervals = {};
  }

  componentWillUnmount() {
    Object.values(this.timerIntervals).forEach(clearInterval);
  }

  startTimer = (id) => {
    if (this.timerIntervals[id]) return;

    this.timerIntervals[id] = setInterval(() => {
      this.setState(({ data }) => ({
        data: data.map((task) => {
          if (task.id === id && !task.status) {
            const { minutes, seconds } = task.timer;
            if (minutes === 0 && seconds === 0) {
              clearInterval(this.timerIntervals[id]);
              delete this.timerIntervals[id];
              return task;
            }

            let newMinutes = minutes;
            let newSeconds = seconds - 1;

            if (newSeconds < 0) {
              newMinutes -= 1;
              newSeconds = 59;
            }

            return {
              ...task,
              timer: { minutes: newMinutes, seconds: newSeconds },
            };
          }
          return task;
        }),
      }));
    }, 1000);
  };

  stopTimer = (id) => {
    if (this.timerIntervals[id]) {
      clearInterval(this.timerIntervals[id]);
      delete this.timerIntervals[id];
    }
  };

  onToggleChecked = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          const newStatus = !item.status;
          return {
            ...item,
            status: newStatus,
          };
        }
        return item;
      }),
    }));
  };

  deleteTodo = (id) => {
    this.stopTimer(id);
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }));
  };

  deleteTodoCompleted = () => {
    this.state.data.forEach((task) => {
      if (task.status) {
        this.stopTimer(task.id);
      }
    });
    this.setState(({ data }) => ({
      data: data.filter((item) => item.status !== true),
    }));
  };

  addToDo = (description, minutes = 0, seconds = 0) => {
    if (!description || description.trim() === "") return;
    const newToDo = {
      description: description.trim(),
      created: new Date(),
      status: false,
      id: this.maxId++,
      edit: false,
      timer: {
        minutes: Math.max(0, parseInt(minutes, 10) || 0),
        seconds: Math.max(0, Math.min(59, parseInt(seconds, 10) || 0)),
      },
    };
    this.setState(({ data }) => ({
      data: [...data, newToDo],
    }));
  };

  filterItems = (items, filter) => {
    if (filter === "Active") {
      return items.filter((item) => !item.status);
    } else if (filter === "Completed") {
      return items.filter((item) => item.status);
    } else return items;
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  onEditItem = (id, newDescription) => {
    this.setState(({ data }) => ({
      data: data.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task,
      ),
    }));
  };

  onToggleTimer = (id, isRunning) => {
    if (isRunning) {
      this.startTimer(id);
    } else {
      this.stopTimer(id);
    }
  };

  render() {
    const itemsLeft = this.state.data.filter(
      (item) => item.status === false,
    ).length;

    const { filter, data } = this.state;
    const {
      addToDo,
      deleteTodo,
      onToggleChecked,
      deleteTodoCompleted,
      onFilterSelect,
    } = this;
    const filterData = this.filterItems(data, filter);

    return (
      <section className="app todoapp">
        <NewTaskForm onAdd={addToDo} />
        <TaskList
          data={filterData}
          onDelete={deleteTodo}
          onToggleChecked={onToggleChecked}
          itemsLeft={itemsLeft}
          deleteTodoCompleted={deleteTodoCompleted}
          filter={filter}
          onFilterSelect={onFilterSelect}
          onEditItem={this.onEditItem}
          onToggleTimer={this.onToggleTimer}
        />
      </section>
    );
  }
}

export default App;
