import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Don\'t have an account? '}
      <Link href="http://localhost:3000/register">
        Register
      </Link>{' here.'}
    </Typography>
  );
}

const API_URL = process.env.REACT_APP_API_URL;
const defaultTheme = createTheme();

export default function SignInSide() {
  const Navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requestBody = {
      name: data.get('name'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post(`${API_URL}/auth/authenticate`, requestBody);
      console.log('Authentication successful. Token:', response.data.token);
      const token = response.data.token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const userRole = decoded.roles[0];
      console.log(userRole);
      switch (userRole) {
        case 'ADMIN':
          Navigate('/teacher/home');
          break;
        case 'STUDENT':
          Navigate('/student/home');
          break;
        case 'TEACHER':
          Navigate('/teacher/home');
          break;
        default:
          Navigate('/');
          break;
      }
    } catch (error) {
      console.log('Authentication failed. Error:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dddddd' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2c79cb' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
