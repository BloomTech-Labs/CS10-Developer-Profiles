import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OpenPositionAdd.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#5C6BC0',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B79A3F',
      contrastText: '#fff',
    },
  },
});

AOS.init();

export default class OpenPositionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      description: '',
      jobTitle: '',
      // techStack: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      // skills: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      minSalary: '',
      maxSalary: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewPos = this.handleNewPos.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNewPos = (event) => {
    const { getGS } = this.props;
    const { setGS } = this.props;
    const userInfo = getGS('userInfo');

    const userInfoCopy = { ...userInfo };

    const { _id } = userInfoCopy;
    const updatedPositions = [...userInfoCopy.openPositions];

    updatedPositions.push(this.state);

    axios
      .put(
        `/api/employers/${_id}`,
        { openPositions: updatedPositions },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response);
        } else {
          setGS({
            userInfo: { ...response.data['Document(s) modified'] },
            updateState: 'updated',
          });
          console.log({ ...response.data['Document(s) modified'] });

          this.setState({
            projectName: '',
            description: '',
            jobTitle: '',
            // techStack: "",
            // skills: "",
            minSalary: '',
            maxSalary: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.setGS({ updateState: 'error' });
      });
  };

  render() {
    const {
      projectName,
      description,
      jobTitle,
      // techStack,
      // skills,
      minSalary,
      maxSalary,
    } = this.state;

    return (
      <div data-aos="zoom-in-down" className="addContainer">
        <Paper className="paperEmployerContainer">
          <Typography variant="display1" gutterBottom align="center">
            Add Position
          </Typography>
          <Typography variant="headline" gutterBottom align="center">
            Add Available Positions
          </Typography>
          <br />
          <div className="inputRow">
            <TextField
              name="projectName"
              label="Project Name"
              value={projectName}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="description"
              label="Description"
              value={description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="jobTitle"
              label="Job Title"
              value={jobTitle}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />
            {/*
            <TextField
              name="techStack"
              label="Tech Stack"
              value={techStack}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="skills"
              label="Skills"
              value={skills}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />
    */}
            <TextField
              name="minSalary"
              label="minSalary"
              value={minSalary}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />

            <TextField
              name="maxSalary"
              label="maxSalary"
              value={maxSalary}
              onChange={this.handleChange}
              margin="normal"
              fullWidth="true"
            />
            <div className="addPosButtons">
            <MuiThemeProvider theme={theme}>
            <div>
              <Button
                className="submitButton"
                variant="contained"
                color="primary"
                onClick={this.handleNewPos}
              >
                {' '}
                Submit
              </Button>
              </div>

              <div>
              <Button
                  className="backPropButton"
                  component={Link}
                  to="/emp-profile"
                  variant="contained"
                  color="secondary"
              >
                {' '}
                Back to Profile
              </Button>
              </div>
              </MuiThemeProvider>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
