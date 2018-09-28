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
      email: 'reg@c14.com',
      password: '12345678Aa$',
      user: '',
    };
  }

  handleAxios(httpResponse, userType) {
    localStorage.setItem('token', httpResponse.data.jwt);
    // RESET local state
    this.setState({
      username: '',
      password: '',
    });
    /**
     * SET GLOBAL STATE
     */
    this.props.setGS({
      userInfo: { ...httpResponse.data.user }, // Set user data.
      isSignedIn: true,
      userType,
    });
  }

  handleLogin = async event => {
    event.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    const seekersResponse = await axios.post('/api/login/seekers', loginData);

    // If success loginin 'seeker' process response and 'return'
    if (seekersResponse.status === 200) {
      this.handleAxios(seekersResponse, 'seeker');
      return;
    }

    const employersResponse = await axios.post('/api/login/employers', loginData);

    // If success loginin 'employer' process response and 'return'
    if (employersResponse.status === 200) {
      this.handleAxios(employersResponse, 'employer');
      return;
    }

    // If any Error reset password field
    this.setState({ password: '' });
    alert('Error with your credential'); // TODO: Improve UX

    console.log({ 'HTTP login seekersResponse status': seekersResponse.status });
    console.log({ 'HTTP login employersResponse status': employersResponse.status });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className="loginContainer">
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
