import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import './ChatMessage.css';

function ChatMessage() {
    const [data, setData]  = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5039/chatmessage');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box className="messageBox">
            {data.map((item, index) => (
                <Box key={index} className="message-container">
                    <Box>
                        <p className="username">{item.fk_userID} </p>
                        <p className="message-text">{item.message}</p>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default ChatMessage;