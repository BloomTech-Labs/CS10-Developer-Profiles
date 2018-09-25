import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {
  faCertificate,
  faFile,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';

const styles = {};

const DevSocial = props => {
  const { classes } = props;

  return (
    <div className={classes.devSocial}>
      <List component="ul">
        <ListItem>
          <FontAwesomeIcon icon={faCertificate} size="2x" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faShareAlt} size="2x" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faFile} size="2x" />
        </ListItem>
      </List>
    </div>
  );
};

DevSocial.propTypes = {
  github: PropTypes.string,
  linkedIn: PropTypes.string,
  portfolio: PropTypes.string,
  acclaim: PropTypes.string
};

export default withStyles(styles)(DevSocial);
