import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import CakeIcon from '@mui/icons-material/Cake';
import { Button, Grid } from "@mui/material";

export default function FCProfileAdmin(props) {
    const navigate = useNavigate();

    //on click delete button it sends to parent the delete email of the current user
    const deleteUser = () => {
        props.Delete(props.email);
    };
    return (
        <div>
            <div className="container-card2">
                <div className='card'>
                    <img src={props.photo} alt="User" />
                    <div className="textContainer">
                        <p className="name">
                            {props.firstName} {props.lastName}{" "}
                        </p>
                        <p className="content">
                            <MailOutlineIcon style={{ marginRight: '4px' }} />
                            {props.email}
                        </p>
                        <p className="content">
                            <PlaceIcon style={{ marginRight: '4px' }} />{props.selectedCity},{props.street}{" "}
                            {props.numberInput}
                        </p>
                        <p className="content">
                            <CakeIcon style={{ marginRight: '4px' }} />
                            {props.dob}
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
                                Edit
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
                                onClick={deleteUser}
                            >
                                Delete</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
