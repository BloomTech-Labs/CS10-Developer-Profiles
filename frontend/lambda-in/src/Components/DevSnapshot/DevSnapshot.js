import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../Avatar/ImageAvatar';
import LetterAvatar from '../Avatar/LetterAvatar';
import SkillCloud from '../SkillCloud/SkillCloud';

const styles = {
  devSnapshot: {
    width: '100%',
  },
  devSnapshotHeader: {
    display: 'flex',
  }
};

const DevSnapshot = props => {
  const { classes } = props;
  return (
    <CardContent className={classes.devSnapshot}>
      <div className={classes.devSnapshotHeader}>
        {props.img ? (
          <ImageAvatar name={props.name} img={props.img} />
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
  name: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  location: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string,
  topSkills: PropTypes.array,
  addSkills: PropTypes.array,
  familiar: PropTypes.array,
};

export default withStyles(styles)(DevSnapshot);
