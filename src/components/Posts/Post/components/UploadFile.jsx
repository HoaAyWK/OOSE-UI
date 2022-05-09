import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import {
    Button,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { storeage } from '../../../../services/firebase';
import PostService from '../../../../services/post.service';

const Input = styled('input')({
    display: 'none'
});

const UploadFile = ({ postId }) => {
    const [selectedFile, setSelectedFile] = useState();
    const [filePath, setFilePath] = useState();
    const [submited, setSubmited] = useState(false);

    useEffect(() => {
        PostService.getPostById(postId)
            .then((res) => {
                const data = res.data.content;
                if (data.assignment.status === 0) {
                    setSubmited(true);
                    setFilePath(data.assignment.filePath);
                }
            }, (err) => {
                console.log(err.response.data.message);
            })
    }, [postId]);

    const onSelectedFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedFile);
        if (selectedFile) {
            const storeageRef = ref(storeage, `files/${postId}/${selectedFile.name}`);
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
                        PostService.submitAssignment(postId, downloadURL)
                            .then((res) => {
                                setSubmited(true);
                                setSelectedFile(undefined);
                            }, (err) => {
                                console.log(err.response.data.message);
                            });
                    });
                }
            );
        }

    };

    return (
        <Box 
            component='form'
            onSubmit={handleSubmit}
            sx={{ 
                width: '100%',
                my: 3,
                display: 'flex',
                flexDirection: 'column',               
            }}
        >   
            {!submited && (
                <>
                    <label htmlFor='upload-assignment'>
                        <Input type='file' id='upload-assignment' onChange={onSelectedFile} />
                        <Button  component='span' variant='outlined' fullWidth>
                            <AddIcon fontSize='large' />
                            <Typography sx={{ ml: 2 }}>Upload File</Typography>
                        </Button >
                    </label>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            borderRadius: 5, 
                            border: '2px dashed rgba(222, 235, 245, 0.9)', 
                            height: 100,
                            mt: 2
                        }}
                    >
                        {selectedFile && (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                borderRadius: 5,
                                m: 1,
                                border: 1,
                                borderColor: 'rgba(0, 0, 0, 0.4)'

                            }}>
                                <Typography ml={1} variant='body1'>{selectedFile.name}</Typography>
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>                 
                            </Box>       
                        )}
                    </Box>
                </>
            )}
            {submited ? (
                <>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        m: 1,
                        border: 1,
                        borderColor: 'rgba(0, 0, 0, 0.4)'

                    }}>
                        <a href={filePath} target='_blank' download>
                            <Typography variant='body1' p={2}>
                                Submited File
                            </Typography>                            
                        </a>          
                    </Box>  
                    <Button 
                        variant='contained'
                        color='success'
                        sx={{ mt: 3, mb: 2, borderRadius: 5}}
                    >
                        Submited
                    </Button>
                </>               
            ) : (
            <Button
                type='submit'
                variant='contained'
                color='secondary'
                sx={{ mt: 3, mb: 2, borderRadius: 5}}
            >
                Submit Assignment
            </Button>
            )}
        </Box>       
    );
};

export default UploadFile;