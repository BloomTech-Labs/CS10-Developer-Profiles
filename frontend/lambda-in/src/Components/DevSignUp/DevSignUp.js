import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AOS from 'aos';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import 'aos/dist/aos.css';

AOS.init();

const styles = {
  paper: {
    alignSelf: 'center',
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px 0',
    width: '100vw',
  },
  signUpForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    padding: '5px',
    width: '30vw',
  },
  signUp: {
    margin: '16px',
  },
  submitButton: {
    width: '100%',
  },
  submitInput: {
    display: 'none',
  },
};

class DevSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleNewUser(event) {
    event.preventDefault();

    const { setGS } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
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

        console.log('POST_NEW_DEV', { status: response.status });
      })
      .catch(() => {
        this.setState({
          password: '',
          confirmPassword: '',
        });
      });
  }

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className={classes.signUpContainer}>
        <Paper className={classes.paper}>
          <form className={classes.signUpForm} onSubmit={this.handleNewUser}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                MeetDev
              </Typography>
              <Typography variant="headline" gutterBottom align="center">
                Developer Sign Up
              </Typography>
            </div>
            <TextField
              id="firstName"
              label="First Name"
              value={firstName}
              margin="normal"
              onChange={this.handleChange}
            />
            <TextField
              id="lastName"
              label="Last Name"
              value={lastName}
              margin="normal"
              onChange={this.handleChange}
            />
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
            <TextField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              margin="normal"
              onChange={this.handleChange}
            />
            <br />
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
                onClick={this.handleNewUser}
              >
                Sign Up
              </Button>
            </label>
          </form>
          <div className={classes.signUp}>
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

DevSignUp.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  setGS: PropTypes.func.isRequired,
};

export default withStyles(styles)(DevSignUp);
