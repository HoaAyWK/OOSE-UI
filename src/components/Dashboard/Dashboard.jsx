import React, { useState } from 'react';
import { Route, Outlet } from 'react-router-dom';
import {
    Badge,
    Box,
    CssBaseline,
    Container,
    Divider,
    IconButton,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Topbar } from '../Topbar/Topbar';
import { Sidebar } from '../Sidebar/Sidebar';
import CollapsedList from '../CollapsedList';

const posts = [
    {id: 1, title: 'Develop Blog Website', description: 'I want a Blog website', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'},
    {id: 2, title: 'Develop REST API', description: 'I want a REST API', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
    {id: 3, title: 'Develop REST API', description: 'I want a REST API', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
    {id: 4, title: 'Develop REST API', description: 'I want a REST API', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
    {id: 5, title: 'Develop REST API', description: 'I want a REST API', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
    {id: 6, title: 'Develop REST API', description: 'I want a REST API', price: 12.0, featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
  ];

const userActions = [
    { 'id': 31, 'name': 'Profile'},
    { 'id': 32, 'name': 'List'},
    { 'id': 33, 'name': 'Create'},
    { 'id': 34, 'name': 'Edit'},
    { 'id': 35, 'name': 'Delete'},
];

const categoryActions = [
    { 'id': 11, 'name': 'List'},
    { 'id': 12, 'name': 'Create'},
    { 'id': 13, 'name': 'Edit'},
    { 'id': 14, 'name': 'Delete'},
];

const postActions = [
    { 'id': 21, 'name': 'Active'},
    { 'id': 22, 'name': 'Processing' },
    { 'id': 23, 'name': 'Closed' },
    { 'id': 24, 'name': 'List'},
    { 'id': 25, 'name': 'Create'},
    { 'id': 26, 'name': 'Edit'},
    { 'id': 27, 'name': 'Delete'},
];

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState(0);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleListItemClick = (event, index) => {
        setSelected(index);
    } 
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Topbar position="absolute" open={open}>
                <Toolbar 
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge='start'
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            marginLeft: 0,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                        >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
                </Toolbar>
            </Topbar>
            <Sidebar variant="permanent" open={open} sx={{ height: '100vh' }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                height: '100%', 
                                width: '100%' 
                            }}
                        >
                            <Typography variant='h6'>
                                OpenRequest
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    </Grid>
                </Grid>
                <Box sx={{ paddingX: 2}}>
                    <List component="nav">
                        <ListItemButton
                            selected={selected === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            sx={{ 
                                borderRadius: 3,
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <CollapsedList
                            selected={selected}
                            handleSelected={handleListItemClick}
                            actions={userActions}
                            icon={<PersonIcon />}
                            label='User'
                        />
                        <CollapsedList
                            selected={selected}
                            handleSelected={handleListItemClick}
                            actions={categoryActions}
                            icon={<CategoryIcon />}
                            label='Category'
                        />
                        <CollapsedList
                            selected={selected}
                            handleSelected={handleListItemClick}
                            actions={postActions}
                            icon={<ArticleIcon />}
                            label='Post'
                        />
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Box>
                
            </Sidebar>
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Dashboard;