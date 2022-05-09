import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Post = ({ post }) => {

    return (
        <Card 
            sx={{
                maxWidth: '340px', 
                position: 'relative', 
                marginX: 1,
                marginBottom: 4,
                boxShadow: 0, 
                border: 1, 
                borderRadius: 5,
                borderColor: 'rgba(229, 231, 235, 0.7)',
                '&:hover': {
                    boxShadow: 5
                }
            }} 
        >
            <CardActionArea 
                sx={{ position: 'relative' }}
            >    
                <CardMedia
                    component='img'
                    alt={post.title}
                    title={post.title}
                    sx={{ height: '240px'}}
                    image={post.featuredImage}
                />    
                <Box 
                    component='div' 
                    sx={{ 
                        position: 'absolute', 
                        top: '0', 
                        left: '0', 
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                </Box>
                <Box component='div' sx={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 9 }}>
                    <Link to={'/users/' + post.author.id}>
                        <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                            
                                {post.author?.featuredAvatar ? (
                                    <Avatar src={post.author.featuredAvatar} alt={post.author.firstName} />
                                ) : (
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                )}
                                
                                <Typography variant='body1' color='white' component='h6' sx={{ paddingLeft: 1 }}>
                                    {post?.author ? `${post.author.firstName} ${post.author.lastName}` : ''}
                                </Typography>                               
                        </Box>    
                    </Link>  
                </Box>
            </CardActionArea>
            <CardContent>
                <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant='h6' component='div' className='hidden-text-2'>
                        {post.title}
                    </Typography>
                    <Typography gutterBottom variant='h6' component='div' color='blue'>
                        ${post.price}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions >
                <Grid container justifyContent='flex-end'>
                    <Link to={'/posts/' + post.id}>
                        <Button color="secondary">Detail</Button>
                    </Link>
                </Grid>
            </CardActions>
        </Card>
  );
};

export default Post;