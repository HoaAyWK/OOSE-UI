import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Container,
  Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { freelancerRegister, customerRegister } from '../slices/auth';
import { clearMessage } from '../slices/message';


import countries from '../data/countries';

const accountTypes = [
  { value: 'Freelancer'},
  { value: 'Customer'}
];

const SignUp = (props) => {
  const [selectedCountry, setSelectedCountry] = useState('Viet Nam');
  const [selectedAccountType, setSelectedAccountType] = useState('Freelancer');
  const [value, setValue] = useState(new Date('2000-08-18T00:00:00'));
  const [loading, setLoading] = useState(false);

  const { isSignedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch])

  const firstNameEl = useRef();
  const lastNameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const repeatPasswordEl = useRef();
  const dateOfBirthEl = useRef();
  const phoneEl = useRef();
  const addressEl = useRef();
  const countryEl = useRef();
  const accountTypeEl = useRef();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = firstNameEl.current.value;
    const lastName = lastNameEl.current.value;
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    const repeatPassword = repeatPasswordEl.current.value;
    const phone = phoneEl.current.value;
    const dateOfBirth = dateOfBirthEl.current.value;
    const address = addressEl.current.value;
    const country = countryEl.current.value;
    const accountType = accountTypeEl.current.value;

    setLoading(true);
    // Freelancer Register
    if (accountType === accountTypes[0].value) {
      dispatch(freelancerRegister({ email, password, firstName, lastName,
        phone, dateOfBirth, address, country}))
        .unwrap()
        .then(() => {         
          props.history.push('/');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
    else {
      dispatch(customerRegister({ email, password, firstName, lastName,
        phone, dateOfBirth, address, country}))
        .unwrap()
        .then(() => {
          props.history.push('/');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  if (isSignedIn) {
    return <Navigate to='/' />;
  }

  const handleSelectedCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSeletedAccountType = (e) => {
    setSelectedAccountType(e.target.value);
  };

  return (
    <Container component='main' maxWidth='sm' >
      <CssBaseline />
      <Box 
        sx={{ 
          marginTop: 8,
          display: 'flex',
          padding: 4,
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 5
          
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                id='firstName'
                name='firstName'
                label='First Name'
                required
                fullWidth
                autoFocus
                inputRef={firstNameEl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                id='lastName'
                name='lastName'
                label='Last Name'
                required
                fullWidth
                inputRef={lastNameEl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id='email'
                name='email'
                label='Email'
                required
                fullWidth
                type='email'
                autoComplete='email'
                inputRef={emailEl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id='password'
                name='password'
                label='Password'
                required
                fullWidth
                type='password'
                autoComplete='new-password'
                inputRef={passwordEl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id='repeatPassword'
                name='repeatPassword'
                label='Repeat Password'
                required
                fullWidth
                type='password' 
                inputRef={repeatPasswordEl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                id='phone'
                name='phone'
                label='Phone'
                required
                fullWidth
                inputRef={phoneEl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  inputRef={dateOfBirthEl}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id='address'
                name='address'
                label='Address'
                required
                fullWidth
                inputRef={addressEl}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='country-label'>Country</InputLabel>
                <Select
                  labelId='country-label'
                  id='country'
                  value={selectedCountry}
                  label='Country'
                  name='country'
                  onChange={handleSelectedCountry}
                  inputRef={countryEl}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id='account-type'>Account Type</InputLabel>
                <Select
                  labelId='account-type'
                  id='country'
                  value={selectedAccountType}
                  label='Account Type'
                  name='accountType'
                  onChange={handleSeletedAccountType}
                  inputRef={accountTypeEl}
                >
                  {accountTypes.map((accountType) => (
                    <MenuItem key={accountType.value} value={accountType.value}>
                      {accountType.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <LoadingButton 
            type='submit' 
            fullWidth 
            variant='contained' 
            loading={loading}
            sx={{ mt: 3, mb: 2}}
          >
              Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/signin'>
                <Typography variant='body1'>
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;