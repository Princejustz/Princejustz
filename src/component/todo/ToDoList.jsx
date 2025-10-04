import React ,{ useState } from "react";
import DisplayToDo from "./DisplayToDO";

const ToDoList = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const handleAddTask = () => {
        if (task !== "") {
            setTaskList([...taskList, {task: task, status: false}])
        }
        setTask("");
    }

    const handleChiledUpdate = (updatedList) => {
        setTaskList(updatedList);
    }

        return <div>
        
            <label>Your Task</label>
            <input type="text" placeholder="Please Enter your task" onChange={(e) => setTask(e.target.value)} value={task}
            />
            <button onClick={handleAddTask} disabled={task === ""}>Add Task</button>
            <DisplayToDo taskList={taskList} onUpdate={handleChiledUpdate} />
        </div>;

    };


export default ToDoList;
