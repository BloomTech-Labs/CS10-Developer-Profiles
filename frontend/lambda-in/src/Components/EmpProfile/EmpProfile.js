import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import EmpCard from "./EmpCard";

import "./EmpProfile.css";

class EmpProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      jobTitle: "",
      // techStack: "",
      // skills: "",
      minSalary: "",
      maxSalary: ""
    };
  }

  render() {
    return (
      <div class="container">
        <div class="body">
          <Paper class="paper">
            <Typography variant="display1" gutterBottom align="center">
              Open Positions
            </Typography>

            <Typography variant="headline" gutterBottom align="center">
              Manage Current Open Positions
            </Typography>
            <div className="buttonContainer">
              <Button
                className="addButton"
                component={Link}
                to="/emp-pos-add"
                variant="contained"
                color="primary"
              >
                {" "}
                Add More Position
              </Button>
            </div>
            <div class="cards">
              {/* <ul>
                {this.props.openPositions.map(pos => {
                  return ( */}
              <EmpCard
                // id={pos._id}
                // projectName={pos.projectName}
                // description={pos.description}
                // jobTitle={pos.jobTitle}
                // // techStack={pos.techStack}
                // // skills={pos.skills}
                // minSalary={pos.minSalary}
                // maxSalary={pos.maxSalary}

                id={this.state._id}
                projectName={this.state.projectName}
                description={this.state.description}
                jobTitle={this.state.jobTitle}
                // techStack={this.state.techStack}
                // skills={this.state.skills}
                minSalary={this.state.minSalary}
                maxSalary={this.state.maxSalary}
              />
              {/*
                );
                })}
              </ul> */}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmpProfile;
