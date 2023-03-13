import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAuth} from "../components/AuthProvider.jsx";
import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {sha1} from 'crypto-hash';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const theme = createTheme();

function LoginPage() {
    const {onLogin, setAuthData} = useAuth();
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClick = () => {
        setOpenAlert(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get('email'),
            password: formData.get('password'),
        };

        data.password = await sha1(data.password)

        let ok = await onLogin(data.username, data.password)
        setError(!ok);
        handleClick();
        if (ok) setLoading(true)
    };

    useEffect(() => {
        const authData = localStorage.getItem('auth-data');
        if (authData) {
            setAuthData(authData)
        }
        setLoading(false)
    })

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                {isLoading ?
                    <Box sx={{
                        height: 100 + 'vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CircularProgress size={60}/>
                    </Box>
                    :
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                minLength={5}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                }
                <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose}>
                    {isError ? (
                        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                            Incorrect password,
                            do not mess with me!
                        </Alert>
                    ) : (
                        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                            Login successful!
                            Welcome to the club, buddy!
                        </Alert>
                    )
                    }
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;