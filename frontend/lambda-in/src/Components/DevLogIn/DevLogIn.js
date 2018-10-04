import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './DevLogin.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

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
    this.resolveUserConflic = this.resolveUserConflic.bind(this);
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
    const seekersResponse = await axios.post('/api/login/seekers', loginData);
    const employersResponse = await axios.post('/api/login/employers', loginData);

    /**
     * If both users are in the DB set set global's 'login' state to 'conflic'
     * then save both http response in the local-state
     *
     * 'login' === 'conflict' will display a UI feature to resolve the conflict.
     */
    if (seekersResponse.status === 200 && employersResponse.status === 200) {
      this.setState({
        seekerResponse: seekersResponse,
        employerResponse: employersResponse,
      });

      setGS({ login: 'conflic' });

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
  resolveUserConflic(userType) {
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
    const { getGS } = this.props;

    const buttonConflic = getGS('login') !== 'conflic' ? (
      <React.Fragment>
        <label htmlFor="input-submit-button">
          <input id="input-submit-button" className="input-submit" type="submit" />
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
          >
              Submit
          </Button>
        </label>
      </React.Fragment>
    ) : (
      <div>
        <Typography variant="caption" gutterBottom align="center">
            Continue as:
        </Typography>
        <div className="resolve-conflict">
          <Chip
            onClick={() => this.resolveUserConflic('seeker')}
            label="Developer"
            color="primary"
            variant="outlined"
          />
          <Chip
            onClick={() => this.resolveUserConflic('employer')}
            label="Employer"
            color="primary"
            variant="outlined"
          />
        </div>
      </div>
    );

    return (
      <div data-aos="zoom-in-down" className="loginContainer">
        <div className="formConatiner">
          <Paper onChange={this.handleChange} className="paper">
            <form className="form2" onSubmit={this.handleLogin}>
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Lambda Network
                </Typography>
                <Typography variant="headline" gutterBottom align="center">
                  Login
                </Typography>
              </div>
              <TextField id="email" label="Email" value={email} margin="normal" />
              <TextField
                id="password"
                type="password"
                label="password"
                value={password}
                margin="normal"
              />
              <br />
              {buttonConflic}
            </form>
            <div className="signup">
              <Link to="/dev-signup">
                <Typography variant="caption" gutterBottom align="center">
                  Not Registered? Signup here!
                </Typography>
              </Link>
              <br />
              <Typography variant="caption" gutterBottom align="center">
                Forgot Password?
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

DevLogin.propTypes = {
  setGS: PropTypes.func.isRequired,
  getGS: PropTypes.func.isRequired,
};

export default DevLogin;
