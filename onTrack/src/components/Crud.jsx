import React, { useEffect, useState } from "react";
import "../css/crud.css";

const Crud = () => {
  // State initialization
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTask, setCompletedTask] = useState([]);
  const [currentTab, setCurrentTab] = useState("PENDING");

  const addtaskHandler = () => {
    const transformedData = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTasks([...tasks, transformedData]);
    setInputValue("");
  };

  const editTaskHandler = (task) => {
    setInputValue(task.text);
    setSelectedTask(task);
  };

  const updateTaskHandler = () => {
    const tempArr = [...tasks];
    const currentValueIndex = tempArr.findIndex((p) => p.id == selectedTask.id);
    const currentData = tempArr[currentValueIndex];
    currentData.text = inputValue;

    setTasks(tempArr);
    setSelectedTask(null);
    setInputValue("");
  };

  const deleteTaskHandler = (task) => {
    const filteredTasks = tasks.filter((p) => p.id != task.id);
    setTasks(filteredTasks);
  };

  const checkboxHandler = (task) => {
    const filteredTasks = tasks.filter((p) => p.id == task.id);
    setCompletedTask(filteredTasks);
    deleteTaskHandler(task);
  };

  const completedHandler = () => {
    return completedTask.map((item) => (
      <ul key={item.id} type="none">
        <li>
          <span>{item.text}</span>
        </li>
      </ul>
    ));
  };

  return (
    <div className="task-container">
      <h1 className="text">Action Tracker</h1>
      <div className="input-and-btn-container">
        <input
          type="text"
          name="text-box"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="task-text-input"
        />
        {selectedTask ? (
          <button onClick={updateTaskHandler} className="update-btn">
            UpdateTask
          </button>
        ) : (
          <button onClick={addtaskHandler} className="add-btn">
            AddTask
          </button>
        )}
      </div>
      <div>
       <div className="task-tabs">
         <div>
          <button onClick={() => setCurrentTab("PENDING")} className={currentTab === "PENDING" ? "active-tab" : "inactive-tab"}>ToDo</button>
        </div>
        <div>
          <button onClick={() => setCurrentTab("COMPLETED")} className={currentTab === "COMPLETED" ? "active-tab" : "inactive-tab"}>Completed</button>
        </div>
       </div>
        <div className="task-list">
          {currentTab == "PENDING"
            ? tasks.map((item) => (
                <ul type="none" className="task-item" key={item.id}>
                  <li>
                    <input
                      type="checkbox"
                      onClick={() => checkboxHandler(item)}
                    />
                    <span className="task-text">{item.text}</span>
                    <button onClick={() => editTaskHandler(item)}>Edit</button>
                    <button onClick={() => deleteTaskHandler(item)}>
                      Delete
                    </button>
                  </li>
                </ul>
              ))
            : completedHandler()}
        </div>
      </div>
    </div>
  );
};

export default Crud;
