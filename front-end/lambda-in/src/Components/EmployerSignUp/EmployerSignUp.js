import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import "../EmployerSignUp/EmployerSignUp.css";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

export default class EmployerSignUp extends Component {
  state = {
    companyName: "Star Fleet",
    email: "starfleetcommand@starfleet.ufp",

    hiringManagerFirstName: "Alynna",
    hiringManagerLastName: "Nechayev",
    hiringManagerEmail: "nechayev@starfleet.ufp",
    password: "nechayev-7-alpha",
    confirmPassword: "nechayev-7-alpha",

    projectName: "Enterprise-D",
    description: "We are watching for the captain of the Federation Flagship.",
    jobTitle: "Captain",
    techStack: "full stack",
    skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
    minSalrary: 1000000,
    maxSalary: 2000000
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Grid container xs={12} direction="column" alignItems="center" justify="space-around">

          <Grid containter xs={12}>
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
          </Grid>

        <Grid container xs={8} direction="row" padding="">
          <div class="employerContainer">
          <Paper>
              <Grid>
                <Typography variant="headline" component="h3">
                  Company Profile
                </Typography>
              </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="companyName"
                    label="Company Name"
                    value={this.state.companyName}
                    onChange={this.handleChange("companyName")}
                    margin="normal"
                    fullWidth="true"
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="companyEmail"
                    label="Company Email"
                    value={this.state.companyEmail}
                    onChange={this.handleChange("companyEmail")}
                    margin="normal"
                    fullWidth="true"
                  />
                </Grid>

                <TextField
                  id="hiringManagerFirstName"
                  label="Hiring Manager's FirstName"
                  value={this.state.hiringManagerFirstName}
                  onChange={this.handleChange("hiringManagerFirstName")}
                  margin="normal"
                />

                <TextField
                  id="hiringManagerLastName"
                  label="Hiring Manager's Last Name"
                  value={this.state.hiringManagerLastName}
                  onChange={this.handleChange("hiringManagerLastName")}
                  margin="normal"
                />

                <TextField
                  id="hiringManagerEmail"
                  label="Hiring Manager's Email"
                  value={this.state.hiringManagerEmail}
                  onChange={this.handleChange("hiringManagerEmail")}
                  margin="normal"
                />

                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                  margin="normal"
                />

                <TextField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange("confirmPassword")}
                  margin="normal"
                />

                <Button variant="contained" color="primary">
                  Save Profile
                </Button>
              </Paper>
              </div>



          <Paper>
            <div class="addJobFormContainer">
              <div class="headline">
                <Typography variant="headline" component="h3">
                  Add Job Opening
                </Typography>
              </div>

              <TextField
                id="projectName"
                label="Project Name"
                value={this.state.projectName}
                onChange={this.handleChange("projectName")}
                margin="normal"
              />

              <TextField
                id="description"
                label="description"
                value={this.state.description}
                onChange={this.handleChange("description")}
                margin="normal"
              />

              <TextField
                id="jobTitle"
                label="Job Title"
                value={this.state.jobTitle}
                onChange={this.handleChange("jobTitle")}
                margin="normal"
              />

              <TextField
                id="techStack"
                label="Tech Stack"
                value={this.state.techStack}
                onChange={this.handleChange("techStack")}
                margin="normal"
              />

              <TextField
                id="skills"
                label="Skills"
                value={this.state.skills}
                onChange={this.handleChange("skills")}
                margin="normal"
              />

              <TextField
                id="minSalrary"
                label="Minimum Salrary Range"
                value={this.state.jobTitle}
                onChange={this.handleChange("minSalrary")}
                margin="normal"
              />

              <TextField
                id="maxSalary"
                label="Maximum Salary Range"
                value={this.state.maxSalary}
                onChange={this.handleChange("maxSalary")}
                margin="normal"
              />

              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Paper>
        </Grid>
        </Grid>
      </div>
    );
  }
}