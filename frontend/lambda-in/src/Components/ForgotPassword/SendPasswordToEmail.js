/* eslint-disable */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './ForgotPassword.css';

export default class SendPasswordToEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email:'',
        };
      }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handNewUser = event => {
        event.preventDefault();
    
        /**
         * VALIDATE password input.
         * @description Validate that `password` and `confirmPassword` fields match.
         */
    
        axios
          .post('/api/saveresethash/', {
            email: this.state.email,
          })
          .then(response => {
              alert(response);
            this.setState({
              email: '',
            });
          })
          .catch(err => {
            alert(err)
          });
      };
    
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
              <TextField id="email" placeholder="We will send a Password Reset Link Here!" label="Email" value={this.state.email} margin="normal" />

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
