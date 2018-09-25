import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DevSnapshot from '../DevSnapshot/DevSnapshot';
import DevSocial from '../DevSocial/DevSocial';

import './DevProfileCard.css';

const styles = {
  devProfileCard: {
    display: 'flex',
  }
};

const DevProfileCard = props => {
  const { classes } = props;
  const name = `${props.seeker.firstName} ${props.seeker.lastName}`;
  const firstInitial = props.seeker.firstName.slice(0, 1);
  const lastInitial = props.seeker.lastName.slice(0, 1);
  const initials = firstInitial + lastInitial;

  return (
    <Card className={classes.devProfileCard}>
      <DevSnapshot
        _id={props.seeker._id}
        name={name}
        initials={initials}
        img={props.seeker.img}
        location={props.seeker.currentLocation}
        summary={props.seeker.summary}
        title={props.seeker.desiredTitle}
      />
      <DevSocial />
    </Card>
  );
};

DevProfileCard.propTypes = {
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
    acclaim: PropTypes.string
  })
};

export default withStyles(styles)(DevProfileCard);
