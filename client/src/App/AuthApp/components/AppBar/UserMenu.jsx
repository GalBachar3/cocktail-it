import { LightMode, Logout, ModeNight } from '@mui/icons-material';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stringToColor from 'string-to-color';
import { useColorMode } from '../../../../Providers/ThemeProvider';
import { useUser } from '../../../../Providers/UserProvider';

const getInitials = fullName => fullName.trim().split(/\s+/).map(name => name[0].toUpperCase()).join('').slice(0, 3);

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { toggleColorMode } = useColorMode();
    const { palette: { mode } } = useTheme();
    const { user, setUser } = useUser();
    const queryCache = useQueryClient().getQueryCache();

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        queryCache.clear();

        navigate('/login');
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton onClick={openMenu}>
                    <Avatar sx={{ bgcolor: stringToColor(user?.name) }}>{getInitials(user?.name)}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
                <MenuItem onClick={toggleColorMode}>
                    <ListItemIcon>
                        {mode === 'light' ? <LightMode fontSize="small" /> : <ModeNight fontSize="small" />}
                    </ListItemIcon>
                    Change Color Mode
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;