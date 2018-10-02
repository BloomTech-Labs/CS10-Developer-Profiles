import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";

import "./EmpCard.css";

class EmployerPositionCard extends React.Component {
  static defaultProps = {
    projectName: "Enterprise-D",
    description: "We are watching for the captain of the Federation Flagship.",
    jobTitle: "Captain",
    techStack: "full stack",
    skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
    minSalary: 1000000,
    maxSalary: 2000000
  };

  handleDelete(e) {
    const id = e.target.dataset.id;
    axios.delete(`/api/register/employers/${id}`).then(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div class="cardPaperContainer">
        <Paper class="cardPaper">

            <div>
              <Typography variant="caption">Project Name</Typography>
              <Typography variant="subheading">
                {this.props.projectName}
              </Typography>
            </div>

            <br />
            <div class="disc">
              <Typography variant="caption">description</Typography>
              <Typography variant="subheading">
                {this.props.description}
              </Typography>
            </div>

            <br />
            <div>
              <Typography variant="caption">Job Title</Typography>
              <Typography variant="subheading">
                {this.props.jobTitle}
              </Typography>
            </div>

            <br />
            <div>
              <Typography variant="caption">Tech Stack:</Typography>
              <Typography variant="subheading">
                {this.props.techStack}
              </Typography>
            </div>

            <br />
            <div>
              <Typography variant="caption">Required Skills</Typography>
              <Typography variant="subheading">{this.props.skills}</Typography>
            </div>

            <br />
            <div>
              <Typography variant="caption">Salary range</Typography>
              <Typography variant="subheading">
                {this.props.minSalary} - {this.props.maxSalary}
              </Typography>
            </div>

            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
        </Paper>
      </div>
    );
  }
}
export default EmployerOpenPositionCard;
