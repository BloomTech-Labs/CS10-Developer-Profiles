import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './DevSignUp.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default class DevSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handNewUser(event) {
    event.preventDefault();

    const { setGS } = this.props;
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;

    /**
     * VALIDATE password input.
     * @description Validate that `password` and `confirmPassword` fields match.
     *
     * @todo: Improve UX for alert
     */
    if (password !== confirmPassword) {
      alert("Your passwords don't match. Please try again!"); // eslint-disable-line no-alert
      this.setState({
        password: '',
        confirmPassword: '',
      });
      return;
    }

    axios
      .post('/api/register/seekers', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('_id', response.data.newUser._id); // eslint-disable-line no-underscore-dangle

        // RESET local state
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        /**
         * SET GLOBAL STATE
         */
        setGS({
          userInfo: { ...response.data.newUser }, // Set user data.
          isSignedIn: true,
          userType: 'seeker',
        });
      })
      .catch(() => {
        this.setState({
          password: '',
          confirmPassword: '',
        });
      });
  }

  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className="signupContainer">
        <Paper className="paper" onChange={this.handleChange}>
          <form className="form2" onSubmit={this.handNewUser}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                MeetDev
              </Typography>
              <Typography variant="headline" gutterBottom align="center">
                Sign Up
              </Typography>
            </div>
            <TextField id="firstName" label="First Name" value={firstName} margin="normal" />
            <TextField id="lastName" label="Last Name" value={lastName} margin="normal" />
            <TextField id="email" label="Email" value={email} margin="normal" />
            <TextField
              id="password"
              type="password"
              label="Password"
              value={password}
              margin="normal"
            />
            <TextField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              margin="normal"
            />
            <br />
            <label htmlFor="input-submit-button">
              <input id="input-submit-button" type="submit" />
              <Button variant="contained" color="primary" onClick={this.handNewUser}>
                Sign Up
              </Button>
            </label>
          </form>
          <div className="signup">
            <Link to="/employer-signup">
              <Typography variant="caption" gutterBottom align="center">
                Are You An Employer? Sign Up Here!
              </Typography>
            </Link>
            <Link to="/dev-login">
              <Typography variant="caption" gutterBottom align="center">
                Already Have An Account? Login Here!
              </Typography>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}
