import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import "./EmpOPForm.css";


class EmployerOpenPositionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewPosition = event => {
    event.preventDefault();

    const newPosition = {
      openPositions: {
        projectName: this.state.projectName,
        description: this.state.description,
        jobTitle: this.state.jobTitle,
        techStack: this.state.techStack,
        skills: this.state.skills,
        minSalrary: this.state.minSalrary,
        maxSalary: this.state.maxSalary
      }
    };
  };

  render() {
    return (
      <div>
        <div class="formContainer">
          <Paper class="paper">
            <div className="form2">
              <div>

              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmployerOpenPositionForm;
