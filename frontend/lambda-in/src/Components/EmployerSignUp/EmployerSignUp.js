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

import 'aos/dist/aos.css';

AOS.init();

const styles = {
  login: {
    margin: '16px',
  },
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
  submitButton: {
    width: '100%',
  },
  submitInput: {
    display: 'none',
  },
};

class EmployerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewEmp = this.handleNewEmp.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNewEmp(event) {
    const { companyName, email, password } = this.state;
    const { setGS } = this.props;
    const newEmp = {
      companyName,
      email,
      password,
    };

    event.preventDefault();

    axios
      .post('/api/register/employers', newEmp)
      .then((response) => {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('_id', response.data.newUser._id); // eslint-disable-line no-underscore-dangle
        // RESET local state
        this.setState({
          companyName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        /**
         * SET GLOBAL STATE
         */
        setGS({
          userInfo: { ...response.data.newUser }, // Set user data.
          isSignedIn: true,
          userType: 'employer',
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
    const { classes } = this.props;
    const {
      companyName, email, password, confirmPassword,
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className={classes.signUpContainer}>
        <Paper className={classes.paper}>
          <form className={classes.signUpForm} onSubmit={this.handleNewEmp}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                MeetDev
              </Typography>
              <Typography variant="headline" gutterBottom align="center">
                Employer Sign Up
              </Typography>
            </div>
            <TextField
              name="companyName"
              label="Company Name"
              value={companyName}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              name="email"
              label="Company Email"
              value={email}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <label htmlFor="input-submit-button">
              <input id="input-submit-button" className={classes.submitInput} type="submit" />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={this.handleNewEmp}
              >
                Sign Up
              </Button>
            </label>
          </form>
          <div className={classes.login}>
            <Link to="/dev-signup">
              <Typography variant="caption" gutterBottom align="center">
                Are You A Developer? Sign Up Here!
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

EmployerSignUp.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  setGS: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmployerSignUp);
