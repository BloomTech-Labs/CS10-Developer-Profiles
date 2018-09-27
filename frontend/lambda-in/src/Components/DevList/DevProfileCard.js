import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import testimage from '../../static/images/testimage.png';

import './DevProfileCard.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default class DevProfileCard extends Component {
  render() {
    return (
      <div data-aos="flip-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
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
                <Typography variant="paragraph">cool boi 101 cool boi 1cool boi 101</Typography>
              </div>
            </div>
            <Divider />
            <Typography variant="paragraph">cool boi 101 cool boi 1cool boi 101</Typography>
          </div>
          <Divider />
          <div className="midCard">
            <Typography variant="Headline" component="h4">
              Full stack engineer
            </Typography>
          </div>
          <Divider />
          <div className="bottomCard">
            <Typography variant="paragraph">
              python js python js python js python js python js python js python js python js
            </Typography>
          </div>
          <div className="socialInfo" />
        </Card>
      </div>
    );
  }
}
