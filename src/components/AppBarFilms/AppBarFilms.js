import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useState} from 'react';
import GetToken from "../Token/GetToken";
import PostToken from "../Token/PostToken";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import cookies from "../../utils/cookies";
import {useSelector} from "react-redux";

export default function AppBarFilms({filmTitle = null} = {}) {
    const [isOpenGetToken, setIsOpenGetToken] = useState(false);
    const [isOpenPostToken, setIsOpenPostToken] = useState(false);
    const userData = useSelector((state) => state.userData);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Фильмы
                            {filmTitle && ` - ${filmTitle}`}
                        </Typography>
                        {userData.token ? (
                            <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle  onClick={handleMenu}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {cookies.erase(userData);}}>Выход</MenuItem>
                            </Menu>
                            </>
                        ) : (
                            <Button color="inherit"
                                    onClick={() => {
                                        setIsOpenGetToken(true);
                                    }}
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <GetToken
                setIsOpenGetToken={setIsOpenGetToken}
                isOpenGetToken={isOpenGetToken}
                setIsOpenPostToken={setIsOpenPostToken}
            />
            <PostToken
                setIsOpenPostToken={setIsOpenPostToken}
                isOpenPostToken={isOpenPostToken}
            />
        </>
    );
}