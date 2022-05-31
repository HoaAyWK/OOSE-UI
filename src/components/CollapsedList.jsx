import React, { useState } from 'react';
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const CollapsedList = ({ icon, label, actions, selected, handleSelected, nameAction }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton 
                onClick={handleClick}
                sx={{ borderRadius: 3 }}
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton> 
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {actions?.map((action)=> (
                        <ListItemButton 
                            key={action.id} 
                            sx={{ pl: 4, borderRadius: 3 }} 
                            selected={selected === action.id}
                            onClick={(event) => handleSelected(event, action.id, nameAction)}
                        >
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small' sx={{ fontSize: 8 }}/>
                            </ListItemIcon>
                            <ListItemText primary={action.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default CollapsedList;