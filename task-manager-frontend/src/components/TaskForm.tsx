import React, {useState} from "react";
import { addTask } from "../services/api";

interface TaskFormProps {
    onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({onTaskAdded}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addTask(title, description);
            setTitle('');
            setDescription('');
            onTaskAdded();
        }catch(error){
            console.log('Görev eklenemedi', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title of Task</label>
                <input id="title"
                        type="text"
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)}
                        required  />
            </div>

            <div>
                <label htmlFor="description">Description of Task</label>
                <input id="description"
                          value={description}
                          onChange = {(e) => setDescription(e.target.value)}
                          required></input>
            </div>
            <button type="submit" >Add the Task</button>
        </form>
    );
};

export default TaskForm;