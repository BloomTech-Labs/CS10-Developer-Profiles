import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import EmployerOpenPositionForm from "./EmpOPForm";
import EmployerOpenPositionCard from "./EmpOPCard";

import "./EmpOPList.css";

class EmplyoerOpenPositionList extends React.Component {
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
            <div class="form">
              <EmployerOpenPositionForm />
            </div>
            <div class="card">
              <ul>
                {this.state.map(EmployerOpenPositionCard => {
                  return (
                    <EmployerOpenPositionCard/>
                   );
                })}
              </ul>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmplyoerOpenPositionList;
