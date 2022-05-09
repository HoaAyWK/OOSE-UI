import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardMedia, Container, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import UploadBackgroundDialog from './UploadBackgroundDialog';
import UploadAvatarDialog from './UploadAvatarDialog';

const Banner = ({ user }) => {
    const [openUploadAvatar, setOpenUploadAvatar] = useState(false);
    const [openUploadBackground, setOpenUploadBackground] = useState(false);
    const [userAvatar, setUserAvatar] = useState(user.featuredAvatar);
    const [userBackground, setUserBackground] = useState(user.featuredBackground);

    const handleClickOpenAvatar = () => {
        setOpenUploadAvatar(true);
    };

    const handleCloseUpdateAvatar = () => {
        setOpenUploadAvatar(false);
    };

    const handleClickOpenUpdateBackground = () => {
        setOpenUploadBackground(true);
    };

    const handleCloseUpdateBackground = () => {
        setOpenUploadBackground(false);
    };

    const onSelectedAvatar = (filePath) => {
        setUserAvatar(filePath);
    };

    const onSelectedBackground = (filePath) => {
        setUserBackground(filePath);
    };

    return (
        <Container maxWidth='xl'>
            <Box sx={{ maxWidth: '100%', height: '300', position: 'relative', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                {userBackground ? 
                <Card
                    sx={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
                >
                    <CardMedia 
                        component='img' 
                        image={userBackground} 
                        height='300' 
                        sx={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
                    />
                </Card> : 
                <Box sx={{ 
                        width: '100%', 
                        height: 300, 
                        bgcolor: '#ccc', 
                        borderBottomLeftRadius: 25, 
                        borderBottomRightRadius: 25 
                    }} 
                />}
                <Box 
                    sx={{ 
                        width: '100%', 
                        height: '100%', 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        borderBottomLeftRadius: 25, 
                        borderBottomRightRadius: 25 
                    }} 
                />
                <Box sx={{ position: 'absolute', top: '45%', left: '2%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {userAvatar ? 
                        (<Box 
                            sx={{ 
                                width: 150,
                                height: 150, 
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 1,
                                boxShadow: 2,
                                borderRadius: '50%'
                            }}
                        >
                            <Avatar src={userAvatar} alt={user.firstName} sx={{ width: '90%', height: '90%' }} />
                        </Box>
                        ) 
                        :
                        (<Box sx={{ 
                                width: 150, 
                                height: 150, 
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 1,
                                borderColor: 'rgba(234, 241, 250, 0.7)',
                                borderRadius: '50%',
                                boxShadow: 2
                            }}
                        >
                            <Avatar sx={{ width: '90%', height: '90%' }}>
                                <AccountCircleIcon />
                            </Avatar>
                        </Box>)}
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography color='white' variant='h4' ml={2}>
                                {user ? `${user.firstName} ${user.lastName}` : ''}
                            </Typography>
                            <Button 
                                variant='contained' 
                                sx={{ mt: 2, ml: 2 }} 
                                onClick={handleClickOpenAvatar}
                            >
                                <AddAPhotoIcon />
                            </Button>
                            <UploadAvatarDialog 
                                onClose={handleCloseUpdateAvatar} 
                                open={openUploadAvatar} 
                                onSelectedAvatar={onSelectedAvatar} 
                            />
                        </Box>
                    </Box>
                </Box>
                <Box 
                    sx={{ position: 'absolute', top: '80%', left: '92%'}}
                >
                    <Button variant='contained' onClick={handleClickOpenUpdateBackground} sx={{ borderRadius: 3 }}>
                        <PhotoCameraIcon />
                    </Button>
                    <UploadBackgroundDialog 
                        open={openUploadBackground} 
                        onClose={handleCloseUpdateBackground} 
                        onSelectedBackground={onSelectedBackground}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Banner;