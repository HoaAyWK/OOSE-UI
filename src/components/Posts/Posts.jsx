import React from 'react';
import { Grid } from '@mui/material';

import Post from './Post/Post';

const Posts = ({ posts }) => {
    console.log(posts);
    return (
        <Grid container alignItems='stretch' spacing={3}>
            {posts?.map((post) => (
                <Grid key={post.id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;