import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import testimage from '../../static/images/testimage.png';

import './DevProfileCard.css';

class DevProfileCard extends Component {
  render() {
    return (
      <div>
        <Card className="cardContainer">
          <div className="personalInfo">
            <div className="topCard">
              <div className="imageInfo">
                <Avatar alt="Remy Sharp" src={testimage} />
              </div>
              <div className="nameInfo">
                <Typography variant="title">Samar vir</Typography>
                <Typography variant="subheading">Delhi, India</Typography>
                <Divider />
                <Typography variant="caption">
                  cool boi 101 cool boi 1cool boi 101
                </Typography>
              </div>
            </div>
            <Divider />
            <div className="midCard">
              <Typography variant="headline" component="h4">
                Full stack engineer
              </Typography>
            </div>
            <Divider />
            <div className="bottomCard">
              <Typography variant="caption">
                python js python js python js python js python js python js
                python js python js
              </Typography>
            </div>
          </div>
          <div className="socialInfo" />
        </Card>
      </div>
    );
  }
};

DevProfileCard.PropTypes = {
  seeker: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    currentLocation: PropTypes.string,
    summary: PropTypes.string,
    desiredTitle: PropTypes.string,
    topSkills: PropTypes.array,
    additionalSkills: PropTypes.array,
    familiarWith: PropTypes.array,
    github: PropTypes.string,
    linkedIn: PropTypes.string,
    portfolio: PropTypes.string,
    resume: PropTypes.string,
    acclaim: PropTypes.string
  }),
};

export default DevProfileCard;
