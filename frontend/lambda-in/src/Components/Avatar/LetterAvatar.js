import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  letterAvatar: {
    backgroundColor: '#a0021e',
  }
};

const LetterAvatar = props => {
  const { classes } = props;
  return <Avatar className={classes.letterAvatar}>{props.content}</Avatar>;
};

LetterAvatar.propTypes = {
  content: PropTypes.string.isRequired
};

export default withStyles(styles)(LetterAvatar);
