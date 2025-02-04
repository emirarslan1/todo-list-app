import axios from "axios";
import Task from "../types/Task";

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTasks = async () =>{
    const token = localStorage.getItem('token');
    const response = await api.get('/tasks', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addTask = async (title: string, description: string) => {
    const response = await api.post('/tasks', {
        title,
        description,
    });

    return response.data;
};

export const updateTask = async (id: string, updatedFields: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, updatedFields);
    return response.data;
}

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const completeTask = async (id: string): Promise<void> => {
    const response = await api.put(`/tasks/${id}`, {status : "closed"});
    return response.data;
};

export const loginUser = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    const token = response.data.access_token;

    localStorage.setItem('token', token);
    return token;
}
