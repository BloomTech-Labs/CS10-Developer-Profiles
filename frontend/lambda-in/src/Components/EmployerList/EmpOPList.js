import React, { Component } from "react";
import EmployerOpenPositionCard from "./EmpOPCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import NavBar from '../../Components/Navbar/navbar';

import "./EmpOPList.css";
import { Typography } from "@material-ui/core";

class EmplyoerOpenPositionList extends React.Component {
  render() {
    return (
      <div class="container">
        <Paper>
          <div class="navBar">
            <div class="leftNavBar">
              <Button>find Devlopers</Button>
              <Button>Browse</Button>
              <Button>profile</Button>
            </div>
            <div class="rightNavBar">
              <Button>Billing</Button>
              <Button>Setting</Button>
            </div>
          </div>
        </Paper>

        <div class="body">
            <Paper>
          <Typography variant="headline">
            Current Job Opening List
          </Typography>

          <EmployerOpenPositionCard />
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmplyoerOpenPositionList;
