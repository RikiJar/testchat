import { AppBar, Button, Toolbar } from '@mui/material';
import './App.css';
import TypeBox from './typebox/typeBox.js';

function App() {
  return (
    <div className="Main">
      <AppBar position="static" sx={{ 
        backgroundColor: "black", 
      }}>
        <Toolbar>
          <Button variant="contained" sx={{
            backgroundColor: "white",
            color: "black",
            left: "0%",
          }}>Kirjaudu sisään
          </Button>
        </Toolbar>
      </AppBar>
      <div className="App">
        <TypeBox />
      </div>
    </div>
  );
}

export default App;
