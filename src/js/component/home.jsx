import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/faithward")
      .then((response) => response.json())
      .then((result) => setList(result))
      .catch((error) => console.log("error", error));
  };

  const addTask = (myTask) => {
    const newEntry = {label: myTask , done: false}
    const newList = [...list, newEntry];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/faithward", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log("error", error));
  };
  
  const [newTask, setNewTask] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
       <h2><label>
          What do you need to do?<br></br>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label></h2>
        <input type="submit" />
      </form>
      <br></br>
      {list.map((task, i) => {
        return <p key={i}>{task.label}</p>;
      })}
    </div>
  );
};

export default Home;
