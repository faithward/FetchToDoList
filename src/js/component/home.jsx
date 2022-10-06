import React, { useEffect , useState} from "react";

//create your first component
const Home = () => {
	const [list, setList] = useState([])
  useEffect(() => {
    getList()
  }, []);

  const getList = () => {
	fetch("https://assets.breatheco.de/apis/fake/todos/user/faithward")
      .then((response) => response.json())
      .then((result) => setList(result))
      .catch((error) => console.log("error", error));
  }

  const addTask = (myTask) => {
	const newList = [...list, myTask];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/faithward", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newList),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="text-center">
		{list.map((task, i) => {
			return(
				<p key={i}>{task.label}</p>
			)
		})}
		<button className="btn btn-primary"
		onClick={() => addTask({ label: "Run", done: false})}>
			Add
		</button>
    </div>
  );
};

export default Home;
