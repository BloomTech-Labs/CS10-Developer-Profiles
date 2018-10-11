import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  imageAvatar: {
    height: '100px',
    width: '100px',
  },
};

/**
 * Given a name and an image, return a Material UI Avatar component formatted as an image.
 *
 * @param {Object} props - Component properties.
 * @param {String} props.avatarName - Avatar name to be used as the alt attribute for rendered `img`
 * element.
 * @param {String} props.img - Image path to be used as the src attribute for the `img` element.
 * @return {Component} Material UI Avatar component.
 *
 * @see {@link https://material-ui.com/demos/avatars/#image-avatars } for a demo of the Image Avatar component.
 * @see {@link https://material-ui.com/api/avatar/ } for the Avatar API.
 */
const ImageAvatar = (props) => {
  const { classes, avatarName, img } = props;
  return (
    <Avatar
      className={classes.imageAvatar}
      alt={avatarName}
      src={img}
    />
  );
};

ImageAvatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  avatarName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageAvatar);
