import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material';

const Category = ({ category }) => {
    return (
        
        <Card
            sx={{ 
                minWidth: 100, 
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
            <Link to='/'>
                <CardContent>
                    <Typography variant='h6' component='h6' textAlign='center'>
                        {category.name}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
        
    );
};

export default Category;