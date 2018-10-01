import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../DevLogIn/DevLogin.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'reg@c14.com',
      password: '12345678Aa$',
    };
  }

  handleLogin = event => {
    event.preventDefault();

    axios
      .post('/api/login/seekers', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        // RESET local state
        this.setState({
          username: '',
          password: '',
        });
        /**
         * SET GLOBAL STATE
         */
        this.props.setGS({
          userInfo: { ...response.data.user }, // Set user data.
          isSignedIn: true,
          userType: 'seeker',
        });
        console.log(response);
      })
      .catch(err => {
        // If Error maintaing Local State -> Thus user do not have to type it again
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div data-aos="zoom-in-down" className="loginContainer">
        <div className="formConatiner">
          <Paper onChange={this.handleChange} className="paper">
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Lambda Network
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Login
                </Typography>
              </div>
              <TextField id="email" label="Email" value={this.state.email} margin="normal" />

              <TextField id="password" type="password" label="password" value={this.state.password} margin="normal" />

              <br />
              <Button variant="contained" color="primary" onClick={this.handleLogin}>
                Submit
              </Button>
            </div>

            <div className="login">
              <Link to="/dev-signup">
                <Typography variant="caption" gutterBottom align="center">
                  Not Registered? Signup here!
                </Typography>
              </Link>
              <br />
              <Typography variant="caption" gutterBottom align="center">
                forgot password?
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
