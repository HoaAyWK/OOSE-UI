import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, 
    Button,
    Container, 
    Dialog, 
    DialogTitle, 
    FormControl,
    InputLabel,
    Grid, 
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import UserService from '../../services/user.service';
import countries from '../../data/countries';

const UpdateDialog = (props) => {
    const [value, setValue] = useState(new Date('2000-08-18T00:00:00'));
    const [selectedCountry, setSelectedCountry] = useState('Viet Nam');
    const { user: currentUser } = useSelector((state) => state.auth);
    const { onClose, open, onUpdateUser, user } = props;

    const firstNameEl = useRef();
    const lastNameEl = useRef();
    const phoneEl = useRef();
    const dateOfBirthEl = useRef();
    const addressEl = useRef();
    const countryEl = useRef();

    useEffect(() => {
        setValue(new Date(user.dateOfBirth));
        setSelectedCountry(user.country);
    }, [user]);
    const handleClose = () => {
        onClose();
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSelectedCountry = (e) => {
        setSelectedCountry(e.target.value);
    };
        

    const handleSubmit = (e) => {
        e.preventDefault();
        const firstName = firstNameEl.current.value;
        const lastName = lastNameEl.current.value;
        const phone = phoneEl.current.value;
        const address = addressEl.current.value;
        const dateOfBirth = dateOfBirthEl.current.value;
        const country = countryEl.current.value;

        console.log(firstName, lastName, phone, dateOfBirth, address, country);
        UserService.updateInfo(
            currentUser.userId,
            firstName,
            lastName,
            phone,
            dateOfBirth,
            address,
            country
        ).then((res) => {
            if (res.data.content) {
                onUpdateUser(res.data.content);
            }
        }, (err) => {
            console.log(err.response.data.message);
        });
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth='md'>
            <DialogTitle>Edit Information</DialogTitle>
            <Container maxWidth='lg'>
                <Box component='form'>
                    <Grid container maxWidth='lg' spacing={2}>                      
                        <Grid item xs={12}>
                            <TextField 
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                required
                                fullWidth
                                defaultValue={user.firstName}
                                autoFocus
                                inputRef={firstNameEl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='lastName'
                                name='lastName'
                                label='LastName Name'
                                required
                                defaultValue={user.lastName}
                                fullWidth
                                inputRef={lastNameEl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='phone'
                                name='phone'
                                label='Phone'
                                required
                                defaultValue={user.phone}
                                fullWidth
                                inputRef={phoneEl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Birth Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                    inputRef={dateOfBirthEl}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='address'
                                name='address'
                                label='Address'
                                required
                                defaultValue={user.address}
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
                    </Grid>
                </Box>
                <Grid container justifyContent='flex-end' my={1}>
                    <Button size='large' onClick={handleSubmit}  color='secondary'>Save</Button>
                    <Button size='large' onClick={handleClose}>Close</Button>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default UpdateDialog;