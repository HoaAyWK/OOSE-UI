import React from 'react';
import {
    Button,
    Container,
    Grid,
    Typography,
    
} from '@mui/material';

import PrimaryPost from './Post/PrimaryPost';
import SecondaryPost from './Post/SecondaryPost';

const ExpensivePosts = ({ items }) => {

  return (
      <Container sx={{ marginBottom: 4 }} maxWidth='xl'>
          <Grid marginY={6} container>
              <Grid item xs={6}>
                  <Typography variant='h3' xs={{ marginBottom: 2 }}>
                      Highest paying posts
                  </Typography>
              </Grid>
              <Grid item xs={6}>
                  <Grid container justifyContent='flex-end'>
                      <Button variant='outlined' size='large' sx={{ borderRadius: 5, paddingX: 3 }}>
                          More
                      </Button>
                  </Grid>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={12} md={6} sm={12}>
                  {items && <PrimaryPost post={items[0]} />}
              </Grid>
              <Grid container item xs={12} md={6} sm={12} spacing={3}>
                  {items && (
                    items.slice(1).map((post) => (
                      <Grid key={post.id} item xs={12}>
                          <SecondaryPost post={post} />
                      </Grid>
                  )) 
                  )}
              </Grid>
          </Grid>
      </Container>
  );
};

export default ExpensivePosts;