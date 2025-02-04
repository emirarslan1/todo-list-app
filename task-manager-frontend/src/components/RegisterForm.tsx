import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            await axios.post('http://localhost:3001/auth/register',{
                username,
                password,
            });
            setSuccess('Kayit basarili simdi giriş yapabilirsiniz');
            setError('');
            setTimeout(() => navigate("/"), 1000);
        }catch(err){
            setError('Kayit başarisiz! Kullanici adi alinmiş olabilir.');
            setSuccess('');
        }
    };

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
            margin: "auto",
            width: "50%",
            border: "3px solid blue",
            padding: "10px"}}
        >
            <h2>Register</h2>
            <input 
                   
                   type="text"
                   placeholder="Username"
                   value={username}
                   onChange = {(e) => setUsername(e.target.value)}
            />
            <input type="text"
                   placeholder="Password"
                   value={password}
                   onChange = {(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            {error && <p style = {{color: 'red'}}> {error} </p>}
            {success && <p style = {{color: 'green'}}> {success} </p>}
        </div>
    );
};

export default RegisterForm;