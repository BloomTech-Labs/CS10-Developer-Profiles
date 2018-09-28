import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  letterAvatar: {
    backgroundColor: '#a0021e'
  }
};

/**
 * Given a string, return a Material UI Avatar component formatted with simple characters.
 *
 * @param {Object} props - Component properties.
 * @param {String} props.content - Characters to render inside the Avatar.
 * @return {Component} Material UI Avatar component.
 *
 * @see {@link https://material-ui.com/demos/avatars/#letter-avatars } for a demo of the Letter Avatar component.
 * @see {@link https://material-ui.com/api/avatar/ } for the Avatar API.
 */
const LetterAvatar = props => {
  const { classes } = props;
  return <Avatar className={classes.letterAvatar}>{props.content}</Avatar>;
};

LetterAvatar.propTypes = {
  content: PropTypes.string.isRequired
};

export default withStyles(styles)(LetterAvatar);
