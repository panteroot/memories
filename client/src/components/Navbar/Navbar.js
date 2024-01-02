import { AppBar, Button, Toolbar, Typography, Avatar } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";


import useStyles from "./styles";
import img_memoriesText from "../../images/memories-cebu.png";
import { useAuthContext } from "../../useContext/useAuthContext";

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
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={img_memoriesText}   alt="icon" height="40px" title="memories" />         
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