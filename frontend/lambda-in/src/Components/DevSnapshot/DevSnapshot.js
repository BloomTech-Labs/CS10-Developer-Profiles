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
 * Given a Github, LinkedIn, Portfolio and/or Acclaim link, return a Material UI List component containing
 * a Material UI ListItem component and FontAwesomeIcon component for each link.
 *
 * @param {Object} props - Component properties.
 * @param {String} props.github - A github profile link.
 * @param {String} props.linkedIn - A linkedIn profile link.
 * @param {String} props.portfolio - A link to an extrenal portfolio.
 * @param {String} props.acclaim - An acclaim badge id.
 * @return {Component} Material UI List component.
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
            <Link to={`/dev-profile/${props._id}`}>{props.name}</Link>
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
