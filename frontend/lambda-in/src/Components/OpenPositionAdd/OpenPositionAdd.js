import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./OpenPositionAdd.css";

export default class OpenPositionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      description: '',
      jobTitle: '',
      techStack: '',
      skills: '',
      minSalrary: '',
      maxSalary: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.newPosition = this.newPosition.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  newPosition = event => {
    const {
      projectName,
      description,
      jobTitle,
      techStack,
      skills,
      minSalrary,
      maxSalary
    } = this.state;

    const { setGS } = this.props;

    const newPosition = {
      projectName,
      description,
      jobTitle,
      techStack,
      skills,
      minSalrary,
      maxSalary
    };

    event.preventDefault();

    axios
      .post("/api/employers/", newPosition)
      .then(response => {
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("_id", response.data.newPosition._id);

        this.setStage({
          projectName: '',
          description: '',
          jobTitle: '',
          techStack: '',
          skills: '',
          minSalrary: '',
          maxSalary: ''
        });
        setGS({
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
      minSalrary,
      maxSalary
    } = this.state;

    return (
      <div className="addContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Edit Open Position
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              <TextField
                id="projectName"
                label="Project Name"
                value={projectName}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="description"
                label="Description"
                value={description}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="jobTitle"
                label="Job Title"
                value={jobTitle}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="techStack"
                label="Tech Stack"
                value={techStack}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="skills"
                label="Skills"
                value={skills}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="minSalrary"
                label="minSalrary"
                value={minSalrary}
                onChange={this.handleChange}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="maxSalary"
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
                  align="center"
                  onClick={this.EditPosition}
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
