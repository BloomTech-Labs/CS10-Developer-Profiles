import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../DevLogIn/DevLogin.css';

export default class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'reg@c14.com',
      password: '12345678Aa$',
      userType: '',
      seekerResponse: '',
      employerResponse: '',
    };
  }

  handleAxios(httpResponse, userType) {
    console.log(httpResponse, userType);
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
    const employersResponse = await axios.post('/api/login/employers', loginData);

    // If both users are in the DB set set local state 'user' to 'conflic'
    // 'conflict' will display a UI feature to resolve the conflict.
    if (seekersResponse.status === 200 && employersResponse.status === 200) {
      console.log('CONFLICT');
      this.setState({
        userType: 'conflic',
        seekerResponse: seekersResponse,
        employerResponse: employersResponse,
      });
      this.props.setGS({ login: 'conflic' });
      return;
    }

    // If success only loginin 'seeker' process response and 'return'
    if (seekersResponse.status === 200) {
      this.handleAxios(seekersResponse, 'seeker');
      return;
    }

    // If success only loginin 'employer' process response and 'return'
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

  resolveUserConflic = userType => {
    console.log();
    if (userType === 'seeker') {
      this.handleAxios(this.state.seekerResponse, userType);
    } else {
      this.handleAxios(this.state.employerResponse, userType);
    }

    // Reset local-state
    this.setState({
      email: 'reg@c14.com',
      password: '12345678Aa$',
      userType: '',
      seekerResponse: '',
      employerResponse: '',
    });
  };

  render() {
    const { userType } = this.setState;

    const buttonConflic =
      this.props.getGS('login') !== 'conflic' ? (
        <Button variant="contained" color="primary" onClick={this.handleLogin}>
          Submit
        </Button>
      ) : (
        <Grid>
          <Typography variant="caption" gutterBottom align="center">
            Continue as:
          </Typography>
          <Chip
            onClick={this.resolveUserConflic.bind(this, 'seeker')}
            label="Developer"
            color="primary"
            variant="outlined"
          />
          <Chip
            onClick={this.resolveUserConflic.bind(this, 'employer')}
            label="Employer"
            color="primary"
            variant="outlined"
          />
        </Grid>
      );

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
              {buttonConflic}
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
