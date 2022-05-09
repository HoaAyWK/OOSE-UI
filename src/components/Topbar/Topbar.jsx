import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';

const drawerWidth = 300;

export const Topbar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transistion: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));