import React, { useEffect, useState } from 'react';
import './Spotify.css';
import axios from 'axios';
import { Container, Button, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

function Spotify() {
    const spotify_endpoint = "https://accounts.spotify.com/authorize";
    const client_id = "15b7a87f6afd4fd3846dceee9f987a33";
    const redirect_uri = "http://localhost:3000";
    const [showButton, setShowButton] = useState(true);
    const [data, setData] = useState([]);

    const params = (hash) => {
        const afterHashtag = hash.substring(1);
        const paramsInURL = afterHashtag.split("&");
        const paramsSplit = paramsInURL.map(param => param.split("="));
        const paramsObject = paramsSplit.reduce((accumulator, currentValue) => {
            accumulator[currentValue[0]] = currentValue[1];
            return accumulator;
        }, {});
        return paramsObject;
    }

    useEffect(() => {
        if (window.location.hash) {
            const {access_token, token_type, expires_in, token} = params(window.location.hash);
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("token", token);
            console.log(token);
            setShowButton(false);
        }
    }, []);
    
    const getSpotifyData = () => {
        window.location = `${spotify_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=%20user-read-recently-played&response_type=token&show_dialog=true`;
    }

    const getSpotifyHistoryData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const tokenType = localStorage.getItem("tokenType");
        const expiresIn = localStorage.getItem("expiresIn");
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
                headers: {
                    "Authorization": `${tokenType} ${accessToken}`
                }
            });
            setData(response.data.items);
        }
        catch (error) {
            console.error("Error", error);
        }
    }

    return (
        <Container>
            <Button onClick={getSpotifyData} sx={{background: "#292617", color: "white"}}>Login to Spotify</Button>
            <Button onClick={getSpotifyHistoryData} sx={{background: "#292617", color: "white"}}>Get Spotify History</Button>
            {data.map((item, index) => {
                const date = new Date(item.played_at);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    
                return (
                    <div key={index} style={{borderBottom: "1px solid #aaa"}}>
                        <img src={item.track.album.images[2].url} alt="album" style={{
                            maxHeight: "80px", 
                            maxWidth: "80px", 
                            float: "left",  
                            marginRight: "10px",
                        }}/>
                        <div style={{
                            fontFamily: "Poppins, sans-serif", 
                            color: "white", 
                            fontSize: "20px"
                        }}>
                            <div style={{float: "center"}}><p>{item.track.name}</p></div>
                            <div><p>{item.track.artists[0].name}</p></div>
                        </div>
                        <div style={{
                            float: "right",
                            fontFamily: "Poppins, sans-serif", 
                            color: "white", 
                            fontSize: "20px"}}
                        >
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                );
            })}
        </Container>
    );    
}

export default Spotify;
