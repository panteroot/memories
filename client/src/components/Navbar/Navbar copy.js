import { AppBar, Button, Toolbar, Typography, Avatar } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


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
        // <ThemeProvider theme={defaultTheme}>
        //     <CssBaseline />

    //     <AppBar /*position="sticky"*/ sx={{ height: '70px', background: '#7F00FF'}}>
    //     <Toolbar
    //     className={classes.toolbar}>
    //       <CameraIcon sx={{ mr: 3, fontSize: '50px' }} />
    //       <Link to="/" className={classes.brandContainer}>
    //             {/* <img src={img_memoriesText}   alt="icon" height="40px" title="memories" />      */}
    //              <img component={Link} to="/" src={memoriesText} alt="icon" height="40px" />
    //              {/* <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />      */}
    //              {/* <Typography variant="h2">MEMORIES</Typography> */}
    //          </Link>
    //     </Toolbar>
    //   </AppBar>
    //  </ThemeProvider> 
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                {/* <img src={img_memoriesText}   alt="icon" height="40px" title="memories" />     */}
                <img component={Link} to="/" src={memoriesText} alt="icon" height="40px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />     
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user?
                    (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt="" src={user?.data.picture}>
                                { user?.data.firstname.charAt(0) }
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">Hi there &nbsp;   <b>{user?.data.firstname}</b> ! </Typography>
                            
                            <Button className={classes.logout} variant="contained"
                            color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ):
                    (
                        <Button component={Link} to="/auth" variant="contained"
                        color="primary">
                            Sign In
                        </Button>
                    )
                }                       
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;