import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import "./EmpOPCard.css";

class EmployerOpenPositionCard extends React.Component {
  state = {
    projectName: "Enterprise-D",
    description: "We are looking for the captain of the Federation Flagship.",
    jobTitle: "Captain",
    techStack: "full stack",
    skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
    minSalary: 1000000,
    maxSalary: 2000000
  };

  render() {
    return (
      <div class="container">
        <Card class="cardContainer">
          <CardContent>
            <Typography variant="body1">
              <br />
              Project Name: {this.state.projectName}
              <br />
              Job Title: {this.state.jobTitle}
              <br />
              Tech Stack: {this.state.techStack}
              <br />
              Required Skills: {this.state.skills}
              <br />
              Salary range: {this.state.minSalary} - {this.state.maxSalary}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Delete</Button>
            <Button>Edit</Button>
          </CardActions>
          <Divider />
        </Card>
      </div>
    );
  }
}
export default EmployerOpenPositionCard;
