import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box, 
    Card, 
    CardContent,
    CardMedia, 
    Typography, 
    Button 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SecondaryPost = ({ post }) => {
    
    return (
        <Card
            sx={{
                display: 'flex',
                boxShadow: 0,
                border: 1, 
                borderRadius: 5,
                width: '100%',
                borderColor: 'rgba(229, 231, 235, 0.7)',
                '&:hover': {
                    boxShadow: 5
                },
                padding: 1
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <CardContent sx={{ flex: '1  0 auto' }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Box component='div' sx={{ display: 'flex', marginBottom: 1 }}>
                                {post?.postCategories?.map((pc) => (
                                    <Link to={'/categories' + pc.category.id} key={pc.category.id}>
                                        <Button sx={{ borderRadius: 5, marginRight: 1 }} variant='outlined' color='primary'>
                                            <Typography variant='body2' component='p' sx={{ fontSize: '0.8rem', textTransform: 'capitalize'}}>
                                                {pc.category.name}
                                            </Typography>
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                            <Typography variant='h6' component='h6' marginY={2}>
                                {post.title}
                            </Typography>
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
                                        {post?.author?.featuredAvatar ? (
                                            <Avatar src={post.author.featuredAvatar} alt={post.author.firstName} />
                                        ) : (
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        )}
                                        
                                        <Typography variant='body1' color='black'  component='h6' sx={{ paddingLeft: 1 }}>
                                            {post?.author ? `${post.author.firstName} ${post.author.lastName}` : ''}
                                        </Typography>
                                    </Box>
                                </Link>
                            )}
                            <Box conponent='div' justifyContent='flex-end' mt={2}>
                                <Link to={'/posts/' + post.id}>
                                    <Button color="secondary" variant='outlined' sx={{ mr: 2, borderRadius: 3 }}>Detail</Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>  
            </Box>
            <CardMedia
                component='img'
                height='200'
                sx={{ width: 250, borderRadius: 5 }}
                image={post.featuredImage}
                alt={post.title}
            />
        </Card>
    );
}

export default SecondaryPost;