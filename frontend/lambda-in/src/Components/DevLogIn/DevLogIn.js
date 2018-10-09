import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AOS from 'aos';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import 'aos/dist/aos.css';

AOS.init();

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px 0',
    width: '100vw',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    padding: '5px',
    width: '30vw',
  },
  paper: {
    alignSelf: 'center',
  },
  resolveConflict: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signup: {
    margin: '16px',
  },
  submitButton: {
    width: '100%',
  },
  submitInput: {
    display: 'none',
  },
};

class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      seekerResponse: '',
      employerResponse: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.resolveUserConflict = this.resolveUserConflict.bind(this);
  }

  /**
   * Set global state with user data.
   *
   * @param {object} httpResponse - Axios http response.
   * @param {string} userType - Type of user
   */
  handleAxios(httpResponse, userType) {
    const { setGS } = this.props;

    localStorage.setItem('token', httpResponse.data.jwt);

    // RESET local state
    this.setState({
      password: '',
    });

    /**
     * SET GLOBAL STATE
     */
    setGS({
      userInfo: { ...httpResponse.data.user }, // Set user data.
      isSignedIn: true,
      userType,
      login: false,
    });
  }

  /**
   * Decide whcih type of user to login.
   *
   * @description Decide to which DB model a user belong.
   * If the user has an account in both model enable a feature
   * that allow the user to chose which model to use to login.
   *
   * @param {event} event - Even object
   */
  async handleLogin(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { setGS } = this.props;
    const loginData = { email, password };

    /**
     * Validate credential in both endpoints ('seeker' and 'employers')
     */
    let seekersResponse;
    let employersResponse;

    try {
      seekersResponse = await axios.post('/api/login/seekers', loginData);
    } catch (err) {
      seekersResponse = { ...err.response };
    }

    try {
      employersResponse = await axios.post('/api/login/employers', loginData);
    } catch (err) {
      employersResponse = { ...err.response };
    }
    /**
     * If both users are in the DB set set global's 'login' state to 'conflict'
     * then save both http response in the local-state
     *
     * 'login' === 'conflict' will display a UI feature to resolve the conflict.
     */
    if (seekersResponse.status === 200 && employersResponse.status === 200) {
      this.setState({
        seekerResponse: seekersResponse,
        employerResponse: employersResponse,
      });
      setGS({ login: 'conflict' });
      return;
    }

    /**
     * If success loginin as a 'seeker', process response and 'return'
     */
    if (seekersResponse.status === 200) {
      this.handleAxios(seekersResponse, 'seeker');
      return;
    }

    /**
     * If success loginin as an 'employer', process response and 'return'
     */
    if (employersResponse.status === 200) {
      this.handleAxios(employersResponse, 'employer');
      return;
    }

    /**
     * If any Error reset password field
     *
     * @todo: Improve UX
     */
    this.setState({ password: '' });
    alert('Error with your credential'); // eslint-disable-line no-alert

    console.log({
      'HTTP login seekersResponse status': seekersResponse.status,
    });
    console.log({
      'HTTP login employersResponse status': employersResponse.status,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  /**
   * Set APP's global state according to user choise
   *
   * @param {string} userType - The type of profile to login.
   * @return {void}
   */
  resolveUserConflict(userType) {
    const { seekerResponse, employerResponse } = this.state;

    if (userType === 'seeker') {
      this.handleAxios(seekerResponse, userType);
    } else {
      this.handleAxios(employerResponse, userType);
    }

    // Reset local-state
    this.setState({
      email: '',
      password: '',
      seekerResponse: '',
      employerResponse: '',
    });
  }

  render() {
    const { email, password } = this.state;
    const { classes, getGS } = this.props;

    // prettier-ignore
    const buttonConflict = getGS('login') !== 'conflict'
      ? (
        <React.Fragment>
          <label htmlFor="input-submit-button">
            <input
              id="input-submit-button"
              className={classes.submitInput}
              type="submit"
            />
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </label>
        </React.Fragment>
      ) : (
        <div>
          <Typography variant="caption" gutterBottom align="center">
            Continue as:
          </Typography>
          <div className={classes.resolveConflict}>
            <Chip
              onClick={() => this.resolveUserConflict('seeker')}
              label="Developer"
              color="primary"
              variant="outlined"
            />
            <Chip
              onClick={() => this.resolveUserConflict('employer')}
              label="Employer"
              color="primary"
              variant="outlined"
            />
          </div>
        </div>
      );

    return (
      <div data-aos="zoom-in-down" className={classes.loginContainer}>
        <Paper className={classes.paper}>
          <form className={classes.loginForm} onSubmit={this.handleLogin}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                MeetDev
              </Typography>
              <Typography variant="headline" gutterBottom align="center">
                Login
              </Typography>
            </div>
            <TextField
              id="email"
              label="Email"
              value={email}
              margin="normal"
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              value={password}
              margin="normal"
              onChange={this.handleChange}
            />
            <br />
            {buttonConflict}
          </form>
          <div className={classes.signup}>
            <Link to="/dev-signup">
              <Typography variant="caption" gutterBottom align="center">
                Not Registered? Signup here!
              </Typography>
            </Link>
            <br />
            <Link to="/reset-password-email">
              <Typography variant="caption" gutterBottom align="center">
                Forgot Password?
              </Typography>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

DevLogin.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  setGS: PropTypes.func.isRequired,
  getGS: PropTypes.func.isRequired,
};

export default withStyles(styles)(DevLogin);
