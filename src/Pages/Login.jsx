import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch data from local storage
    const storedUsers = localStorage.getItem('users');

    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

    setUsers(parsedUsers);
  }
    , [])


  const loginUser = () => {
    // Check if the entered username and password match any user
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      // User is authenticated, you can perform further actions
      sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
      navigate('/profile')
    } else {
      // Invalid credentials
      setErrors("יש להתחבר למערכת")
    }

    //check if the user is an admin
    if (username === "admin" && password === "ad12343211ad") {
      navigate("/systemadmin");
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ Name: "admin", Admin: true })
      );
    }

  };

  const handleSignUp = () => {
    navigate('/register')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='page-login'>
      <form className='login-form'>
        <h3 style={{ color: '#076871' }}>Login</h3>
        <TextField
          id='userName'
          label='user name'
          name='userName'
          type='text'
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ width: '222px' }}
          id="password"
          label="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={loginUser}
              sx={{
                margin: '10px',
                backgroundColor: '#076871',
                '&:hover': {
                  backgroundColor: '#6196A6',
                },
              }}>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSignUp}
              sx={{
                margin: '10px',
                backgroundColor: '#076871',
                '&:hover': {
                  backgroundColor: '#6196A6',
                },
              }}>
              Sign up
            </Button>
          </Grid>
        </Grid>
        {error && <p style={{ color: '#6196A6' }}>{error}</p>}
      </form>
    </div>
  )
}
