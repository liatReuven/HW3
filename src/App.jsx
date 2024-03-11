import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import SystemAdmin from './Pages/SystemAdmin'

import './App.css'
import './assets/StyleSheet/LoginStyle.css'
import './assets/StyleSheet/cardStyle.css'
import './assets/StyleSheet/RegisterStyle.css'
import './assets/StyleSheet/AdminStyle.css'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function App() {
  const [userArray, setUserArray] = useState([]); //Usestate that holds the array of users
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  //on load will do this useEffect
  useEffect(() => {
    loadUsers();
  }, []);


  function loadUsers() {
    const storedUsers = localStorage.getItem("users"); //bring the users from LS
    //if exists than parse them and put them in the array of users
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUserArray(parsedUsers);
    } else {
      const createdUsers = []; //create a new one
      localStorage.setItem("users", JSON.stringify(createdUsers));
    }
  }

  //function that add user
  const addUserFromRegister = (userFromChild) => {
    setUserArray((prevUserArray) => {
      const newUserArray = [...prevUserArray, userFromChild]; // take the last array of user and add the user that register
      localStorage.setItem("users", JSON.stringify(newUserArray)); //put the new array in the LS
      return newUserArray;
    });
  };

  const EditUserFromEdit = (editUser) => {
    let loggedInUser = JSON.parse(sessionStorage.getItem("currentUser")); // take the loged in user
    if (!loggedInUser) {
      console.error("No user currently logged in.");
      return;
    }

    setUserArray((prevUserArray) => {
      const index = prevUserArray.findIndex(
        (user) => user.email === loggedInUser.email
      );

      if (index !== -1) {
        const newUserArray = [...prevUserArray];
        newUserArray[index] = editUser;
        localStorage.setItem("users", JSON.stringify(newUserArray));
        sessionStorage.setItem("currentUser", JSON.stringify(editUser));
        return newUserArray;
      } else {
        console.error("User not found for editing.");
        return prevUserArray;
      }
    });
  };


  const DeleteUser =(email) => {
    let filterArray = userArray.filter((user) => user.email !== email);
    setUserArray(filterArray);
    localStorage.setItem("users", JSON.stringify(filterArray));
  }

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#8BCBC8', top: 0, position: 'fixed', width: '100%' }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>

            <Button onClick={() => navigate("/")} sx={{ color: '#076871' }}>Login</Button>
            <Button onClick={() => navigate("/register")} sx={{ color: '#076871' }}>Register</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#076871' }}>
              Your Best Helper
            </Typography>
            <img
              src='pictures\logo.png'
              alt='Logo Company'
              style={{ width: '50px', height: 'auto', margin: '10px' }}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register SendToParent={addUserFromRegister} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/edit' element={<EditProfile SendToParent={EditUserFromEdit} />} />
          <Route path='/systemadmin' element={<SystemAdmin SendToParent={DeleteUser} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
