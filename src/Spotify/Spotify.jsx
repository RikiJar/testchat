import React, { useEffect, useState } from 'react';
import './Spotify.css';
import axios from 'axios';
import { Container, Button, Stack, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
/*
    >>TESTING AXIOS<<
*/
function Spotify() {
    const spotify_endpoint = "https://accounts.spotify.com/authorize";
    const client_id = "15b7a87f6afd4fd3846dceee9f987a33";
    const redirect_uri = "http://localhost:3000";
    const [showButton, setShowButton] = useState(true);
    const [data, setData] = useState([]);
    const [devices, setDevices] = useState([]);
    const [showData, setShowData] = useState(false);
    const [user, setUser] = useState(null);

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
            setShowButton(false);
            window.location.hash = "";
        }
    }, []);
    
    const getSpotifyData = () => {
        window.location = `${spotify_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state&response_type=token&show_dialog=true`;
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
        setShowData(true);
    }

    const changeSong = async (uri) => {
        const accessToken = localStorage.getItem("accessToken");
        const tokenType = localStorage.getItem("tokenType");
        const expiresIn = localStorage.getItem("expiresIn");
        
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/devices", {
                headers: {
                    "Authorization": `${tokenType} ${accessToken}`
                }
            });
            const devices = response.data.devices;
    
            if (devices.length > 0) {
                await axios.put("https://api.spotify.com/v1/me/player/play", {
                    "device_id": devices[0].id,
                    "uris": [uri],
                    "position_ms": 0
                }, {
                    headers: {
                        "Authorization": `${tokenType} ${accessToken}`
                    }
                });
            } else {
                console.error("No devices available.");
            }
        } catch (error) {
            console.error("Error: you need to have device active", error.response.data);
        }
    };

    return (
        <div>
            {document.body.style.backgroundColor = "black"}
            <Container>
                {showButton ? <Button onClick={getSpotifyData} sx={{ background: "#292617", color: "white" }}>Login to Spotify</Button> : null}
                <Button onClick={getSpotifyHistoryData} sx={{ background: "#292617", color: "white" }}>Get Spotify History</Button>
                {showData ? (
                     data === null ? (
                        <div><LinearProgress /></div>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th id="thSong">Song</th>
                                            <th>Artist</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            const date = new Date(item.played_at);
                                            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={item.track.album.images[2].url} onClick={() => changeSong(item.track.uri)} alt="album" style={{
                                                            maxHeight: "200px",
                                                            maxWidth: "200px",
                                                        }} />
                                                    </td>
                                                    <td>{item.track.name}</td>
                                                    <td>{item.track.artists[0].name}</td>
                                                    <td>{formattedDate}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )
                        ) : null
                        }
            </Container>
        </div>
    );        
}

export default Spotify;
