import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const PAGINATION_SETTINGS = {
  maxPageLinks: 6,
  pageLimit: 10
};

const styles = {};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPageLinks: PAGINATION_SETTINGS.maxPageLinks,
      lowLimit: PAGINATION_SETTINGS.maxPageLinks - 1,
      highLimit: this.props.pages - PAGINATION_SETTINGS.maxPageLinks + 2,
      pageLinks: [],
    };
  };

  render() {
    const { classes } = this.props;
    return <div>Pagination</div>;
  }
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
};

export default withStyles(styles)(Pagination);
