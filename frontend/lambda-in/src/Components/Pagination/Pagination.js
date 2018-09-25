import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const PAGINATION_SETTINGS = {
  maxPageLinks: 7,
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
      pageLinks: []
    };
  }

  getAllPageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getLowRangePageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= this.state.lowLimit; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getHighRangePageLinks = () => {
    const pageLinks = [];

    for (let i = this.state.highLimit; i <= this.props.pages; i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getMidRangePageLinks = () => {
    const pageLinks = [];
    const start =
      this.props.currentPage - Math.floor((this.state.maxPageLinks - 1) / 2);
    
    for (let i = start; i < (start + this.state.maxPageLinks); i++) {
      pageLinks.push(i);
    }

    return pageLinks;
  };

  getPageLinks = () => {
    if (this.props.pages <= this.state.maxPageLinks)
      return this.getAllPageLinks();

    if (this.props.currentPage < this.state.lowLimit)
      return this.getLowRangePageLinks();

    if (this.props.currentPage > this.state.highLimit)
      return this.getHighRangePageLinks();

    return this.getMidRangePageLinks();
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
