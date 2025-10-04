
import React, { useEffect } from 'react';
const DisplayToDo = ({ taskList, onUpdate }) => {
    const [updatedTaskList, setUpdatedTaskList] = React.useState(taskList);
    const [editableIndex, setEditableIndex] = React.useState(null);
    const [editedTask, setEditedTask] = React.useState("");
    const ref = React.useRef();
    useEffect(() => {
        setUpdatedTaskList(taskList);
    }, [taskList]);

    const handleEditTask = (index) => {
        const newTaskList = [...updatedTaskList];
        newTaskList[index].task = editedTask;
        setUpdatedTaskList(newTaskList);
        onUpdate(newTaskList);
        setEditableIndex(null);
        setEditedTask(null);
    };

    const handleDeleteTask = (index) => {
        const updatedTaskList = taskList.filter((_, id) => id !== index);
        setUpdatedTaskList(updatedTaskList);
        onUpdate(updatedTaskList);
    };
    const startEdit = (index, task) => {
        setEditableIndex(index);
        setEditedTask(task);
        ref.current?.focus();
    };
    const handleStrike = (index) => {
        const newTaskList = [...updatedTaskList];
        newTaskList[index].status = !newTaskList[index].status;
        setUpdatedTaskList(newTaskList);
        onUpdate(newTaskList);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
            {updatedTaskList.length > 0 ? <h2>Your ToDo List</h2> : <h2>No Task Available</h2>}
            <hr />
            <ul>
                {updatedTaskList.map((task, index) => (
                    <li key={index} style={{ listStyleType: "none", marginBottom: "2px", }}>
                        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                            <input type="checkbox" onClick={() => handleStrike(index)} />
                            {editableIndex === index ? (<><input type="text" autoFocus value={editedTask} onChange={(e) => setEditedTask(e.target.value)} /> <button onClick={() => handleEditTask(index)}>save</button></>) : <h3 style={{textDecoration: task.status ? "line-through" : "none" }}>{task.task}</h3>}
                            {editableIndex != index && (<><button onClick={() => startEdit(index, task.task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(index)}>Delete</button></>)}
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
};
export default DisplayToDo;