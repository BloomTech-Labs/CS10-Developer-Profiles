import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {};

const ImageAvatar = props => {
  const { classes } = props;
  return (
    <Avatar
      className={classNames(classes.avatar)}
      alt={props.name}
      src={props.img}
    />
  );
};

export default withStyles(styles)(ImageAvatar);
