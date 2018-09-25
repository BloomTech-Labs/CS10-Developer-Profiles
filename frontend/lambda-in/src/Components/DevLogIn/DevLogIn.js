import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../DevLogIn/DevLogin.css';

export default class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
        this.props.setGS({
          userInfo: { ...response.data.user },
          isSignedIn: true,
          userType: 'seeker',
        });
        this.setState({
          username: '',
          password: '',
        });
        console.log(localStorage.getItem('token'));
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="formConatiner">
          <Paper className="paper">
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Lambda Network
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Login
                </Typography>
              </div>
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />

              <TextField
                id="password"
                type="password"
                label="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
              />

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
