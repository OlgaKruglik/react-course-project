import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Avatar,Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container, Alert} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useFetchUsers from '../Hook/useUser';
import HomeIcon from "@mui/icons-material/Home";
import Links from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles"; 
import { API_BASE_URL } from '../config';

  
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

function Login() {

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
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (email && password) {
          try {
            const response = await axios.post(`${API_BASE_URL}/check-user`, 
              { email, password },
              { withCredentials: true }
            );
      
            if (response.status === 200) { 
              console.log('User exists and password is valid.');
              console.log(response.data.userId)
              localStorage.setItem("currentUserId", response.data.userId);
      
              outRezult('Login successful!');  
              setTimeout(() => navigate('/'), 2000);
            } else {
              console.log('Unexpected response status:', response.status);
            }
          } catch (error) {
            console.error('Error checking user:', error);
            setError(error.response?.data || 'An error occurred during check-user.');
          }
        } else {
          outRezult('Please fill in both email and password fields.');
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
                  position: "fixed",
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
                    Sign In
                </Typography>
                <FormStyled noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                    <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                        Sign In
                    </SubmitButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Links component={Link} to="/registration" variant="body2">
                                Already have an account? Sign in
                            </Links>
                        </Grid>
                    </Grid>
                </FormStyled>
            </Paper>
            </Container>
        </div>
    )
}

export default Login
