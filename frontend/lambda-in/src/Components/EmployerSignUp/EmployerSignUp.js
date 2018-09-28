import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../EmployerSignUp/EmployerSignUp.css';

export default class EmployerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: 'Employer',
      email: 'emp@c2.com',
      password: '!Nechayev7alpha',
      confirmPassword: '!Nechayev7alpha',
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleNewEmp = event => {
    event.preventDefault();

    /**
     * VALIDATE password input.
     * @description Validate that `password` and `confirmPassword` fields match.
     */
    if (this.state.password !== this.state.confirmPassword) {
      alert("Your passwors don't match. Please try again!");
      this.setState({
        password: '',
        confirmPassword: '',
      });
      return;
    }

    const newEmp = {
      companyName: this.state.companyName,
      email: this.state.email,
      password: this.state.password,
    };


    axios
      .post(`/api/register/employers`, newEmp)
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('_id', response.data.newUser._id);
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
        this.props.setGS({
          userInfo: { ...response.data.newUser }, // Set user data.
          isSignedIn: true,
          userType: 'employer',
        });

        console.log(response);
      })
      .catch(err => {
        this.setState({
          password: '',
          confirmPassword: '',
        });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="signupContainer">
        <div className="formContainer">
          <Paper onChange={this.handleChange} className="paper">
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Employer
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Sign Up
                </Typography>
              </div>

              <TextField
                id="companyName"
                label="Company Name"
                value={this.state.companyName}
                margin="normal"
                fullWidth="true"
              />

              <TextField id="email" label="Company Email" value={this.state.email} margin="normal" fullWidth="true" />

              <TextField id="password" type="password" label="Password" value={this.state.password} margin="normal" />

              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                value={this.state.confirmPassword}
                margin="normal"
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.handleNewEmp}>
                Save Profile
              </Button>
            </div>
            <div className="login">
              <Link to="/emp-login">
              <Typography variant="caption" gutterBottom align="center">
                already have an account? Login here!
              </Typography>
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
