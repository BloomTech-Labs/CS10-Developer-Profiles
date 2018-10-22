import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../Avatar/ImageAvatar/ImageAvatar';
import LetterAvatar from '../Avatar/LetterAvatar/LetterAvatar';
import SkillCloud from '../SkillCloud/SkillCloud';

const styles = {
  devSnapshot: {
    width: '100%',
  },
  devSnapshotHeader: {
    display: 'flex',
    marginBottom: '14px',
  },
  devIntro: {
    padding: '4px 0 0 24px',
  },
  devName: {
    color: '#333333',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

/**
 * Given an object containing a seeker's name, image, location, summary, desired title, skills,
 * return a Material UI CardContent component containing a snapshot/preview of the seeker's profile.
 *
 * @param {Object} props - Component properties.
 * @param {String} props._id - MongoDB Object Id.
 * @param {String} props.img - URL to seeker's profile image.
 * @param {String} props.fullName - Seeker's full name.
 * @param {String} props.initials - Seeker's initials using first character of first and last name.
 * @param {Object} props.location - Seeker's current location.
 * @param {String} props.summry - A 128 character description about the Seeker.
 * @param {String} props.title - Job title the Seeker is looking for.
 * @param {Array} props.topSkills - Seeker's top skills which get displayed in large text.
 * @param {Array} props.addSkills - Seeker's additional skills which get displayed in medium text.
 * @param {Array} props.familiar - Skills the Seeker is familiar with which get displayed in small
 * text.
 * @return {Component} Material UI CardContent component with a preview of the Seeker's profile.
 *
 * @see {@link https://material-ui.com/api/card-content/ } for the CardContent API.
 * @see {@link https://material-ui.com/api/divider/ } for the Divider API.
 * @see {@link https://material-ui.com/api/typography/ } for the Typography API.
 * @see {@link https://material-ui.com/style/typography/ } for a demo of the Typography component.
 * @see {@link ../Avatar/ImageAvatar/ImageAvatar.md } for the ImageAvater API.
 * @see {@link ../Avatar/ImageAvatar/LetterAvatar.md  } for the LetterAvatar API.
 * @see {@link ../SkillCloud/SkillCloud.md  } for the SkillCloud API.
 */
const DevSnapshot = (props) => {
  const {
    classes,
    _id,
    fullName,
    initials,
    img,
    location,
    summary,
    title,
    topSkills,
    addSkills,
    familiar,
  } = props;

  return (
    <CardContent className={classes.devSnapshot}>
      <div className={classes.devSnapshotHeader}>
        {img ? (
          <ImageAvatar avatarName={fullName} img={img} />
        ) : (
          <LetterAvatar content={initials} />
        )}
        <CardContent className={classes.devIntro}>
          <Typography variant="headline">
            <Link className={classes.devName} to={`/dev-profile/${_id}`}>
              {fullName}
            </Link>
          </Typography>
          {location && <Typography>{location.place}</Typography>}
          {summary && <Typography variant="caption">{summary}</Typography>}
        </CardContent>
      </div>
      {title && <Typography variant="title">{title}</Typography>}
      <SkillCloud topSkills={topSkills} addSkills={addSkills} familiar={familiar} />
    </CardContent>
  );
};

DevSnapshot.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  _id: PropTypes.string.isRequired,
  img: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  location: PropTypes.shape({
    place: PropTypes.string.isRequired,
    geolocation: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
  }),
  summary: PropTypes.string,
  title: PropTypes.string,
  topSkills: PropTypes.arrayOf(PropTypes.string),
  addSkills: PropTypes.arrayOf(PropTypes.string),
  familiar: PropTypes.arrayOf(PropTypes.string),
};

DevSnapshot.defaultProps = {
  img: '',
  summary: '',
  location: null,
  title: '',
  topSkills: [],
  addSkills: [],
  familiar: [],
};

export default withStyles(styles)(DevSnapshot);
