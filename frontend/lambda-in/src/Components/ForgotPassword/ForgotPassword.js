/* eslint-disable */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './ForgotPassword.css';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: '',
          confirmPassword: '',
        };
      }
  render() {
    return (
      <div classname="forgotPasswordClass">
        <div className="formConatiner">
          <Paper className="paper" onChange={this.handleChange}>
            <div className="form2">
              <div>
                <Typography variant="display1" gutterBottom align="center">
                  Meet Dev
                </Typography>

                <Typography variant="headline" gutterBottom align="center">
                  Reset Password
                </Typography>
              </div>


              <TextField id="password" type="password" placeholder="Your new password goes here!" label="Password" value={this.state.password} margin="normal" />

              <TextField
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password!"
                label="Confirm Password"
                value={this.state.confirmPassword}
                margin="normal"
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.handNewUser}>
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
