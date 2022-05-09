import React from 'react';
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import Broad from '../../images/Board.jpg';

const Mainboard = () => {
  return (
    <Card
        sx={{
            display: 'flex',
            boxShadow: 0,
            border: 1, 
            borderRadius: 5,
            height: 400,
            width: '100%',
            bgcolor: 'rgb(200 250 205)',
            borderColor: 'rgba(229, 231, 235, 0.7)',
            '&:hover': {
                boxShadow: 5
            },
            padding: 1,
            m: 4
        }}
    >   
        <Grid container>
            <Grid item xs={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1', height: '100%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <CardContent>
                        <Typography variant='h4'>
                            Welcome Back!
                        </Typography>
                        <Typography variant='h4'>
                            Sioay
                        </Typography>
                    </CardContent>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <CardMedia 
                    sx={{ width: '100%', height: 200 }}
                    component='img'
                    image='https://img.freepik.com/free-vector/flat-design-content-management-system-illustration_23-2148825230.jpg?size=338&ext=jpg&ga=GA1.2.1698350317.1649862529'
                />
            </Grid>
        </Grid>        
    </Card>
  );
};



export default Mainboard;