import { AppBar, Button, Toolbar, Box } from '@mui/material';
import './App.css';
import TypeBox from './ChatMessage/TypeBox';
import ChatMessage from './ChatMessage/ChatMessage';

function App() {
  return (
  <Box>
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
export default App;
