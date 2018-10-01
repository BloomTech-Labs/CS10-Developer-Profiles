import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DevSnapshot from '../../DevSnapshot/DevSnapshot';
import DevSocial from '../../DevSocial/DevSocial';

const styles = {
  devProfileCard: {
    display: 'flex'
  }
};

/**
 * Given an object containing a seeker's name, image, location, summary, desired title, skills, portfolio,
 * resume and social links, return a Material UI Card component with a DevSnapshot and DevSocial component.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.seeker - Seeker data.
 * @param {String} props.seeker._id - MongoDB Object Id.
 * @param {String} props.seeker.img - URL to Seeker's profile image.
 * @param {String} props.seeker.firstName - Seeker's first name.
 * @param {String} props.seeker.lastName - Seeker's last name.
 * @param {String} props.seeker.currentLocation - Seeker's current location.
 * @param {String} props.seeker.summary - A 128 character description about the Seeker.
 * @param {String} props.seeker.desiredTitle - Job title the Seeker is looking for.
 * @param {Array} props.seeker.topSkills - Seeker's top skills which get displayed in large text.
 * @param {Array} props.seeker.additionalSkills - Seeker's additional skills which get displayed in medium
 * text.
 * @param {Array} props.seeker.familiarWith - Skills the Seeker is familiar with which get displayed in small
 * text.
 * @param {String} props.seeker.github - URL to Seeker's GitHub profile.
 * @param {String} props.seeker.linkedIn - URL to Seeker's LinkedIn profile.
 * @param {String} props.seeker.portfolio - URL to Seeker's portfolio.
 * @param {String} props.seeker.resume - URL to Seeker's resume.
 * @param {String} props.seeker.acclaim - Id for Lambda Badge, if issued.
 * @return {Component} Material UI Card component containing a DevSnapshot and DevSocial component.
 *
 * @see {@link https://material-ui.com/api/card/ } for the Card API.
 * @see {@link https://material-ui.com/demos/cards/ } for a demo of the Card Component.
 * @see {@link ../../DevSnapshot/README.md } for the DevSnapshot API.
 * @see {@link ../../DevSocial/README.md } for the DevSocial API.
 */
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
        fullName={name}
        initials={initials}
        img={props.seeker.img}
        location={props.seeker.currentLocation}
        summary={props.seeker.summary}
        title={props.seeker.desiredTitle}
        topSkills={props.seeker.topSkills}
        addSkills={props.seeker.additionalSkills}
        familiar={props.seeker.familiarWith}
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
