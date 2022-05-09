import React from 'react';
import { Container, Box, Grid, Typography, List, ListItem } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const communities = [
    'Discussion',
    'Contributing',
    'Concurrent',
    'API Reference'
];

const Footer = () => {
    return (
        <Container component='footer' maxWidth='false' sx={{ bgcolor: '#eceff1', padding: 10 }}>
            <Grid container>
                <Grid item xs={6} >
                    <Box 
                        component='div'
                    >
                        <Typography variant='h4'>
                            OpenRequest
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant='h5' component='h5'>
                        Community
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        {communities.map((item, index) => (
                            <ListItem key={index} sx={{ paddingX: 0 }}>{item}</ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h5' component='h5'>
                            About Us
                        </Typography>
                        <List sx={{ display: 'flex' }}>
                            <ListItem>
                                <FacebookIcon fontSize='large' sx={{ color: 'rgb(71 89 147)' }}/>
                            </ListItem>
                            <ListItem>
                                <GitHubIcon fontSize='large'/>
                            </ListItem>
                            <ListItem>
                                <TwitterIcon fontSize='large' color='primary'/>
                            </ListItem>
                            <ListItem>
                                <InstagramIcon fontSize='large' color='error'/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Footer;