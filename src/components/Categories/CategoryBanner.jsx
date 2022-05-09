import React from 'react';
import { Box, Typography, Grid , CardMedia, Card, CardContent } from '@mui/material';
const CategoryBanner = ({ category }) => {
    return (
        <Grid 
            container 
            marginY={8} 
            maxWidth='xl' 
            bgcolor='rgba(215, 229, 242, 0.2)'
            sx={{ borderRadius: 5 }}

        >
            {category.featuredImage ? 
                (<Grid item xs={12} sx={{ borderRadius: 5}}>
                    <Card 
                        sx={{ 
                            borderRadius: 5,
                            border: 1,
                            borderColor: 'rgba(221, 232, 255, 0.8)',
                            boxShadow: 0
                        }}
                    >
                        <CardMedia
                            component='img'
                            alt={category.name}
                            image={category.featuredImage}
                            height='300'
                            sx={{ 
                                borderTopLeftRadius:5,
                                borderTopRightRadius: 5,    
                            }}
                        />
                        <CardContent>
                            <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant='h4' textAlign='center'>
                                    {category.name}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>                  
                </Grid>
                )
            :  (<Grid item xs={12} paddingTop={8}>
                    <Typography variant='h4' textAlign='center'>
                        {category.name}
                    </Typography>
                </Grid>)}
        </Grid>
    );
};

export default CategoryBanner;