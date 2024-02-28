import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
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
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="messageBox">
            { data.length == 0 ? ( <LinearProgress /> ) :
            (<Box className="MessageBoxStyle">
                {data.map((item, index) => (
                <Box key={index} className="message-container">
                    <Box>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img
                                src="https://kuviasuomesta.fi/wp-content/uploads/2022/02/orava-kuviasuomesta.fi-roine-piirainen-1.jpg"
                                style={{ width: '60px', height: '60px', borderRadius: '25%'}}
                                alt="User avatar"
                            />
                            <div style={{background: '#f2f2f2', marginLeft: '20px', borderRadius: '20%'}}>
                                <div style={{padding: '10px'}}>{item.message}</div>
                            </div>
                            {/* <p className="username">{item.fk_userID}</p> */}
                        </div>
                        
                    </Box>
                </Box>
            ))}
            </Box>
            )    
        }
        </Box>
    );
}

export default ChatMessage;