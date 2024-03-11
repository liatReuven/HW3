
import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';


const cities = [
  'כפר סבא',
  'מגל',
  'הוד השרון',
  'ראש העין',
  'רמת השרון',
  'יסוד המעלה',
  'אילת',
  'קריית שמונה',
  'רעננה',
  'הרצליה',
  ''
];

export default function Register(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    firstName: '',
    lastName: '',
    street: '',
    numberInput: '',
    confirmPassword: '',
    file: '',
    selectedCity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = null;

    if (name === 'selectedCity') {
      // Update selectedCity in the formData object
      setFormData((prevData) => ({
        ...prevData,
        selectedCity: value,
      }))
    }

    if (name === 'firstName') {
      // Check if the first name contains only text characters
      if (!/^[A-Za-z]+$/.test(value)) {
        error = 'שם פרטי חייב להיות באנגלית';
      }
    }

    if (name === 'lastName') {
      // Check if the first name contains only text characters
      if (!/^[A-Za-z]+$/.test(value)) {
        error = 'שם משפחה חייב להיות באנגלית';
      }
    }

    if (name === 'username') {
      // Check if the username contains only English letters, numbers, and special characters
      if (!/^[A-Za-z0-9!@#$%^&*()_+=\-[\]{}|:;"'<>,.?\\/]+$/u.test(value)) {
        error = 'שם משתמש חייב להכיל אותיות באנגלית, מספרים ותווים מיוחדים בלבד';
      }
      // Check if the length of the username does not exceed 60 characters
      if (value.length > 60) {
        error = 'שם משתמש חייב להכיל מתחת ל60 אותיות';
      }
    }
    if (name === 'email') {
      // Check if the email format is valid
      const validFormat = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u.test(value);
      // Check if the '@' character appears only once
      const atSymbolCount = (value.match(/@/g) || []).length;

      if (atSymbolCount !== 1) {
        error = 'אימייל חייב להכיל @';
      }

      if (!validFormat) {
        error = 'אימייל חייב להכיל .com בסוף';
      }
      // Check if the email contains only English letters, numbers, and special characters
      if (!/^[A-Za-z0-9!@#$%^&*()_+=\-[\]{}|:;"'<>,.?\\/]+$/u.test(value)) {
        error = 'מייל חייב להכיל אותיות באנגלית, מספרים ותווים מיוחדים בלבד';
      }
    }

    if (name === 'password') {
      // Check if the password contains at least one special character
      if (!/[!@#$%^&*()_+=\-[\]{}|:;"'<>,.?\\/]/.test(value)) {
        error = 'סיסמא חייב להכיל תו מיוחד אחד לפחות';
      }

      // Check if the password contains at least one number
      if (!/\d/.test(value)) {
        error = 'סיסמא חייב להכיל מספר אחד לפחות';
      }

      // Check if the password contains at least one uppercase letter
      if (!/[A-Z]/.test(value)) {
        error = 'סיסמא חייב להכיל אות גדולה אחת';
      }

      // Check if the password is between 7 and 12 characters
      if (value.length < 7 || value.length > 12) {
        error = 'סיסמא חייבת להיות בטווח של 7-12 תווים';
      }
    }

    if (name === 'confirmPassword' && value !== formData.password) {
      error = 'סיסמא לא תואמת';
    }

    if (name === 'dob') {
      // Check if the date of birth is valid (user's age between 18 and 120)
      const dob = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - dob.getFullYear();

      if (isNaN(dob) || age <= 18 || age > 120) {
        error = 'תאריך לא תקין';
      }
    }

    if (name === 'street') {
      // Check if the street name contains only Hebrew letters
      if (!/^[א-ת\s']+$/u.test(value)) {
        error = 'שם הרחוב יכול להכיל רק אותיות עבריות';
      }
    }

    if (name === 'numberInput') {
      // Check if the input is a positive number
      const isValidNumber = /^[1-9]\d*$/.test(value);

      if (!isValidNumber) {
        error = 'הזן רק מספר חיובי';
      }
    }

    if (name === 'file') {
      const file = e.target.files[0];
      file;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();

    // Check for form validation errors before proceeding
    if (Object.values(errors).some(error => error !== null)) {
      console.log('Form has validation errors. Cannot submit.');
      return;
    }
    // Handle form submission using formData
    console.log('Form Data Submitted:', formData);

    props.SendToParent(formData); //send the new user to the parent(App)
    navigate('/')
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowconfirmPassword = () => setShowconfirmPassword((show) => !show);

  const handleMouseDownconfirmPassword = (event) => {
    event.preventDefault();
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    position: 'absolute',
  });

  return (
    <div className='page-register'>
      <form className='Register-form'>
        <h1>Register</h1>
        <FormControl sx={{ display: 'flex', gap: '10px' }}>
          <Stack direction="row" gap={'10px'} className="form-input">
            <TextField
              id="firstName"
              label="First name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              className="form-input"
            />
            <TextField
              id="LastName"
              label="Last name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              className="form-input"
            />
          </Stack>
        </FormControl>
        <FormControl sx={{ display: 'flex', gap: '10px' }}>
          <Stack direction="row" gap={'10px'} className="form-input" >
            <TextField
              id="password"
              label="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
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
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showconfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowconfirmPassword}
                      onMouseDown={handleMouseDownconfirmPassword}
                      edge="end"
                    >
                      {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Stack>
        </FormControl>
        <FormControl sx={{ display: 'flex', gap: '10px' }}>
          <Stack direction="row" gap={'10px'} className="form-input" >
            <TextField
              id="username"
              label="User name"
              name="username"
              type="text"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Stack>
        </FormControl>
        <FormControl sx={{ display: 'flex', gap: '10px' }}>
          <Stack direction="row" gap={'10px'} className="form-input" >
            <TextField
              fullWidth
              type="date"
              id="dob"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <Autocomplete
              fullWidth
              onChange={(e, value) => handleChange({ target: { name: 'selectedCity', value } })}
              options={cities}
              getOptionLabel={(option) => option} // Ensure this function returns a string
              renderInput={(params) => (
                <TextField {...params} label="Select City" variant="outlined" value={formData.selectedCity} />
              )}
            />
          </Stack>
        </FormControl>
        <FormControl sx={{ display: 'flex', gap: '10px' }}>
          <Stack direction="row" gap={'10px'} >
            <TextField
              id="street"
              label="Street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              id="numberInput"
              label="Number"
              name="numberInput"
              type="number"
              value={formData.numberInput}
              onChange={handleChange}
              error={!!errors.numberInput}
              helperText={errors.numberInput}
            />
          </Stack>
        </FormControl>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={0}
          startIcon={<CloudUploadIcon />}
          sx={{
            margin: '20px',
            backgroundColor: '#076871',
            '&:hover': {
              backgroundColor: '#6196A6',
            }
          }}        >
          Upload picture
          <input
            type="file"
            name="file"
            style={{ display: 'none' }}
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
        </Button>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          onClick={registerUser}
          sx={{
            backgroundColor: '#076871',
            '&:hover': {
              backgroundColor: '#6196A6',
            }
          }}
        >
          Submit
        </Button>
      </form >
    </div>
  )
}