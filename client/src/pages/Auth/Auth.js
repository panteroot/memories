import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import useStyles from "./styles";
import Input from "./Input";
import { useAuthContext } from "../../useContext/useAuthContext";
import { userLogin, userSignup } from "../../actions/actionUser";

const Auth = ({user, setUser}) => {
    const classes = useStyles();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [ error, setError ] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();

        let result;
        if(isSignup){
            result = await userSignup(formData);
        }else{
            result = await userLogin(formData);
        }

        if(result.status === 200){
            dispatch({ type: 'LOGIN', payload: result });
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/");
        }else{
            setError(result.error);
        }    
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleShowPassword = () => {
        setIsShowPassword(prevShowPassword => !prevShowPassword);
    }

    const handleSwitchMode = () => {
        setIsSignup(prevIsSignup => !prevIsSignup);
    }

    const handleGoogleSuccess = async(response) => {
        const token = response.credential;
        const decodedData = jwtDecode(token);
        const user = {
            _id: decodedData.sub,
            email: decodedData.email,
            firstname: decodedData.given_name,
            lastname: decodedData.family_name,
            picture: decodedData.picture
        };

        dispatch({ type: 'LOGIN', payload: {  data: user, token } });
        localStorage.setItem('user', JSON.stringify({  data: user, token }));
        navigate("/");
    }


    const handleGoogleError = (e) => alert('Google Sign In error!', e);


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography>{!isSignup? 'Signin' : 'Signup'}</Typography>
                {error && <p style={{ color: "red", font: "bold" }}>{error}</p>}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup?
                            (
                                <>
                                    <Input name="firstname" label="Firstname" type="input" 
                                        handleChange={handleChange} autoFocus half
                                        value={formData.firstname}
                                    />

                                    <Input name="lastname" label="Lastname" type="input" 
                                        handleChange={handleChange} half
                                        value={formData.lastname}
                                    />
                                </>
                            ) : null
                        }

                        <Input
                            name="email"
                            label="Email Address"
                            type="email"
                            handleChange={handleChange}
                            value={formData.email}
                        />
                        <Input
                            name="password"
                            label="Password"
                            type={isShowPassword? 'text' : 'password'}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                            value={formData.password}
                        />

                        {
                            isSignup &&
                            (
                                <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    handleChange={handleChange}
                                    value={formData.confirmPassword}
                                />
                            )
                        }
                        
                    </Grid>

                    {
                        !isSignup && 
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                        />
                    }
                    
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {!isSignup? 'Sign in' : 'Signup'}
                    </Button>
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={handleSwitchMode}>
                                {isSignup? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )

}

export default Auth;