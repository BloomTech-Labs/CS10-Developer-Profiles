import React from 'react';
import AOS from 'aos';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import testimage from '../../static/images/testimage.png';

import './DevProfileCard.css';
import 'aos/dist/aos.css';

AOS.init();

const DevProfileCard = () => (
  <div data-aos="flip-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
    <Card className="cardContainer">
      <div className="personalInfo">
        <div className="topCard">
          <div className="imageInfo">
            <Avatar alt="Remy Sharp" src={testimage} />
          </div>
          <div className="nameInfo">
            <Typography variant="title">Jean Luc Picard</Typography>
            <Typography variant="subheading">USS Stargazer</Typography>
            <Divider />
            <Typography variant="paragraph">Leadership, Combat Mastery, Virtue</Typography>
          </div>
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
      </div>
    </Card>
  </div>
);

export default DevProfileCard;
