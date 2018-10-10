import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {};

class FilterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>FilterSelect</div>;
  }
}

FilterSelect.propTypes = {};

export default withStyles(styles)(FilterSelect);
