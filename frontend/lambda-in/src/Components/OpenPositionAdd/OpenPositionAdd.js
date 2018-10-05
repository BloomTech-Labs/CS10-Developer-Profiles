import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./OpenPositionAdd.css";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export default class OpenPositionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      jobTitle: "",
      techStack: "",
      skills: "",
      minSalary: "",
      maxSalary: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewPos = this.handleNewPos.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleNewPos = event => {
    const {getGS} = this.props; 
    const {setGS} = this.props; 
    const userInfo = getGS('userInfo'); // getGS('userInfo') comes from App.js
    
    const {
      projectName,
      description,
      jobTitle,
      techStack,
      skills,
      minSalary,
      maxSalary
    } = this.state;

    event.preventDefault();

    axios
      .post("/api/employers/", {newPosition},           {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("_id", response.data.newPosition._id);

        this.setStage({
          projectName: "",
          description: "",
          jobTitle: "",
          techStack: "",
          skills: "",
          minSalary: "",
          maxSalary: ""
        });
        this.props.setGS({
          userInfo: { ...response.data.newPosition },
          isSignedIn: true,
          userType: "employer"
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.props.setGS({ updateState: "error" });
      });
  };

  render() {
    const {
      projectName,
      description,
      jobTitle,
      techStack,
      skills,
      minSalary,
      maxSalary
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className="addContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Add Open Position
          </Typography>
          <br />
          <div className="inputRow">
            <TextField
              name="projectName"
              label="Project Name"
              value={projectName}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="description"
              label="Description"
              value={description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="jobTitle"
              label="Job Title"
              value={jobTitle}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="techStack"
              label="Tech Stack"
              value={techStack}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="skills"
              label="Skills"
              value={skills}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="minSalary"
              label="minSalary"
              value={minSalary}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="maxSalary"
              label="maxSalary"
              value={maxSalary}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />
            <div class="buttons">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNewPos}
              >
                {" "}
                Submit
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
