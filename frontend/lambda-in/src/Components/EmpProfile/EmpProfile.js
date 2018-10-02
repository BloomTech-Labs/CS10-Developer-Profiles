import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

import EmployerPositionCard from "./EmpCard";

import "./EmpProfile.css";

class EmployerProfile extends React.Component {
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
        <div class="body">
          <Paper class="paper">
            <Typography variant="display1" gutterBottom align="center">
              Open Positions
            </Typography>

            <Typography variant="headline" gutterBottom align="center">
              Manage Current Open Positions
            </Typography>
            <div>
                <Button
                  className = "addButton"
                  component={Link} to="/emp-pos-add"
                  variant="contained"
                  color="primary"
                  align="center"
                >
                  {" "}
                  Add More Position
                </Button>
              </div>
            <div class="card">
              <ul>
                {/* {this.state.map(EmployerOpenPositionCard => {
                  return ( */}
                    <EmployerPositionCard class="OPCardInList"/>
                   {/* );
                })} */}
              </ul>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmployerProfile;
