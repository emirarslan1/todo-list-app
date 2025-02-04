import React, {useState} from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import TaskList from "./components/TaskList";
import handleDeleteUser from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <button onClick={handleLogout} style = {{margin : "10px", color: "red"}}>
                        Log Out
                    </button>
                )}
            </div>
            <Routes>
                <Route 
                path="/"
                element={isLoggedIn ? <Navigate to="/tasks" /> : <LoginForm />}
                />
                <Route 
                path="/tasks"
                element={isLoggedIn ? <TaskList /> : <Navigate to="/" />}
                />
                <Route 
                    path="/register" 
                    element={<RegisterForm />} // `/register` rotası eklendi.
                />
            </Routes>
        </Router>
    );
};

export default App;