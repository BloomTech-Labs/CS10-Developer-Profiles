import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../Components/Navbar/navbar";
import "../EmployerSignUp/EmployerSignUp.css";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  }
});

export default class EmployerSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "Star Fleet",
      email: "starfleetcommand@starfleet.ufp",
      password: "!Nechayev7alpha",
      confirmPassword: "!Nechayev7alpha",
      hiringManagerFirstName: "Alynna",
      hiringManagerLastName: "Nechayev",
      hiringManagerEmail: "nechayev@starfleet.ufp",
      projectName: "Enterprise-D",
      description:
        "We are watching for the captain of the Federation Flagship.",
      jobTitle: "Captain",
      techStack: "full stack",
      skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
      minSalrary: 1000000,
      maxSalary: 2000000
    };
  }
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleNewEmp = event => {
    event.preventDefault();

    const newEmp = {
      companyName: this.state.companyName,
      email: this.state.email,
      password: this.state.password
      // hiringManagers: {
      //   hiringManagerFirstName: this.state.hiringManagerFirstName,
      //   hiringManagerLastName: this.state.hiringManagerLastName,
      //   hiringManagerEmail: this.state.hiringManagerEmail
      // },
      // openPositions: {
      //   projectName: this.state.projectName,
      //   description: this.state.description,
      //   jobTitle: this.state.jobTitle,
      //   techStack: this.state.techStack,
      //   skills: this.state.skills,
      //   minSalrary: this.state.minSalrary,
      //   maxSalary: this.state.maxSalary
    };

    axios
      .post(`/api/register/employers`, newEmp)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.jwt);
        // localStorage.setItem("_id", response.data.newEmp._id);
        this.setState({
          isSignedIn: true
        });
        console.log(localStorage.getItem("token"));
        // console.log(response.data.newEmp._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div class="container">
          <div class="employerContainer">
            <Paper>
              <Typography variant="headline" component="h3">
                Employer Signup
              </Typography>

              <TextField
                id="companyName"
                label="Company Name"
                value={this.state.companyName}
                onChange={this.handleChange("companyName")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="companyEmail"
                label="Company Email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                fullWidth="true"
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
              {/* 
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

             */}
             <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNewEmp}
              >
                Save Profile
              </Button>
            </Paper>
          </div>
          {/* 
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
          </Paper>*/}
        </div>
      </div>
    );
  }
}
