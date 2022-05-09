import React, { useEffect, useState, useRef } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    InputAdornment,
    InputLabel,
    Grid,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    Select
} from '@mui/material';

import FileUpload from '../Dashboard/components/FileUpload';
import CategoryService from '../../services/category.service';
import { storeage } from '../../services/firebase';
import PostService from '../../services/post.service';

const CreatePostDialog = (props) => {
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { open, onClose, onLoadPosts } = props;

    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const durationRef = useRef();
    const categoryRef = useRef();

    useEffect(() => {
        CategoryService.getCategories()
            .then((res) => {
                if (res.data.content) {
                    setCategories(res.data.content);
                    setSelectedCategory(res.data.content[0].id);
                }
            }, (err) => {
                console.log(err.response.data.message);
            });
    }, []);

    const handleSelectedCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handeleSelectedFile = (file) => {
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const price = priceRef.current.value;
        const duration = durationRef.current.value;
        const category = categoryRef.current.value;

        if (selectedFile) {
            const storeageRef = ref(storeage, `files/${currentUser.userId}/posts-image/${selectedFile.name}`);
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
                        PostService.createPost(
                            title,
                            description,
                            downloadURL,
                            price,
                            duration,
                            [category]
                        ).then((res) => {
                            if (res.data.id) {
                                PostService.getCustomerLoggedInPosts()
                                    .then((response) => {
                                        if (response.data.content) {
                                            onLoadPosts(response.data.content);
                                        }
                                    }, (e) => {
                                        console.log(e.response.data.message);
                                    });
                            }
                            onClose();
                        }, (err) => {
                            console.log(err.response.data.message);
                        });
                    });
                }
            );
        }
    };

    return (
        <Dialog onClose={onClose} open={open} maxWidth='xl' fullWidth>
            <DialogTitle>Create Post</DialogTitle>
            <Container maxWidth='xl'>
                <Box component='form' onSubmit={handleSubmit}>
                    <Grid container maxWidth='xl' spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Box 
                                sx={{ 
                                    width: '100%', 
                                    border: 1, 
                                    borderColor: 'rgba(0, 0, 0, 0.2)', 
                                    borderRadius: 5, 
                                    pb: 2 
                                }}
                            >
                                <Typography variant='body1' textAlign='center' mt={2}>
                                    Featured Image
                                </Typography>
                                <FileUpload selectedFile={selectedFile} onSelect={handeleSelectedFile} />
                            </Box>
                        </Grid>
                        <Grid item md={8} xs={12} container maxWidth='xl' spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    id='title'
                                    name='title'
                                    label='Title'
                                    required
                                    fullWidth
                                    autoFocus  
                                    inputRef={titleRef}                                
                                />    
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    id='description'
                                    name='description'
                                    label='Description'
                                    fullWidth
                                    required
                                    multiline
                                    rows={8}
                                    inputRef={descriptionRef}
                                />
                            </Grid>
                            <Grid item container spacing={2} maxWidth='xl'>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id='price'
                                        name='price'
                                        label='Price'
                                        fullWidth
                                        required
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                        }}
                                        inputRef={priceRef}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        id='Duration'
                                        name='Duration'
                                        label='Duration'
                                        required
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">day(s)</InputAdornment>,
                                        }}
                                        inputRef={durationRef}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='category-labe'>
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId='category-label'
                                        id='category'
                                        value={selectedCategory}
                                        label='Category'
                                        name='category'
                                        onChange={handleSelectedCategory}
                                        inputRef={categoryRef}
                                    >
                                    {categories?.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-end'>
                        <Box 
                            sx={{
                                display: 'flex',
                                aligItems: 'center',
                                my: 2
                            }}
                        >
                            <Button color='secondary' type='submit' size='large' sx={{ mr: 2 }}>
                                Create
                            </Button>
                            <Button color='primary' size='large' onClick={onClose}>
                                Close
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </Container>
        </Dialog>
    );
};

export default CreatePostDialog;