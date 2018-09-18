import React, { Component } from 'react';
import NavBar from '../../Components/Navbar/navbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

import '../DevLogIn/DevLogin.css';

export default class DevLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSignedIn: false
    };
  }

  handleLogin = event => {
    event.preventDefault();

    axios
      .post('/api/login/seekers', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        this.setState({
          isSignedIn: true
        });
        console.log(localStorage.getItem('token'));
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      username: '',
      password: ''
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar />

        <div className="headline">
          <Typography variant="headline" component="h3">
            Fill-N-Hired
          </Typography>
          <Typography component="p">
            Our match making starts from here. Fill the most sophisticated
            resume form and get hired confidently.
          </Typography>
        </div>

        <div className="formConatiner">
          <Paper>
            <div className="form2">
              {/* look at https://material-ui.com/demos/text-fields/ for documentaition */}
              <Typography variant="headline" component="h3">
                Log In
              </Typography>
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />

              <TextField
                id="password"
                type="password"
                label="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogin}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
