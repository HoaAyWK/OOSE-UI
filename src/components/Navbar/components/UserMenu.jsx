import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box, 
    Divider,
    IconButton, 
    Menu, 
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserMenu = ({ avatar }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open Settings'>
                <IconButton onClick={handleOpenUserMenu}>
                    {avatar ? <Avatar alt='avatar' src={avatar} />              
                            : <Avatar>
                                <AccountCircleIcon />
                            </Avatar>
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
                <Link to='/user/profile'>
                    <MenuItem>
                        <Typography textAlign="center">Proflie</Typography>
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem>
                    <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;