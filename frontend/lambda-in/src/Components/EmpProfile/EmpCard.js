import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import AOS from "aos";

import "aos/dist/aos.css";
import "./EmpCard.css";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

AOS.init();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#5C6BC0",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      main: "#B79A3F",
      contrastText: "#fff"
    }
  }
});

class EmpCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectName: "",
      description: "",
      jobTitle: "",
      // techStack: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      // skills: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      minSalary: "",
      maxSalary: ""
    };
    
    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete = event => {
    const { getGS } = this.props;
    const { setGS } = this.props;
        
    const userInfo = getGS("userInfo");

    const userInfoCopy = { ...userInfo };

    const {_id,  openPositions } = userInfoCopy;
    const {posId} = this.props;

    const updatedPositions = openPositions.filter(openPosition => openPosition._id !== posId);
    console.log(updatedPositions);

    event.preventDefault();

    axios
      .put(
        `/api/employers/${_id}`, { openPositions: updatedPositions }, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log(response)
        this.props.setGS({
          userInfo: { ...response.data['Document(s) modified'] },
        });


      })
      .catch(error => {
        console.log(error);
        this.props.setGS({ updateState: "error" });
      });
  };

  render() {
    const userType  = this.props.getGS('userType')

    return (
      <div className="cardContainer">
          <div className="cardInputs">
            <div>
              <Typography variant="caption">Project Name</Typography>
              <Typography variant="subheading">
                {this.props.projectName}
              </Typography>
            </div>

            <div className="disc">
              <Typography variant="caption">description</Typography>
              <Typography variant="subheading">
                {this.props.description}
              </Typography>
            </div>

            <div>
              <Typography variant="caption">Job Title</Typography>
              <Typography variant="subheading">
                {this.props.jobTitle}
              </Typography>
            </div>

            {/* <div>
            <Typography variant="caption">Tech Stack:</Typography>
            <Typography variant="subheading">{this.props.techStack}</Typography>
          </div>

          <div>
            <Typography variant="caption">Required Skills</Typography>
            <Typography variant="subheading">{this.props.skills}</Typography>
          </div> */}

            <div>
              <Typography variant="caption">Salary range</Typography>
              <Typography variant="subheading">
                {this.props.minSalary} - {this.props.maxSalary}
              </Typography>
            </div>
            </div>
            <div className="cardButtons">
              <MuiThemeProvider theme={theme}>
                <Button
                  className="cardButton"
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </MuiThemeProvider>
            </div>
      </div>
    );
  }
}
export default EmpCard;
