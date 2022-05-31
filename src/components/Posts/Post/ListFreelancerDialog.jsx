import React from 'react';
import {
    Avatar,
    Button,
    Box,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PostService from '../../../services/post.service';

const ListFreelancerDialog = (props) => {
    const { open, onClose, postRequests, postId, onSelectFreelancer } = props;
    
    const handleClick = (e) => {
        const freelancerId = e.target.value;
        PostService.processingPost(postId, freelancerId)
            .then((res) => {
                if (res.data.isSuccess) {
                    console.log('select freelancer successful');
                    onClose();
                    onSelectFreelancer();
                }
            }, (err) => {
                console.log(err.response.data.message);
            });
    };
    return (
        <Dialog onClose={onClose} open={open} maxWidth='xs' fullWidth>
            <DialogTitle>Select Freelancers</DialogTitle>
            {postRequests ? (
                <List fullWidth>
                {postRequests?.map((pr) => (
                    <ListItem key={pr.freelancer.id}>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                {pr.freelancer.featuredAvatar ? (
                                    <Avatar src={pr.freelancer.featuredAvatar} sx={{ mr: 2 }}/>
                                ) : (
                                    <Avatar sx={{ mr: 2 }}><AccountCircleIcon /></Avatar>
                                )}
                                <Typography variant='h6' sx={{ mr: 8 }}>{`${pr.freelancer.firstName} ${pr.freelancer.lastName}`}</Typography>
                            </Box>
                            <Button 
                                variant='contained' 
                                color='success'
                                value={pr.freelancer.id}
                                onClick={handleClick}
                            >
                                Select
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
            ) : (
                <Typography variant='h5'>Currently does not have any Freelancer accept the post</Typography>
            )}
        </Dialog>
    );
};

export default ListFreelancerDialog;