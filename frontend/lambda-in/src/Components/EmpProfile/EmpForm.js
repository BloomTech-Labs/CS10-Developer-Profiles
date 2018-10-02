import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

import "./EmpForm.css";
import "./EmpProfile";

class EmployerPositionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      jobTitle: "",
      techStack: "",
      skills: [],
      minSalrary: null,
      maxSalrary: null
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addNewPosition = event => {
    event.preventDefault();

    axios
      .post("/api/register/employers", {
        projectName: this.state.projectName,
        description: this.state.description,
        jobTitle: this.state.jobTitle,
        techStack: this.state.techStack,
        skills: this.state.skills,
        minSalrary: this.state.minSalrary,
        maxSalary: this.state.maxSalary
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      projectName: "",
      description: "",
      jobTitle: "",
      techStack: "",
      skills: [],
      minSalrary: null,
      maxSalrary: null
    });
  };

  render() {
    return (
      <div>
        <div class="formContainer">
          <Paper class="paper">
            <div className="form2">
              <div>
                <TextField
                  id="projectName"
                  label="Project Name"
                  value={this.state.projectName}
                  onChange={this.handleChange("projectName")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="description"
                  label="Description"
                  value={this.state.description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="jobTitle"
                  label="Job Title"
                  value={this.state.jobTitle}
                  onChange={this.handleChange("jobTitle")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="techStack"
                  label="Tech Stack"
                  value={this.state.techStack}
                  onChange={this.handleChange("techStack")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="skills"
                  label="Skills"
                  value={this.state.skills}
                  onChange={this.handleChange("skills")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="minSalrary"
                  label="minSalrary"
                  value={this.state.minSalrary}
                  onChange={this.handleChange("minSalrary")}
                  margin="normal"
                  fullWidth="true"
                />

                <TextField
                  id="maxSalary"
                  label="maxSalary"
                  value={this.state.maxSalary}
                  onChange={this.handleChange("maxSalary")}
                  margin="normal"
                  fullWidth="true"
                />
              <div class="buttons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addNewPosition}
                >
                  Submit
                </Button>
              </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmployerPositionForm;
