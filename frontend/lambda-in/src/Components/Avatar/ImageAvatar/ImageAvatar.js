import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {};

/**
 * Given a name and an image, return a Material UI Avatar component formatted as an image
 *
 * @prop {String} name - Avatar name to be used as the alt attribute for rendered `img` element.
 * @prop {String} img - Image path to be used as the src attribute for the `img` element.
 * @return {Component} Material UI Avatar component.
 *
 * @see {@link https://material-ui.com/demos/avatars/ } for a demo of the Avatar component.
 * @see {@link https://material-ui.com/api/avatar/ } for the Avatar API.
 */
const ImageAvatar = props => {
  const { classes } = props;
  return (
    <Avatar className={classes.imageAvatar} alt={props.name} src={props.img} />
  );
};

ImageAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default withStyles(styles)(ImageAvatar);
