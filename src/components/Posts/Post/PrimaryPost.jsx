import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './mainPost.css';


const PrimaryPost = ({ post }) => {
    return (
        <Card 
            sx={{
                width: '100%', 
                borderRadius: 5, 
                boxShadow: 0, 
                border: 1,
                height: 745,
                borderColor: 'rgba(229, 231, 235, 0.7)',
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >   
            <Link to={'/posts/' + post.id}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height='450'
                        image={post.featuredImage}
                        alt={post.title}
                    />
                </CardActionArea>
            </Link>
            <CardContent sx={{ paddingX: 3 }}>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Box component='div' sx={{ display: 'flex', marginBottom: 2 }}>
                            {post?.postCategories?.map((pc) => (
                                <Link key={pc.category.id} to={'/categories/' + pc.category.id}>
                                    <Button sx={{ borderRadius: 5, marginRight: 1 }} variant='outlined' key={pc.category} color='warning'>
                                        <Typography variant='body2' component='p' sx={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>
                                            {pc.category.name}
                                        </Typography>   
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Typography className='hidden-text' variant='h4' component='h4' sx={{ fontWeight: 700 }}>
                            {post.title}
                        </Typography>
                    </Box>
                    <Box 
                        component='div' 
                        className='hidden-text'
                        marginY={2}
                    >
                        {post.description}
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    {post.author && (
                        <Link to={'/users/' + post.author.id}>
                            <Box 
                                component='div'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 2
                                }}
                            >
                                {post?.author?.featuredAvatar ? 
                                    (<Avatar src={post.author.featuredAvatar} alt={post.author.firstName} sx={{ width: 50, height: 50}}/>) 
                                    : (
                                    <Avatar sx={{ width: 50, height: 50}}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                )}
                                <Typography variant='h6' component='h6' color='black' sx={{ paddingLeft: 1, fontWeight: 400 }}>
                                    {post?.author ? `${post.author.firstName} ${post.author.lastName}` : ''}
                                </Typography>                                  
                            </Box>
                        </Link>  
                    )}
                    <Box conponent='div' justifyContent='flex-end' sx={{ py: 2 }}>
                        <Link to={'/posts/' + post.id}>
                            <Button size='large' variant='contained' color='secondary' sx={{ borderRadius: 3 }}>Detail</Button>
                        </Link>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PrimaryPost;