import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Paper, Container, TextField} from '@material-ui/core';
import Logo from '../../assets/cart_logo.png';
import "./login.css";

const styles = () => ({
    label: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#2c3642',
            },
        },
        '& label.Mui-focused': {
            color: '#2c3642',
            fontWeight: "bold"
        },
    }
  });

class Login extends Component {

    render() {
        const { classes, theme } = this.props;
        return (
            <div className="login">
                <Paper className="loginBox" elevation={3}>
                    <div className="loginMainBlock">
                        <Container className="loginCont" style={{display: "flex", padding: "0 70px"}}>
                            <div style={{width: "100%"}} className={classes.label}>
                                <div className="loginHeading">
                                    We are <span style={{color: "#2c3642", fontFamily: "Monoton, cursive"}}>CART</span>
                                </div>
                                <div className="loginSub">
                                    Welcome Back, Please login to your account.
                                </div>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    fullWidth
                                    style={{
                                        marginBottom: "20px"
                                    }}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    fullWidth
                                    style={{
                                        marginBottom: "20px"
                                    }}
                                />
                                <div className="loginButtonBar">
                                    <div className="loginButton" onClick={() => {this.props.history.push('/dashboard')}}>
                                        Log In
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="loginLogoBlock">
                        <img src={Logo} alt="Logo" height="100%" />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Login);