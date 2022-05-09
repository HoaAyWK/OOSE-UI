import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Tooltip,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import UsersTable from '../../Table/UsersTable';

const Users = () => {
    return (
        <Container maxWidth='xl' sx={{ mt: 8 }} >
            <Grid container mb={4}>
                <Grid item xs={10}>
                    <Typography variant='h5'>
                        User List
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button variant='contained' size='large' color='success' sx={{ borderRadius: 3 }}>
                                <AddIcon/>
                                &nbsp; New User
                            </Button>
                        </Grid>                       
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ width: '100% '}}>
                    <UsersTable />
                </Box>
        </Container>
    );
};

export default Users;