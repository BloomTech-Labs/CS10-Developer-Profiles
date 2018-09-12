import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import '../DevSignUp/DevSignUp.css'

export default class DevSignUp extends Component {
    state = {
        email: 'abc@xyz.com',
        firstName: 'bat',
        lastName: 'man',
        desiredTitle: 'BOSS',
        currentLocation: 'mars',
        github: 'github.com/batman',
        linkedin: 'linkedin.com/batman',
        portfolio: 'batman.com',
        acclaimBadge: 'lambda Batch',
        placesInterested: ' earh etc',
        newPassword: '',
        confirmPassword: ''
      };
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
      render() {
        return (
          <div class="App">
             <Paper>
              <div class="navBar">
                <div class="leftNavBar">
                  <Button>find Devlopers</Button>
                  <Button>Browse</Button>
                  <Button>profile</Button>
                </div> 
                <div class="rightNavBar">
                  <Button>Billing</Button>
                  <Button>Setting</Button>
                </div> 
              </div>
            </Paper>
    
            <div class="headline">
                <Typography variant="headline" component="h3">
                  Fill-N-Hired
                </Typography>
                <Typography component="p">
                  Our match making starts from here. Fill the most sophisticated resume form and get hired confidently.
                </Typography>
               
            </div>
            
            <div class="formConatiner">
            <Paper >
              <div class="form2">
                
                     {/* look at https://material-ui.com/demos/text-fields/ for documentaition */}
                <TextField
                  id="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                />
    
                <TextField
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                />
    
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
    
    
                <TextField
                  id="desiredTitle"
                  label="Desired Title"
                  value={this.state.desiredTitle}
                  onChange={this.handleChange('desiredTitle')}
                  margin="normal"
                />
    
                <TextField
                  id="currentLocation"
                  label="Current Location"
                  value={this.state.currentLocation}
                  onChange={this.handleChange('currentLocation')}
                  margin="normal"
                />
    
                <TextField
                  id="github"
                  label="Github"
                  value={this.state.github}
                  onChange={this.handleChange('github')}
                  margin="normal"
                />
    
                <TextField
                  id="linkedin"
                  label="Linkedin"
                  value={this.state.linkedin}
                  onChange={this.handleChange('Linkedin')}
                  margin="normal"
                />
    
                <TextField
                  id="portfolio"
                  label="portfolio"
                  value={this.state.portfolio}
                  onChange={this.handleChange('portfolio')}
                  margin="normal"
                />
    
                <TextField
                  id="acclaimBadge"
                  label="Acclaim Badge"
                  value={this.state.acclaimBadge}
                  onChange={this.handleChange('acclaimBadge')}
                  margin="normal"
                />
    
                <TextField
                  id="newPassword"
                  type="password"
                  label="New Password"
                  value={this.state.newPassword}
                  onChange={this.handleChange('newPassword')}
                  margin="normal"
                />
    
                <TextField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  margin="normal"
                />
    
    
                <Button variant="contained" color="primary">Submit</Button>
                
              </div>

               <div>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
              </Paper>
            </div>
            
          </div>
        );
    }
}
