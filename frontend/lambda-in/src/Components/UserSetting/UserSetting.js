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
      firstName: 'daat',
      lastName: 'man',
      desiredTitle: 'BOSS',
      currentLocation: 'mars',
      github: 'github.com/kkkk',
      linkedin: 'linkedin.com/batman',
      portfolio: 'batman.com',
      acclaimBadge: 'lambda Batch',
      placesInterested: ' earh etc',
      password: '12345678Aa$',
      confirmPassword: '',
      isSignedIn: false,
      summary: 'wubba lubba dub dub',
      topskill: 'Baller',
      projects: 'Dev profiles',
      experience: 'mars inc.',
      education: 'Lambda School',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // axios 1 argument is URL and 2 argument is data 3 argument is options
  update = () => {
    const _id = localStorage.getItem('_id');
    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));
      axios
        .put(
          `/api/seekers/${_id}`,
          {
            linkedin: this.state.linkedin,
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
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="left">
            Settings
          </Typography>
          <br />
          <form>
            <div className="inputRow">
              <div className="smallInputContainer">
                <div>
                  <div className="inputField">
                    <TextField
                      id="firstName"
                      label="First Name"
                      fullWidth
                      value={this.state.firstName}
                      onChange={this.handleChange('firstName')}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>

                  <div className="inputField">
                    <TextField
                      id="outlined-name"
                      label="Last Name"
                      fullWidth
                      value={this.state.lastName}
                      onChange={this.handleChange('lastName')}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>

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

                  <div className="inputField">
                    <TextField
                      id="password"
                      label="password"
                      fullWidth
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </div>

                <div className="imageContainer">
                  <img className="displayPic" src={`https://robohash.org/1${this.state.firstName}`} alt="Italian " />
                </div>
              </div>


              <div>
                <Button variant="outlined" color="primary" align="center" onClick={this.update}>
                  update
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
