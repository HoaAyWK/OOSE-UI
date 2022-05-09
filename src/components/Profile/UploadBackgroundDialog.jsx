import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import {
    Box, 
    Button,
    Container,
    Dialog,
    DialogTitle,
    Typography
} from '@mui/material';

import FileUpload from '../Dashboard/components/FileUpload';
import { storeage } from '../../services/firebase';
import UserService from '../../services/user.service';

const UploadBackgroundDialog = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { onClose, open, onSelectedBackground } = props;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedFile);
        if (selectedFile) {
            const storeageRef = ref(storeage, `files/${currentUser.userId}/background/${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storeageRef, selectedFile);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log('Somethin went wrong');
                            break;
                    }
                }, 
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        UserService.updateBackground(currentUser.userId, downloadURL)
                            .then((res) => {
                                onSelectedBackground(downloadURL);
                                onClose();
                            }, (err) => {
                                console.log(err.response.data.message);
                            });
                    });
                }
            );
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handleSelectedFile = (file) => {
        setSelectedFile(file);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth='xs' fullWidth>
            <DialogTitle>Upload Background</DialogTitle>
            <Container maxWidth='xl'>
                <Box 
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{ 
                        width: '100%', 
                    }}
                >   
                    <Box 
                        sx={{
                            width:'100%',
                            border: 1, 
                            borderColor: 'rgba(0, 0, 0, 0.2)', 
                            borderRadius: 5, 
                            pb: 2,
                        }}
                    >
                        <Typography variant='body1' textAlign='center' mt={2}>
                            Background
                        </Typography>
                        <FileUpload selectedFile={selectedFile} onSelect={handleSelectedFile} />
                    </Box>
                    <Button type='submit' fullWidth variant='contained' color='secondary' sx={{ my: 2 }}>
                        Upload
                    </Button>
                </Box>
            </Container>
        </Dialog>
    );
};

export default UploadBackgroundDialog;