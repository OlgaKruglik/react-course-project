import React, { useState } from 'react';
import {Avatar,Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container} from "@mui/material";
import { Link } from "react-router-dom";
import Links from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles"; 

  
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

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');


    return (
        <div>
                <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormStyled noValidate>
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
            Sign Up
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
