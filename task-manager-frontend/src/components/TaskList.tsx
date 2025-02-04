import React, {useEffect, useState} from "react";
import { completeTask, deleteTask, getTasks } from "../services/api";
import { updateTask } from "../services/api";
import Task from "../types/Task";
import TaskForm from "./TaskForm";
import "../styles/TaskList.css"

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState(''); 

    const fetchTasks = async () => {
        try {
            const data: Task[] = await getTasks();
            if (Array.isArray(data)) {
                const sortedTasks = data.sort((a, b) => {
                    if (a.status === "closed" && b.status !== "closed") return 1;
                    if (a.status !== "closed" && b.status === "closed") return -1;
                    return 0;
                });
                setTasks(sortedTasks);
            } else {
                console.error("API array döndürmedi", data);
            }
        } catch (error) {
            console.error("Görevler alinamadi: ", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = () => {
        fetchTasks();
    };

    const handleComplete = async (id:string) => {
        try{
            await completeTask(id);
            setTasks((prevTasks) => { 
                const updatedTasks = prevTasks.map((task) => 
                 task.id === id ? {...task, status : "closed"} : task
                );
                return updatedTasks.sort((a,b) => {
                    if(a.status === "closed" && b.status !== "closed") return 1;
                    if(b.status !== "closed" && b.status === "closed") return -1;
                    return 0;
                });
            })
        }catch(error){
            console.error("Görev tamamlanamadi: ", error);
        }
    };

    // const sortedTasks = [...tasks].sort((a,b) => {
    //     if(a.status === "closed" && b.status !== "closed") return 1;
    //     if(b.status !== "closed" && b.status === "closed") return -1;
    //     return 0;
    // });

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => 
                prevTasks.filter((task) => task.id !== id)
            );
        }catch(error){
            console.error("Görev silinemed: ", error);
        }
    }

    const handeEdit = (task: Task) => {
        setEditingTaskId(task.id);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description);
    }

    const handeUpdate = async () => {
        if(editingTaskId ){
            try {
                await updateTask(editingTaskId, {
                    title: updatedTitle,
                    description : updatedDescription,
                });
                
                const updatedTasks = await getTasks();
                setTasks(updatedTasks);
    
                handleTaskAdded();
                setEditingTaskId(null);
            }catch(err){
                console.error("Görev güncellenemedi", err);
            }
        }
    }
 
    return (
        <div>
            <h2>All Tasks</h2>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}
                        style={{
                        textDecoration: task.status === "closed" ? "line-through" : "none",
                        cursor: "pointer",
                        }}
                     >
                        <strong>{task.title}</strong>: {task.description} ({task.status}) 
                        <button onClick={() => handeEdit((task))}> Update </button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        <button onClick={() => handleComplete(task.id)}>Complete</button>
                    </li>
                ))}
            </ul>
            {editingTaskId && (
                <div>
                    <h3>Update the Task</h3>
                    <input type="text"
                           value={updatedTitle}
                           onChange = {(e) => setUpdatedTitle(e.target.value)}  
                    />
                    <textarea value = {updatedDescription}
                              onChange = {(e) => setUpdatedDescription(e.target.value)}  
                    ></textarea>
                    <button type="submit" onClick={handeUpdate}>Kaydet</button>
                    <button onClick={() => setEditingTaskId(null)}>İptal</button>
                </div>
            )}
        </div>
    );
};    

export default TaskList;