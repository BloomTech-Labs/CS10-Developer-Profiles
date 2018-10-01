import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../Avatar/ImageAvatar/ImageAvatar';
import LetterAvatar from '../Avatar/LetterAvatar/LetterAvatar';
import SkillCloud from '../SkillCloud/SkillCloud';

const styles = {
  devSnapshot: {
    width: '100%'
  },
  devSnapshotHeader: {
    display: 'flex'
  }
};

/**
 * Given an object containing a seeker's name, image, location, summary, desired title, skills, return a
 * Material UI CardContent component containing a snapshot/preview of the seeker's profile.
 *
 * @param {Object} props - Component properties.
 * @param {String} props._id - MongoDB Object Id.
 * @param {String} props.img - URL to seeker's profile image.
 * @param {String} props.fullName - Seeker's full name.
 * @param {String} props.initials - Seeker's initials using first character of first and last name.
 * @param {String} props.location - Seeker's current location.
 * @param {String} props.summry - A 128 character description about the Seeker.
 * @param {String} props.title - Job title the Seeker is looking for.
 * @param {Array} props.topSkills - Seeker's top skills which get displayed in large text.
 * @param {Array} props.addSkills - Seeker's additional skills which get displayed in medium text.
 * @param {Array} props.familiar - Skills the Seeker is familiar with which get displayed in small text.
 * @return {Component} Material UI CardContent component with a preview of the Seeker's profile.
 *
 * @see {@link https://material-ui.com/api/card-content/ } for the CardContent API.
 * @see {@link https://material-ui.com/api/divider/ } for the Divider API.
 * @see {@link https://material-ui.com/api/typography/ } for the Typography API.
 * @see {@link ../Avatar/ImageAvatar/ImageAvatar.md } for the ImageAvater API.
 * @see {@link ../Avatar/ImageAvatar/LetterAvatar.md  } for the LetterAvatar API.
 * @see {@link ../SkillCloud/SkillCloud.md  } for the SkillCloud API.
 */
const DevSnapshot = props => {
  const { classes } = props;
  return (
    <CardContent className={classes.devSnapshot}>
      <div className={classes.devSnapshotHeader}>
        {props.img ? (
          <ImageAvatar avatarName={props.fullName} img={props.img} />
        ) : (
          <LetterAvatar content={props.initials} />
        )}
        <CardContent className={classes.devIntro}>
          <Typography variant="headline">
            <Link to={`/dev-profile/${props._id}`}>{props.fullName}</Link>
          </Typography>
          {props.location && <Typography>{props.location}</Typography>}
          {props.summary && <Typography>{props.summary}</Typography>}
        </CardContent>
      </div>
      {props.title && <Typography variant="title">{props.title}</Typography>}
      <Divider />
      <SkillCloud
        topSkills={props.topSkills}
        addSkills={props.addSkills}
        familiar={props.familiar}
      />
    </CardContent>
  );
};

DevSnapshot.propTypes = {
  _id: PropTypes.string.isRequired,
  img: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  location: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string,
  topSkills: PropTypes.array,
  addSkills: PropTypes.array,
  familiar: PropTypes.array
};

export default withStyles(styles)(DevSnapshot);
