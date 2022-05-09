import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
    AppBar,
    Avatar,
    Box, 
    Button, 
    Container, 
    IconButton, 
    Divider,
    Menu, 
    MenuItem,
    Toolbar, 
    Tooltip,
    Typography 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';

import { Search, SearchIconWrapper, StyledInputBase } from '../../styles/Search';
import eventBus from '../../common/EventBus';
import { signout } from '../../slices/auth';
import UserService from '../../services/user.service';

const pages = ['Categories', 'Posts', 'Newest'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { avatar } = useSelector((state) => state.avatar);
  
    const signOut = useCallback(() => {
      dispatch(signout());
    }, [dispatch]);
  
    useEffect(() => {
        if (currentUser) {
            setShowUserMenu(true);
        } else {
            setShowUserMenu(false);
        }

        eventBus.on('signout', () => signOut());
        return () => eventBus.remove('signout');
    }, [currentUser, signOut]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };   

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <AppBar position='static' color='inherit'>
            <Container maxWidth='false'>
                <Toolbar disableGutters>
                    <Link to={'/'}>
                        <Typography 
                            variant='h5' 
                            noWrap 
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                                OpenRequest
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link to={'/'}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>                                   
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            size='large'
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>
                    <Search sx={{ mr: 2 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {currentUser ? 
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open Settings'>
                                <IconButton onClick={handleOpenUserMenu}>
                                    {avatar ? (<Avatar alt='avatar' src={avatar} />)              
                                        : (<Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>)
                                    }
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Link to='/profile'>
                                    <MenuItem>
                                        <Typography textAlign="center">Proflie</Typography>
                                    </MenuItem>
                                </Link>
                                <Divider />
                                <MenuItem onClick={signOut}>
                                    <Typography textAlign="center">Sign Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :   
                        <Link to={'/signin'}>
                            <Button color="inherit">Sign In</Button>
                        </Link>}
                </Toolbar>
                
            </Container>
            
        </AppBar>
    );
}

export default Navbar;