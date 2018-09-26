import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './UserSetting.css';

export default class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'abc@xyz.com',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // axios 1 argument is URL and 2 argument is data 3 argument is options
  updatePassword = () => {
    if(this.state.password !== this.state.confirmPassword){
      alert("Your passwors don't match. Please try again!")
      this.setState({
        password: '',
        confirmPassword: '',
      })
      return;
    }
    const _id = localStorage.getItem('_id');
    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));
      axios
        .put(
          `/api/seekers/${_id}`,
          {
            password: this.state.password,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('updating without ID');
    }
  };

  updateEmail = () => {
    const _id = localStorage.getItem('_id');
    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));
      axios
        .put(
          `/api/seekers/${_id}`,
          {
            email: this.state.email,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('updating without ID');
    }
  };

  render() {
    return (
      <div className="UserContainer">
        <Paper className="userPaperContainer" elevation={1}>
          <Typography variant="display2" gutterBottom align="left">
            Settings
          </Typography>
          <Typography variant="display1" gutterBottom align="left">
            Update your info!
          </Typography>
          <br />
          <form>
            <div className="inputRow">
              <div className="smallInputContainer">
                <div>
                  <Typography variant="caption" gutterBottom align="left">
                      change your email here
                  </Typography>
                  <div className="inputField">
                      <TextField
                          id="email"
                          label="email"
                          fullWidth
                          value={this.state.email}
                          onChange={this.handleChange('email')}
                          margin="normal"
                          variant="outlined"
                      />
                  </div>
                  <br /> 
                  <div>
                      <Button variant="outlined" color="primary" align="center" onClick={this.updateEmail}>
                          Update Email
                      </Button>
                  </div>
                  <br /> 
                  <Typography variant="caption" gutterBottom align="left">
                      update your password here
                  </Typography>
                  <div className="inputField">
                      <TextField
                        id="password"
                        label="password"
                        type="password"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        variant="outlined"
                      />
                  </div>
                  <div className="inputField">
                      <TextField
                        id="confirmPassword"
                        label="confirm password"
                        type="password"
                        fullWidth
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                        margin="normal"
                        variant="outlined"
                      />
                  </div>
                  <br />
                  <div>
                      <Button variant="outlined" color="primary" align="center" onClick={this.updatePassword}>
                          Update Password
                      </Button>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
