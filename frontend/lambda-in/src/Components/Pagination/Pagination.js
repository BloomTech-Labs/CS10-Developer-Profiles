import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div>Pagination</div>
    );
  }
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
};

export default withStyles(styles)(Pagination);
