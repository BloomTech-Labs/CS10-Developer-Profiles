import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DevSnapshot from '../DevSnapshot/DevSnapshot';
import DevSocial from '../DevSocial/DevSocial';

import './DevProfileCard.css';

const styles = {

};

const DevProfileCard = props => {
  const { classes } = props;

  return (
    <Card className={classes.devProfileCard}>
      <DevSnapshot />
      <DevSocial />
    </Card>
  );
};

DevProfileCard.PropTypes = {
  seeker: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    img: PropTypes.string,
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
    acclaim: PropTypes.string,
  })
};

export default withStyles(styles)(DevProfileCard);
