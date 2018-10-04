import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import './EmployerSignUp.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

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

        console.log(response);
      })
      .catch((err) => {
        this.setState({
          password: '',
          confirmPassword: '',
        });
        console.log(err);
      });
  }

  render() {
    const {
      companyName, email, password, confirmPassword,
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className="signupContainer">
        <Paper className="paper">
          <form className="form2" onSubmit={this.handleNewEmp}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                Employer
              </Typography>

              <Typography variant="headline" gutterBottom align="center">
                Sign Up
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
            <label htmlFor="input-submit-button">
              <input id="input-submit-button" type="submit"/>
              <Button variant="contained" color="primary" onClick={this.handleNewEmp}>
                Save Profile
              </Button>
            </label>
          </form>
          <div className="login">
            <Link to="/dev-login">
              <Typography variant="caption" gutterBottom align="center">
                already have an account? Login here!
                </Typography>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

EmployerSignUp.propTypes = {
  setGS: PropTypes.func.isRequired,
};

export default EmployerSignUp;
