import React, { useState } from "react";

const Crud = () => {
  // State initialization
  const [tasks, setTasks] = useState([]); // To handle the values as an array
  const [current, setCurrent] = useState(""); // To hold the value of the input field

  // Onchange Event
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCurrent(e.target.value);
  };

  // Creating
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, {id: Date.now(), text:current}]);
    console.log(tasks);
    setCurrent("");
  };

  return (
    <div>
      <div>
        {/* passing the name and value prop to the input field */}
        <input type="text" name={current} value={current} onChange={handleChange} placeholder="Enter your task..!"/>
        <button onClick={addTask}>Add</button>
      </div>
      <div>
       <ul>
        {tasks.map((task)=>(
            <li key={task.id} type="none">
                <span>{task.text}</span>
                <button>Edit</button>
                <button>Delete</button>
            </li>
        ))}
       </ul>
      </div>
    </div>
  );
};

export default Crud;
