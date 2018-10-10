import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import EmpCard from './EmpCard';

import './EmpProfile.css';
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

export default ({ getGS, setGS }) => {
  const userInfo = getGS('userInfo');
  const userType = getGS('userType');
  const positions = userInfo.openPositions;

  return (
    <div className="container">
      <div className="body">
        <Paper className="paper">
          <Typography variant="display1" gutterBottom align="center">
            Open Positions
          </Typography>

          <Typography variant="headline" gutterBottom align="center">
            Manage Current Open Positions
          </Typography>
          <div className="buttonContainer">
            <MuiThemeProvider theme={theme}>
              <Button
                className="addButton"
                component={Link}
                to="/emp-pos-add"
                variant="contained"
                color="primary"
              >
                {' '}
                Add More Position
              </Button>
            </MuiThemeProvider>
          </div>
          <div className="cards">
            <ul>
              {positions.map((pos) => {
                return (
                  <Card
                    data-aos="flip-up"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                  >
                    <EmpCard
                      getGS={getGS}
                      setGS={setGS}
                      posId={pos._id}
                      projectName={pos.projectName}
                      description={pos.description}
                      jobTitle={pos.jobTitle}
                      minSalary={pos.minSalary}
                      maxSalary={pos.maxSalary}
                    />
                  </Card>
                );
              })}
            </ul>
          </div>
        </Paper>
      </div>
    </div>
  );
};
