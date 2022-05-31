import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Container, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import UpdateDialog from '../components/Profile/UpdateDialog';
import Common from './Common';
import Banner from '../components/Profile/Banner';
import CardInfo from '../components/Profile/CardInfo';
import Posts from '../components/Posts/Posts';
import CreatePostDialog from '../components/Profile/CreatePostDialog';

import { startGetPostByCustomer } from '../slices/posts/postCreator';
import UserService from '../services/user.service';


const Profile = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const [user, setUser] = useState();
    const { isSignedIn, user: currentUser } = useSelector((state) => state.auth);
    const { avatar } = useSelector((state) => state.avatar);
    const { posts } = useSelector((state) => state.jobs)

    const dispatch = useDispatch()

    useEffect(() => {      
        dispatch(startGetPostByCustomer());
        UserService.getLoggedInUser()
            .then((res) => {
                if (res.data.content) {
                    setUser(res.data.content);
                }
            }, (err) => {
                console.log(err.response.data.message);
            })
    }, [currentUser?.userId, avatar, dispatch]);

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickOpenCreatPost = () => {
        setOpenCreatePost(true);
    };

    const handleCloseCreatPost = () => {
        setOpenCreatePost(false);
    };

    const onUpdateUser = (user) => {
        setUser(user);
    };

    if (!isSignedIn) {
        return <Navigate to='/' />;
    }
    return (
        <Common>
            {user && (<Banner user={user} />)}
            {user && (
                <Container maxWidth='xl'>
                    <Box 
                        sx={{ width: '100%', mt: 3, mb: 2 }}
                    >
                        <Grid container justifyContent='flex-end'>
                            <Button variant='contained' onClick={handleClickOpenEdit} sx={{ borderRadius: 3 }}>
                                <Typography variant='body1' mr={1}>Edit</Typography>
                                <EditIcon />
                            </Button>
                            <UpdateDialog 
                                open={openEdit} 
                                onClose={handleCloseEdit} 
                                user={user}
                                onUpdateUser={onUpdateUser}
                            />
                        </Grid>
                    </Box>
                </Container>
            )}
            {user && (<CardInfo user={user} />)}
            {user && 
            (<Container maxWidth='xl'>
                <Box sx={{ maxWidth: '100%', my: 8, bgcolor: 'rgba(229, 232, 246, 0.8)', p: 3, borderRadius: 5 }}>
                    <Box sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                        <Typography variant='h5'>Posts</Typography>
                        <Button 
                            variant='outlined' 
                            color='secondary' 
                            size='lagre' 
                            sx={{ borderRadius: 3 }}
                            onClick={handleClickOpenCreatPost}
                        >
                            Create Post
                        </Button>
                    </Box>
                    <CreatePostDialog 
                        open={openCreatePost} 
                        onClose={handleCloseCreatPost} 
                        // onLoadPosts={onLoadPosts}
                    />
                    {posts ? (
                        <Posts posts={posts} sx={{ my: 4 }} />
                    ) : (<div></div>)}
                </Box>
            </Container>)}
        </Common>
    );
};

export default Profile;