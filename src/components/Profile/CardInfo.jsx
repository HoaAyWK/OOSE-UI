import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CardInfo = ({ user }) => {
    return (
        <Container maxWidth='xl'>
            <Grid container maxWidth='xl' mb={4} spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Box 
                        sx={{ 
                            width: '100%',
                            border: 2,
                            borderColor: 'rgba(222, 231, 245, 0.8)',
                            borderRadius: 5,
                        }}
                    >
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            my={3}
                            mx={4}
                        >
                            <EventAvailableIcon fontSize='large' />
                            <Typography variant='h6' sx={{ fontWeight: 300 }} ml={2}>
                                Joined {user.createdDate}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box 
                        sx={{ 
                            width: '100%',
                            border: 2,
                            borderColor: 'rgba(222, 231, 245, 0.8)',
                            borderRadius: 5,
                        }}
                    >
                         <Typography variant='h4' textAlign='center' mt={2}>
                            About
                        </Typography>
                        <Grid container maxWidth='xl' my={3} mx={4}>
                            <Grid item xs={12} sm={6}> 
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} 
                                >
                                    <EmailIcon />
                                    <Typography variant='h6' sx={{ fontWeight: 300 }} ml={1}>
                                        Email: {user.email}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} 
                                >
                                    <PhoneIcon />
                                    <Typography variant='h6' sx={{ fontWeight: 300 }} ml={1}>
                                        Phone: {user.phone}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} 
                                >
                                    <CalendarTodayIcon />
                                    <Typography variant='h6' sx={{ fontWeight: 300 }} ml={1}>
                                        Birth Date: {user.dateOfBirth}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} 
                                >
                                    <LocationOnIcon />
                                    <Typography variant='h6' sx={{ fontWeight: 300 }} ml={1}>
                                        Address: {user.address}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} 
                                >
                                    <PublicIcon />
                                    <Typography variant='h6' sx={{ fontWeight: 300 }} ml={1}>
                                        Country: {user.country}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CardInfo;