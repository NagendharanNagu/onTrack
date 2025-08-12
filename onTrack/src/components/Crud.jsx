import React, { useEffect, useState } from "react";

const Crud = () => {
  // State initialization
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addtaskHandler = () => {
    const transformedData = {
      id: Date.now(),
      text: inputValue,
    };
    setTasks([...tasks, transformedData]);
    setInputValue("");
  };

  const editTaskHandler = (task)=>{
    setInputValue(task.text)
    setSelectedTask(task)
  }

  const updateTaskHandler = ()=>{
    const tempArr = [...tasks]
    const currentValueIndex = tempArr.findIndex(p => p.id == selectedTask.id)
    const currentData = tempArr[currentValueIndex]
    currentData.text = inputValue

    setTasks(tempArr)
    setSelectedTask(null)
    setInputValue("")
  }
 
  const deleteTaskHandler = (task)=>{
    const filteredTasks = tasks.filter(p => p.id != task.id)
    setTasks(filteredTasks)
  }

  return (
    <div>
      <input type="text" name="text-box" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
      {selectedTask ? <button onClick={updateTaskHandler}>Update</button> : <button onClick={addtaskHandler}>Add</button> }
      {tasks.map((item) => (
        <ul type="none" key={item.id}>
          <li>
            <span>{item.text}</span>
            <button onClick={()=> editTaskHandler(item)}>Edit</button>
            <button onClick={()=> deleteTaskHandler(item)}>Delete</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Crud;
