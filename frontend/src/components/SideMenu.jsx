import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "./StyledLink.jsx";
import {useAuth} from "./AuthProvider.jsx";

export const MainListItems = () => {
    const {onLogout} = useAuth();

    return (
        <React.Fragment>
            <Link to="/library">
                <ListItemButton>
                    <ListItemIcon>
                        <AutoStoriesIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Library"/>
                </ListItemButton>
            </Link>

            <Link to="/employees">
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Employee Manager"/>
                </ListItemButton>
            </Link>

            <Link to="/">
                <ListItemButton onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItemButton>
            </Link>
        </React.Fragment>
    );
}
