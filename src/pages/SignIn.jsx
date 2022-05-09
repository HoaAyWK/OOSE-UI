import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
    Avatar, 
    Box, 
    Button, 
    Checkbox, 
    Container, 
    CssBaseline, 
    FormControlLabel, 
    Grid, 
    Typography, 
    TextField 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';


import { signIn } from '../slices/auth';
import { clearMessage } from '../slices/message';
import { setAvatar } from '../slices/avatar';

const SignIn = (props) => {
    const [loading, setLoading] = useState(false);
    const emailEl = useRef();
    const passwordEl = useRef();
    const { isSignedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = emailEl.current.value;
        const passwordValue = passwordEl.current.value;
        console.log(emailValue, passwordValue);

        setLoading(true);
        dispatch(signIn({ email: emailValue, password: passwordValue }))
            .unwrap()
            .then(() => {        
                props.history.push('/');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            }
        );
    }

    if (isSignedIn) {
        return <Navigate to='/' />;
    }

    return (
       <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <Box 
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    padding: 4,
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 5
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: 3 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5' component='h1'>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailEl}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        inputRef={passwordEl}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />                   
                    <LoadingButton 
                        type='submit' 
                        fullWidth 
                        variant='contained' 
                        loading={loading}
                        sx={{ mt: 3, mb: 2}}
                    >
                        Sign In
                    </LoadingButton>                    
                    <Grid container sx={{ marginBottom: 2 }}>
                        <Grid item xs>
                            <Link to={'/'}>
                                <Typography variant='body1' color='blue'>
                                    Forgot password
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/signup'}>
                                <Typography variant='body1' color='blue'>
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
       </Container>
    );
}

export default SignIn;