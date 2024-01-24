import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './typeBox.css';

function TypeBox() {
    return (
        <Box>
            <TextField  sx={{
                width: "50%",
                top: "8%",
                left: "22%",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "10px",
            }}
            defaultValue={"Kirjoita viesti..."}
            />
            <Button variant="contained" startIcon={<SendIcon className="custom-icon" />} className="sendButton"
            sx={{
                width: "5%",
                height: "55px",
                top: "8%",
                left: "22%",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
                alignItems: "center",
            }} 
            />
        </Box>
    );
}

export default TypeBox;