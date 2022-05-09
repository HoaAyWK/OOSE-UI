import React, { useState } from 'react';
import {
    Box, 
    Container,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Post from './Post/Post';


const PostCarousel = ({ items }) => {
    const [sliderRef, setSliderRef] = useState(null);
    const sliderSettings = {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
    };
    return (
        <Container 
            component='div' 
            maxWidth='xl'
            sx={{
                bgcolor: '#e1f5fe',
                borderRadius: 5
            }}
        >
            <Grid container marginY={8} pt={4}>
                <Grid item sm={6}>
                    <Typography variant='h5'>
                        Web Development
                    </Typography>
                </Grid>
                <Grid item sm={6}>
                    <Grid container justifyContent='flex-end'>
                        <Box    
                            sx={{
                                display: 'flex'
                            }}
                        >
                            <IconButton 
                                aria-label='left' 
                                variant='contained' 
                                size="large"
                                onClick={sliderRef?.slickPrev}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton 
                                aria-label='right' 
                                variant='contained' 
                                size="large"
                                onClick={sliderRef?.slickNext}
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Box 
                component='div'
                marginBottom={8}
                paddingBottom={4}
            >
                <Slider ref={setSliderRef} {...sliderSettings}>
                    {items?.map((item) => (
                        <Post key={item.id} post={item} />
                    ))}
                </Slider>
            </Box>
        </Container>
    );
};

export default PostCarousel;