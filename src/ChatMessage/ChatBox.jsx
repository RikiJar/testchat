import React from "react";
import { AppBar, Button, Toolbar, Box } from '@mui/material';
import TypeBox from './TypeBox';
import ChatMessage from './ChatMessage';

const ChatBox = () => {

    return(
        <Box>
            {document.body.style.backgroundColor = "black"}
            <AppBar position="static"
            sx={{
                backgroundColor: "black",
            }}
            >
            <Toolbar>
                <Button variant="outlined"
                color="primary"
                >
                Kirjaudu sisään
                </Button>
            </Toolbar>
            </AppBar>
            <Box className="App">
            <Box mb={2}>
                <ChatMessage />
            </Box>
            </Box>
            <Box>
            <TypeBox />
            </Box>
        </Box>
    );
}

export default ChatBox;