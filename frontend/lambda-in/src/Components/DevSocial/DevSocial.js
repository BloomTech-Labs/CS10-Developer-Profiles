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
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';

const styles = {};

/**
 * Given a Github, LinkedIn, Portfolio and/or Acclaim link, return a Material UI List component
 * containing a Material UI ListItem component and FontAwesomeIcon component for each link.
 *
 * @param {Object} props - Component properties.
 * @param {String} props.github - A github profile link.
 * @param {String} props.linkedIn - A linkedIn profile link.
 * @param {String} props.portfolio - A link to an extrenal portfolio.
 * @param {String} props.acclaim - An acclaim badge id.
 * @return {Component} Material UI List component.
 *
 * @see {@link https://material-ui.com/api/list/ } for the List API.
 * @see {@link https://material-ui.com/api/list-item/ } for the ListItem API.
 * @see {@link https://fontawesome.com/how-to-use/on-the-web/using-with/react } for the Font Awesome React component docs.
 */
const DevSocial = (props) => {
  const { classes } = props;

  /**
   * @todo Include links that exists
   */
  return (
    <div className={classes.devSocial}>
      <List component="ul">
        <ListItem>
          <FontAwesomeIcon icon={faCertificate} size="lg" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faShareAlt} size="lg" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
        </ListItem>
        <ListItem>
          <FontAwesomeIcon icon={faFile} size="lg" />
        </ListItem>
      </List>
    </div>
  );
};

DevSocial.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  github: PropTypes.string,
  linkedIn: PropTypes.string,
  portfolio: PropTypes.string,
  acclaim: PropTypes.string,
};

DevSocial.defaultProps = {
  github: '',
  linkedIn: '',
  portfolio: '',
  acclaim: '',
};

export default withStyles(styles)(DevSocial);
