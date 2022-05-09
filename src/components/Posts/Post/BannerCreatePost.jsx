import React from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';

const BannerCreatePost = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                boxShadow: 0,
                border: 1, 
                borderRadius: 5,
                width: '100%',
                mt: 8,
                borderColor: 'rgba(225, 245, 254, 0.6)',
                backgroundColor: 'rgba(225, 245, 254, 0.6)',
                '&:hover': {
                    backgroundColor: 'rgba(225, 245, 254, 0.9)',
                    borderColor: 'rgba(225, 245, 254, 0.9)',
                }
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 3 }}>
                        <Box>
                            <Typography variant='h4' mb={4}>
                                Wanna Hire a Freelancer
                            </Typography>
                            <Button variant='outlined' sx={{ p: 3, borderRadius: 5 }}>
                                Create New Post
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    
                        <CardMedia
                            component='img'
                            height='500'
                            sx={{ width: '100%', borderTopRightRadius: 20, borderBottomRightRadius: 20  }}
                            image='https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?t=st=1651468324~exp=1651468924~hmac=984a9bab42b47c6a3665828f3d621ccbc98e77447f36e5f47341bc118b74ca09&w=900'
                        />
                </Grid>
            </Grid>
            
        </Box>
    );
};

export default BannerCreatePost;