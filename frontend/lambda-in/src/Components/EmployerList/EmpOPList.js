import React, { Component } from "react";
import EmployerOpenPositionCard from "./EmpOPCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import NavBar from '../../Components/Navbar/navbar';

import "./EmpOPList.css";
import { Typography } from "@material-ui/core";
import EmployerOpenPositionForm from "./EmpOPForm";

class EmplyoerOpenPositionList extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="body">
          <Paper>
            <Typography variant="display1" gutterBottom align="center">
              Open Positions
            </Typography>

            <Typography variant="headline" gutterBottom align="center">
              Manage Current Open Positions
            </Typography>
            <EmployerOpenPositionForm />
            <EmployerOpenPositionCard />
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmplyoerOpenPositionList;
