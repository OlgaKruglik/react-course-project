import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {CssBaseline, TextField, FormControlLabel, Button, Avatar, Checkbox, Grid, Typography, Container} from "@mui/material";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles"; 
import { API_BASE_URL } from '../config';


// ✅ Стили через styled
const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const outRezult = (str) => {
        setMessage(str);
        setTimeout(() => {
            setMessage('');
        }, 1000);
    };
    const handleRegister = async (event) => {
        event.preventDefault();
        if (email && password && name) {
            try {
                const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password }, { withCredentials: true });
                console.log('User registered:', response.data.message);
                outRezult('Registration successful!');
                setName('');
                setEmail('');
                setPassword('');
                if (response.status === 200) { 
                    console.log('Navigating to /');
                    navigate('/');
                    } else {
                        console.log('Unexpected response status:', response.status);
                    }
            } catch (error) {
                console.error('Error registering user:', error);
                setError(error.response?.data || 'An error occurred during registration.');
            }
        } else {
            outRezult('Please fill in all fields (name, email, and password).');
        }
    };



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <FormStyled noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="lname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <SubmitButton type="submit" fullWidth variant="contained" color="primary" onClick={handleRegister}>
            Sign In
          </SubmitButton>
          <Grid container justifyContent="flex-end">
          </Grid>
        </FormStyled>
      </Paper>
    </Container>
  );
}

export default Registration;
