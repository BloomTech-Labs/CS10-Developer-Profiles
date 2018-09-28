import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Link } from 'react-router-dom';

import "../EmployerSignUp/EmployerSignUp.css";

// function passwordMatch(props) {
//   if (props.password === props.confirmPassword) {
//     return <p>password confirmed</p>;
//   }
//   return <p>password does NOT match</p>;
// }

export default class EmployerSignUp extends Component {
  constructor(props) {
    super(props);
    // this.handlePasswordMatch = this.handlePasswordMatch.bind(this);

    this.state = {
      companyName: "Star Fleet",
      email: "starfleetcommand@starfleet.ufp",
      password: "!Nechayev7alpha",
      confirmPassword: "!Nechayev7alpha",
      hiringManagerFirstName: "Alynna",
      hiringManagerLastName: "Nechayev",
      hiringManagerEmail: "nechayev@starfleet.ufp",
    };
  }
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // handlePasswordMatch(e) {
  //   this.setState({confirmPassword:e.target.value});
  // }

  handleNewEmp(event) {
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
      // }
    };

    axios
      .post(`/api/register/employers`, newEmp)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("_id", response.data.newEmp._id);
        this.setState({
          isSignedIn: true
        });
        console.log(localStorage.getItem("token"));
        console.log(response.data.newEmp._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <div class="signupContainer">
          <div class="formContainer">
            <Paper class="paper">
              <div className="form2">
                <div>
                  <Typography variant="display1" gutterBottom align="center">
                    Employer
                  </Typography>

                  <Typography variant="headline" gutterBottom align="center">
                    Sign Up
                  </Typography>
                </div>

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
                {/* <passwordMatch 
                  match = {this.state.confirmPassword}/> */}
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
              </div>
              <div className="login">
                <Link to="/dev-login">
                  <Typography variant="caption" gutterBottom align="center">
                    already have an account? Login here!
                  </Typography>
                </Link>
              </div>
            </Paper>
          </div>
        </div>
    );
  }
}
