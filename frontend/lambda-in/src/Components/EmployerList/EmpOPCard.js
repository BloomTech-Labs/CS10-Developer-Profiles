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
  static defaultProps = {
    projectName: "Enterprise-D",
    description: "We are watching for the captain of the Federation Flagship.",
    jobTitle: "Captain",
    techStack: "full stack",
    skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
    minSalrary: 1000000,
    maxSalary: 2000000
  };


  render() {
    return (
      <div class="container">
        <Card class="cardContainer">
          <CardContent>
            <Typography variant="body1">
              <br />
              Project Name: {this.props.projectName}
              <br />
              description: {this.props.description}
              <br />
              Job Title: {this.props.jobTitle}
              <br />
              Tech Stack: {this.props.techStack}
              <br />
              Required Skills: {this.props.skills}
              <br />
              Salary range: {this.props.minSalary} - {this.props.maxSalary}
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
