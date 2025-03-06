import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import useFetchUsers from '../Hook/useUser';
import {CssBaseline, TextField, FormControlLabel, Button, Avatar, Checkbox, Grid, Typography, Container, Alert} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Links from "@mui/material/Link";
import { styled } from "@mui/material/styles"; 
import { API_BASE_URL } from '../config';


// ✅ Стили через styled
const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end", 
  margin: theme.spacing(3),
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
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (message) {
          const timer = setTimeout(() => setMessage(''), 10000);
          return () => clearTimeout(timer); 
        }
      }, [message]);
      
      const outRezult = (str) => {
        setMessage(str); 
        console.log("Message set:", str);
      };

      const handleRegister = async (event) => {
        event.preventDefault();
        if (email && password && name) {
          try {
            const apiToken = localStorage.getItem("apiToken");
            const response = await axios.post(`${API_BASE_URL}/register`,{ username: name, email, password }, 
            {
              headers: { Authorization: `Bearer ${apiToken}` },
              withCredentials: true
            }
          );
      
            if (response.status === 201) {
              setName('');
              setEmail('');
              setPassword('');
              localStorage.setItem("currentUserId", response.data.userId);              
              outRezult('Registration successful!');
              setTimeout(() => navigate('/'), 2000);
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
    <div>
      <ButtonWrapper>
        <Button variant="outlined" startIcon={<HomeIcon />} >
            <Links component={Link} to="/" variant="body2">
                Home
            </Links>
        </Button>
      </ButtonWrapper>
      <Container component="main" maxWidth="xs">
          {message && (
              <Alert
              severity="success"
              sx={{
                  position: "absolute",
                  top: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  zIndex: 10,
              }}
              >
              {message}
              </Alert>
          )}
        <CssBaseline />
        <Paper>
          <AvatarStyled>
            <LockOutlinedIcon />
          </AvatarStyled>
          <Typography component="h1" variant="h5">
            Sign Up
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
              Sign Up
            </SubmitButton>
            <Grid container justifyContent="flex-end">
            </Grid>
          </FormStyled>
        </Paper>
      </Container>
    </div>
  );
}

export default Registration;
