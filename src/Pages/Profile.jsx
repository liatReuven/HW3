import React, { useEffect, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import CakeIcon from '@mui/icons-material/Cake';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState([]);
    const [logoutEmail, setLogoutEmail] = useState(""); // user that want to logout state
    const [showLogoutInput, setShowLogoutInput] = useState(false); // input show or hide state
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user information from sessionStorage
        const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (storedUser) {
            setUserData(storedUser);
        }
    }, []); // Run this effect only once when the component mounts


    const logOut = () => {
        if (showLogoutInput) {
            if (logoutEmail == userData.email) {
                navigate("/");
                sessionStorage.clear();
            }
        }
        setShowLogoutInput(true);
    };

    const go2game = () => {
        window.open('https://games.moomoo.co.il/3944.html', '_blank');

    }

    return (
        <div>
            <div className="container-card">
                <div className='card'>
                    <h1>Your Profile</h1>
                    <img src={userData.file} alt="User" />
                    <div className="textContainer">
                        <p className="name">
                            {userData.firstName} {userData.lastName}{" "}
                        </p>
                        <p className="content">
                            <MailOutlineIcon style={{ marginRight: '4px' }} />
                            {userData.email}
                        </p>
                        <p className="content">
                            <PlaceIcon style={{ marginRight: '4px' }} />{userData.selectedCity},{userData.street}{" "}
                            {userData.numberInput}
                        </p>
                        <p className="content">
                            <CakeIcon style={{ marginRight: '4px' }} />
                            {userData.dob}
                        </p>
                    </div>
                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/edit");
                                }}
                                sx={{
                                    margin: '10px',
                                    backgroundColor: '#076871',
                                    '&:hover': {
                                        backgroundColor: '#6196A6',
                                    },
                                }}
                            >
                                <EditIcon style={{ marginRight: '4px' }} />Edit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{
                                    margin: '10px',
                                    backgroundColor: '#076871',
                                    '&:hover': {
                                        backgroundColor: '#6196A6',
                                    },
                                }}
                                onClick={go2game}>Game</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{
                                    margin: '10px',
                                    backgroundColor: '#076871',
                                    '&:hover': {
                                        backgroundColor: '#6196A6',
                                    },
                                }}
                                onClick={logOut}>
                                <LogoutIcon style={{ marginRight: '4px' }} />LogOut
                            </Button>
                            {showLogoutInput && (
                                <input
                                    type="text"
                                    value={logoutEmail}
                                    placeholder={"Enter Email and Click Logout"}
                                    onChange={(e) => setLogoutEmail(e.target.value)}
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
