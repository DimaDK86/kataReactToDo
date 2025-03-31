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
          // isEditing: false
        },
        {
          description: "Editing task",
          created: new Date(2024, 6, 11),
          status: true,
          id: 2,
          // isEditing: false
        },
        {
          description: "Active task",
          created: new Date(2024, 9, 11),
          status: true,
          id: 3,
          // isEditing: false
        },
        {
          description: "Trarata",
          created: new Date(),
          status: false,
          id: 4,
          // isEditing: false
        },
      ],
      filter: "all",
    };
    this.maxId = 5;
  }

  onToggleChecked = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      }),
    }));
  };

  deleteTodo = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  deleteTodoCompleted = () => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.status !== true),
      };
    });
  };

  addToDo = (description) => {
    const newToDo = {
      description,
      created: new Date(),
      status: false,
      id: this.maxId++,
      edit: false,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newToDo];
      return {
        data: newArr,
      };
    });
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
        />
      </section>
    );
  }
}

export default App;
