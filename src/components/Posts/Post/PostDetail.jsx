import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { 
    AppBar,
    Avatar,
    Container,
    Box,
    Button,
    Divider,
    Grid,
    Typography,
    Card,
    CardMedia
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import UploadFile from './components/UploadFile';
import ListFreelancerDialog from './ListFreelancerDialog';
import PostService from '../../../services/post.service';


const Input = styled('input')({
    display: 'none'
});

const PostDetail = ({ post, onReload }) => {
    const [showAuthorCard, setshowAuthorCard] = useState(false);
    const [showPostRequests, setShowPostRequests] = useState(false);
    const [selected, setSelected] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [color, setColor] = useState('secondary');
    const [open, setOpen] = useState(false);
    const [selectedFreelancer, setSelectedFreelancer] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser?.roles.includes('Freelancer'))
        {
            setshowAuthorCard(true);
        }
        if (currentUser?.roles.includes('Customer')) {
            setShowPostRequests(true);
        }
        if (post.freelancerId) {
            setSelectedFreelancer(true);
        }
        if (post.postRequests)
        {
            for (let i = 0; i < post.postRequests.length; i++) {
                console.log(post.postRequests[i].freelancerId);
                console.log(currentUser.userId);
                if (post.postRequests[i].freelancerId === currentUser.userId)
                {
                    setSelected(1);
                    setColor('warning');
                }
            }
            if (post.freelancerId === currentUser?.userId) {
                setSelected(2);
                setProcessing(true);
            }
            if (post.status === 0) {
                setSelected(3);
            }
        }

       
    }, [post.postRequests, post.freelancerId, currentUser]);
    
    const handleSelected = () => {
        if (selected === 0) {
                PostService.selectPost(post.id)
                .then((res) => {
                    if (res.data.isSuccess) {
                        setSelected(1);
                        setColor('warning');
                    }
                }, (err) => {
                    console.log(err.response.data.message);
                }
            );
        }
        else if (selected === 1) {
            PostService.unselectPost(post.id, currentUser.userId)
                .then((res) => {
                    if (res.data.isSuccess) {
                        setSelected(0);
                        setColor('secondary');
                    }
                }, (err) => {
                    console.log(err.response.data.message);
                }
            );
        } else {
            setColor('success');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectFreelancer = () => {
        setSelectedFreelancer(true);
        onReload();
    };

    console.log(post);
    return (
        <Container maxWidth='xl'>
            {post?.featuredImage ? 
                <Card>
                    <CardMedia component='img' image={post.featuredImage} height='300' />
                </Card> : 
                <Box sx={{ width: '100%', height: 300, bgcolor: '#ccc' }} />}
            <Grid container spacing={2} mt={8} mb={4}>
                <Grid item container xs={12} md={8}>
                    <Box sx={{ width: '100%', p: 3, borderRadius: 5, border: 1, borderColor: 'rgb(223, 231, 242, 0.8)' }}>
                        <Typography variant='h5' my={2}>
                            {post.title}
                        </Typography>
                        <Divider />
                        <Typography variant='h6' mt={2}>
                            Details
                        </Typography>
                        <Typography variant='body1' my={2} lineHeight={2}>
                            {post.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} >
                    <AppBar 
                        sx={{ 
                            width: '100%', 
                            border: 1, 
                            borderRadius: 5, 
                            borderColor: 'rgb(223, 231, 242, 0.8)', 
                            p: 3,
                            top: 24,
                            boxShadow: 0,
                        }}
                        position='sticky' 
                        color='inherit'
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <Box sx={{ width: '100%', my: 2, display: 'flex', alignItems: 'center' }}>
                                    <AccessTimeIcon />
                                    <Typography variant='h6' ml={1}>
                                        {post.duration > 1 ? post.duration + ' days' : post.duration +  ' day' }  
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={6} container>
                                <Grid item justifyContent='flex-end' sx={{ my: 2 }}>
                                    <Typography variant='h6' color='primary'>
                                        ${post.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            {post?.postCategories?.map((pc) => (
                                <Button key={pc.category.id} variant='outlined' size='small' color='primary' sx={{ borderRadius: 3, mr: 1 }}>
                                    {pc.category.name}
                                </Button>
                            ))}
                        </Box>  
                        {showPostRequests && !selectedFreelancer && (<>
                            <Button
                                fullWidth
                                variant='contained'
                                color='secondary'
                                sx={{ mt: 3, mb: 2, borderRadius: 5}}
                                onClick={handleClickOpen}
                            >
                                Freelancer Requests
                            </Button>
                            <ListFreelancerDialog 
                                onClose={handleClose} 
                                open={open} 
                                onSelectFreelancer={handleSelectFreelancer}
                                postId={post.id} 
                                postRequests={post.postRequests}
                            />
                        </>
                        )} 
                        {showPostRequests && selectedFreelancer && (
                            <Box 
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    bgcolor: 'rgba(234, 245, 251, 0.7)',
                                    borderRadius: 5,
                                    mt: 2,
                                    pb: 2
                                }}
                            >
                                <Typography variant='h6' my={2} align='center'>Freelancer</Typography>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        width: '90%',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                            
                                    }}
                                >
                                    <Box 
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {post?.freelancer?.featuredAvatar ? (
                                                <Avatar src={post.author.featuredAvatar} sx={{ width: 50, height: 50 }} /> 
                                            ) : (
                                                <Avatar sx={{ width: 50, height: 50 }}>
                                                    <AccountCircleIcon />
                                                </Avatar>
                                            )}
                                        </Box>
                                    <Typography variant='body1' ml={2}>
                                        {post?.freelancer ? `${post.freelancer.firstName} ${post.freelancer.lastName}` : ''}
                                    </Typography>
                                    </Box>
                                    <Button variant='contained' size='small' color='secondary'>Detail</Button>
                                </Box>
                            </Box>
                        )}
                        {!showPostRequests && (
                            <Button
                                fullWidth
                                disabled={processing}
                                variant='contained'
                                onClick={handleSelected}
                                color={color}
                                sx={{ mt: 3, mb: 2, borderRadius: 5}}
                            >
                                {selected === 0 && (<Typography>Select</Typography>)}
                                {selected === 1 && (<Typography>Pending</Typography>)}
                                {selected === 2 && (<Typography>Processing</Typography>)}
                                {selected === 3 && (<Typography>Done</Typography>)}
                            </Button>                        
                        )}
                        {processing  && (
                            <UploadFile postId={post.id} />                  
                        )}  
                    </AppBar>
                </Grid>
            </Grid>
            {showAuthorCard && (
            <Grid container spacing={2} my={4}>
                <Grid container item xs={12} md={8}>
                    <Box sx={{
                        width: '100%',
                        border: 1,
                        borderRadius: 5,
                        borderColor: 'rgb(223, 231, 242, 0.8)',
                        p: 3
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {post.author ? (
                                    <Avatar src={post.author.featuredAvatar} sx={{ width: 100, height: 100 }} />                                   
                                ) : (
                                    <Avatar sx={{ width: 100, height: 100 }}>
                                        <Box sx={{
                                            width: 100,
                                            heigth: 100,
                                            bgcolor: '#000',
                                            borderRadius: '50%'
                                        }}
                                        ></Box>
                                    </Avatar>
                                )}
                                
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant='h6' mb={4}>
                                    {post?.author ? `${post.author.firstName} ${post.author.lastName}` : ''}
                                </Typography>
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                                    <Typography variant='h6'>
                                        Phone: {post.author ? post.author.phone : '999999999999'}
                                    </Typography>
                                    <Typography variant='h6' ml={5}>
                                        Email: {post.author ? post.author.email : 'demo@gmail.com'}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    
                </Grid>
            </Grid>
            )}
        </Container>
    );
};

export default PostDetail;