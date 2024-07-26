import React, { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState({ index: null, text: "" });

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const onAddClick = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const onEditClicked = (index) => {
    setEditedTask({ index, text: tasks[index].text });
  };

  const onSaveClicked = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editedTask.index ? { ...task, text: editedTask.text } : task
    );
    setTasks(updatedTasks);
    setEditedTask({ index: null, text: "" });
  };

  const handleEditInputChange = (e) => {
    setEditedTask({ ...editedTask, text: e.target.value });
  };

  const onDeleteClicked = (index) => {
    const data = tasks.slice();
    data.splice(index, 1);
    setTasks(data);
  }



  return (
    <div>
      <h2>To-Do List</h2>
      <form>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a New Task"
          required
        />
        <button onClick={onAddClick}>Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {editedTask.index === index ? (
              <>
                <input
                  type="text"
                  value={editedTask.text}
                  onChange={handleEditInputChange}
                />
                <button onClick={onSaveClicked}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTaskCompletion(index)}>
                  {task.text}
                </span>
                <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => onEditClicked(index)}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteClicked(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
