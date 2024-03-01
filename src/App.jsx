import './App.css';
import ChatBox from './ChatMessage/ChatBox';
import LoginScreen from './components/LoginScreen';
import Spotify from './Spotify/Spotify';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [authed, setAuthed] = useState(false);
  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch('http://localhost:5039/api/authentication/user', {
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //           credentials: 'include',
  //       })
  //       const content  = await response.json();
  //     }
  //     )(); 
  // });

  const HeaderBar = () => {
    return(
      <AppBar sx={{ 
        backgroundColor: "black"
      }}>
        <Toolbar>
          {authed ? null : (
            <Link to="/login" style={{ marginRight: "auto"}}>
              <Button variant="contained" sx={{ backgroundColor: "blue"}}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <div>
      {document.body.style.backgroundColor = "white"}
      <HeaderBar />
        <Routes>
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
    </div>
  );
}
export default App;
