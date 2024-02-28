import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './TypeBox.css';
import { useState, useRef } from 'react';

function TypeBox() {
    const [data, setData] = useState({
        message: '',
        fk_userID: Math.floor(Math.random() * 1000) + 1
    });

    const textFieldRef = useRef();

    const PostData = async () => {
        try {
            const response = await fetch('http://localhost:5039/chatmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if(response.ok){
                setData({ ...data, message: '' });
            }

        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleMessageChange = (event) => {
        setData({ ...data, message: event.target.value });
    };

    return (
        <Box>
            <TextField  
                ref = {textFieldRef}
                sx={{
                width: "50%",
                top: "8%",
                left: "22%",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "10px",
            }}
            value={data.message}
            onChange={handleMessageChange}
            />
            <Button variant="contained" startIcon={<SendIcon className="custom-icon" />} className="sendButton"
            sx={{
                width: "5%",
                height: "55px",
                top: "8%",
                left: "22%",
                backgroundColor: "blue",
                color: "white",
                borderRadius: "10px",
                alignItems: "center",
            }}
            onClick={PostData}
            />
        </Box>
    );
}

export default TypeBox;