import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import '../EmployerSignUp/EmployerSignUp.css'

export default class EmployerSignUp extends Component {
    state = {
        companyName: 'Star Fleet',
        companyEmail: 'starfleetcommand@starfleet.ufp',
         
        hiringManagerFirstName: 'Alynna',
        hiringManagerLastName: 'Nechayev',
        hiringManagerEmail:'nechayev@starfleet.ufp',
        password: 'nechayev-7-alpha',
        
        projectName: 'Enterprise-D',
        description: '',
        jobTitle: 'Captain',
        techStack: 'full stack',
        skills: ['Diplomacy', 'Leadership', 'Tactical Strategy'],
        minSalrary: 1000000,
        maxSalary: 2000000,
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
                  Company Profile
                </Typography>               
            </div>
            
            <div class="formConatiner">
            <Paper >
              <div class="form2">
                
                     {/* look at https://material-ui.com/demos/text-fields/ for documentaition */}
                <TextField
                  id="companyName"
                  label="Company Name"
                  value={this.state.companyName}
                  onChange={this.handleChange('companyName')}
                  margin="normal"
                />
    
                <TextField
                  id="companyEmail"
                  label="Company Email"
                  value={this.state.companyEmail}
                  onChange={this.handleChange('companyEmail')}
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
              </Paper>
            </div>
            
          </div>
        );
    }
}
