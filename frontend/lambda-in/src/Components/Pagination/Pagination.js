import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      pageLinks: [],
      query: '/dev-list'
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

    for (let i = start; i < start + this.state.maxPageLinks; i++) {
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

  handleClick = (event, page) => {
    this.props.onPageChange(page);
  };

  render() {
    const { classes } = this.props;
    const pageLinks = this.getPageLinks();

    /**
     * @todo Make href's dynamic
     *
     */
    return (
      <ul className={classes.pagination}>
        {pageLinks.map(page => (
          <li key={page} className={classes.pageItem}>
            <Link
              to={`${this.state.query}?page=${page}`}
              onClick={event => this.handleClick(event, page)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Pagination);
