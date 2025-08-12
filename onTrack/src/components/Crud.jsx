import React, { useState } from "react";

const Crud = () => {
  // State initialization
  const [tasks, setTasks] = useState([]); // To handle the values as an array
  const [current, setCurrent] = useState(""); // To hold the value of the input field
  const [isEditable, setIseditable] = useState(false) // To conditionally render the Add/Update button
  const [editedValue, setEditedvalue] = useState("") // To store the updated value


  // Onchange Event
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCurrent(e.target.value);
  };

  // Creating - addhandler
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, {id: Date.now(), text:current}]);
    setCurrent("");
  };
  // console.log(tasks);

  //Reading - Edithandler
  const handleEdit = (task) =>{
    // console.log(task)
    setCurrent(task.text)
    setIseditable(true)
    setEditedvalue(task)
    // console.log(task)
  }
  // console.log(editedValue)

  //Updating - Updatehandler
  const handleUpdate = () =>{
    setIseditable(false)
    setCurrent("")
  }

  return (
    <div>
      <div>
        {/* passing the name and value prop to the input field */}
        <input type="text" name={current} value={current} onChange={handleChange} placeholder="Enter your task..!"/>
        {isEditable ? (<button onClick={handleUpdate}>Update</button>):(<button onClick={addTask}>Add</button>)}
      </div>
      <div>
       <ul>
        {tasks.map((task)=>(
            <li key={task.id} type="none">
                <span>{task.text}</span>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button>Delete</button>
            </li>
        ))}
       </ul>
      </div>
    </div>
  );
};

export default Crud;
