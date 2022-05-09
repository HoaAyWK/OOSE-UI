import React, { useState } from 'react';
import {
    Button,
    Box,
    Container,
    FormControl,
    InputLabel,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import FileUpload from './FileUpload';

const countries = [
    { value: 0, label: 'VietNam' },
    { value: 1, label: 'Singapore' },
    { value: 2, lalel: 'USA' },
    { value: 3, label: 'Australia' },
    { value: 4, label: 'Japan' }
];

const accountTypes = [
    { value: 0, label: 'Freelancer'},
    { value: 1, label: 'Customer'}
];

const UserForm = () => {
    const [value, setValue] = useState(new Date('2000-08-18T00:00:00'));
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedAccountType, setSelectedAccountType] = useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSelectedCountry = (e) => {
        setSelectedCountry(e.target.value);
    };
    
      const handleSeletedAccountType = (e) => {
        setSelectedAccountType(e.target.value);
    };

    return (
        <Container maxWidth='xl'>
            <Box sx={{ maxWidth: '100%' }} mt={8}>
                <Typography variant='h4' mb={4}>
                    Create New User
                </Typography>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12} container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <Box sx={{ width: '100%', border: 1, borderColor: 'rgba(220, 231, 245, 0.7)', p: 3, borderRadius: 5 }}>
                                <Typography variant='body1' textAlign='center'>
                                    Avatar
                                </Typography>
                                <FileUpload />
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Box sx={{ width: '100%', border: 1, borderColor: 'rgba(220, 231, 245, 0.7)', p: 3, borderRadius: 5 }}>
                                <Typography variant='body1' textAlign='center'>
                                    Background
                                </Typography>
                                <FileUpload />
                            </Box>
                        </Grid>
                    </Grid> 
                    <Grid item md={8} xs={12}>
                        <Box sx={{ width: '100%', border: 1, borderColor: 'rgba(220, 231, 245, 0.7)', p: 3, borderRadius: 5 }}>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        id='firstName'
                                        name='firstName'
                                        label='First Name'
                                        required
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        id='lastName'
                                        name='lastName'
                                        label='Last Name'
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        id='emali'
                                        name='emali'
                                        label='Email'
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        id='password'
                                        name='password'
                                        label='Password'
                                        required
                                        fullWidth
                                        type='password'
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        id='phone'
                                        name='phone'
                                        label='Phone'
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Birth Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id='country-label'>Country</InputLabel>
                                        <Select
                                            labelId='country-label'
                                            id='country'
                                            value={selectedCountry}
                                            label='Country'
                                            name='country'
                                            onChange={handleSelectedCountry}
                                        >
                                        {countries.map((country) => (
                                            <MenuItem key={country.value} value={country.value}>
                                                {country.label}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id='account-type'>Account Type</InputLabel>
                                        <Select
                                            labelId='account-type'
                                            id='country'
                                            value={selectedAccountType}
                                            label='Account Type'
                                            name='accountType'
                                            onChange={handleSeletedAccountType}
                                        >
                                        {accountTypes.map((accountType) => (
                                            <MenuItem key={accountType.value} value={accountType.value}>
                                                {accountType.label}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='flex-end' mt={3}>
                                <Grid item>
                                    <Button variant='contained' sx={{ borderRadius: 3 }}>
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>   
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserForm;