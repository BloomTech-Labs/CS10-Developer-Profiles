/* eslint-disable */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './ForgotPassword.css';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: '',
          confirmPassword: '',
        };
      }
      handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handNewUser = event => {
        event.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
          alert("your passwords don't match. please try again.")
        }
        axios
          .post(`/api/saveresethash/reset/${this.props.match.params.id}/`, {
            password: this.state.password,
          })
          .then(response => {
            console.log(response)
              if(response.data){
                alert(response.data.success);
              }
              else{
                alert("sorry! we weren't able to change your password!")
              }
            this.setState({
              password: '',
              confirmPassword: '',
            });
          })
          .catch(err => {
            console.log(err)
            alert(" oh oh you broke our site!")
          });
      };
  render() {
    // console.log('props',this.props.match.params.id)
    return (
      <div className="forgotPasswordClass">
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
