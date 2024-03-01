import React from "react";
import './LoginScreen.css';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Toolbar } from "@mui/material";
import { redirect } from "react-router-dom";

const LoginSCreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5039/api/authentication/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });
    };

    return (
        <div>
            {document.body.style.backgroundColor = "white"}
            <Toolbar style={{backgroundColor: "navyblue"}}/>
            <div className="formContainer">
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Käyttäjätunnus / Username"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Salasana / Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submitButton"
                    >
                    Kirjaudu sisään
                    </Button>
                </form> 
            </div>
        </div>
    );
}

export default LoginSCreen;