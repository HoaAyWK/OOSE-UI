import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardMedia, CardContent, Grid, Typography } from '@mui/material';

const CategoryCard = ({ category }) => {
  return (
    <Card
        sx={{ 
            minWidth: 300,
            borderRadius: 3,
            marginX: 2,
            marginY: 1,
            boxShadow: 0, 
            border: 1, 
            borderColor: 'rgba(229, 231, 235, 0.7)',
            '&:hover': {
                boxShadow: 3
            } 
        }}
    >
        <Link to={'/categories/' + category.id}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    alt={category.name}
                    image={category.featuredImage}
                    sx={{
                        maxHeight: 140
                    }}
                />
                <CardContent>
                    <Grid container>
                        <Typography variant='h5' textAlign='center'>
                            {category.name}
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>    
        </Link>
    </Card>
  );
};

export default CategoryCard;