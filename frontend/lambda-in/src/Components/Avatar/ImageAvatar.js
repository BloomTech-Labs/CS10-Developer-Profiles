import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {};

const ImageAvatar = props => {
  const { classes } = props;
  return <Avatar className={classes.imageAvatar} alt={props.name} src={props.img} />;
};

ImageAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default withStyles(styles)(ImageAvatar);
