import { AppBar, Button, Toolbar, Typography, 
    Avatar, Container, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import useStyles from "./styles";
import memoriesText from "../../images/memoriesText.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import { useAuthContext } from "../../useContext/useAuthContext";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Navbar = () => {
    const classes = useStyles();
    const { user, dispatch } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedData = jwtDecode(token);

            if(decodedData.exp * 1000 < new Date().getTime()){
                dispatch({ type: 'LOGOUT' });
                localStorage.removeItem('user');
                console.log('token expired!');
                navigate("/");
            }
        }


    }, [location]);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        navigate("/");
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit">
        <Toolbar className={classes.toolbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h4" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", boxShadow: 'none' }}>
            Memories
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {
                    user?
                    (
                        <Button key={1} sx={{ color: 'black' }}>
                            <Avatar  alt="" src={user?.data.picture}>
                                { user?.data.firstname.charAt(0) }
                            </Avatar>
                            <Typography variant="h6">Hi there &nbsp;   <b>{user?.data.firstname}</b> ! </Typography>
                            
                            <Button  variant="contained"
                            color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Button>
                    ):
                    (
                        <Button component={Link} to="/auth" variant="contained"
                        color="primary">
                            Sign In
                        </Button>
                    )
                }   
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Navbar;